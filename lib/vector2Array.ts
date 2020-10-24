import { Box2 } from './box2';
import { GenericArray } from './genericArray';
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
   * Create an array with the same elements.
   * @returns A new array.
   */
  public clone(): Vector2Array {
    const arr = new Vector2Array();
    arr.elements = this.elements;
    return arr;
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
