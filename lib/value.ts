import { Observable } from '@daign/observable';

/**
 * 1D vector that implements the Observable pattern.
 */
export class Value extends Observable {
  // Used for saving an older version of itself.
  public snapshot: Value | undefined;

  private _x: number;

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
  public setSilent( x: number ): Value {
    this._x = x;
    return this;
  }

  /**
   * Create a new value object with the same value.
   * @returns A new value object.
   */
  public clone(): Value {
    return new Value( this.x );
  }

  /**
   * Limit a value by lower and upper bounds.
   * @param min - The lower limit.
   * @param max - The upper limit.
   * @returns A reference to itself.
   */
  public clamp( min: number, max: number ): Value {
    this.x = Math.max( min, Math.min( max, this.x ) );
    return this;
  }

  /**
   * Save an internal snapshot of itself.
   * @returns A reference to itself.
   */
  public snap(): Value {
    this.snapshot = this.clone();
    return this;
  }

  /**
   * Set the value by applying a drag value to the last saved snapshot.
   * @param v - The drag value.
   * @returns A reference to itself.
   */
  public drag( v: number ): Value {
    if ( this.snapshot !== undefined ) {
      this.x = this.snapshot.x + v;
    }
    return this;
  }
}
