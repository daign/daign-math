import {expect} from 'chai';
import * as sinon from 'sinon';

import {Triangle2} from '../lib/triangle2';
import {Vector2} from '../lib/vector2';

describe( 'Triangle2', () => {
  describe( 'getter a', () => {
    it( 'should get vector a', () => {
      // arrange
      const a = new Vector2( 1, 2 );
      const b = new Vector2( 3, 4 );
      const c = new Vector2( 3, 2 );
      const triangle = new Triangle2( a, b, c );

      // act and assert
      expect( triangle.a.equals( a ) ).to.be.true;
    } );
  } );

  describe( 'getter b', () => {
    it( 'should get vector b', () => {
      // arrange
      const a = new Vector2( 1, 2 );
      const b = new Vector2( 3, 4 );
      const c = new Vector2( 3, 2 );
      const triangle = new Triangle2( a, b, c );

      // act and assert
      expect( triangle.b.equals( b ) ).to.be.true;
    } );
  } );

  describe( 'getter c', () => {
    it( 'should get vector c', () => {
      // arrange
      const a = new Vector2( 1, 2 );
      const b = new Vector2( 3, 4 );
      const c = new Vector2( 3, 2 );
      const triangle = new Triangle2( a, b, c );

      // act and assert
      expect( triangle.c.equals( c ) ).to.be.true;
    } );
  } );

  describe( 'constructor', () => {
    it( 'should create with given points', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );

      // act
      const t = new Triangle2( p1, p2, p3 );

      // assert
      expect( t.a.equals( p1 ) ).to.be.true;
      expect( t.b.equals( p2 ) ).to.be.true;
      expect( t.c.equals( p3 ) ).to.be.true;
    } );

    it( 'should initialize with zero vectors if not specified', () => {
      // arrange
      const p = new Vector2( 0, 0 );

      // act
      const t = new Triangle2();

      // assert
      expect( t.a.equals( p ) ).to.be.true;
      expect( t.b.equals( p ) ).to.be.true;
      expect( t.c.equals( p ) ).to.be.true;
    } );

    it( 'should notify observers if first point changes', () => {
      // arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const p3 = new Vector2();
      const t = new Triangle2( p1, p2, p3 );
      const spy = sinon.spy( t as any, 'notifyObservers' );

      // act
      p1.set( 1, 2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should notify observers if second point changes', () => {
      // arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const p3 = new Vector2();
      const t = new Triangle2( p1, p2, p3 );
      const spy = sinon.spy( t as any, 'notifyObservers' );

      // act
      p2.set( 1, 2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should notify observers if third point changes', () => {
      // arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const p3 = new Vector2();
      const t = new Triangle2( p1, p2, p3 );
      const spy = sinon.spy( t as any, 'notifyObservers' );

      // act
      p3.set( 1, 2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'copy', () => {
    it( 'should copy values from other triangle', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t1 = new Triangle2();
      const t2 = new Triangle2( p1, p2, p3 );

      // act
      t1.copy( t2 );

      // assert
      expect( t1.a.equals( p1 ) ).to.be.true;
      expect( t1.b.equals( p2 ) ).to.be.true;
      expect( t1.c.equals( p3 ) ).to.be.true;
    } );

    it( 'should call observers three times', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t1 = new Triangle2();
      const t2 = new Triangle2( p1, p2, p3 );
      const spy = sinon.spy( t1 as any, 'notifyObservers' );

      // act
      t1.copy( t2 );

      // assert
      expect( spy.called ).to.be.true;
      expect( spy.callCount ).to.equal( 3 );
    } );

    it( 'should not call observers if copied vectors change', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t1 = new Triangle2();
      const t2 = new Triangle2( p1, p2, p3 );
      const spy = sinon.spy( t1 as any, 'notifyObservers' );

      // act
      t1.copy( t2 );
      spy.resetHistory();
      p1.set( 7, 8 );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', () => {
    it( 'should return an object with the same values', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t = new Triangle2( p1, p2, p3 );

      // act
      const result = t.clone();

      // assert
      expect( result.a.equals( p1 ) ).to.be.true;
      expect( result.b.equals( p2 ) ).to.be.true;
      expect( result.c.equals( p3 ) ).to.be.true;
    } );

    it( 'should not call observers when original triangle changes', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t = new Triangle2( p1, p2, p3 );
      const result = t.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // act
      t.a.x = 0;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', () => {
    it( 'should return true if values equal', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const t1 = new Triangle2( p1, p2, p3 );
      const t2 = new Triangle2( p1.clone(), p2.clone(), p3.clone() );

      // act
      const result = t1.equals( t2 );

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const p3 = new Vector2( 5, 6 );
      const p4 = new Vector2( 7, 8 );
      const t1 = new Triangle2( p1, p2, p3 );
      const t2 = new Triangle2( p1.clone(), p2.clone(), p4 );

      // act
      const result = t1.equals( t2 );

      // assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'getBarycoord', () => {
    it( 'should return the barycentric coordinates', () => {
      // arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 6, 1 ), new Vector2( 5, 5 ) );
      const p = new Vector2( 5, 4 );

      // act
      const result = t.getBarycoord( p );

      // assert
      expect( result!.x ).to.be.closeTo( 0.05, 0.001 );
      expect( result!.y ).to.be.closeTo( 0.75, 0.001 );
      expect( result!.z ).to.be.closeTo( 0.2, 0.001 );
    } );

    it( 'should return the barycentric coordinates for point outside of triangle', () => {
      // arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 6, 1 ), new Vector2( 5, 5 ) );
      const p = new Vector2( 2, 4 );

      // act
      const result = t.getBarycoord( p );

      // assert
      expect( result!.x ).to.be.closeTo( 0.65, 0.001 );
      expect( result!.y ).to.be.closeTo( 0.75, 0.001 );
      expect( result!.z ).to.be.closeTo( -0.4, 0.001 );
    } );

    it( 'should return null if triangle is collinear', () => {
      // arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 2, 1 ), new Vector2( 3, 1 ) );
      const p = new Vector2( 2, 4 );

      // act
      const result = t.getBarycoord( p );

      // assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'containsPoint', () => {
    it( 'should return true if point is inside of triangle', () => {
      // arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 6, 1 ), new Vector2( 5, 5 ) );
      const p = new Vector2( 5, 4 );

      // act
      const result = t.containsPoint( p );

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return true if point is on the edge of the triangle', () => {
      // arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 6, 1 ), new Vector2( 5, 5 ) );
      const p = new Vector2( 3, 3 );

      // act
      const result = t.containsPoint( p );

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if point is outside of triangle', () => {
      // arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 6, 1 ), new Vector2( 5, 5 ) );
      const p = new Vector2( 2, 4 );

      // act
      const result = t.containsPoint( p );

      // assert
      expect( result ).to.be.false;
    } );

    it( 'should return null if triangle is collinear', () => {
      // arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 2, 1 ), new Vector2( 3, 1 ) );
      const p = new Vector2( 2, 4 );

      // act
      const result = t.containsPoint( p );

      // assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'getCircumcenter', () => {
    it( 'should return the circumcenter of the triangle', () => {
      // arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 5, 1 ), new Vector2( 5, 5 ) );

      // act
      const result = t.getCircumcenter();

      // assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 3, 0.001 );
    } );

    it( 'should return null if triangle is collinear', () => {
      // arrange
      const t = new Triangle2( new Vector2( 1, 1 ), new Vector2( 2, 1 ), new Vector2( 3, 1 ) );

      // act
      const result = t.getCircumcenter();

      // assert
      expect( result ).to.be.null;
    } );
  } );
} );
