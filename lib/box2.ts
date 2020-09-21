import { Observable } from '@daign/observable';

import { Matrix3 } from './matrix3';
import { Vector2 } from './vector2';

/**
 * Rectangle shape that is defined by a min and max point. Used to represent bounding boxes.
 */
export class Box2 extends Observable {
  // Min coordinates, has the smaller x and y values
  private _min: Vector2;
  // Max coodinates, has the greater x and y values
  private _max: Vector2;

  public get min(): Vector2 {
    return this._min;
  }

  public get max(): Vector2 {
    return this._max;
  }

  /**
   * Returns true if the box contains no points
   */
  public get isEmpty(): boolean {
    return ( this.max.x < this.min.x ) || ( this.max.y < this.min.y );
  }

  /**
   * Returns true if the box contains more than one point on both axes
   */
  public get isArea(): boolean {
    return ( this.max.x > this.min.x ) && ( this.max.y > this.min.y );
  }

  /**
   * Returns the size of the box
   */
  public get size(): Vector2 {
    if ( this.isEmpty ) {
      return new Vector2( 0, 0 );
    }
    return this.max.clone().sub( this.min );
  }

  /**
   * Constructor
   * @param min The minimum vector
   * @param max The maximum vector
   */
  public constructor( min?: Vector2, max?: Vector2 ) {
    super();

    // Passed points are used directly, not cloned. Also no non-empty check.
    this._min = min || new Vector2( +Infinity, +Infinity );
    this._max = max || new Vector2( -Infinity, -Infinity );

    // Notify observers when start or end point has changes
    const callback = (): void => {
      this.notifyObservers();
    };
    this._min.subscribeToChanges( callback );
    this._max.subscribeToChanges( callback );
  }

  /**
   * Set from the values of another box
   * @param b Another box
   * @returns A reference to itself
   */
  public copy( b: Box2 ): Box2 {
    this.min.copy( b.min );
    this.max.copy( b.max );
    return this;
  }

  /**
   * Create a new box with the same values
   * @returns A new box
   */
  public clone(): Box2 {
    return new Box2( this.min.clone(), this.max.clone() );
  }

  /**
   * Test equality of values for two boxes
   * @param b Another box
   * @returns Whether boxes are equal
   */
  public equals( b: Box2 ): boolean {
    return this.min.equals( b.min ) && this.max.equals( b.max );
  }

  /**
   * Makes the box empty
   * @returns A reference to itself
   */
  public makeEmpty(): Box2 {
    this.min.x = this.min.y = +Infinity;
    this.max.x = this.max.y = -Infinity;
    return this;
  }

  /**
   * Expands the box by a value given into every direction
   * @param s The distance to expand
   * @returns A reference to itself
   */
  public expandByScalar( s: number ): Box2 {
    this.min.addScalar( -s );
    this.max.addScalar( s );
    return this;
  }

  /**
   * Expand by including at least the given point
   * @param p The point by which to expand
   * @returns A reference to itself
   */
  public expandByPoint( p: Vector2 ): Box2 {
    this.min.min( p );
    this.max.max( p );
    return this;
  }

  /**
   * Expand by including at least the given box
   * @param b The box by which to expand
   * @returns A reference to itself
   */
  public expandByBox( b: Box2 ): Box2 {
    this.min.min( b.min );
    this.max.max( b.max );
    return this;
  }

  /**
   * Transform the box with a matrix by transforming the min and max points.
   * @param m A matrix
   * @returns A reference to itself
   */
  public transform( m: Matrix3 ): Box2 {
    // Don't calculate transformation if box is empty.
    if ( this.isEmpty ) {
      return this;
    }

    const minTransformed = this.min.clone().transform( m );
    const maxTransformed = this.max.clone().transform( m );

    // Min and max can switch through the transformation, so they have to be recalculated.
    const newMin = minTransformed.clone().min( maxTransformed );
    const newMax = maxTransformed.clone().max( minTransformed );
    this.min.copy( newMin );
    this.max.copy( newMax );
    return this;
  }

  /**
   * Test whether point lies inside of box including the border
   * @param p The point
   * @returns Whether point lies inside of box
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
   * @param b The other box
   * @returns Whether box lies inside of box
   */
  public containsBox( b: Box2 ): boolean {
    return (
      this.min.x <= b.min.x && b.max.x <= this.max.x &&
      this.min.y <= b.min.y && b.max.y <= this.max.y
    );
  }
}
