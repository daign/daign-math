import {Observable} from './observable';

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
  constructor() {
    super();

    this._elements = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
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
    const m = new Matrix3();
    m.set(
      e[ 0 ], e[ 1 ], e[ 2 ],
      e[ 3 ], e[ 4 ], e[ 5 ],
      e[ 6 ], e[ 7 ], e[ 8 ]
    );
    return m;
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
}
