import { Vector1 } from './vector1';

/**
 * Angle extension for the 1D vector class.
 */
export class Angle extends Vector1<Angle> {
  /**
   * Get angle in radians.
   * @returns The angle in radians.
   */
  public get radians(): number {
    return this.x;
  }

  /**
   * Set angle in radians.
   * @param value - The value in radians.
   */
  public set radians( value: number ) {
    this.x = value;
  }

  /**
   * Get angle in degrees.
   * @returns The angle in degrees.
   */
  public get degrees(): number {
    return ( this.radians * 180 / Math.PI );
  }

  /**
   * Set angle in degrees.
   * @param value - The value in degrees.
   */
  public set degrees( value: number ) {
    this.radians = value * Math.PI / 180;
  }

  /**
   * Constructor.
   * @param rad - The angle in radians.
   */
  public constructor( radians?: number ) {
    super( radians );
  }

  /**
   * Overwritten method to allow method chaining with base class methods.
   * @returns A reference to itself.
   */
  protected getThis(): Angle {
    return this;
  }

  /**
   * Setter for radians that allows method chaining.
   * @param value - The value in radians.
   * @returns A reference to itself.
   */
  public setRadians( value: number ): Angle {
    this.radians = value;
    return this;
  }

  /**
   * Setter for degrees that allows method chaining.
   * @param value - The value in degrees.
   * @returns A reference to itself.
   */
  public setDegrees( value: number ): Angle {
    this.degrees = value;
    return this;
  }

  /**
   * Create a new angle object with the same value.
   * @returns A new angle object.
   */
  public clone(): Angle {
    return new Angle( this.radians );
  }

  /**
   * Remove full 360 degree turns. Negative angles remain negative.
   * @returns A reference to itself.
   */
  public reduce(): Angle {
    this.radians = this.radians % ( 2 * Math.PI );
    return this;
  }

  /**
   * Normalize angle between 0 and 2 * Math.PI.
   * @returns A reference to itself.
   */
  public normalize(): Angle {
    let value = this.radians % ( 2 * Math.PI );
    value = ( 2 * Math.PI + value ) % ( 2 * Math.PI );

    this.radians = value;
    return this;
  }

  /**
   * Normalize angle between -Math.PI and Math.PI.
   * @returns A reference to itself.
   */
  public normalizeMinimumAbsolute(): Angle {
    let value = this.radians % ( 2 * Math.PI );
    value = ( 2 * Math.PI + value ) % ( 2 * Math.PI );

    if ( value > Math.PI ) {
      value -= 2 * Math.PI;
    }

    this.radians = value;
    return this;
  }

  /**
   * Round degree value of angle.
   * @param precision - The number of decimal places to round to. Optional.
   * @returns A reference to itself.
   */
  public roundDegrees( precision?: number ): Angle {
    if ( precision ) {
      const factor = Math.pow( 10, precision );
      this.degrees = Math.round( ( this.degrees + Number.EPSILON ) * factor ) / factor;
    } else {
      this.degrees = Math.round( this.degrees );
    }
    return this;
  }
}
