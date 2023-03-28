/**
 * Helper functions for the math library.
 */
export abstract class MathHelper {
  /**
   * Limit a value by lower and upper bounds.
   * @param value - The input value.
   * @param min - The lower limit.
   * @param max - The upper limit.
   * @returns The output value.
   */
  public static clamp( value: number, min: number, max: number ): number {
    return Math.max( min, Math.min( max, value ) );
  }

  /**
   * Linear interpolation between two values.
   * @param x - The start value.
   * @param y - The end value.
   * @param t - The interpolation rate from 0 to 1.
   * @returns The interpolated value.
   */
  public static lerp( x: number, y: number, t: number ): number {
    return ( 1 - t ) * x + t * y;
  }

  /**
   * Test whether the difference between two numbers is smaller than a given delta.
   * If no delta is passed the epsilon value is used.
   * @param x - The first number.
   * @param y - The second number.
   * @param delta - The maximum difference.
   * @returns The result of the test.
   */
  public static closeTo( x: number, y: number, delta?: number ): boolean {
    const epsilon = 2.220446049250313e-16;

    const d = ( delta !== undefined ) ? delta : epsilon;
    return Math.abs( x - y ) < d;
  }

  /**
   * Round a number with given precision.
   * @param value - The number to round.
   * @param precision - The number of decimal places to round to.
   * @returns The rounded value.
   */
  public static precisionRound( value: number, precision: number ): number {
    const factor = Math.pow( 10, precision );
    const roundedValue = Math.round( ( value + Number.EPSILON ) * factor ) / factor;
    return roundedValue;
  }
}
