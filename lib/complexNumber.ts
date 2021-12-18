import { Observable } from '@daign/observable';

import { MathHelper } from './mathHelper';

/**
 * Complex number.
 */
export class ComplexNumber extends Observable {
  private _real: number;
  private _imaginary: number;

  /**
   * Get the real value.
   * @returns The real value.
   */
  public get real(): number {
    return this._real;
  }

  /**
   * Set the real value.
   * @param value - The numeric real value.
   */
  public set real( value: number ) {
    // Only call observers if something changed.
    if ( this._real !== value ) {
      this._real = value;
      this.notifyObservers();
    }
  }

  /**
   * Get the imaginary value.
   * @returns The imaginary value.
   */
  public get imaginary(): number {
    return this._imaginary;
  }

  /**
   * Set the imaginary value.
   * @param value - The numeric imaginary value.
   */
  public set imaginary( value: number ) {
    // Only call observers if something changed.
    if ( this._imaginary !== value ) {
      this._imaginary = value;
      this.notifyObservers();
    }
  }

  /**
   * Get the absolute value.
   * @returns The absolute value.
   */
  public get absolute(): number {
    return Math.sqrt( Math.pow( this.real, 2 ) + Math.pow( this.imaginary, 2 ) );
  }

  /**
   * Get the argument (or angle) value.
   * @returns The argument value.
   */
  public get argument(): number {
    return Math.atan2( this.imaginary, this.real );
  }

  /**
   * Constructor.
   * @param real - Real value.
   * @param imaginary - Imaginary value.
   */
  public constructor( real?: number, imaginary?: number ) {
    super();

    this._real = real || 0;
    this._imaginary = imaginary || 0;
  }

  /**
   * Set the values.
   * @param real - Real value.
   * @param imaginary - Imaginary value.
   * @returns A reference to itself.
   */
  public set( real: number, imaginary: number ): ComplexNumber {
    // Only call observers if something changed.
    if ( this._real !== real || this._imaginary !== imaginary ) {
      this._real = real;
      this._imaginary = imaginary;
      this.notifyObservers();
    }
    return this;
  }

  /**
   * Set the values without notifying observers.
   * @param real - Real value.
   * @param imaginary - Imaginary value.
   * @returns A reference to itself.
   */
  public setSilent( real: number, imaginary: number ): ComplexNumber {
    this._real = real;
    this._imaginary = imaginary;
    return this;
  }

  /**
   * Set from the values of another complex number.
   * @param c - Another complex number.
   * @returns A reference to itself.
   */
  public copy( c: ComplexNumber ): ComplexNumber {
    this.set( c.real, c.imaginary );
    return this;
  }

  /**
   * Create a new complex number with the same values.
   * @returns A new complex number.
   */
  public clone(): ComplexNumber {
    return new ComplexNumber( this.real, this.imaginary );
  }

  /**
   * Test equality of values for two complex numbers.
   * @param c - Another complex number.
   * @returns Whether complex numbers are equal.
   */
  public equals( c: ComplexNumber ): boolean {
    return ( ( this.real === c.real ) && ( this.imaginary === c.imaginary ) );
  }

  /**
   * Test whether the difference between two complex numbers is smaller than a given delta.
   * If no delta is passed the epsilon value is used.
   * @param c - Another complex number.
   * @param delta - The maximum difference.
   * @returns The result of the test.
   */
  public closeTo( c: ComplexNumber, delta?: number ): boolean {
    return (
      MathHelper.closeTo( this.real, c.real, delta ) &&
      MathHelper.closeTo( this.imaginary, c.imaginary, delta )
    );
  }

  /**
   * Add another complex number.
   * @param c - Another complex number.
   * @returns A reference to itself.
   */
  public add( c: ComplexNumber ): ComplexNumber {
    this.set( this.real + c.real, this.imaginary + c.imaginary );
    return this;
  }

  /**
   * Subtract another complex number.
   * @param c - Another complex number.
   * @returns A reference to itself.
   */
  public sub( c: ComplexNumber ): ComplexNumber {
    this.set( this.real - c.real, this.imaginary - c.imaginary );
    return this;
  }

  /**
   * Multiply with another complex number.
   * @param cn - Another complex number.
   * @returns A reference to itself.
   */
  public multiply( cn: ComplexNumber ): ComplexNumber {
    const a = this.real;
    const b = this.imaginary;
    const c = cn.real;
    const d = cn.imaginary;

    const real = a * c - b * d;
    const imaginary = b * c + a * d;

    this.set( real, imaginary );
    return this;
  }

  /**
   * Divide with another complex number.
   * @param cn - Another complex number.
   * @returns A reference to itself.
   */
  public divide( cn: ComplexNumber ): ComplexNumber {
    const a = this.real;
    const b = this.imaginary;
    const c = cn.real;
    const d = cn.imaginary;

    const real = ( a * c + b * d ) / ( Math.pow( c, 2 ) + Math.pow( d, 2 ) );
    const imaginary = ( b * c - a * d ) / ( Math.pow( c, 2 ) + Math.pow( d, 2 ) );

    this.set( real, imaginary );
    return this;
  }

  /**
   * Calculate the natural logarithm.
   * @returns A reference to itself.
   */
  public log(): ComplexNumber {
    const real = Math.log( this.absolute );
    const imaginary = this.argument;

    this.set( real, imaginary );
    return this;
  }

  /**
   * Calculate the arctangent.
   * @returns A reference to itself.
   */
  public atan(): ComplexNumber {
    const a = this.real;
    const b = this.imaginary;

    const x = 1 + 2 * b + b * b + a * a;

    const result = new ComplexNumber(
      ( 1 - b * b - a * a ) / x,
      ( 2 * a ) / x
    );
    result.log().multiply( new ComplexNumber( 0, -0.5 ) );

    this.copy( result );
    return this;
  }

  /**
   * Return the complex result from the square root of a real number.
   * @param value - The real number.
   * @returns The complex result.
   */
  public static fromSqrt( value: number ): ComplexNumber {
    const a = Math.sqrt( Math.abs( value ) );
    if ( value < 0 ) {
      return new ComplexNumber( 0, a );
    }

    return new ComplexNumber( a, 0 );
  }

  /**
   * Return the complex result from the arcsine of a real number.
   * @param value - The real number.
   * @returns The complex result.
   */
  public static fromAsin( value: number ): ComplexNumber {
    const a = new ComplexNumber( 0, -1 );
    const b = new ComplexNumber( 0, value );
    const c = ComplexNumber.fromSqrt( 1 - Math.pow( value, 2 ) );
    b.add( c );
    b.log();
    a.multiply( b );

    return a;
  }

  /**
   * Return the complex result from the arccosine of a real number.
   * @param value - The real number.
   * @returns The complex result.
   */
  public static fromAcos( value: number ): ComplexNumber {
    const a = new ComplexNumber( Math.PI / 2, 0 );
    const b = new ComplexNumber( 0, 1 );
    const c = new ComplexNumber( 0, value );
    const d = ComplexNumber.fromSqrt( 1 - Math.pow( value, 2 ) );
    c.add( d );
    c.log();
    b.multiply( c );
    a.add( b );

    return a;
  }
}
