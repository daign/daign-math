import { Observable } from '@daign/observable';

import { Vector2 } from './vector2';
import { Line2 } from './line2';
import { MathHelper } from './mathHelper';

const precision = 1e-14;

/**
 * 2D ray defined by origin point and direction vector.
 */
export class Ray2 extends Observable {
  private _origin: Vector2;
  private _direction: Vector2;

  /**
   * Get the origin point of the ray.
   * @returns The origin point.
   */
  public get origin(): Vector2 {
    return this._origin;
  }

  /**
   * Get the direction vector of the ray.
   * @returns The direction vector.
   */
  public get direction(): Vector2 {
    return this._direction;
  }

  /**
   * Constructor.
   * @param origin - The origin point.
   * @param direction - The direction vector.
   */
  public constructor( origin?: Vector2, direction?: Vector2 ) {
    super();

    // Passed vectors are used directly, not cloned.
    this._origin = origin || new Vector2();
    this._direction = direction || new Vector2();

    // Notify observers when origin or direction vector has changes.
    const callback = (): void => {
      this.notifyObservers();
    };
    this._origin.subscribeToChanges( callback );
    this._direction.subscribeToChanges( callback );
  }

  /**
   * Set from the values of another ray.
   * @param r - Another ray.
   * @returns A reference to itself.
   */
  public copy( r: Ray2 ): Ray2 {
    this.origin.copy( r.origin );
    this.direction.copy( r.direction );
    return this;
  }

  /**
   * Create a new ray with the same values.
   * @returns A new ray.
   */
  public clone(): Ray2 {
    return new Ray2( this.origin.clone(), this.direction.clone() );
  }

  /**
   * Test whether ray is parallel to line.
   * @param l - The line to test.
   * @returns Whether ray is parallel to line.
   */
  public isParallelToLine( l: Line2 ): boolean {
    const directionRay = this.direction;
    const directionLine = l.direction;
    return ( directionRay.x * directionLine.y === directionLine.x * directionRay.y );
  }

  /**
   * Test whether ray is perpendicular to line.
   * @param l - The line to test.
   * @returns Whether ray is perpendicular to line.
   */
  public isPerpendicularToLine( l: Line2 ): boolean {
    const directionRay = this.direction;
    const directionLine = l.direction;
    return ( directionRay.dot( directionLine ) === 0 );
  }

  /**
   * Returns the intersection of a ray with a line segment.
   * The intersection point must lie between the ends of the line segment.
   * @param line - The line segment.
   * @returns The intersection point or null if ray and line don't intersect.
   */
  public getLineSegmentIntersection( line: Line2 ): Vector2 | null {
    const pointOnRay = this.origin.clone().add( this.direction );

    const ax = this.origin.x;
    const ay = this.origin.y;
    const bx = pointOnRay.x;
    const by = pointOnRay.y;
    const cx = line.start.x;
    const cy = line.start.y;
    const dx = line.end.x;
    const dy = line.end.y;

    const n = ( bx - ax ) * ( dy - cy ) - ( by - ay ) * ( dx - cx );

    if ( n !== 0 ) {
      const s = ( ( ax - cx ) * ( dy - cy ) - ( ay - cy ) * ( dx - cx ) ) / -n;
      const t = ( ( cx - ax ) * ( by - ay ) - ( cy - ay ) * ( bx - ax ) ) / n;

      if (
        // Intersection point must lie on the direction of the ray.
        MathHelper.greaterOrCloseTo( s, 0, precision ) &&
        // Intersection point must lie between or close to endpoints of line segment.
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
   * Determines on which side of the ray a point lies.
   * @param point - The point.
   * @returns -1 or 1 for the sides, or 0 if on the infinite line through the ray.
   */
  public getSideOfPoint( point: Vector2 ): number {
    const d = this.direction.cross( point.clone().sub( this.origin ) );

    // Return 0 if value is very close to zero.
    if ( MathHelper.closeTo( d, 0, precision ) ) {
      return 0;
    }

    return Math.sign( d );
  }
}
