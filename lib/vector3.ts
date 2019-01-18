import {Observable} from './observable';

/**
 * 3D vector
 */
export class Vector3 extends Observable {
  private _x: number;
  private _y: number;
  private _z: number;

  public get x(): number {
      return this._x;
  }

  public set x( value: number ) {
    // only call observers if something changed
    if ( this._x !== value ) {
      this._x = value;
      this.notifyObservers();
    }
  }

  public get y(): number {
      return this._y;
  }

  public set y( value: number ) {
    // only call observers if something changed
    if ( this._y !== value ) {
      this._y = value;
      this.notifyObservers();
    }
  }

  public get z(): number {
      return this._z;
  }

  public set z( value: number ) {
    // only call observers if something changed
    if ( this._z !== value ) {
      this._z = value;
      this.notifyObservers();
    }
  }

  /**
   * Constructor
   * @param x First Value
   * @param y Second value
   * @param z Third value
   */
  constructor( x?: number, y?: number, z?: number ) {
    super();

    this._x = x || 0;
    this._y = y || 0;
    this._z = z || 0;
  }

  /**
   * Set the values
   * @param x First Value
   * @param y Second value
   * @param z Third value
   * @returns A reference to itself
   */
  public set( x: number, y: number, z: number ): Vector3 {
    // only call observers if something changed
    if ( this._x !== x || this._y !== y || this._z !== z ) {
      this._x = x;
      this._y = y;
      this._z = z;
      this.notifyObservers();
    }
    return this;
  }

  /**
   * Set the values without notifying observers
   * @param x First value
   * @param y Second value
   * @param z Third value
   * @returns A reference to itself
   */
  public setSilent( x: number, y: number, z: number ): Vector3 {
    this._x = x;
    this._y = y;
    this._z = z;
    return this;
  }

  /**
   * Set from the values of another vector
   * @param v Another Vector
   * @returns A reference to itself
   */
  public copy( v: Vector3 ): Vector3 {
    this.set( v.x, v.y, v.z );
    return this;
  }

  /**
   * Create a new vector with the same values
   * @returns A new vector
   */
  public clone(): Vector3 {
    return new Vector3( this.x, this.y, this.z );
  }

  /**
   * Test equality of values for two vectors
   * @param v Another Vector
   * @returns Whether vectors are equal
   */
  public equals( v: Vector3 ): boolean {
      return ( ( this.x === v.x ) && ( this.y === v.y ) && ( this.z === v.z ));
  }

  /**
   * Add another vector
   * @param v Another Vector
   * @returns A reference to itself
   */
  public add( v: Vector3 ): Vector3 {
    this.set( this.x + v.x, this.y + v.y, this.z + v.z );
    return this;
  }

  /**
   * Subtract another vector
   * @param v Another Vector
   * @returns A reference to itself
   */
  public sub( v: Vector3 ): Vector3 {
    this.set( this.x - v.x, this.y - v.y, this.z - v.z );
    return this;
  }

  /**
   * Mutiply with another vector elementwise
   * @param v Another Vector
   * @returns A reference to itself
   */
  public multiply( v: Vector3 ): Vector3 {
    this.set( this.x * v.x, this.y * v.y, this.z = v.z );
    return this;
  }

  /**
   * Divide with another vector elementwise
   * @param v Another Vector
   * @returns A reference to itself
   */
  public divide( v: Vector3 ): Vector3 {
    this.set( this.x / v.x, this.y / v.y, this.z / v.z );
    return this;
  }

  /**
   * Add a single value to all vector elements
   * @param s A single value
   * @returns A reference to itself
   */
  public addScalar( s: number ): Vector3 {
    this.set( this.x + s, this.y + s, this.z + s );
    return this;
  }

  /**
   * Multiply all vector elements with a single value
   * @param s A single value
   * @returns A reference to itself
   */
  public multiplyScalar( s: number ): Vector3 {
    this.set( this.x * s, this.y * s, this.z * s );
    return this;
  }

  /**
   * Set to the elementwise minimum of two vectors
   * @param v Another vector to compare with
   * @returns A reference to itself
   */
  public min( v: Vector3 ): Vector3 {
    this.set( Math.min( this.x, v.x ), Math.min( this.y, v.y ), Math.min( this.z, v.z ) );
    return this;
  }

  /**
   * Set to the elementwise maximum of two vectors
   * @param v Another vector to compare with
   * @returns A reference to itself
   */
  public max( v: Vector3 ): Vector3 {
    this.set( Math.max( this.x, v.x ), Math.max( this.y, v.y ), Math.max( this.z, v.z ) );
    return this;
  }
}
