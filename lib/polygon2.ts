import { Line2 } from './line2';
import { Vector2 } from './vector2';
import { Vector2Array } from './vector2Array';

/**
 * 2D polygon.
 * Points are connected according to their order in the array, plus a connection between last and
 * first point.
 */
export class Polygon2 extends Vector2Array {
  /**
   * Get the length of the polygon's outline.
   * @returns The length of the polygon's outline.
   */
  public get lengthOfOutline(): number {
    let length = 0;
    this.iterateLineSegments( ( line: Line2 ): void => {
      length += line.length;
    } );
    return length;
  }

  /**
   * Constructor.
   * @param points - The points of the polygon.
   */
  public constructor( points?: Vector2[] ) {
    super();

    if ( points ) {
      this.elements = points;
    }
  }

  /**
   * Get the center of the polygon's bounding box.
   * @returns The center point.
   */
  public getBoxCenter(): Vector2 {
    return this.getBox().center;
  }

  /**
   * Call a function with every line segment of the polygon.
   * @param callback - The function to call the lines with.
   * @returns A reference to itself.
   */
  public iterateLineSegments(
    callback: ( line: Line2, index: number ) => void
  ): Polygon2 {
    for ( let i = 0; i < this.length - 1; i += 1 ) {
      callback( new Line2( this.getElement( i ), this.getElement( i + 1 ) ), i );
    }

    if ( this.length > 1 ) {
      // The last and first point are also a line segment of the polygon.
      callback( new Line2( this.getElement( this.length - 1 ), this.getElement( 0 ) ),
        this.length - 1 );
    }

    return this;
  }

  /**
   * Test whether a given point lies on the edge of the polygon.
   * @param point - The point to test.
   * @returns Whether a given point lies on the edge of the polygon.
   */
  public isPointOnEdge( point: Vector2 ): boolean {
    let pointIsOnEdge = false;

    this.iterateLineSegments( ( line: Line2 ): void => {
      if ( line.containsPointInSegment( point ) ) {
        pointIsOnEdge = true;
      }
    } );

    return pointIsOnEdge;
  }
}
