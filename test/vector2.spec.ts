import {expect} from 'chai';
import * as sinon from 'sinon';

import {MockEvent} from '@daign/mock-dom';
import {MockNode} from '@daign/mock-dom';

import {Box2} from '../lib/box2';
import {Line2} from '../lib/line2';
import {Matrix3} from '../lib/matrix3';
import {Vector2} from '../lib/vector2';

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

  describe( 'setFromEvent', () => {
    it( 'should set x and y properties from event', () => {
      // arrange
      const v = new Vector2();
      const event = new MockEvent().setClientPoint( 1, 2 );

      // act
      v.setFromEvent( event );

      // assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should call set when called with event', () => {
      // arrange
      const v = new Vector2();
      const event = new MockEvent().setClientPoint( 1, 2 );
      const spy = sinon.spy( v, 'set' );

      // act
      v.setFromEvent( event );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should set x and y properties from touch event', () => {
      // arrange
      const v = new Vector2();
      const touchEvent = new MockEvent().setClientPoint( 1, 2 );
      const event = new MockEvent().addTouchPoint( touchEvent );

      // act
      v.setFromEvent( event );

      // assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should call set when called with touch event', () => {
      // arrange
      const v = new Vector2();
      const touchEvent = new MockEvent().setClientPoint( 1, 2 );
      const event = new MockEvent().addTouchPoint( touchEvent );
      const spy = sinon.spy( v, 'set' );

      // act
      v.setFromEvent( event );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call set when passed event is missing coordinates', () => {
      // arrange
      const v = new Vector2();
      const event = new MockEvent();
      const spy = sinon.spy( v, 'set' );

      // act
      v.setFromEvent( event );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setFromEventRelative', () => {
    it( 'should set x and y properties from event', () => {
      // arrange
      const v = new Vector2();
      const event = new MockEvent().setOffsetPoint( 1, 2 );

      // act
      v.setFromEventRelative( event );

      // assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should call set when called with event', () => {
      // arrange
      const v = new Vector2();
      const event = new MockEvent().setOffsetPoint( 1, 2 );
      const spy = sinon.spy( v, 'set' );

      // act
      v.setFromEventRelative( event );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should set x and y properties from touch event and bounding client rect', () => {
      // arrange
      const v = new Vector2();
      const touchEvent = new MockEvent().setPagePoint( 5, 7 );
      const target = new MockNode().setBoundingClientRect( { left: 1, top: 4 } );
      const event = new MockEvent().addTargetTouchPoint( touchEvent );
      event.target = target;

      // act
      v.setFromEventRelative( event );

      // assert
      expect( v.x ).to.equal( 4 );
      expect( v.y ).to.equal( 3 );
    } );

    it( 'should call set when called with touch event', () => {
      // arrange
      const v = new Vector2();
      const touchEvent = new MockEvent().setPagePoint( 5, 7 );
      const target = new MockNode().setBoundingClientRect( { left: 1, top: 4 } );
      const event = new MockEvent().addTargetTouchPoint( touchEvent );
      event.target = target;
      const spy = sinon.spy( v, 'set' );

      // act
      v.setFromEventRelative( event );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call set when passed event is missing coordinates', () => {
      // arrange
      const v = new Vector2();
      const event = new MockEvent();
      const spy = sinon.spy( v, 'set' );

      // act
      v.setFromEventRelative( event );

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

  describe( 'clone', () => {
    it( 'should return an object with the same values', () => {
      // arrange
      const v = new Vector2( 1, 2 );

      // act
      const result = v.clone();

      // assert
      expect( result.x ).to.equal( 1 );
      expect( result.y ).to.equal( 2 );
    } );

    it( 'should not call observers when original vector changes', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const result = v.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // act
      v.x = 0;

      // assert
      expect( spy.notCalled ).to.be.true;
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

  describe( 'add', () => {
    it( 'should add vectors', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 2 );
      const expected = new Vector2( 5, 4 );

      // act
      v1.add( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.add( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'sub', () => {
    it( 'should subtract vectors', () => {
      // arrange
      const v1 = new Vector2( 4, 2 );
      const v2 = new Vector2( 1, 2 );
      const expected = new Vector2( 3, 0 );

      // act
      v1.sub( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.sub( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiply', () => {
    it( 'should multiply vectors', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const expected = new Vector2( 4, 10 );

      // act
      v1.multiply( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.multiply( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'divide', () => {
    it( 'should divide vectors', () => {
      // arrange
      const v1 = new Vector2( 4, 6 );
      const v2 = new Vector2( 4, 3 );
      const expected = new Vector2( 1, 2 );

      // act
      v1.divide( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.divide( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'addScalar', () => {
    it( 'should add scalar', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const scalar = 3;
      const expected = new Vector2( 4, 5 );

      // act
      v.addScalar( scalar );

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const spy = sinon.spy( v, 'set' );

      // act
      v.addScalar( 3 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiplyScalar', () => {
    it( 'should multipy scalar', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const scalar = 3;
      const expected = new Vector2( 3, 6 );

      // act
      v.multiplyScalar( scalar );

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const spy = sinon.spy( v, 'set' );

      // act
      v.multiplyScalar( 3 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'transform', () => {
    it( 'should return transformed vector', () => {
      // arrange
      const v = new Vector2();
      const translation = new Vector2( 1, 2 );
      const m = new Matrix3().setTranslation( translation );

      // act
      const result = v.transform( m );

      // assert
      expect( result.equals( translation ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v = new Vector2();
      const m = new Matrix3().setIdentity();
      const spy = sinon.spy( v, 'set' );

      // act
      v.transform( m );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'min', () => {
    it( 'should set to the elementwise minimum of two vectors', () => {
      // arrange
      const v1 = new Vector2( 1, 5 );
      const v2 = new Vector2( 2, 3 );
      const expected = new Vector2( 1, 3 );

      // act
      v1.min( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.min( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'max', () => {
    it( 'should set to the elementwise maximum of two vectors', () => {
      // arrange
      const v1 = new Vector2( 1, 5 );
      const v2 = new Vector2( 2, 3 );
      const expected = new Vector2( 2, 5 );

      // act
      v1.max( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.max( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'abs', () => {
    it( 'should set to the elementwise absolute values of itself', () => {
      // arrange
      const v = new Vector2( 1, -5 );
      const expected = new Vector2( 1, 5 );

      // act
      v.abs();

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v = new Vector2( 1, -5 );
      const spy = sinon.spy( v, 'set' );

      // act
      v.abs();

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'round', () => {
    it( 'should round the vector elementwise', () => {
      // arrange
      const v = new Vector2( 1.2, 2.5 );
      const expected = new Vector2( 1, 3 );

      // act
      v.round();

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v = new Vector2( 1.2, 2.5 );
      const spy = sinon.spy( v, 'set' );

      // act
      v.round();

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'floor', () => {
    it( 'should floor the vector elementwise', () => {
      // arrange
      const v = new Vector2( 1.2, -2.5 );
      const expected = new Vector2( 1, -3 );

      // act
      v.floor();

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v = new Vector2( 1.2, -2.5 );
      const spy = sinon.spy( v, 'set' );

      // act
      v.floor();

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'ceil', () => {
    it( 'should ceil the vector elementwise', () => {
      // arrange
      const v = new Vector2( 1.2, -2.5 );
      const expected = new Vector2( 2, -2 );

      // act
      v.ceil();

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v = new Vector2( 1.2, -2.5 );
      const spy = sinon.spy( v, 'set' );

      // act
      v.ceil();

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

    it( 'should not change values if vector has length zero', () => {
      // arrange
      const v = new Vector2();

      // act
      v.normalize();

      // assert
      expect( v.x ).to.equal( 0 );
      expect( v.y ).to.equal( 0 );
    } );

    it( 'should not call notifyObservers if vector has length zero', () => {
      // arrange
      const v = new Vector2();
      const spy = sinon.spy( ( v as any ), 'notifyObservers' );

      // act
      v.normalize();

      // assert
      expect( spy.notCalled ).to.be.true;
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

    it( 'should not change values if vector has length zero', () => {
      // arrange
      const v = new Vector2();

      // act
      v.setLength( 12 );

      // assert
      expect( v.x ).to.equal( 0 );
      expect( v.y ).to.equal( 0 );
    } );

    it( 'should not call notifyObservers if vector has length zero', () => {
      // arrange
      const v = new Vector2();
      const spy = sinon.spy( ( v as any ), 'notifyObservers' );

      // act
      v.setLength( 12 );

      // assert
      expect( spy.notCalled ).to.be.true;
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

  describe( 'dot', () => {
    it( 'should calculate the dot product of two vectors', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 3, 4 );

      // act
      const result = v1.dot( v2 );

      // assert
      expect( result ).to.equal( 11 );
    } );
  } );

  describe( 'cross', () => {
    it( 'should calculate the cross product of two vectors', () => {
      // arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 3, 4 );

      // act
      const result = v1.cross( v2 );

      // assert
      expect( result ).to.equal( -2 );
    } );
  } );

  describe( 'snap', () => {
    it( 'should save a copy of the vector to its snapshot property', () => {
      // arrange
      const v = new Vector2( 1, 2 );

      // act
      v.snap();

      // assert
      expect( v.snapshot!.equals( v ) ).to.be.true;
    } );

    it( 'should not call notifyObservers on snapshot when vector changes', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      v.snap();
      const spy = sinon.spy( ( v.snapshot! as any ), 'notifyObservers' );

      // act
      v.x = 3;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'drag', () => {
    it( 'should add to the value of the snapshot', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      v.snap();
      v.set( 11, 12 );

      // act
      v.drag( new Vector2( 6, 5 ) );

      // assert
      const expected = new Vector2( 7, 7 );
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      v.snap();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.drag( new Vector2( 3, 4 ) );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not change values if vector has no snapshot', () => {
      // arrange
      const v = new Vector2( 1, 2 );

      // act
      v.drag( new Vector2( 3, 4 ) );

      // assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should not call notifyObservers if vector has no snapshot', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.drag( new Vector2( 3, 4 ) );

      // assert
      expect( spy.notCalled ).to.be.true;
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

  describe( 'perpendicular', () => {
    it( 'should return a vector perpendicular to the given vector', () => {
      // arrange
      const v = new Vector2( 1, 5 );

      // act
      const result = v.perpendicular();

      // assert
      expect( v.dot( result ) ).to.equal( 0 );
    } );
  } );
} );
