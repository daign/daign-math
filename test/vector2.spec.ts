import { expect } from 'chai';
import * as sinon from 'sinon';

import { MockEvent, MockNode } from '@daign/mock-dom';

import { Box2 } from '../lib/box2';
import { Line2 } from '../lib/line2';
import { Matrix3 } from '../lib/matrix3';
import { Vector2 } from '../lib/vector2';

describe( 'Vector2', () => {
  describe( 'getter x', () => {
    it( 'should get x', () => {
      // Arrange
      const v = new Vector2( 1, 0 );

      // Act and assert
      expect( v.x ).to.equal( 1 );
    } );
  } );

  describe( 'setter x', () => {
    it( 'should set x', () => {
      // Arrange
      const v = new Vector2();

      // Act
      v.x = 1;

      // Assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const v = new Vector2();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.x = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // Arrange
      const v = new Vector2( 1, 0 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.x = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter y', () => {
    it( 'should get y', () => {
      // Arrange
      const v = new Vector2( 0, 1 );

      // Act and assert
      expect( v.y ).to.equal( 1 );
    } );
  } );

  describe( 'setter y', () => {
    it( 'should set y', () => {
      // Arrange
      const v = new Vector2();

      // Act
      v.y = 1;

      // Assert
      expect( v.y ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const v = new Vector2();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.y = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // Arrange
      const v = new Vector2( 0, 1 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.y = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', () => {
    it( 'should set x and y properties', () => {
      // Act
      const v = new Vector2( 1, 2 );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should set zero values if uninitialised', () => {
      // Act
      const v = new Vector2();

      // Assert
      expect( v.x ).to.equal( 0 );
      expect( v.y ).to.equal( 0 );
    } );
  } );

  describe( 'set', () => {
    it( 'should set x and y properties', () => {
      // Arrange
      const v = new Vector2();

      // Act
      v.set( 1, 2 );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const v = new Vector2();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.set( 1, 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.set( 1, 2 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setSilent', () => {
    it( 'should set x and y properties', () => {
      // Arrange
      const v = new Vector2();

      // Act
      v.setSilent( 1, 2 );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should not call notifyObservers', () => {
      // Arrange
      const v = new Vector2();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.setSilent( 1, 2 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setFromEvent', () => {
    it( 'should set x and y properties from event', () => {
      // Arrange
      const v = new Vector2();
      const event = new MockEvent().setClientPoint( 1, 2 );

      // Act
      v.setFromEvent( event );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should call set when called with event', () => {
      // Arrange
      const v = new Vector2();
      const event = new MockEvent().setClientPoint( 1, 2 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.setFromEvent( event );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should set x and y properties from touch event', () => {
      // Arrange
      const v = new Vector2();
      const touchEvent = new MockEvent().setClientPoint( 1, 2 );
      const event = new MockEvent().addTouchPoint( touchEvent );

      // Act
      v.setFromEvent( event );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should call set when called with touch event', () => {
      // Arrange
      const v = new Vector2();
      const touchEvent = new MockEvent().setClientPoint( 1, 2 );
      const event = new MockEvent().addTouchPoint( touchEvent );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.setFromEvent( event );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call set when passed event is missing coordinates', () => {
      // Arrange
      const v = new Vector2();
      const event = new MockEvent();
      const spy = sinon.spy( v, 'set' );

      // Act
      v.setFromEvent( event );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setFromEventRelative', () => {
    it( 'should set x and y properties from event', () => {
      // Arrange
      const v = new Vector2();
      const event = new MockEvent().setOffsetPoint( 1, 2 );

      // Act
      v.setFromEventRelative( event );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should call set when called with event', () => {
      // Arrange
      const v = new Vector2();
      const event = new MockEvent().setOffsetPoint( 1, 2 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.setFromEventRelative( event );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should set x and y properties from touch event and bounding client rect', () => {
      // Arrange
      const v = new Vector2();
      const touchEvent = new MockEvent().setPagePoint( 5, 7 );
      const target = new MockNode().setBoundingClientRect( { left: 1, top: 4 } );
      const event = new MockEvent().addTargetTouchPoint( touchEvent );
      event.target = target;

      // Act
      v.setFromEventRelative( event );

      // Assert
      expect( v.x ).to.equal( 4 );
      expect( v.y ).to.equal( 3 );
    } );

    it( 'should call set when called with touch event', () => {
      // Arrange
      const v = new Vector2();
      const touchEvent = new MockEvent().setPagePoint( 5, 7 );
      const target = new MockNode().setBoundingClientRect( { left: 1, top: 4 } );
      const event = new MockEvent().addTargetTouchPoint( touchEvent );
      event.target = target;
      const spy = sinon.spy( v, 'set' );

      // Act
      v.setFromEventRelative( event );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call set when passed event is missing coordinates', () => {
      // Arrange
      const v = new Vector2();
      const event = new MockEvent();
      const spy = sinon.spy( v, 'set' );

      // Act
      v.setFromEventRelative( event );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'copy', () => {
    it( 'should copy x and y properties', () => {
      // Arrange
      const v1 = new Vector2();
      const v2 = new Vector2( 1, 2 );

      // Act
      v1.copy( v2 );

      // Assert
      expect( v1.x ).to.equal( 1 );
      expect( v1.y ).to.equal( 2 );
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector2();
      const v2 = new Vector2( 1, 2 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.copy( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clone', () => {
    it( 'should return an object with the same values', () => {
      // Arrange
      const v = new Vector2( 1, 2 );

      // Act
      const result = v.clone();

      // Assert
      expect( result.x ).to.equal( 1 );
      expect( result.y ).to.equal( 2 );
    } );

    it( 'should not call observers when original vector changes', () => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const result = v.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // Act
      v.x = 0;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', () => {
    it( 'should return true if values equal', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 1, 2 );

      // Act
      const result = v1.equals( v2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 1, 3 );

      // Act
      const result = v1.equals( v2 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'closeTo', () => {
    it( 'should return true for values close to each other using a given delta', () => {
      // Arrange
      const v1 = new Vector2( 1, 1.999 );
      const v2 = new Vector2( 1.001, 2 );

      // Act
      const result = v1.closeTo( v2, 0.002 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false for values not close to each other using a given delta', () => {
      // Arrange
      const v1 = new Vector2( 1, 1.997 );
      const v2 = new Vector2( 1.003, 2 );

      // Act
      const result = v1.closeTo( v2, 0.002 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true for values close to each other using epsilon delta', () => {
      // Arrange
      const v1 = new Vector2( 0.1 + 0.2, 0.1 );
      const v2 = new Vector2( 0.3, 0.3 - 0.2 );

      // Act
      const result = v1.closeTo( v2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false for values not close to each other using epsilon delta', () => {
      // Arrange
      const v1 = new Vector2( 1, 0.999999999 );
      const v2 = new Vector2( 1.000000001, 1 );

      // Act
      const result = v1.closeTo( v2 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false for values completely equal if delta is zero', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 1, 2 );

      // Act
      const result = v1.closeTo( v2, 0 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'add', () => {
    it( 'should add vectors', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 2 );
      const expected = new Vector2( 5, 4 );

      // Act
      v1.add( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.add( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'sub', () => {
    it( 'should subtract vectors', () => {
      // Arrange
      const v1 = new Vector2( 4, 2 );
      const v2 = new Vector2( 1, 2 );
      const expected = new Vector2( 3, 0 );

      // Act
      v1.sub( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.sub( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiply', () => {
    it( 'should multiply vectors', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const expected = new Vector2( 4, 10 );

      // Act
      v1.multiply( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.multiply( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'divide', () => {
    it( 'should divide vectors', () => {
      // Arrange
      const v1 = new Vector2( 4, 6 );
      const v2 = new Vector2( 4, 3 );
      const expected = new Vector2( 1, 2 );

      // Act
      v1.divide( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.divide( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'addScalar', () => {
    it( 'should add scalar', () => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const scalar = 3;
      const expected = new Vector2( 4, 5 );

      // Act
      v.addScalar( scalar );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.addScalar( 3 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiplyScalar', () => {
    it( 'should multipy scalar', () => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const scalar = 3;
      const expected = new Vector2( 3, 6 );

      // Act
      v.multiplyScalar( scalar );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.multiplyScalar( 3 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'modulo', () => {
    it( 'should calculate modulo', () => {
      // Arrange
      const v = new Vector2( 4, 8 );
      const scalar = 3;
      const expected = new Vector2( 1, 2 );

      // Act
      v.modulo( scalar );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.modulo( 3 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'transform', () => {
    it( 'should return transformed vector', () => {
      // Arrange
      const v = new Vector2();
      const translation = new Vector2( 1, 2 );
      const m = new Matrix3().setTranslation( translation );

      // Act
      const result = v.transform( m );

      // Assert
      expect( result.equals( translation ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v = new Vector2();
      const m = new Matrix3().setIdentity();
      const spy = sinon.spy( v, 'set' );

      // Act
      v.transform( m );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'min', () => {
    it( 'should set to the elementwise minimum of two vectors', () => {
      // Arrange
      const v1 = new Vector2( 1, 5 );
      const v2 = new Vector2( 2, 3 );
      const expected = new Vector2( 1, 3 );

      // Act
      v1.min( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.min( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'max', () => {
    it( 'should set to the elementwise maximum of two vectors', () => {
      // Arrange
      const v1 = new Vector2( 1, 5 );
      const v2 = new Vector2( 2, 3 );
      const expected = new Vector2( 2, 5 );

      // Act
      v1.max( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 4, 5 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.max( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'abs', () => {
    it( 'should set to the elementwise absolute values of itself', () => {
      // Arrange
      const v = new Vector2( 1, -5 );
      const expected = new Vector2( 1, 5 );

      // Act
      v.abs();

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v = new Vector2( 1, -5 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.abs();

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'round', () => {
    it( 'should round the vector elementwise', () => {
      // Arrange
      const v = new Vector2( 1.2, 2.5 );
      const expected = new Vector2( 1, 3 );

      // Act
      v.round();

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v = new Vector2( 1.2, 2.5 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.round();

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'floor', () => {
    it( 'should floor the vector elementwise', () => {
      // Arrange
      const v = new Vector2( 1.2, -2.5 );
      const expected = new Vector2( 1, -3 );

      // Act
      v.floor();

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v = new Vector2( 1.2, -2.5 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.floor();

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'ceil', () => {
    it( 'should ceil the vector elementwise', () => {
      // Arrange
      const v = new Vector2( 1.2, -2.5 );
      const expected = new Vector2( 2, -2 );

      // Act
      v.ceil();

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v = new Vector2( 1.2, -2.5 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.ceil();

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clampInBox', () => {
    it( 'should make vector smaller if too big', () => {
      // Arrange
      const v = new Vector2( 8, 9 );
      const min = new Vector2( -1, -2 );
      const max = new Vector2( 5, 4 );
      const b = new Box2( min, max );

      // Act
      v.clampInBox( b );

      // Assert
      expect( v.equals( max ) ).to.be.true;
    } );

    it( 'should make vector bigger if too small', () => {
      // Arrange
      const v = new Vector2( -4, -5 );
      const min = new Vector2( -1, -2 );
      const max = new Vector2( 5, 4 );
      const b = new Box2( min, max );

      // Act
      v.clampInBox( b );

      // Assert
      expect( v.equals( min ) ).to.be.true;
    } );

    it( 'should not change vector that is inside box', () => {
      // Arrange
      const v = new Vector2( 2, 3 );
      const vCopy = v.clone();
      const min = new Vector2( -1, -2 );
      const max = new Vector2( 5, 4 );
      const b = new Box2( min, max );

      // Act
      v.clampInBox( b );

      // Assert
      expect( v.equals( vCopy ) ).to.be.true;
    } );
  } );

  describe( 'length', () => {
    it( 'should get length', () => {
      // Arrange
      const v = new Vector2( 3, 4 );

      // Act
      const result = v.length();

      // Assert
      expect( result ).to.be.closeTo( 5, 0.001 );
    } );
  } );

  describe( 'normalize', () => {
    it( 'should set vector to length 1', () => {
      // Arrange
      const v = new Vector2( 1, 2 );

      // Act
      v.normalize();

      // Assert
      expect( v.length() ).to.be.closeTo( 1, 0.001 );
    } );

    it( 'should not change values if vector has length zero', () => {
      // Arrange
      const v = new Vector2();

      // Act
      v.normalize();

      // Assert
      expect( v.x ).to.equal( 0 );
      expect( v.y ).to.equal( 0 );
    } );

    it( 'should not call notifyObservers if vector has length zero', () => {
      // Arrange
      const v = new Vector2();
      const spy = sinon.spy( ( v as any ), 'notifyObservers' );

      // Act
      v.normalize();

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setLength', () => {
    it( 'should set vector to length', () => {
      // Arrange
      const v = new Vector2( 1, 2 );

      // Act
      v.setLength( 12 );

      // Assert
      expect( v.length() ).to.be.closeTo( 12, 0.001 );
    } );

    it( 'should not change values if vector has length zero', () => {
      // Arrange
      const v = new Vector2();

      // Act
      v.setLength( 12 );

      // Assert
      expect( v.x ).to.equal( 0 );
      expect( v.y ).to.equal( 0 );
    } );

    it( 'should not call notifyObservers if vector has length zero', () => {
      // Arrange
      const v = new Vector2();
      const spy = sinon.spy( ( v as any ), 'notifyObservers' );

      // Act
      v.setLength( 12 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'distanceTo', () => {
    it( 'should get the distance', () => {
      // Arrange
      const v1 = new Vector2( 1, 1 );
      const v2 = new Vector2( 5, 4 );

      // Act
      const result = v1.distanceTo( v2 );

      // Assert
      expect( result ).to.be.closeTo( 5, 0.001 );
    } );
  } );

  describe( 'angle', () => {
    it( 'should get 0 for vector 1, 0', () => {
      // Arrange
      const v = new Vector2( 1, 0 );

      // Act
      const result = v.angle();

      // Assert
      expect( result.radians ).to.be.closeTo( 0, 0.001 );
    } );

    it( 'should get pi/2 for vector 0, 1', () => {
      // Arrange
      const v = new Vector2( 0, 1 );

      // Act
      const result = v.angle();

      // Assert
      expect( result.radians ).to.be.closeTo( Math.PI / 2, 0.001 );
    } );

    it( 'should get pi for vector -1, 0', () => {
      // Arrange
      const v = new Vector2( -1, 0 );

      // Act
      const result = v.angle();

      // Assert
      expect( result.radians ).to.be.closeTo( Math.PI, 0.001 );
    } );

    it( 'should get 1.5*pi for vector 0, -1', () => {
      // Arrange
      const v = new Vector2( 0, -1 );

      // Act
      const result = v.angle();

      // Assert
      expect( result.radians ).to.be.closeTo( Math.PI * 1.5, 0.001 );
    } );
  } );

  describe( 'dot', () => {
    it( 'should calculate the dot product of two vectors', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 3, 4 );

      // Act
      const result = v1.dot( v2 );

      // Assert
      expect( result ).to.equal( 11 );
    } );
  } );

  describe( 'cross', () => {
    it( 'should calculate the cross product of two vectors', () => {
      // Arrange
      const v1 = new Vector2( 1, 2 );
      const v2 = new Vector2( 3, 4 );

      // Act
      const result = v1.cross( v2 );

      // Assert
      expect( result ).to.equal( -2 );
    } );
  } );

  describe( 'snap', () => {
    it( 'should save a copy of the vector to its snapshot property', () => {
      // Arrange
      const v = new Vector2( 1, 2 );

      // Act
      v.snap();

      // Assert
      expect( v.snapshot!.equals( v ) ).to.be.true;
    } );

    it( 'should not call notifyObservers on snapshot when vector changes', () => {
      // Arrange
      const v = new Vector2( 1, 2 );
      v.snap();
      const spy = sinon.spy( ( v.snapshot! as any ), 'notifyObservers' );

      // Act
      v.x = 3;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'drag', () => {
    it( 'should add to the value of the snapshot', () => {
      // Arrange
      const v = new Vector2( 1, 2 );
      v.snap();
      v.set( 11, 12 );

      // Act
      v.drag( new Vector2( 6, 5 ) );

      // Assert
      const expected = new Vector2( 7, 7 );
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const v = new Vector2( 1, 2 );
      v.snap();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.drag( new Vector2( 3, 4 ) );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not change values if vector has no snapshot', () => {
      // Arrange
      const v = new Vector2( 1, 2 );

      // Act
      v.drag( new Vector2( 3, 4 ) );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
    } );

    it( 'should not call notifyObservers if vector has no snapshot', () => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.drag( new Vector2( 3, 4 ) );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'projectOnLine', () => {
    it( 'should project on line', () => {
      // Arrange
      const v = new Vector2( 1, 5 );
      const l1 = new Vector2( 0, 0 );
      const l2 = new Vector2( 6, 4 );
      const l = new Line2( l1, l2 );

      // Act
      const result = v.projectOnLine( l );

      // Assert
      expect( result.x ).to.be.closeTo( 3, 0.001 );
      expect( result.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should project on line outside of line segment', () => {
      // Arrange
      const v = new Vector2( 4, 7 );
      const l1 = new Vector2( 0, 0 );
      const l2 = new Vector2( 3, 2 );
      const l = new Line2( l1, l2 );

      // Act
      const result = v.projectOnLine( l );

      // Assert
      expect( result.x ).to.be.closeTo( 6, 0.001 );
      expect( result.y ).to.be.closeTo( 4, 0.001 );
    } );
  } );

  describe( 'projectOnLineSegment', () => {
    it( 'should project on line', () => {
      // Arrange
      const v = new Vector2( 1, 5 );
      const l1 = new Vector2( 0, 0 );
      const l2 = new Vector2( 6, 4 );
      const l = new Line2( l1, l2 );

      // Act
      const result = v.projectOnLineSegment( l );

      // Assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should not project on line outside of line segment', () => {
      // Arrange
      const v = new Vector2( 4, 7 );
      const l1 = new Vector2( 0, 0 );
      const l2 = new Vector2( 3, 2 );
      const l = new Line2( l1, l2 );

      // Act
      const result = v.projectOnLineSegment( l );

      // Assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'perpendicular', () => {
    it( 'should return a vector perpendicular to the given vector', () => {
      // Arrange
      const v = new Vector2( 1, 5 );

      // Act
      const result = v.perpendicular();

      // Assert
      expect( v.dot( result ) ).to.equal( 0 );
    } );
  } );
} );
