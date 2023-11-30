import { Line2 } from './line2';
import { Ray2 } from './ray2';
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

  /**
   * Test whether a given point is inside or on the edge of the polygon, or not.
   * @param point - The point to test.
   * @returns Whether a given point is inside or on the edge of the polygon, or not.
   */
  public isPointInside( point: Vector2 ): boolean {
    // When on the edge, this counts as inside of the polygon.
    if ( this.isPointOnEdge( point ) ) {
      return true;
    }

    // A ray starting from the given point.
    const ray = new Ray2( point, new Vector2( 1, 0 ) );
    let numberOfIntersections = 0;

    // Test for every line segment of the polygon.
    this.iterateLineSegments( ( line: Line2 ): void => {
      // Calculate intersection of ray and line segment.
      const intersectionPoint = ray.getLineSegmentIntersection( line );

      // Count the intersection if result is not null.
      if ( intersectionPoint !== null ) {
        /* But if the intersection is close to the start or end of the line, then only count if the
         * other endpoint of the line is below the ray. Otherwise we would count intersections
         * twice. */
        if ( intersectionPoint.closeTo( line.start ) ) {
          if ( ray.getSideOfPoint( line.end ) === -1 ) {
            numberOfIntersections += 1;
          }
        } else if ( intersectionPoint.closeTo( line.end ) ) {
          if ( ray.getSideOfPoint( line.start ) === -1 ) {
            numberOfIntersections += 1;
          }
        } else {
          numberOfIntersections += 1;
        }
      }
    } );

    // If the ray intersects the polygon an odd number of times, then the point is inside.
    if ( numberOfIntersections % 2 === 1 ) {
      return true;
    }

    return false;
  }

  /**
   * Test whether the polygon is convex.
   * Only works for polygons that are not self-intersecting.
   * @returns Whether the polygon is convex.
   */
  public isConvex(): boolean {
    let isConvex = true;
    let orientation = 0;

    this.iterateLineSegments( ( line: Line2, index: number ): void => {
      // For each line segment, determine the relative location of next point.
      const nextPoint = this.getElement( ( index + 2 ) % this.length )!;
      const sideOfPoint = line.getSideOfPoint( nextPoint );

      /* When side of point is determined, then orientation is set. All following cases must have
       * the same value or 0. */
      if ( orientation === 0 ) {
        orientation = sideOfPoint;
      } else if ( sideOfPoint !== 0 && orientation !== sideOfPoint ) {
        isConvex = false;
      }
    } );

    return isConvex;
  }

  /**
   * Test whether the polygon is self intersecting.
   * @returns Whether the polygon is self intersecting.
   */
  public isSelfIntersecting(): boolean {
    let isSelfIntersecting = false;

    // Compare each pair of edge segments that are not neighboring edges.
    this.iterateLineSegments( ( line1: Line2, index1: number ): void => {
      this.iterateLineSegments( ( line2: Line2, index2: number ): void => {
        // Only test if not same index and difference between indices is greater than 1.
        if (
          index1 !== index2 &&
          ( index1 - index2 + this.length ) % this.length > 1 &&
          ( index2 - index1 + this.length ) % this.length > 1
        ) {
          const intersection = line1.getSegmentIntersection( line2 );
          if ( intersection !== null ) {
            isSelfIntersecting = true;
          }
        }
      } );
    } );

    return isSelfIntersecting;
  }
}
