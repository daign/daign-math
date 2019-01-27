import {Observable} from '@daign/observable';

import {Angle} from './angle';
import {Vector2} from './vector2';

/**
 * 3x3 Matrix
 */
export class Matrix3 extends Observable {
  private _elements: number[];

  public get elements(): number[] {
      return this._elements;
  }

  /**
   * Constructor
   */
  constructor(
    a11?: number, a12?: number, a13?: number,
    a21?: number, a22?: number, a23?: number,
    a31?: number, a32?: number, a33?: number
  ) {
    super();

    this._elements = [];
    const e = this._elements;
    e[ 0 ] = a11 || 0;
    e[ 1 ] = a12 || 0;
    e[ 2 ] = a13 || 0;
    e[ 3 ] = a21 || 0;
    e[ 4 ] = a22 || 0;
    e[ 5 ] = a23 || 0;
    e[ 6 ] = a31 || 0;
    e[ 7 ] = a32 || 0;
    e[ 8 ] = a33 || 0;
  }

  /**
   * Set the values
   * @returns A reference to itself
   */
  public set(
    a11: number, a12: number, a13: number,
    a21: number, a22: number, a23: number,
    a31: number, a32: number, a33: number
  ): Matrix3 {
    const e = this._elements;
    // only call observers if something changed
    if (
    e[ 0 ] !== a11 || e[ 1 ] !== a12 || e[ 2 ] !== a13 ||
    e[ 3 ] !== a21 || e[ 4 ] !== a22 || e[ 5 ] !== a23 ||
    e[ 6 ] !== a31 || e[ 7 ] !== a32 || e[ 8 ] !== a33
   ) {
      e[ 0 ] = a11;
      e[ 1 ] = a12;
      e[ 2 ] = a13;
      e[ 3 ] = a21;
      e[ 4 ] = a22;
      e[ 5 ] = a23;
      e[ 6 ] = a31;
      e[ 7 ] = a32;
      e[ 8 ] = a33;
      this.notifyObservers();
    }
    return this;
  }

  /**
   * Set from the values of another matrix
   * @param m Another matrix
   * @returns A reference to itself
   */
  public copy( m: Matrix3 ): Matrix3 {
    const e = m.elements;
    this.set(
      e[ 0 ], e[ 1 ], e[ 2 ],
      e[ 3 ], e[ 4 ], e[ 5 ],
      e[ 6 ], e[ 7 ], e[ 8 ]
    );
    return this;
  }

  /**
   * Create a new matrix with the same values
   * @returns A new matrix
   */
  public clone(): Matrix3 {
    const e = this.elements;
    return new Matrix3(
      e[ 0 ], e[ 1 ], e[ 2 ],
      e[ 3 ], e[ 4 ], e[ 5 ],
      e[ 6 ], e[ 7 ], e[ 8 ]
    );
  }

  /**
   * Test equality of values for two matrices
   * @param m Another matrix
   * @returns Whether matrices are equal
   */
  public equals( m: Matrix3 ): boolean {
      const e1 = this.elements;
      const e2 = m.elements;
      return (
        ( e1[ 0 ] === e2[ 0 ] ) && ( e1[ 1 ] === e2[ 1 ] ) && ( e1[ 2 ] === e2[ 2 ] ) &&
        ( e1[ 3 ] === e2[ 3 ] ) && ( e1[ 4 ] === e2[ 4 ] ) && ( e1[ 5 ] === e2[ 5 ] ) &&
        ( e1[ 6 ] === e2[ 6 ] ) && ( e1[ 7 ] === e2[ 7 ] ) && ( e1[ 8 ] === e2[ 8 ] )
    );
  }

  /**
   * Set the matrix to the result of the matrix multiplication m1 * m2
   * @param m1 The first matrix
   * @param m2 The second matrix
   * @returns A reference to itself
   */
  public matrixMultiplication( m1: Matrix3, m2: Matrix3 ): Matrix3 {
    const a = m1.elements;
    const b = m2.elements;

    this.set(
      a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
      a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
      a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
      a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
      a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
      a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
      a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
      a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
      a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
    );
    return this;
  }

  /**
   * Mutiply with another matrix
   * @param m The other matrix
   * @returns A reference to itself
   */
  public multiply( m: Matrix3 ): Matrix3 {
    this.matrixMultiplication( this, m );
    return this;
  }

  /**
   * Combine two transformation matrices.
   * The transformation of the other matrix m is second in the order of transformations.
   * @param m The other matrix
   * @returns A reference to itself
   */
  public transform( m: Matrix3 ): Matrix3 {
    this.matrixMultiplication( m, this );
    return this;
  }

  /**
   * Set the identity transformation matrix
   * @returns A reference to itself
   */
  public setIdentity(): Matrix3 {
    this.set(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    );
    return this;
  }

  /**
   * Set the translation transformation matrix
   * @param t The translation vector
   * @returns A reference to itself
   */
  public setTranslation( t: Vector2 ): Matrix3 {
    this.set(
      1, 0, t.x,
      0, 1, t.y,
      0, 0, 1
    );
    return this;
  }

  /**
   * Set the scaling transformation matrix
   * @param s The scaling vector
   * @returns A reference to itself
   */
  public setScaling( s: Vector2 ): Matrix3 {
    this.set(
      s.x, 0, 0,
      0, s.y, 0,
      0, 0, 1
    );
    return this;
  }

  /**
   * Set the rotation transformation matrix
   * @param a The rotation angle
   * @param p The center of rotation, or the origin of coordinates if missing
   * @returns A reference to itself
   */
  public setRotation( a: Angle, p?: Vector2 ): Matrix3 {
    if ( p === undefined ) {
      // rotation around the origin of coordinates
      const sin = Math.sin( a.radians );
      const cos = Math.cos( a.radians );

      this.set(
        cos, -sin, 0,
        sin, cos, 0,
        0, 0, 1
      );
    } else {
      // rotation around point p
      this.setTranslation( p.clone().multiplyScalar( -1 ) );
      this.applyRotation( a );
      this.applyTranslation( p );
    }

    return this;
  }

  /**
   * Apply a translation transformation to the matrix
   * @param t The translation vector
   * @returns A reference to itself
   */
  public applyTranslation( t: Vector2 ): Matrix3 {
    this.transform( new Matrix3().setTranslation( t ) );
    return this;
  }

  /**
   * Apply a scaling transformation to the matrix
   * @param s The scaling vector
   * @returns A reference to itself
   */
  public applyScaling( s: Vector2 ): Matrix3 {
    this.transform( new Matrix3().setScaling( s ) );
    return this;
  }

  /**
   * Apply a rotation transformation to the matrix
   * @param a The rotation angle
   * @param p The center of rotation, or the origin of coordinates if missing
   * @returns A reference to itself
   */
  public applyRotation( a: Angle, p?: Vector2 ): Matrix3 {
    this.transform( new Matrix3().setRotation( a, p ) );
    return this;
  }

  /**
   * Calculate the determinant of a matrix
   * @returns The determinant of the matrix
   */
  public determinant(): number {
    const el = this.elements;
    const a = el[ 0 ];
    const b = el[ 1 ];
    const c = el[ 2 ];
    const d = el[ 3 ];
    const e = el[ 4 ];
    const f = el[ 5 ];
    const g = el[ 6 ];
    const h = el[ 7 ];
    const i = el[ 8 ];

    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
  }
}
