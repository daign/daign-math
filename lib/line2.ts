import {Observable} from '@daign/observable';

import {Vector2} from './vector2';

/**
 * 2D line
 */
export class Line2 extends Observable {
  private _start: Vector2;
  private _end: Vector2;

  public get start(): Vector2 {
    return this._start;
  }

  public get end(): Vector2 {
    return this._end;
  }

  /**
   * Get a directional vector for the line
   */
  public get direction(): Vector2 {
    return this.end.clone().sub( this.start );
  }

  /**
   * Constructor
   * @param start The start point
   * @param end The end point
   */
  constructor( start?: Vector2, end?: Vector2 ) {
    super();

    // passed points are used directly, not cloned
    this._start = start || new Vector2();
    this._end = end || new Vector2();

    // notify observers when start or end point has changes
    const callback = (): void => {
      this.notifyObservers();
    };
    this._start.subscribeToChanges( callback );
    this._end.subscribeToChanges( callback );
  }

  /**
   * Set from the values of another line
   * @param l Another line
   * @returns A reference to itself
   */
  public copy( l: Line2 ): Line2 {
    this.start.copy( l.start );
    this.end.copy( l.end );
    return this;
  }

  /**
   * Create a new line with the same values
   * @returns A new line
   */
  public clone(): Line2 {
    return new Line2( this.start.clone(), this.end.clone() );
  }

  /**
   * Test equality of values for two lines
   * @param l Another line
   * @returns Whether lines are equal
   */
  public equals( l: Line2 ): boolean {
    return this.start.equals( l.start ) && this.end.equals( l.end );
  }

  /**
   * Get the center of the line
   * @returns The center point
   */
  public getCenter(): Vector2 {
    return this.start.clone().add( this.end ).multiplyScalar( 0.5 );
  }

  /**
   * Get the point at a position interpolated along the line segment
   * @param t The interpolation value, from 0 to 1 will give points on the line segment
   * @returns The interpolated point
   */
  public interpolate( t: number ): Vector2 {
    return this.direction.multiplyScalar( t ).add( this.start );
  }

  /**
   * Test parallelity of two lines
   * @param l Another line
   * @returns Whether lines are parallel
   */
  public isParallel( l: Line2 ): boolean {
    const direction1 = this.direction;
    const direction2 = l.direction;
    return ( direction1.x * direction2.y === direction2.x * direction1.y );
  }

  /**
   * Test perpendicularity of two lines
   * @param l Another line
   * @returns Whether lines are perpendicular
   */
  public isPerpendicular( l: Line2 ): boolean {
    const direction1 = this.direction;
    const direction2 = l.direction;
    return ( direction1.dot( direction2 ) === 0 );
  }

  /**
   * Returns the intersection of both lines, when the lines are infinite straight lines
   * @param l Another line
   * @returns The intersection point or null if lines are parallel
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

    return null; // returns null if lines are parallel
  }

  /**
   * Returns the intersection of line segments.
   * The intersection point must lie between the end of both line segments
   * @param l Another line
   * @returns The intersection point or null if lines don't intersect
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

      if ( 0 <= s && s <= 1 && 0 <= t && t <= 1 ) {
        const x = ax + s * ( bx - ax );
        const y = ay + s * ( by - ay );
        return new Vector2( x, y );
      }
    }

    return null; // returns null if lines are parallel or intersection is outside of segment limits
  }

  /**
   * Determines on which side of the line a point lies
   * @param p The point
   * @returns -1 or 1 for the sides, or 0 if on the line
   */
  public getSideOfPoint( p: Vector2 ): number {
    const d = this.direction.cross( p.clone().sub( this.start ) );

    const sign = ( x: number ): number => Number( x > 0 ) - Number( x < 0 );
    return sign( d );
  }
}
