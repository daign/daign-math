import {expect} from 'chai';
import * as sinon from 'sinon';

import {Triangle2} from './triangle2';
import {Vector2} from './vector2';

describe( 'Triangle2', () => {
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
