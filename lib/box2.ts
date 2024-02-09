import { Observable } from '@daign/observable';

import { Matrix3 } from './matrix3';
import { Vector2 } from './vector2';

/**
 * Rectangle shape that is defined by a min and max point. Used to represent bounding boxes.
 */
export class Box2 extends Observable {
  /* Min and max vectors are private, so you can't replace them, because this would break the
   * subscriptions on them.
   * Through the getters you can access the vectors directly. So you should clone them when you want
   * to use and modify the values in other places. */

  // Min coordinates, has the smaller x and y values.
  private _min: Vector2;

  // Max coordinates, has the greater x and y values.
  private _max: Vector2;

  /**
   * Get the coordinates of the minimum point.
   * @returns The minimum point.
   */
  public get min(): Vector2 {
    return this._min;
  }

  /**
   * Get the coordinates of the maximum point.
   * @returns The maximum point.
   */
  public get max(): Vector2 {
    return this._max;
  }

  /**
   * Returns true if the box contains no points.
   * @returns The boolean result.
   */
  public get isEmpty(): boolean {
    return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y );
  }

  /**
   * Returns true if the box contains more than one point on both axes.
   * @returns The boolean result.
   */
  public get isArea(): boolean {
    return ( this.max.x > this.min.x ) && ( this.max.y > this.min.y );
  }

  /**
   * Returns the size of the box.
   * @returns The size vector.
   */
  public get size(): Vector2 {
    if ( this.isEmpty ) {
      return new Vector2( 0, 0 );
    }
    return this.max.clone().sub( this.min );
  }

  /**
   * Get the coordinates of the center point.
   * @returns The center point.
   */
  public get center(): Vector2 {
    if ( this.isEmpty ) {
      return new Vector2( 0, 0 );
    }
    return this.min.clone().add( this.size.multiplyScalar( 0.5 ) );
  }

  /**
   * Constructor.
   * @param min - The minimum vector.
   * @param max - The maximum vector.
   */
  public constructor( min?: Vector2, max?: Vector2 ) {
    super();

    // Passed points are used directly, not cloned. Also no non-empty check.
    // If not supplied, an empty box is initialized.
    this._min = min || new Vector2( +Infinity, +Infinity );
    this._max = max || new Vector2( -Infinity, -Infinity );

    // Notify observers when min or max point has changes.
    const callback = (): void => {
      this.notifyObservers();
    };
    this.min.subscribeToChanges( callback );
    this.max.subscribeToChanges( callback );
  }

  /**
   * Set from the values of another box.
   * @param b - Another box.
   * @returns A reference to itself.
   */
  public copy( b: Box2 ): Box2 {
    this.min.copy( b.min );
    this.max.copy( b.max );
    return this;
  }

  /**
   * Create a new box with the same, cloned values.
   * @returns A new box.
   */
  public clone(): Box2 {
    return new Box2( this.min.clone(), this.max.clone() );
  }

  /**
   * Test equality of values for two boxes.
   * @param b - Another box.
   * @returns Whether boxes are equal.
   */
  public equals( b: Box2 ): boolean {
    return this.min.equals( b.min ) && this.max.equals( b.max );
  }

  /**
   * Makes the box empty.
   * Expending an empty box by a point will set the box to that point.
   * @returns A reference to itself.
   */
  public makeEmpty(): Box2 {
    this.min.set( +Infinity, +Infinity );
    this.max.set( -Infinity, -Infinity );
    return this;
  }

  /**
   * Makes the box unlimited.
   * @returns A reference to itself.
   */
  public makeUnlimited(): Box2 {
    this.min.set( -Infinity, -Infinity );
    this.max.set( +Infinity, +Infinity );
    return this;
  }

  /**
   * Expand or shrink the box by the given offset.
   * @param s - The distance to expand.
   * @returns A reference to itself.
   */
  public expandByScalar( s: number ): Box2 {
    const offset = new Vector2( s, s );
    const minimumOffset = this.size.multiplyScalar( -0.5 );
    offset.max( minimumOffset );

    this.min.sub( offset );
    this.max.add( offset );
    return this;
  }

  /**
   * Scale the box relative to its current size while keeping its center.
   * @param s - The relative scale value to apply.
   * @returns A reference to itself.
   */
  public scale( s: number ): Box2 {
    const difference = this.size.multiplyScalar( ( Math.abs( s ) - 1 ) / 2 );
    this.min.sub( difference );
    this.max.add( difference );
    return this;
  }

  /**
   * Expand by including at least the given point.
   * @param p - The point by which to expand.
   * @returns A reference to itself.
   */
  public expandByPoint( p: Vector2 ): Box2 {
    this.min.min( p );
    this.max.max( p );
    return this;
  }

  /**
   * Expand by including at least the given box.
   * @param b - The box by which to expand.
   * @returns A reference to itself.
   */
  public expandByBox( b: Box2 ): Box2 {
    this.min.min( b.min );
    this.max.max( b.max );
    return this;
  }

  /**
   * Apply a matrix transformation on the box.
   * @param m - The transformation matrix.
   * @returns A reference to itself.
   */
  public transform( m: Matrix3 ): Box2 {
    // Don't calculate transformation if box is empty.
    if ( this.isEmpty ) {
      return this;
    }

    /* Transform all 4 corners of the box, to make sure that after a rotation all previously
     * contained points are still contained. */
    const corner1 = this.min.clone().transform( m );
    const corner2 = this.max.clone().transform( m );
    const corner3 = new Vector2( this.min.x, this.max.y ).transform( m );
    const corner4 = new Vector2( this.max.x, this.min.y ).transform( m );

    // Empty the box and expand by all 4 transformed corner points.
    this.makeEmpty();
    this.expandByPoint( corner1 );
    this.expandByPoint( corner2 );
    this.expandByPoint( corner3 );
    this.expandByPoint( corner4 );
    return this;
  }

  /**
   * Test whether point lies inside of box including the border.
   * @param p - The point.
   * @returns Whether point lies inside of box.
   */
  public containsPoint( p: Vector2 ): boolean {
    return !(
      p.x < this.min.x || p.x > this.max.x ||
      p.y < this.min.y || p.y > this.max.y
    );
  }

  /**
   * Test whether another box lies inside of box including the border.
   * An empty box is contained by all boxes.
   * @param b - The other box.
   * @returns Whether box lies inside of box.
   */
  public containsBox( b: Box2 ): boolean {
    return (
      this.min.x <= b.min.x && b.max.x <= this.max.x &&
      this.min.y <= b.min.y && b.max.y <= this.max.y
    );
  }
}
