import { expect } from 'chai';
import * as sinon from 'sinon';

import { Value } from '../lib';

describe( 'Value', (): void => {
  describe( 'getter x', (): void => {
    it( 'should get x', (): void => {
      // Arrange
      const v = new Value( 1 );

      // Act and assert
      expect( v.x ).to.equal( 1 );
    } );
  } );

  describe( 'setter x', (): void => {
    it( 'should set x', (): void => {
      // Arrange
      const v = new Value();

      // Act
      v.x = 1;

      // Assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v = new Value();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.x = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const v = new Value( 1 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.x = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should set x property', (): void => {
      // Act
      const v = new Value( 1 );

      // Assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should set zero value if uninitialised', (): void => {
      // Act
      const v = new Value();

      // Assert
      expect( v.x ).to.equal( 0 );
    } );
  } );

  describe( 'setSilent', (): void => {
    it( 'should set x property', (): void => {
      // Arrange
      const v = new Value();

      // Act
      v.setSilent( 1 );

      // Assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should not call notifyObservers', (): void => {
      // Arrange
      const v = new Value();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.setSilent( 1 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'copy', (): void => {
    it( 'should copy the x value', (): void => {
      // Arrange
      const v1 = new Value();
      const v2 = new Value( 2 );

      // Act
      v1.copy( v2 );

      // Assert
      expect( v1.x ).to.equal( 2 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v = new Value( 2.5 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.copy( new Value( 3 ) );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should return an object with the same value', (): void => {
      // Arrange
      const v = new Value( 2 );

      // Act
      const result = v.clone();

      // Assert
      expect( result.x ).to.equal( v.x );
    } );

    it( 'should not call notifyObservers when original value changes', (): void => {
      // Arrange
      const v = new Value( 2 );
      const clone = v.clone();
      const spy = sinon.spy( clone as any, 'notifyObservers' );

      // Act
      v.x = 3;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', (): void => {
    it( 'should return true if values equal', (): void => {
      // Arrange
      const v1 = new Value( 1 );
      const v2 = new Value( 1 );

      // Act
      const result = v1.equals( v2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', (): void => {
      // Arrange
      const v1 = new Value( 1 );
      const v2 = new Value( 2 );

      // Act
      const result = v1.equals( v2 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'closeTo', (): void => {
    it( 'should return true for values close to each other using a given delta', (): void => {
      // Arrange
      const v1 = new Value( 1 );
      const v2 = new Value( 1.001 );

      // Act
      const result = v1.closeTo( v2, 0.002 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false for values not close to each other using a given delta', (): void => {
      // Arrange
      const v1 = new Value( 1 );
      const v2 = new Value( 1.003 );

      // Act
      const result = v1.closeTo( v2, 0.002 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true for values close to each other using epsilon delta', (): void => {
      // Arrange
      const v1 = new Value( 0.1 + 0.2 );
      const v2 = new Value( 0.3 );

      // Act
      const result = v1.closeTo( v2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false for values not close to each other using epsilon delta', (): void => {
      // Arrange
      const v1 = new Value( 1 );
      const v2 = new Value( 1.000000001 );

      // Act
      const result = v1.closeTo( v2 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false for values completely equal if delta is zero', (): void => {
      // Arrange
      const v1 = new Value( 1 );
      const v2 = new Value( 1 );

      // Act
      const result = v1.closeTo( v2, 0 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'add', (): void => {
    it( 'should add values', (): void => {
      // Arrange
      const v1 = new Value( 1 );
      const v2 = new Value( 2 );
      const expected = new Value( 3 );

      // Act
      v1.add( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v1 = new Value( 1 );
      const v2 = new Value( 2 );
      const spy = sinon.spy( v1 as any, 'notifyObservers' );

      // Act
      v1.add( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'sub', (): void => {
    it( 'should subtract values', (): void => {
      // Arrange
      const v1 = new Value( 3 );
      const v2 = new Value( 2 );
      const expected = new Value( 1 );

      // Act
      v1.sub( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v1 = new Value( 3 );
      const v2 = new Value( 2 );
      const spy = sinon.spy( v1 as any, 'notifyObservers' );

      // Act
      v1.sub( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiplyScalar', (): void => {
    it( 'should multiply value with a scalar', (): void => {
      // Arrange
      const v = new Value( 2 );
      const s = 3;
      const expected = new Value( 6 );

      // Act
      v.multiplyScalar( s );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v = new Value( 2 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.multiplyScalar( 3 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'abs', (): void => {
    it( 'should set to the absolute value of itself', (): void => {
      // Arrange
      const v = new Value( -2 );
      const expected = new Value( 2 );

      // Act
      v.abs();

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v = new Value( -2 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.abs();

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'round', (): void => {
    it( 'should round the value', (): void => {
      // Arrange
      const v = new Value( 2.5 );

      // Act
      v.round();

      // Assert
      expect( v.x ).to.equal( 3 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v = new Value( 2.5 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.round();

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should round with given precision', (): void => {
      // Arrange
      const v = new Value( 1.005 );

      // Act
      v.round( 2 );

      // Assert
      expect( v.x ).to.equal( 1.01 );
    } );

    it( 'should round with given negative precision', (): void => {
      // Arrange
      const v = new Value( 1005 );

      // Act
      v.round( -1 );

      // Assert
      expect( v.x ).to.equal( 1010 );
    } );
  } );

  describe( 'clamp', (): void => {
    it( 'should make value smaller if too big', (): void => {
      // Arrange
      const v = new Value( 8 );

      // Act
      v.clamp( -3, 5 );

      // Assert
      expect( v.x ).to.equal( 5 );
    } );

    it( 'should make value bigger if too small', (): void => {
      // Arrange
      const v = new Value( -5 );

      // Act
      v.clamp( -2, 3 );

      // Assert
      expect( v.x ).to.equal( -2 );
    } );

    it( 'should not change value that is inside limits', (): void => {
      // Arrange
      const v = new Value( 3 );

      // Act
      v.clamp( -4, 4 );

      // Assert
      expect( v.x ).to.equal( 3 );
    } );
  } );

  describe( 'snap', (): void => {
    it( 'should save a snapshot with the same value', (): void => {
      // Arrange
      const v = new Value( 2 );

      // Act
      v.snap();

      // Assert
      expect( v.snapshot!.x ).to.equal( v.x );
    } );

    it( 'should not call notifyObservers', (): void => {
      // Arrange
      const v = new Value( 2 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.snap();

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'drag', (): void => {
    it( 'should add to the value of the snapshot', (): void => {
      // Arrange
      const v = new Value( 2 );
      v.snap();
      v.x = 5;

      // Act
      v.drag( 4 );

      // Assert
      expect( v.x ).to.equal( 6 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v = new Value( 2 );
      v.snap();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.drag( 4 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not change value if value has no snapshot', (): void => {
      // Arrange
      const v = new Value( 2 );

      // Act
      v.drag( 4 );

      // Assert
      expect( v.x ).to.equal( 2 );
    } );

    it( 'should not call notifyObservers if value has no snapshot', (): void => {
      // Arrange
      const v = new Value( 2 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.drag( 4 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );
} );
