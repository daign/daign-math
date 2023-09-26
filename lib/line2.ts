import { Observable } from '@daign/observable';

import { Vector2 } from './vector2';
import { MathHelper } from './mathHelper';

const precision = 1e-14;

/**
 * 2D line defined by start and end point.
 */
export class Line2 extends Observable {
  private _start: Vector2;
  private _end: Vector2;

  /**
   * Get the start point of the line.
   * @returns The start point.
   */
  public get start(): Vector2 {
    return this._start;
  }

  /**
   * Get the end point of the line.
   * @returns The end point.
   */
  public get end(): Vector2 {
    return this._end;
  }

  /**
   * Get a directional vector for the line.
   * @returns The directional vector.
   */
  public get direction(): Vector2 {
    return this.end.clone().sub( this.start );
  }

  /**
   * Get the length of the line segment.
   * @returns The length of the line segment.
   */
  public get length(): number {
    return this.direction.length();
  }

  /**
   * Get the slope of a line.
   * @returns The slope value.
   */
  public get slope(): number {
    const d = this.direction;
    // If x component of directional vector is zero, then we have a vertical line.
    if ( d.x === 0 ) {
      return Infinity;
    }

    return ( d.y / d.x );
  }

  /**
   * Get the coordinate where the line intersects the y-axis.
   * @returns The coordinate where the line intersects the y-axis.
   */
  public get yIntercept(): number | null {
    const slope = this.slope;
    if ( !isFinite( slope ) ) {
      return null;
    }

    return this.start.y - slope * this.start.x;
  }

  /**
   * Constructor.
   * @param start - The start point.
   * @param end - The end point.
   */
  public constructor( start?: Vector2, end?: Vector2 ) {
    super();

    // Passed points are used directly, not cloned.
    this._start = start || new Vector2();
    this._end = end || new Vector2();

    // Notify observers when start or end point has changes.
    const callback = (): void => {
      this.notifyObservers();
    };
    this._start.subscribeToChanges( callback );
    this._end.subscribeToChanges( callback );
  }

  /**
   * Set from the values of another line.
   * @param l - Another line.
   * @returns A reference to itself.
   */
  public copy( l: Line2 ): Line2 {
    this.start.copy( l.start );
    this.end.copy( l.end );
    return this;
  }

  /**
   * Create a new line with the same values.
   * @returns A new line.
   */
  public clone(): Line2 {
    return new Line2( this.start.clone(), this.end.clone() );
  }

  /**
   * Test equality of values for two lines.
   * @param l - Another line.
   * @returns Whether lines are equal.
   */
  public equals( l: Line2 ): boolean {
    return this.start.equals( l.start ) && this.end.equals( l.end );
  }

  /**
   * Get the center of the line.
   * @returns The center point.
   */
  public getCenter(): Vector2 {
    return this.start.clone().add( this.end ).multiplyScalar( 0.5 );
  }

  /**
   * Get the point at a position interpolated along the line segment.
   * @param t - The interpolation value, from 0 to 1 will give points on the line segment.
   * @returns The interpolated point.
   */
  public interpolate( t: number ): Vector2 {
    return this.direction.multiplyScalar( t ).add( this.start );
  }

  /**
   * Test parallelism of two lines.
   * @param l - Another line.
   * @returns Whether lines are parallel.
   */
  public isParallel( l: Line2 ): boolean {
    const direction1 = this.direction;
    const direction2 = l.direction;
    return ( direction1.x * direction2.y === direction2.x * direction1.y );
  }

  /**
   * Test perpendicularity of two lines.
   * @param l - Another line.
   * @returns Whether lines are perpendicular.
   */
  public isPerpendicular( l: Line2 ): boolean {
    const direction1 = this.direction;
    const direction2 = l.direction;
    return ( direction1.dot( direction2 ) === 0 );
  }

  /**
   * Returns the intersection of both lines, when the lines are infinite straight lines.
   * @param l - Another line.
   * @returns The intersection point or null if lines are parallel.
   */
  public getIntersection( l: Line2 ): Vector2 | null {
    const ax = this.start.x;
    const ay = this.start.y;
    const bx = this.end.x;
    const by = this.end.y;
    const cx = l.start.x;
    const cy = l.start.y;
    const dx = l.end.x;
    const dy = l.end.y;

    const n = ( bx - ax ) * ( dy - cy ) - ( by - ay ) * ( dx - cx );

    if ( n !== 0 ) {
      const s = ( ( ax - cx ) * ( dy - cy ) - ( ay - cy ) * ( dx - cx ) ) / -n;

      const x = ax + s * ( bx - ax );
      const y = ay + s * ( by - ay );
      return new Vector2( x, y );
    }

    // Returns null if lines are parallel.
    return null;
  }

  /**
   * Returns the intersection of line segments.
   * The intersection point must lie between the ends of both line segments.
   * @param l - Another line.
   * @returns The intersection point or null if lines don't intersect.
   */
  public getSegmentIntersection( l: Line2 ): Vector2 | null {
    const ax = this.start.x;
    const ay = this.start.y;
    const bx = this.end.x;
    const by = this.end.y;
    const cx = l.start.x;
    const cy = l.start.y;
    const dx = l.end.x;
    const dy = l.end.y;

    const n = ( bx - ax ) * ( dy - cy ) - ( by - ay ) * ( dx - cx );

    if ( n !== 0 ) {
      const s = ( ( ax - cx ) * ( dy - cy ) - ( ay - cy ) * ( dx - cx ) ) / -n;
      const t = ( ( cx - ax ) * ( by - ay ) - ( cy - ay ) * ( bx - ax ) ) / n;

      // Intersection point must lie between or close to endpoints.
      if (
        MathHelper.withinOrCloseToLimits( s, 0, 1, precision ) &&
        MathHelper.withinOrCloseToLimits( t, 0, 1, precision )
      ) {
        const x = ax + s * ( bx - ax );
        const y = ay + s * ( by - ay );
        return new Vector2( x, y );
      }
    }

    // Returns null if lines are parallel or intersection is outside of segment limits.
    return null;
  }

  /**
   * Returns the intersection of a line segment with an infinite line.
   * The intersection point must lie between the ends of the line segment.
   * @param l - The infinite line.
   * @returns The intersection point or null if lines don't intersect.
   */
  public getSegmentAndLineIntersection( l: Line2 ): Vector2 | null {
    const ax = this.start.x;
    const ay = this.start.y;
    const bx = this.end.x;
    const by = this.end.y;
    const cx = l.start.x;
    const cy = l.start.y;
    const dx = l.end.x;
    const dy = l.end.y;

    const n = ( bx - ax ) * ( dy - cy ) - ( by - ay ) * ( dx - cx );

    if ( n !== 0 ) {
      const s = ( ( ax - cx ) * ( dy - cy ) - ( ay - cy ) * ( dx - cx ) ) / -n;

      // Intersection point must lie between or close to endpoints.
      if ( MathHelper.withinOrCloseToLimits( s, 0, 1, precision ) ) {
        const x = ax + s * ( bx - ax );
        const y = ay + s * ( by - ay );
        return new Vector2( x, y );
      }
    }

    // Returns null if lines are parallel or intersection is outside of segment limits.
    return null;
  }

  /**
   * Determines on which side of the line a point lies.
   * @param point - The point.
   * @returns -1 or 1 for the sides, or 0 if on the line.
   */
  public getSideOfPoint( point: Vector2 ): number {
    const d = this.direction.cross( point.clone().sub( this.start ) );

    // Return 0 if value is very close to zero.
    if ( MathHelper.closeTo( d, 0, precision ) ) {
      return 0;
    }

    return Math.sign( d );
  }

  /**
   * Determines whether a point lies on the line or not.
   * @param point - The point.
   * @returns Whether the point lies on the line or not.
   */
  public containsPoint( point: Vector2 ): boolean {
    const side = this.getSideOfPoint( point );

    return ( side === 0 );
  }

  /**
   * Determines whether a point lies on the line segment or not.
   * @param point - The point.
   * @returns Whether the point lies on the line segment or not.
   */
  public containsPointInSegment( point: Vector2 ): boolean {
    // Check whether point lies on the infinite line.
    const onLine = this.containsPoint( point );

    if ( onLine ) {
      // Check if the result of a projection would lie between the endpoints of the line segment.
      const support = point.clone().sub( this.start );
      const d = support.dot( this.direction.normalize() );
      const length = this.length;

      if ( MathHelper.withinOrCloseToLimits( d, 0, length, precision ) ) {
        // Projection lies within or close to the endpoints.
        return true;
      }
    }

    return false;
  }
}
