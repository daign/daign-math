import { Observable } from '@daign/observable';

/**
 * Abstract class for arrays of elements implementing the observable pattern.
 */
export abstract class GenericArray<T extends Observable> extends Observable {
  // The elements of the array.
  private _elements: T[] = [];

  // The callbacks to remove the subscriptions on the elements.
  private subscriptionRemovers: ( () => void )[] = [];

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
   * Constructor.
   */
  public constructor() {
    super();
  }

  /**
   * Set from the elements of another array.
   * @param arr - Another array.
   * @returns A reference to itself.
   */
  public copy( arr: GenericArray<T> ): GenericArray<T> {
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
   * Add an element to the end of the array.
   * @param element - The element to add.
   * @returns A reference to itself.
   */
  public push( element: T ): GenericArray<T> {
    this._elements.push( element );

    const subscriptionRemover = element.subscribeToChanges( (): void => {
      this.notifyObservers();
    } );
    this.subscriptionRemovers.push( subscriptionRemover );

    this.notifyObservers();
    return this;
  }

  /**
   * Remove and return the last element.
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
