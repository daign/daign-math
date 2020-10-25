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
    it( 'should save a snaptshot with the same value', (): void => {
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
