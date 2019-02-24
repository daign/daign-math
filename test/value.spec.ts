import { expect } from 'chai';
import * as sinon from 'sinon';

import { Value } from '../lib/value';

describe( 'Value', () => {
  describe( 'getter x', () => {
    it( 'should get x', () => {
      // Arrange
      const v = new Value( 1 );

      // Act and assert
      expect( v.x ).to.equal( 1 );
    } );
  } );

  describe( 'setter x', () => {
    it( 'should set x', () => {
      // Arrange
      const v = new Value();

      // Act
      v.x = 1;

      // Assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const v = new Value();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.x = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // Arrange
      const v = new Value( 1 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.x = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', () => {
    it( 'should set x property', () => {
      // Act
      const v = new Value( 1 );

      // Assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should set zero value if uninitialised', () => {
      // Act
      const v = new Value();

      // Assert
      expect( v.x ).to.equal( 0 );
    } );
  } );

  describe( 'setSilent', () => {
    it( 'should set x property', () => {
      // Arrange
      const v = new Value();

      // Act
      v.setSilent( 1 );

      // Assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should not call notifyObservers', () => {
      // Arrange
      const v = new Value();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.setSilent( 1 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', () => {
    it( 'should return an object with the same value', () => {
      // Arrange
      const v = new Value( 2 );

      // Act
      const result = v.clone();

      // Assert
      expect( result.x ).to.equal( v.x );
    } );

    it( 'should not call notifyObservers when original value changes', () => {
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

  describe( 'clamp', () => {
    it( 'should make value smaller if too big', () => {
      // Arrange
      const v = new Value( 8 );

      // Act
      v.clamp( -3, 5 );

      // Assert
      expect( v.x ).to.equal( 5 );
    } );

    it( 'should make value bigger if too small', () => {
      // Arrange
      const v = new Value( -5 );

      // Act
      v.clamp( -2, 3 );

      // Assert
      expect( v.x ).to.equal( -2 );
    } );

    it( 'should not change value that is inside limits', () => {
      // Arrange
      const v = new Value( 3 );

      // Act
      v.clamp( -4, 4 );

      // Assert
      expect( v.x ).to.equal( 3 );
    } );
  } );

  describe( 'snap', () => {
    it( 'should save a snaptshot with the same value', () => {
      // Arrange
      const v = new Value( 2 );

      // Act
      v.snap();

      // Assert
      expect( v.snapshot!.x ).to.equal( v.x );
    } );

    it( 'should not call notifyObservers', () => {
      // Arrange
      const v = new Value( 2 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.snap();

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'drag', () => {
    it( 'should add to the value of the snapshot', () => {
      // Arrange
      const v = new Value( 2 );
      v.snap();
      v.x = 5;

      // Act
      v.drag( 4 );

      // Assert
      expect( v.x ).to.equal( 6 );
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const v = new Value( 2 );
      v.snap();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.drag( 4 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not change value if value has no snapshot', () => {
      // Arrange
      const v = new Value( 2 );

      // Act
      v.drag( 4 );

      // Assert
      expect( v.x ).to.equal( 2 );
    } );

    it( 'should not call notifyObservers if value has no snapshot', () => {
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
