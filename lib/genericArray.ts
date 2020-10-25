import { Observable } from '@daign/observable';

/**
 * Abstract class for arrays of elements implementing the observable pattern.
 */
export abstract class GenericArray<T extends Observable> extends Observable {
  // The elements of the array.
  private _elements: T[] = [];

  // The callbacks to remove the subscriptions on the elements.
  private subscriptionRemovers: ( () => void )[] = [];

  // The array elements optionally referenced by key.
  private keyMapping: { [ key: string ]: T } = {};

  /**
   * Get the elements.
   * @returns An array of elements.
   */
  public get elements(): T[] {
    return [ ...this._elements ];
  }

  /**
   * Set the elements.
   * @param elements - Array of elements.
   */
  public set elements( elements: T[] ) {
    // Remove subscriptions on previously contained elements.
    this.subscriptionRemovers.forEach( ( remover: () => void ): void => {
      remover();
    } );

    // Remove all key mappings.
    this.keyMapping = {};

    // Assign the new elements and subscribe to changes on them.
    this._elements = [ ...elements ];
    this.subscriptionRemovers = this._elements.map( ( element: T ): ( () => void ) => {
      const subscriptionRemover = element.subscribeToChanges( (): void => {
        this.notifyObservers();
      } );
      return subscriptionRemover;
    } );

    this.notifyObservers();
  }

  /**
   * Get the number of elements in the array.
   * @returns The number of elements in the array.
   */
  public get length(): number {
    return this._elements.length;
  }

  /**
   * Get all keys form the named mapping.
   * @returns Array of mapping keys.
   */
  public get keys(): string[] {
    return Object.keys( this.keyMapping );
  }

  /**
   * Constructor.
   */
  public constructor() {
    super();
  }

  /**
   * Check whether a key exists in the key mapping.
   * @param key - The key name.
   * @returns Whether the key exists in the key mapping.
   */
  public hasKey( key: string ): boolean {
    return ( key in this.keyMapping );
  }

  /**
   * Copy the elements of another array.
   * Does not copy the key mapping.
   * @param arr - Another array.
   * @returns A reference to itself.
   */
  public copyElements( arr: GenericArray<T> ): GenericArray<T> {
    this.elements = arr.elements;
    return this;
  }

  /**
   * Get the i-th element of the array.
   * @param index - The index of the element to get.
   * @returns The element or undefined.
   */
  public getElement( index: number ): T | undefined {
    return this._elements[ index ];
  }

  /**
   * Get an element by its name in the key mapping.
   * Will throw an error if an element with this key does not exist.
   * @param name - The key name of the element.
   * @returns The element.
   */
  public getByName( name: string ): T {
    if ( !this.hasKey( name ) ) {
      throw new Error( 'No element exists for the given name.' );
    }

    return this.keyMapping[ name ];
  }

  /**
   * Assign a name for the key mapping to an element by index.
   * Will throw an error if the key name is not unique.
   * Will throw an error if the index is out of bounds.
   * @param name - The new key name of the element.
   * @param index - The index of the element to be named.
   * @returns A reference to itself.
   */
  public assignName( name: string, index: number ): GenericArray<T> {
    if ( this.hasKey( name ) ) {
      throw new Error( 'Name is not unique.' );
    }
    if ( index >= this.length ) {
      throw new Error( 'The index of the element to be named is out of bounds.' );
    }

    this.keyMapping[ name ] = this._elements[ index ];
    return this;
  }

  /**
   * Add an element to the end of the array.
   * Will throw an error if the name is not unique.
   * @param element - The element to add.
   * @param name - The name of the element for the key mapping. Optional.
   * @returns A reference to itself.
   */
  public push( element: T, name?: string ): GenericArray<T> {
    if ( name && this.hasKey( name ) ) {
      throw new Error( 'Name is not unique.' );
    }

    this._elements.push( element );

    if ( name ) {
      this.keyMapping[ name ] = element;
    }

    const subscriptionRemover = element.subscribeToChanges( (): void => {
      this.notifyObservers();
    } );
    this.subscriptionRemovers.push( subscriptionRemover );

    this.notifyObservers();
    return this;
  }

  /**
   * Remove and return the last element.
   * Does not remove the element from the key mapping, because the element can still exist in the
   * array at a different index.
   * @returns The last element or undefined if array is empty.
   */
  public pop(): T | undefined {
    const result = this._elements.pop();
    const subscriptionRemover = this.subscriptionRemovers.pop();
    if ( subscriptionRemover !== undefined ) {
      subscriptionRemover();
    }

    if ( result !== undefined ) {
      this.notifyObservers();
    }
    return result;
  }

  /**
   * Call a function with every element of the array.
   * @param callback - The function to call the elements with.
   * @returns A reference to itself.
   */
  public iterate( callback: ( element: T, index: number ) => void ): GenericArray<T> {
    this._elements.forEach( ( element: T, index: number ): void => {
      callback( element, index );
    } );

    return this;
  }

  /**
   * Call a function with every pair of neighboring elements of the array.
   * @param callback - The function to call the elements with.
   * @returns A reference to itself.
   */
  public iteratePairwise(
    callback: ( element1: T, element2: T, index: number ) => void
  ): GenericArray<T> {
    for ( let i = 0; i < this._elements.length - 1; i += 1 ) {
      callback( this._elements[ i ], this._elements[ i + 1 ], i );
    }

    return this;
  }
}
