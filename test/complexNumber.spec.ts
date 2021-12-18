import { expect } from 'chai';
import * as sinon from 'sinon';

import { ComplexNumber } from '../lib';

describe( 'ComplexNumber', (): void => {
  describe( 'getter real', (): void => {
    it( 'should get real', (): void => {
      // Arrange
      const c = new ComplexNumber( 1, 0 );

      // Act and assert
      expect( c.real ).to.equal( 1 );
    } );
  } );

  describe( 'setter real', (): void => {
    it( 'should set real', (): void => {
      // Arrange
      const c = new ComplexNumber();

      // Act
      c.real = 1;

      // Assert
      expect( c.real ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const c = new ComplexNumber();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.real = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const c = new ComplexNumber( 1, 0 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.real = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter imaginary', (): void => {
    it( 'should get imaginary', (): void => {
      // Arrange
      const c = new ComplexNumber( 0, 1 );

      // Act and assert
      expect( c.imaginary ).to.equal( 1 );
    } );
  } );

  describe( 'setter imaginary', (): void => {
    it( 'should set imaginary', (): void => {
      // Arrange
      const c = new ComplexNumber();

      // Act
      c.imaginary = 1;

      // Assert
      expect( c.imaginary ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const c = new ComplexNumber();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.imaginary = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const c = new ComplexNumber( 0, 1 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.imaginary = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should set real and imaginary properties', (): void => {
      // Act
      const c = new ComplexNumber( 1, 2 );

      // Assert
      expect( c.real ).to.equal( 1 );
      expect( c.imaginary ).to.equal( 2 );
    } );

    it( 'should set zero values if uninitialised', (): void => {
      // Act
      const c = new ComplexNumber();

      // Assert
      expect( c.real ).to.equal( 0 );
      expect( c.imaginary ).to.equal( 0 );
    } );
  } );

  describe( 'set', (): void => {
    it( 'should set real and imaginary properties', (): void => {
      // Arrange
      const c = new ComplexNumber();

      // Act
      c.set( 1, 2 );

      // Assert
      expect( c.real ).to.equal( 1 );
      expect( c.imaginary ).to.equal( 2 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const c = new ComplexNumber();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.set( 1, 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const c = new ComplexNumber( 1, 2 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.set( 1, 2 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setSilent', (): void => {
    it( 'should set real and imaginary properties', (): void => {
      // Arrange
      const c = new ComplexNumber();

      // Act
      c.setSilent( 1, 2 );

      // Assert
      expect( c.real ).to.equal( 1 );
      expect( c.imaginary ).to.equal( 2 );
    } );

    it( 'should not call notifyObservers', (): void => {
      // Arrange
      const c = new ComplexNumber();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // Act
      c.setSilent( 1, 2 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'copy', (): void => {
    it( 'should copy real and imaginary properties', (): void => {
      // Arrange
      const c1 = new ComplexNumber();
      const c2 = new ComplexNumber( 1, 2 );

      // Act
      c1.copy( c2 );

      // Assert
      expect( c1.real ).to.equal( 1 );
      expect( c1.imaginary ).to.equal( 2 );
    } );

    it( 'should call set', (): void => {
      // Arrange
      const c1 = new ComplexNumber();
      const c2 = new ComplexNumber( 1, 2 );
      const spy = sinon.spy( c1, 'set' );

      // Act
      c1.copy( c2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should return an object with the same values', (): void => {
      // Arrange
      const c = new ComplexNumber( 1, 2 );

      // Act
      const result = c.clone();

      // Assert
      expect( result.real ).to.equal( 1 );
      expect( result.imaginary ).to.equal( 2 );
    } );

    it( 'should not call observers when original vector changes', (): void => {
      // Arrange
      const c = new ComplexNumber( 1, 2 );
      const result = c.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // Act
      c.real = 0;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', (): void => {
    it( 'should return true if values equal', (): void => {
      // Arrange
      const c1 = new ComplexNumber( 1, 2 );
      const c2 = new ComplexNumber( 1, 2 );

      // Act
      const result = c1.equals( c2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', (): void => {
      // Arrange
      const c1 = new ComplexNumber( 1, 2 );
      const c2 = new ComplexNumber( 1, 3 );

      // Act
      const result = c1.equals( c2 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'closeTo', (): void => {
    it( 'should return true for values close to each other using a given delta', (): void => {
      // Arrange
      const c1 = new ComplexNumber( 1, 1.999 );
      const c2 = new ComplexNumber( 1.001, 2 );

      // Act
      const result = c1.closeTo( c2, 0.002 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false for values not close to each other using a given delta', (): void => {
      // Arrange
      const c1 = new ComplexNumber( 1, 1.997 );
      const c2 = new ComplexNumber( 1.003, 2 );

      // Act
      const result = c1.closeTo( c2, 0.002 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true for values close to each other using epsilon delta', (): void => {
      // Arrange
      const c1 = new ComplexNumber( 0.1 + 0.2, 0.1 );
      const c2 = new ComplexNumber( 0.3, 0.3 - 0.2 );

      // Act
      const result = c1.closeTo( c2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false for values not close to each other using epsilon delta', (): void => {
      // Arrange
      const c1 = new ComplexNumber( 1, 0.999999999 );
      const c2 = new ComplexNumber( 1.000000001, 1 );

      // Act
      const result = c1.closeTo( c2 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false for values completely equal if delta is zero', (): void => {
      // Arrange
      const c1 = new ComplexNumber( 1, 2 );
      const c2 = new ComplexNumber( 1, 2 );

      // Act
      const result = c1.closeTo( c2, 0 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );
} );
