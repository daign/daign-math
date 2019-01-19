import {expect} from 'chai';
import * as sinon from 'sinon';

import {Box2} from './box2';
import {Line2} from './line2';
import {Matrix3} from './matrix3';
import {Vector2} from './vector2';

describe( 'Vector2', () => {
  describe( 'getter x', () => {
    it( 'should get x', () => {
      // arrange
      const v = new Vector2( 1, 0 );

      // act and assert
      expect( v.x ).to.equal( 1 );
    } );
  } );

  describe( 'setter x', () => {
    it( 'should set x', () => {
      // arrange
      const v = new Vector2();

      // act
      v.x = 1;

      // assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const v = new Vector2();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.x = 1;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const v = new Vector2( 1, 0 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.x = 1;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter y', () => {
    it( 'should get y', () => {
      // arrange
      const v = new Vector2( 0, 1 );

      // act and assert
      expect( v.y ).to.equal( 1 );
    } );
  } );

  describe( 'setter y', () => {
    it( 'should set y', () => {
      // arrange
      const v = new Vector2();

      // act
      v.y = 1;

      // assert
      expect( v.y ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const v = new Vector2();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.y = 1;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const v = new Vector2( 0, 1 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.y = 1;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', () => {
    it( 'should set x and y properties', () => {
      // act
      const v = new Vector2( 1, 2 );

      // assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should set zero values if uninitialised', () => {
      // act
      const v = new Vector2();

      // assert
      expect( v.x ).to.equal( 0 );
      expect( v.y ).to.equal( 0 );
    } );
  } );

  describe( 'set', () => {
    it( 'should set x and y properties', () => {
      // arrange
      const v = new Vector2();

      // act
      v.set( 1, 2 );

      // assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const v = new Vector2();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.set( 1, 2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.set( 1, 2 );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setSilent', () => {
    it( 'should set x and y properties', () => {
      // arrange
      const v = new Vector2();

      // act
      v.setSilent( 1, 2 );

      // assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should not call notifyObservers', () => {
      // arrange
      const v = new Vector2();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.setSilent( 1, 2 );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'copy', () => {
    it( 'should copy x and y properties', () => {
      // arrange
      const v1 = new Vector2();
      const v2 = new Vector2( 1, 2 );

      // act
      v1.copy( v2 );

      // assert
      expect( v1.x ).to.equal( 1 );
      expect( v1.y ).to.equal( 2 );
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector2();
      const v2 = new Vector2( 1, 2 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.copy( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'equals', () => {
    it( 'should return true if values equal', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 1, 2 );

      // act
      const result = v1.equals( v2 );

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 1, 3 );

      // act
      const result = v1.equals( v2 );

      // assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'transform', () => {
    it( 'should return transformed vector', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 1, 2 );
      const m = new Matrix3();
      m.set( 1, 0, 0, 0, 1, 0, 0, 0, 1 );

      // act
      const result = v1.transform( m );

      // assert
      expect( result.equals( v2 ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v = new Vector2();
      const m = new Matrix3();
      m.set( 1, 0, 0, 0, 1, 0, 0, 0, 1 );
      const spy = sinon.spy( v, 'set' );

      // act
      v.transform( m );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clampInBox', () => {
    it( 'should make vector smaller if too big', () => {
      // arrange
      const v = new Vector2( 8, 9 );
      const min = new Vector2( -1, -2 );
      const max = new Vector2( 5, 4 );
      const b = new Box2( min, max );

      // act
      v.clampInBox( b );

      // assert
      expect( v.equals( max ) ).to.be.true;
    } );

    it( 'should make vector bigger if too small', () => {
      // arrange
      const v = new Vector2( -4, -5 );
      const min = new Vector2( -1, -2 );
      const max = new Vector2( 5, 4 );
      const b = new Box2( min, max );

      // act
      v.clampInBox( b );

      // assert
      expect( v.equals( min ) ).to.be.true;
    } );

    it( 'should not change vector that is inside box', () => {
      // arrange
      const v = new Vector2( 2, 3 );
      const vCopy = v.clone();
      const min = new Vector2( -1, -2 );
      const max = new Vector2( 5, 4 );
      const b = new Box2( min, max );

      // act
      v.clampInBox( b );

      // assert
      expect( v.equals( vCopy ) ).to.be.true;
    } );
  } );

  describe( 'length', () => {
    it( 'should get length', () => {
      // arrange
      const v = new Vector2( 3, 4 );

      // act
      const result = v.length();

      // assert
      expect( result ).to.be.closeTo( 5, 0.001 );
    } );
  } );

  describe( 'normalize', () => {
    it( 'should set vector to length 1', () => {
      // arrange
      const v = new Vector2( 1, 2 );

      // act
      v.normalize();

      // assert
      expect( v.length() ).to.be.closeTo( 1, 0.001 );
    } );
  } );

  describe( 'setLength', () => {
    it( 'should set vector to length', () => {
      // arrange
      const v = new Vector2( 1, 2 );

      // act
      v.setLength( 12 );

      // assert
      expect( v.length() ).to.be.closeTo( 12, 0.001 );
    } );
  } );

  describe( 'distanceTo', () => {
    it( 'should get the distance', () => {
      // arrange
      const v1 = new Vector2( 1, 1 );
      const v2 = new Vector2( 5, 4 );

      // act
      const result = v1.distanceTo( v2 );

      // assert
      expect( result ).to.be.closeTo( 5, 0.001 );
    } );
  } );

  describe( 'angle', () => {
    it( 'should get 0 for vector 1, 0', () => {
      // arrange
      const v = new Vector2( 1, 0 );

      // act
      const result = v.angle();

      // assert
      expect( result.radians ).to.be.closeTo( 0, 0.001 );
    } );

    it( 'should get pi/2 for vector 0, 1', () => {
      // arrange
      const v = new Vector2( 0, 1 );

      // act
      const result = v.angle();

      // assert
      expect( result.radians ).to.be.closeTo( Math.PI / 2, 0.001 );
    } );

    it( 'should get pi for vector -1, 0', () => {
      // arrange
      const v = new Vector2( -1, 0 );

      // act
      const result = v.angle();

      // assert
      expect( result.radians ).to.be.closeTo( Math.PI, 0.001 );
    } );

    it( 'should get 1.5*pi for vector 0, -1', () => {
      // arrange
      const v = new Vector2( 0, -1 );

      // act
      const result = v.angle();

      // assert
      expect( result.radians ).to.be.closeTo( Math.PI * 1.5, 0.001 );
    } );
  } );

  describe( 'projectOnLine', () => {
    it( 'should project on line', () => {
      // arrange
      const v = new Vector2( 1, 5 );
      const l1 = new Vector2( 0, 0 );
      const l2 = new Vector2( 6, 4 );
      const l = new Line2( l1, l2 );

      // act
      const result = v.projectOnLine( l );

      // assert
      expect( result.x ).to.be.closeTo( 3, 0.001 );
      expect( result.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should project on line outside of line segment', () => {
      // arrange
      const v = new Vector2( 4, 7 );
      const l1 = new Vector2( 0, 0 );
      const l2 = new Vector2( 3, 2 );
      const l = new Line2( l1, l2 );

      // act
      const result = v.projectOnLine( l );

      // assert
      expect( result.x ).to.be.closeTo( 6, 0.001 );
      expect( result.y ).to.be.closeTo( 4, 0.001 );
    } );
  } );

  describe( 'projectOnLineSegment', () => {
    it( 'should project on line', () => {
      // arrange
      const v = new Vector2( 1, 5 );
      const l1 = new Vector2( 0, 0 );
      const l2 = new Vector2( 6, 4 );
      const l = new Line2( l1, l2 );

      // act
      const result = v.projectOnLineSegment( l );

      // assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should not project on line outside of line segment', () => {
      // arrange
      const v = new Vector2( 4, 7 );
      const l1 = new Vector2( 0, 0 );
      const l2 = new Vector2( 3, 2 );
      const l = new Line2( l1, l2 );

      // act
      const result = v.projectOnLineSegment( l );

      // assert
      expect( result ).to.be.null;
    } );
  } );
} );
