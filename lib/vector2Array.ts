import { Box2 } from './box2';
import { GenericArray } from './genericArray';
import { Matrix3 } from './matrix3';
import { Vector2 } from './vector2';

/**
 * Class for arrays of 2D vectors implementing the observable pattern.
 */
export class Vector2Array extends GenericArray<Vector2> {
  /**
   * Constructor.
   */
  public constructor() {
    super();
  }

  /**
   * Initialize with a given number of vectors.
   * @param n - The number of vectors to initialize.
   * @returns A reference to itself.
   */
  public initializeElements( n: number ): Vector2Array {
    const elements = [];
    for ( let i = 0; i < n; i += 1 ) {
      elements.push( new Vector2() );
    }
    this.elements = elements;
    return this;
  }

  /**
   * Set each vector to the value of the given array of vectors individually.
   * Will throw an error when the array lengths don't match.
   * Will notify observers for every individual change in actual value.
   * @param arr - Another array.
   * @returns A reference to itself.
   */
  public copyElementWise( arr: Vector2Array ): Vector2Array {
    if ( this.length !== arr.length ) {
      throw new Error( 'Array lengths do not match.' );
    }

    this.iterate( ( element: Vector2, index: number ): void => {
      const sourceElement = arr.getElement( index );
      // Source element can't be undefined because of the length check.
      element.copy( sourceElement! );
    } );

    return this;
  }

  /**
   * Create an array with the same elements.
   * @returns A new array.
   */
  public clone(): Vector2Array {
    const arr = new Vector2Array();
    arr.elements = this.elements;
    return arr;
  }

  /**
   * Create an array with copies of the elements.
   * @returns A new array.
   */
  public cloneDeep(): Vector2Array {
    const arr = new Vector2Array();
    arr.elements = this.elements.map( ( element: Vector2 ): Vector2 => element.clone() );
    return arr;
  }

  /**
   * Apply a matrix transformation on every vector in the array.
   * @param m - The transformation matrix.
   * @returns A reference to itself.
   */
  public transform( m: Matrix3 ): Vector2Array {
    this.iterate( ( element: Vector2 ): void => {
      element.transform( m );
    } );
    return this;
  }

  /**
   * Get the bounding box of all vectors of the array.
   * @returns The bounding box.
   */
  public getBox(): Box2 {
    const box = new Box2();
    this.elements.forEach( ( element: Vector2 ): void => {
      box.expandByPoint( element );
    } );
    return box;
  }
}
