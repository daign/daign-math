import { Observable } from '@daign/observable';

/**
 * Angle.
 */
export class Angle extends Observable {
  private _radians: number;

  /**
   * Get angle in radians.
   * @returns The angle in radians.
   */
  public get radians(): number {
    return this._radians;
  }

  /**
   * Set angle in radians.
   * @param value - The value in radians.
   */
  public set radians( value: number ) {
    // Only call observers if something changed
    if ( this._radians !== value ) {
      this._radians = value;
      this.notifyObservers();
    }
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
    super();

    this._radians = radians || 0;
  }

  /**
   * Test equality of values for two angles.
   * @param v - Another angle.
   * @returns Whether angles are equal.
   */
  public equals( a: Angle ): boolean {
    return ( this.radians === a.radians );
  }
}
