import {Line2} from './line2';
import {Observable} from './observable';
import {Vector2} from './vector2';
import {Vector3} from './vector3';

/**
 * 2D triangle
 */
export class Triangle2 extends Observable {
  private _a: Vector2;
  private _b: Vector2;
  private _c: Vector2;

  public get a(): Vector2 {
      return this._a;
  }

  public get b(): Vector2 {
      return this._b;
  }

  public get c(): Vector2 {
      return this._c;
  }

  /**
   * Constructor
   * @param a First point
   * @param b Second point
   * @param c Third point
   */
  constructor( a?: Vector2, b?: Vector2, c?: Vector2 ) {
    super();

    // passed points are used directly, not cloned
    this._a = a || new Vector2();
    this._b = b || new Vector2();
    this._c = c || new Vector2();

    // notify observers when one of the points has changes
    const callback = (): void => {
      this.notifyObservers();
    };
    this._a.subscribeToChanges( callback );
    this._b.subscribeToChanges( callback );
    this._c.subscribeToChanges( callback );
  }

  /**
   * Set from the values of another triangle
   * @param t Another triangle
   * @returns A reference to itself
   */
  public copy( t: Triangle2 ): Triangle2 {
    this.a.copy( t.a );
    this.b.copy( t.b );
    this.c.copy( t.c );
    return this;
  }

  /**
   * Create a new trianlge with the same values
   * @returns A new triangle
   */
  public clone(): Triangle2 {
    return new Triangle2( this.a.clone(), this.b.clone(), this.c.clone() );
  }

  /**
   * Test equality of values for two triangles
   * @param t Another triangle
   * @returns Whether triangles are equal
   */
  public equals( t: Triangle2 ): boolean {
		return this.a.equals( t.a ) && this.b.equals( t.b ) && this.c.equals( t.c );
  }

  /**
   * Calculates the barycentric coordinates for a point relative to the triangle.
   * Based on: https://github.com/mrdoob/three.js/blob/dev/src/math/Triangle.js
   * @param p The point
   * @returns 3D vector with barycentric coordinates or null if triangle is collinear
   */
  public getBarycoord( p: Vector2 ): Vector3 | null {
    const v0 = this.b.clone().sub( this.a );
    const v1 = this.c.clone().sub( this.a );
    const v2 = p.clone().sub( this.a );

    const dot00 = v0.dot( v0 );
    const dot01 = v0.dot( v1 );
    const dot02 = v0.dot( v2 );
    const dot11 = v1.dot( v1 );
    const dot12 = v1.dot( v2 );

    var denom = ( dot00 * dot11 - dot01 * dot01 );

    // collinear or singular triangle
		if ( denom === 0 ) {
				return null;
    }

    const invDenom = 1 / denom;
    const u = ( dot11 * dot02 - dot01 * dot12 ) * invDenom;
    const v = ( dot00 * dot12 - dot01 * dot02 ) * invDenom;

    return new Vector3( 1 - u - v, v, u );
  }

  /**
   * Test whether a point is contained in the triangle including the border
   * @param p The point
   * @returns Whether point is contained in triangle or null if triangle is collinear
   */
  public containsPoint( p: Vector2 ): boolean | null {
    const barycoord = this.getBarycoord( p );
    if ( barycoord !== null ) {
      return ( barycoord.x >= 0 ) && ( barycoord.y >= 0 ) && ( ( barycoord.x + barycoord.y ) <= 1 );
    }
    return null;
  }

  /**
   * Get the circumcenter point of the triangle
   * @returns The circumcenter point or null if triangle is collinear
   */
  public getCircumcenter(): Vector2 | null {
    const side1 = this.b.clone().sub( this.a );
    const side2 = this.c.clone().sub( this.a );
    const midpoint1 = side1.clone().multiplyScalar( 0.5 ).add( this.a );
    const midpoint2 = side2.clone().multiplyScalar( 0.5 ).add( this.a );
    const line1 = new Line2( midpoint1, side1.perpendicular().add( midpoint1 ) );
    const line2 = new Line2( midpoint2, side2.perpendicular().add( midpoint2 ) );

    return line1.getIntersection( line2 );
  }
}
