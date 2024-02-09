import { Observable } from '@daign/observable';

/**
 * Abstract class for arrays of elements implementing the observable pattern.
 */
export abstract class GenericArray<T extends Observable> extends Observable {
  // The elements of the array.
  private _elements: T[] = [];

  // The callbacks to remove the subscriptions on the elements.
  private subscriptionRemovers: ( () => void )[] = [];

  // The array elements optionally referenced by name.
  private namedMapping: { [ key: string ]: T } = {};

  /**
   * Get the elements.
   * The returned array is a copy of the internal array.
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

    // Remove all named mappings.
    this.namedMapping = {};

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
   * Get all names form the named mapping.
   * @returns Array of mapping names.
   */
  public get names(): string[] {
    return Object.keys( this.namedMapping );
  }

  /**
   * Constructor.
   */
  public constructor() {
    super();
  }

  /**
   * Check whether a name exists in the named mapping.
   * @param name - The name.
   * @returns Whether the name exists in the named mapping.
   */
  public containsName( name: string ): boolean {
    return ( name in this.namedMapping );
  }

  /**
   * Copy the elements of another array.
   * Does not copy the named mapping.
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
   * Get an element by its name in the named mapping.
   * Will throw an error if an element with this name does not exist.
   * @param name - The name of the element.
   * @returns The element.
   */
  public getByName( name: string ): T {
    if ( !this.containsName( name ) ) {
      throw new Error( 'No element exists for the given name.' );
    }

    return this.namedMapping[ name ];
  }

  /**
   * Assign a name for the named mapping to an element by index.
   * Will throw an error if the name is not unique.
   * Will throw an error if the index is out of bounds.
   * @param name - The new name of the element.
   * @param index - The index of the element to be named.
   * @returns A reference to itself.
   */
  public assignName( name: string, index: number ): GenericArray<T> {
    if ( this.containsName( name ) ) {
      throw new Error( 'Name is not unique.' );
    }
    if ( index >= this.length ) {
      throw new Error( 'The index of the element to be named is out of bounds.' );
    }

    this.namedMapping[ name ] = this._elements[ index ];
    return this;
  }

  /**
   * Remove a name from the named mapping.
   * Does not remove the named element from the array.
   * Will throw an error if the name does not exist.
   * @param name - The name to remove.
   * @returns A reference to itself.
   */
  public removeName( name: string ): GenericArray<T> {
    if ( !this.containsName( name ) ) {
      throw new Error( 'Name does not exist in mapping.' );
    }

    delete this.namedMapping[ name ];
    return this;
  }

  /**
   * Add an element to the end of the array.
   * Will throw an error if the name is not unique.
   * @param element - The element to add.
   * @param name - The name of the element for the named mapping. Optional.
   * @returns A reference to itself.
   */
  public push( element: T, name?: string ): GenericArray<T> {
    if ( name && this.containsName( name ) ) {
      throw new Error( 'Name is not unique.' );
    }

    this._elements.push( element );

    if ( name ) {
      this.namedMapping[ name ] = element;
    }

    const subscriptionRemover = element.subscribeToChanges( (): void => {
      this.notifyObservers();
    } );
    this.subscriptionRemovers.push( subscriptionRemover );

    this.notifyObservers();
    return this;
  }

  /**
   * Add an element at a specific index position to the array, shifting all following elements.
   * Will throw an error if the name is not unique.
   * Will throw an error if the index is out of bounds.
   * @param element - The element to add.
   * @param index - The position to insert the element.
   * @param name - The name of the element for the named mapping. Optional.
   * @returns A reference to itself.
   */
  public insert( element: T, index: number, name?: string ): GenericArray<T> {
    if ( name && this.containsName( name ) ) {
      throw new Error( 'Name is not unique.' );
    }

    if ( index < 0 || index > this._elements.length ) {
      throw new Error( 'The index is out of bounds for array insertion.' );
    }

    this._elements.splice( index, 0, element );

    if ( name ) {
      this.namedMapping[ name ] = element;
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
   * Does not remove the element from the named mapping, because the element can still exist in the
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
   * Remove and return an element at a specific index position in the array, shifting all following
   * elements.
   * Does not remove the element from the named mapping, because the element can still exist in the
   * array at a different index.
   * Will throw an error if the index is out of bounds.
   * @param index - The position of the element to remove.
   * @returns The removed element.
   */
  public remove( index: number ): T {
    if ( index < 0 || index >= this._elements.length ) {
      throw new Error( 'The index is out of bounds for removal from array.' );
    }

    const result = this._elements.splice( index, 1 )[ 0 ];

    const subscriptionRemover = this.subscriptionRemovers.splice( index, 1 )[ 0 ];
    subscriptionRemover();

    this.notifyObservers();
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
