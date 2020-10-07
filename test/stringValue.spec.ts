import { expect } from 'chai';
import * as sinon from 'sinon';

import { StringValue } from '../lib/stringValue';

describe( 'StringValue', (): void => {
  describe( 'getter value', (): void => {
    it( 'should get value', (): void => {
      // Arrange
      const s = new StringValue( 'test' );

      // Act and assert
      expect( s.value ).to.equal( 'test' );
    } );
  } );

  describe( 'setter value', (): void => {
    it( 'should set value', (): void => {
      // Arrange
      const s = new StringValue();

      // Act
      s.value = 'test';

      // Assert
      expect( s.value ).to.equal( 'test' );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const s = new StringValue();
      const spy = sinon.spy( s as any, 'notifyObservers' );

      // Act
      s.value = 'test';

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const s = new StringValue( 'test' );
      const spy = sinon.spy( s as any, 'notifyObservers' );

      // Act
      s.value = 'test';

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should set value property', (): void => {
      // Act
      const s = new StringValue( 'test' );

      // Assert
      expect( s.value ).to.equal( 'test' );
    } );

    it( 'should set empty string value if uninitialised', (): void => {
      // Act
      const s = new StringValue();

      // Assert
      expect( s.value ).to.equal( '' );
    } );
  } );

  describe( 'setSilent', (): void => {
    it( 'should set value property', (): void => {
      // Arrange
      const s = new StringValue();

      // Act
      s.setSilent( 'test' );

      // Assert
      expect( s.value ).to.equal( 'test' );
    } );

    it( 'should not call notifyObservers', (): void => {
      // Arrange
      const s = new StringValue();
      const spy = sinon.spy( s as any, 'notifyObservers' );

      // Act
      s.setSilent( 'test' );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should return an object with the same value', (): void => {
      // Arrange
      const s = new StringValue( 'test' );

      // Act
      const result = s.clone();

      // Assert
      expect( result.value ).to.equal( s.value );
    } );

    it( 'should not call notifyObservers when original value changes', (): void => {
      // Arrange
      const s = new StringValue( 'test' );
      const clone = s.clone();
      const spy = sinon.spy( clone as any, 'notifyObservers' );

      // Act
      s.value = 'changed';

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );
} );
