import { expect } from 'chai';
import * as sinon from 'sinon';

import { Triangle2, Vector2 } from '../lib';

describe( 'Triangle2', (): void => {
  describe( 'getter a', (): void => {
    it( 'should get vector a', (): void => {
      // Arrange
      const a = new Vector2( 1, 2 );
      const b = new Vector2( 3, 4 );
      const c = new Vector2( 3, 2 );
      const triangle = new Triangle2( a, b, c );

      // Act and assert
      expect( triangle.a.equals( a ) ).to.be.true;
    } );
  } );

  describe( 'getter b', (): void => {
    it( 'should get vector b', (): void => {
      // Arrange
      const a = new Vector2( 1, 2 );
      const b = new Vector2( 3, 4 );
      const c = new Vector2( 3, 2 );
      const triangle = new Triangle2( a, b, c );

      // Act and assert
      expect( triangle.b.equals( b ) ).to.be.true;
    } );
  } );

  describe( 'getter c', (): void => {
    it( 'should get vector c', (): void => {
      // Arrange
      const a = new Vector2( 1, 2 );
      const b = new Vector2( 3, 4 );
      const c = new Vector2( 3, 2 );
      const triangle = new Triangle2( a, b, c );

      // Act and assert
      expect( triangle.c.equals( c ) ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should create with given points', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );

      // Act
      const t = new Triangle2( p1, p2, p3 );

      // Assert
      expect( t.a.equals( p1 ) ).to.be.true;
      expect( t.b.equals( p2 ) ).to.be.true;
      expect( t.c.equals( p3 ) ).to.be.true;
    } );

    it( 'should initialize with zero vectors if not specified', (): void => {
      // Arrange
      const p = new Vector2( 0, 0 );

      // Act
      const t = new Triangle2();

      // Assert
      expect( t.a.equals( p ) ).to.be.true;
      expect( t.b.equals( p ) ).to.be.true;
      expect( t.c.equals( p ) ).to.be.true;
    } );

    it( 'should notify observers if first point changes', (): void => {
      // Arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const p3 = new Vector2();
      const t = new Triangle2( p1, p2, p3 );
      const spy = sinon.spy( t as any, 'notifyObservers' );

      // Act
      p1.set( 1, 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should notify observers if second point changes', (): void => {
      // Arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const p3 = new Vector2();
      const t = new Triangle2( p1, p2, p3 );
      const spy = sinon.spy( t as any, 'notifyObservers' );

      // Act
      p2.set( 1, 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should notify observers if third point changes', (): void => {
      // Arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const p3 = new Vector2();
      const t = new Triangle2( p1, p2, p3 );
      const spy = sinon.spy( t as any, 'notifyObservers' );

      // Act
      p3.set( 1, 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'copy', (): void => {
    it( 'should copy values from other triangle', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t1 = new Triangle2();
      const t2 = new Triangle2( p1, p2, p3 );

      // Act
      t1.copy( t2 );

      // Assert
      expect( t1.a.equals( p1 ) ).to.be.true;
      expect( t1.b.equals( p2 ) ).to.be.true;
      expect( t1.c.equals( p3 ) ).to.be.true;
    } );

    it( 'should call observers three times', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t1 = new Triangle2();
      const t2 = new Triangle2( p1, p2, p3 );
      const spy = sinon.spy( t1 as any, 'notifyObservers' );

      // Act
      t1.copy( t2 );

      // Assert
      expect( spy.called ).to.be.true;
      expect( spy.callCount ).to.equal( 3 );
    } );

    it( 'should not call observers if copied vectors change', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t1 = new Triangle2();
      const t2 = new Triangle2( p1, p2, p3 );
      const spy = sinon.spy( t1 as any, 'notifyObservers' );

      // Act
      t1.copy( t2 );
      spy.resetHistory();
      p1.set( 7, 8 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should return an object with the same values', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t = new Triangle2( p1, p2, p3 );

      // Act
      const result = t.clone();

      // Assert
      expect( result.a.equals( p1 ) ).to.be.true;
      expect( result.b.equals( p2 ) ).to.be.true;
      expect( result.c.equals( p3 ) ).to.be.true;
    } );

    it( 'should not call observers when original triangle changes', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t = new Triangle2( p1, p2, p3 );
      const result = t.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // Act
      t.a.x = 0;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', (): void => {
    it( 'should return true if values equal', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t1 = new Triangle2( p1, p2, p3 );
      const t2 = new Triangle2( p1.clone(), p2.clone(), p3.clone() );

      // Act
      const result = t1.equals( t2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const p4 = new Vector2( 7, 8 );
      const t1 = new Triangle2( p1, p2, p3 );
      const t2 = new Triangle2( p1.clone(), p2.clone(), p4 );

      // Act
      const result = t1.equals( t2 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'getBarycoord', (): void => {
    it( 'should return the barycentric coordinates', (): void => {
      // Arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 6, 1 ), new Vector2( 5, 5 ) );
      const p = new Vector2( 5, 4 );

      // Act
      const result = t.getBarycoord( p );

      // Assert
      expect( result!.x ).to.be.closeTo( 0.05, 0.001 );
      expect( result!.y ).to.be.closeTo( 0.75, 0.001 );
      expect( result!.z ).to.be.closeTo( 0.2, 0.001 );
    } );

    it( 'should return the barycentric coordinates for point outside of triangle', (): void => {
      // Arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 6, 1 ), new Vector2( 5, 5 ) );
      const p = new Vector2( 2, 4 );

      // Act
      const result = t.getBarycoord( p );

      // Assert
      expect( result!.x ).to.be.closeTo( 0.65, 0.001 );
      expect( result!.y ).to.be.closeTo( 0.75, 0.001 );
      expect( result!.z ).to.be.closeTo( -0.4, 0.001 );
    } );

    it( 'should return null if triangle is collinear', (): void => {
      // Arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 2, 1 ), new Vector2( 3, 1 ) );
      const p = new Vector2( 2, 4 );

      // Act
      const result = t.getBarycoord( p );

      // Assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'containsPoint', (): void => {
    it( 'should return true if point is inside of triangle', (): void => {
      // Arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 6, 1 ), new Vector2( 5, 5 ) );
      const p = new Vector2( 5, 4 );

      // Act
      const result = t.containsPoint( p );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true if point is on the edge of the triangle', (): void => {
      // Arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 6, 1 ), new Vector2( 5, 5 ) );
      const p = new Vector2( 3, 3 );

      // Act
      const result = t.containsPoint( p );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if point is outside of triangle', (): void => {
      // Arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 6, 1 ), new Vector2( 5, 5 ) );
      const p = new Vector2( 2, 4 );

      // Act
      const result = t.containsPoint( p );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return null if triangle is collinear', (): void => {
      // Arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 2, 1 ), new Vector2( 3, 1 ) );
      const p = new Vector2( 2, 4 );

      // Act
      const result = t.containsPoint( p );

      // Assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'getCircumcenter', (): void => {
    it( 'should return the circumcenter of the triangle', (): void => {
      // Arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 5, 1 ), new Vector2( 5, 5 ) );

      // Act
      const result = t.getCircumcenter();

      // Assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 3, 0.001 );
    } );

    it( 'should return null if triangle is collinear', (): void => {
      // Arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 2, 1 ), new Vector2( 3, 1 ) );

      // Act
      const result = t.getCircumcenter();

      // Assert
      expect( result ).to.be.null;
    } );
  } );
} );
