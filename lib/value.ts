import { Vector1 } from './vector1';

/**
 * Implementation for the 1D vector class of single numeric values.
 */
export class Value extends Vector1<Value> {
  /**
   * Constructor.
   * @param x - The x value.
   */
  public constructor( x?: number ) {
    super( x );
  }

  /**
   * Overwritten method to allow method chaining with base class methods.
   * @returns A reference to itself.
   */
  protected getThis(): Value {
    return this;
  }

  /**
   * Create a new value object with the same value.
   * @returns A new value object.
   */
  public clone(): Value {
    return new Value( this.x );
  }
}
