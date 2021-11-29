import { Observable } from '@daign/observable';

import { Angle } from './angle';
import { Box2 } from './box2';
import { Line2 } from './line2';
import { MathHelper } from './mathHelper';
import { Matrix3 } from './matrix3';

/**
 * 2D vector.
 */
export class Vector2 extends Observable {
  // Used for saving an older version of itself.
  public snapshot: Vector2 | undefined;

  private _x: number;
  private _y: number;

  /**
   * Get the x value.
   * @returns The x value.
   */
  public get x(): number {
    return this._x;
  }

  /**
   * Set the x value.
   * @param value - The numeric x value.
   */
  public set x( value: number ) {
    // Only call observers if something changed.
    if ( this._x !== value ) {
      this._x = value;
      this.notifyObservers();
    }
  }

  /**
   * Get the y value.
   * @returns The y value.
   */
  public get y(): number {
    return this._y;
  }

  /**
   * Set the y value.
   * @param value - The numeric y value.
   */
  public set y( value: number ) {
    // Only call observers if something changed.
    if ( this._y !== value ) {
      this._y = value;
      this.notifyObservers();
    }
  }

  /**
   * Constructor.
   * @param x - First value.
   * @param y - Second value.
   */
  public constructor( x?: number, y?: number ) {
    super();

    this._x = x || 0;
    this._y = y || 0;

    this.snapshot = undefined;
  }

  /**
   * Set the values.
   * @param x - First value.
   * @param y - Second value.
   * @returns A reference to itself.
   */
  public set( x: number, y: number ): Vector2 {
    // Only call observers if something changed.
    if ( this._x !== x || this._y !== y ) {
      this._x = x;
      this._y = y;
      this.notifyObservers();
    }
    return this;
  }

  /**
   * Set the values without notifying observers.
   * @param x - First value.
   * @param y - Second value.
   * @returns A reference to itself.
   */
  public setSilent( x: number, y: number ): Vector2 {
    this._x = x;
    this._y = y;
    return this;
  }

  /**
   * Set the values from the mouse or touch position of an event.
   * @param event - The event to use.
   * @returns A reference to itself.
   */
  public setFromEvent( event: any ): Vector2 {
    if ( event.clientX !== undefined && event.clientY !== undefined ) {
      this.set( event.clientX, event.clientY );
      return this;
    } else if (
      event.touches && event.touches[ 0 ] && event.touches[ 0 ].clientX &&
      event.touches[ 0 ].clientY
    ) {
      this.set( event.touches[ 0 ].clientX, event.touches[ 0 ].clientY );
      return this;
    } else {
      return this;
    }
  }

  /**
   * Set the values from the delta values of a scroll event.
   * @param event - The event to use.
   * @returns A reference to itself.
   */
  public setFromScrollEvent( event: any ): Vector2 {
    const delta = new Vector2();

    if ( event.deltaX !== undefined ) {
      delta.x = event.deltaX;
    }

    if ( event.deltaY !== undefined ) {
      delta.y = event.deltaY;
    }

    this.copy( delta );
    return this;
  }

  /**
   * Set the values from the mouse or touch position of an event relative to the events target.
   * @param event - The event to use.
   * @returns A reference to itself.
   */
  public setFromEventRelative( event: any ): Vector2 {
    if ( event.offsetX !== undefined && event.offsetY !== undefined ) {
      this.set( event.offsetX, event.offsetY );
      return this;
    } else if (
      event.targetTouches && event.targetTouches[ 0 ] && event.targetTouches[ 0 ].pageX &&
      event.targetTouches[ 0 ].pageY
    ) {
      const rect = event.target.getBoundingClientRect();
      const x = event.targetTouches[ 0 ].pageX - rect.left;
      const y = event.targetTouches[ 0 ].pageY - rect.top;
      this.set( x, y );
      return this;
    } else {
      return this;
    }
  }

  /**
   * Set from the values of another vector.
   * @param v - Another vector.
   * @returns A reference to itself.
   */
  public copy( v: Vector2 ): Vector2 {
    this.set( v.x, v.y );
    return this;
  }

  /**
   * Create a new vector with the same values.
   * @returns A new vector.
   */
  public clone(): Vector2 {
    return new Vector2( this.x, this.y );
  }

  /**
   * Test equality of values for two vectors.
   * @param v - Another Vector.
   * @returns Whether vectors are equal.
   */
  public equals( v: Vector2 ): boolean {
    return ( ( this.x === v.x ) && ( this.y === v.y ) );
  }

  /**
   * Test whether the difference between two vectors is smaller than a given delta.
   * If no delta is passed the epsilon value is used.
   * @param v - Another Vector.
   * @param delta - The maximum difference.
   * @returns The result of the test.
   */
  public closeTo( v: Vector2, delta?: number ): boolean {
    return (
      MathHelper.closeTo( this.x, v.x, delta ) &&
      MathHelper.closeTo( this.y, v.y, delta )
    );
  }

  /**
   * Add another vector.
   * @param v - Another vector.
   * @returns A reference to itself.
   */
  public add( v: Vector2 ): Vector2 {
    this.set( this.x + v.x, this.y + v.y );
    return this;
  }

  /**
   * Subtract another vector.
   * @param v - Another vector.
   * @returns A reference to itself.
   */
  public sub( v: Vector2 ): Vector2 {
    this.set( this.x - v.x, this.y - v.y );
    return this;
  }

  /**
   * Mutiply with another vector elementwise.
   * @param v - Another vector.
   * @returns A reference to itself.
   */
  public multiply( v: Vector2 ): Vector2 {
    this.set( this.x * v.x, this.y * v.y );
    return this;
  }

  /**
   * Divide with another vector elementwise.
   * @param v - Another vector.
   * @returns A reference to itself.
   */
  public divide( v: Vector2 ): Vector2 {
    this.set( this.x / v.x, this.y / v.y );
    return this;
  }

  /**
   * Add a single value to all vector elements.
   * @param s - A single value.
   * @returns A reference to itself.
   */
  public addScalar( s: number ): Vector2 {
    this.set( this.x + s, this.y + s );
    return this;
  }

  /**
   * Multiply all vector elements with a single value.
   * @param s - A single value.
   * @returns A reference to itself.
   */
  public multiplyScalar( s: number ): Vector2 {
    this.set( this.x * s, this.y * s );
    return this;
  }

  /**
   * Calculate the modulo of all vector elements with a single value.
   * @param s - A single value.
   * @returns A reference to itself.
   */
  public modulo( s: number ): Vector2 {
    this.set( this.x % s, this.y % s );
    return this;
  }

  /**
   * Transform vector with a matrix.
   * @param m - A matrix.
   * @returns A reference to itself.
   */
  public transform( m: Matrix3 ): Vector2 {
    const a = m.elements;
    const x = a[0] * this.x + a[1] * this.y + a[2];
    const y = a[3] * this.x + a[4] * this.y + a[5];
    const w = a[6] * this.x + a[7] * this.y + a[8];
    this.set( x / w, y / w );
    return this;
  }

  /**
   * Set to the elementwise minimum of two vectors.
   * @param v - Another vector to compare with.
   * @returns A reference to itself.
   */
  public min( v: Vector2 ): Vector2 {
    this.set( Math.min( this.x, v.x ), Math.min( this.y, v.y ) );
    return this;
  }

  /**
   * Set to the elementwise maximum of two vectors.
   * @param v - Another vector to compare with.
   * @returns A reference to itself.
   */
  public max( v: Vector2 ): Vector2 {
    this.set( Math.max( this.x, v.x ), Math.max( this.y, v.y ) );
    return this;
  }

  /**
   * Set to the elementwise absolute values of itself.
   * @returns A reference to itself.
   */
  public abs(): Vector2 {
    this.set( Math.abs( this.x ), Math.abs( this.y ) );
    return this;
  }

  /**
   * Round vector elementwise.
   * @param precision - The number of decimal places to round to. Optional.
   * @returns A reference to itself.
   */
  public round( precision?: number ): Vector2 {
    if ( precision ) {
      const factor = Math.pow( 10, precision );
      const x = Math.round( ( this.x + Number.EPSILON ) * factor ) / factor;
      const y = Math.round( ( this.y + Number.EPSILON ) * factor ) / factor;
      this.set( x, y );
    } else {
      this.set( Math.round( this.x ), Math.round( this.y ) );
    }
    return this;
  }

  /**
   * Floor vector elementwise.
   * @returns A reference to itself.
   */
  public floor(): Vector2 {
    this.set( Math.floor( this.x ), Math.floor( this.y ) );
    return this;
  }

  /**
   * Ceil vector elementwise.
   * @returns A reference to itself.
   */
  public ceil(): Vector2 {
    this.set( Math.ceil( this.x ), Math.ceil( this.y ) );
    return this;
  }

  /**
   * Confine point to nearest position inside box.
   * @param b - The bounding box.
   * @returns A reference to itself.
   */
  public clampInBox( b: Box2 ): Vector2 {
    this.min( b.max );
    this.max( b.min );
    return this;
  }

  /**
   * Get the length of the vector.
   * @returns The length.
   */
  public length(): number {
    return Math.sqrt( this.x * this.x + this.y * this.y );
  }

  /**
   * Normalize vector to length 1.
   * @returns A reference to itself.
   */
  public normalize(): Vector2 {
    const length = this.length();
    if ( length !== 0 ) {
      this.multiplyScalar( 1 / length );
    }
    return this;
  }

  /**
   * Set vector to a specific length.
   * @param l - The intended length.
   * @returns A reference to itself.
   */
  public setLength( l: number ): Vector2 {
    const oldLength = this.length();
    if ( oldLength !== 0 ) {
      this.multiplyScalar( l / oldLength );
    }
    return this;
  }

  /**
   * Get the distance to another vector.
   * @param v - Another vector.
   * @returns The distance to the other vector.
   */
  public distanceTo( v: Vector2 ): number {
    return Math.sqrt( Math.pow( this.x - v.x, 2 ) + Math.pow( this.y - v.y, 2 ) );
  }

  /**
   * Get the angle to the x-axis.
   * @returns The angle.
   */
  public angle(): Angle {
    let angle = Math.atan2( this.y, this.x );
    if ( angle < 0 ) {
      angle += 2 * Math.PI;
    }
    return new Angle( angle );
  }

  /**
   * Get the dot product with another vector.
   * @param v - Another vector.
   * @returns The dot product with the other vector.
   */
  public dot( v: Vector2 ): number {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * Get the cross product with another vector.
   * @param v - Another vector.
   * @returns The cross product with the other vector.
   */
  public cross( v: Vector2 ): number {
    return this.x * v.y - this.y * v.x;
  }

  /**
   * Save an internal snapshot of itself.
   * @returns A reference to itself.
   */
  public snap(): Vector2 {
    this.snapshot = this.clone();
    return this;
  }

  /**
   * Set the vector by applying a drag vector to the last saved snapshot.
   * @param v - The drag vector.
   * @returns A reference to itself.
   */
  public drag( v: Vector2 ): Vector2 {
    if ( this.snapshot !== undefined ) {
      this.copy( this.snapshot.clone().add( v ) );
    }
    return this;
  }

  /**
   * Create a new version of the vector projected on a line.
   * @param l - The line.
   * @returns A projected vector.
   */
  public projectOnLine( l: Line2 ): Vector2 {
    const support = this.clone().sub( l.start );
    const direction = l.end.clone().sub( l.start );
    const directionN = direction.clone().normalize();
    const d = support.dot( directionN );

    return directionN.clone().multiplyScalar( d ).add( l.start );
  }

  /**
   * Create a new version of the vector projected on a line segment.
   * @param l - The line.
   * @returns A projected vector or null if projection not possible.
   */
  public projectOnLineSegment( l: Line2 ): Vector2 | null {
    const support = this.clone().sub( l.start );
    const direction = l.end.clone().sub( l.start );
    const directionN = direction.clone().normalize();
    const d = support.dot( directionN );

    // Check if the result of the projection would lie between the endpoints of the line segment.
    if ( d >= 0 && d <= direction.length() ) {
      return directionN.clone().multiplyScalar( d ).add( l.start );
    } else {
      // Projection not possible because the projected point would not lie on the line segment.
      return null;
    }
  }

  /**
   * Create a new version of the vector perpendicular to it.
   * @returns A perpendicular vector.
   */
  public perpendicular(): Vector2 {
    return new Vector2( this.y, -this.x );
  }
}
