import { Observable } from '@daign/observable';

import { MathHelper } from './mathHelper';

/**
 * Abstract class for 1D vectors that implement the Observable pattern.
 */
export abstract class Vector1<T extends Vector1<T>> extends Observable {
  // Used for saving an older version of itself.
  public snapshot: T | undefined;

  private _x: number;

  protected abstract getThis(): T;

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
   * Constructor.
   * @param x - The x value.
   */
  public constructor( x?: number ) {
    super();
    this._x = x || 0;
    this.snapshot = undefined;
  }

  /**
   * Set the values without notifying observers.
   * @param x - The x value.
   * @returns A reference to itself.
   */
  public setSilent( x: number ): T {
    this._x = x;
    return this.getThis();
  }

  /**
   * Set from the value of another vector.
   * @param v - Another vector.
   * @returns A reference to itself.
   */
  public copy( v: T ): T {
    this.x = v.x;
    return this.getThis();
  }

  /**
   * Create a new vector with the same value.
   * @returns A new vector.
   */
  public abstract clone(): T;

  /**
   * Test equality of two vectors.
   * @param v - Another vector.
   * @returns Whether vectors are equal.
   */
  public equals( v: T ): boolean {
    return ( this.x === v.x );
  }

  /**
   * Test whether the difference between two values is smaller than a given delta.
   * If no delta is passed the epsilon value is used.
   * @param v - Another Value.
   * @param delta - The maximum difference.
   * @returns The result of the test.
   */
  public closeTo( v: T, delta?: number ): boolean {
    return MathHelper.closeTo( this.x, v.x, delta );
  }

  /**
   * Add another vector.
   * @param v - Another vector.
   * @returns A reference to itself.
   */
  public add( v: T ): T {
    this.x = this.x + v.x;
    return this.getThis();
  }

  /**
   * Subtract another vector.
   * @param v - Another vector.
   * @returns A reference to itself.
   */
  public sub( v: T ): T {
    this.x = this.x - v.x;
    return this.getThis();
  }

  /**
   * Multiply vector with a scalar.
   * @param s - A scalar.
   * @returns A reference to itself.
   */
  public multiplyScalar( s: number ): T {
    this.x = this.x * s;
    return this.getThis();
  }

  /**
   * Set to the absolute value of itself.
   * @returns A reference to itself.
   */
  public abs(): T {
    this.x = Math.abs( this.x );
    return this.getThis();
  }

  /**
   * Round the vector.
   * @param precision - The number of decimal places to round to. Optional.
   * @returns A reference to itself.
   */
  public round( precision?: number ): T {
    if ( precision ) {
      const factor = Math.pow( 10, precision );
      const x = Math.round( ( this.x + Number.EPSILON ) * factor ) / factor;
      this.x = x;
    } else {
      this.x = Math.round( this.x );
    }
    return this.getThis();
  }

  /**
   * Limit vector by lower and upper bounds.
   * @param min - The lower limit.
   * @param max - The upper limit.
   * @returns A reference to itself.
   */
  public clamp( min: number, max: number ): T {
    this.x = Math.max( min, Math.min( max, this.x ) );
    return this.getThis();
  }

  /**
   * Save an internal snapshot of itself.
   * @returns A reference to itself.
   */
  public snap(): T {
    this.snapshot = this.clone();
    return this.getThis();
  }

  /**
   * Set the vector by applying a drag value to the last saved snapshot.
   * @param v - The drag value.
   * @returns A reference to itself.
   */
  public drag( v: number ): T {
    if ( this.snapshot !== undefined ) {
      this.x = this.snapshot.x + v;
    }
    return this.getThis();
  }
}
