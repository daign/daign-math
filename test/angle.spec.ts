import { expect } from 'chai';
import * as sinon from 'sinon';

import { Angle } from '../lib';

describe( 'Angle', (): void => {
  describe( 'getter radians', (): void => {
    it( 'should get radians', (): void => {
      // Arrange
      const a = new Angle( 1 );

      // Act and assert
      expect( a.radians ).to.equal( 1 );
    } );
  } );

  describe( 'setter radians', (): void => {
    it( 'should set radians', (): void => {
      // Arrange
      const a = new Angle();

      // Act
      a.radians = 1;

      // Assert
      expect( a.radians ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const a = new Angle();
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // Act
      a.radians = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const a = new Angle( 1 );
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // Act
      a.radians = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter degrees', (): void => {
    it( 'should get degrees', (): void => {
      // Arrange
      const a = new Angle( Math.PI );

      // Act and assert
      expect( a.degrees ).to.equal( 180 );
    } );
  } );

  describe( 'setter degrees', (): void => {
    it( 'should convert to radians', (): void => {
      // Arrange
      const a = new Angle();

      // Act
      a.degrees = 180;

      // Assert
      expect( a.radians ).to.equal( Math.PI );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const a = new Angle();
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // Act
      a.degrees = 180;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const a = new Angle( Math.PI );
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // Act
      a.degrees = 180;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should set radians', (): void => {
      // Act
      const a = new Angle( 1 );

      // Assert
      expect( a.radians ).to.equal( 1 );
    } );

    it( 'should set zero value if uninitialised', (): void => {
      // Act
      const a = new Angle();

      // Assert
      expect( a.radians ).to.equal( 0 );
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should return an object with the same value', (): void => {
      // Arrange
      const a = new Angle( 2 );

      // Act
      const result = a.clone();

      // Assert
      expect( result.radians ).to.equal( a.radians );
    } );

    it( 'should not call notifyObservers when original value changes', (): void => {
      // Arrange
      const a = new Angle( 2 );
      const clone = a.clone();
      const spy = sinon.spy( clone as any, 'notifyObservers' );

      // Act
      a.radians = 3;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'normalize', (): void => {
    it( 'should limit angle between 0 and 2 * Math.PI', (): void => {
      // Arrange
      const a = new Angle( 5 * Math.PI );
      const expected = new Angle( Math.PI );

      // Act
      a.normalize();

      // Assert
      expect( a.closeTo( expected ) ).to.be.true;
    } );

    it( 'should limit angle between 0 and 2 * Math.PI for negative angles', (): void => {
      // Arrange
      const a = new Angle( -1.5 * Math.PI );
      const expected = new Angle( 0.5 * Math.PI );

      // Act
      a.normalize();

      // Assert
      expect( a.closeTo( expected ) ).to.be.true;
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const a = new Angle( 5 * Math.PI );
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // Act
      a.normalize();

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'roundDegrees', (): void => {
    it( 'should round the angle to degrees', (): void => {
      // Arrange
      const a = new Angle();
      a.degrees = 2.5;
      const expected = new Angle();
      expected.degrees = 3;

      // Act
      a.roundDegrees();

      // Assert
      expect( a.closeTo( expected ) ).to.be.true;
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const a = new Angle();
      a.degrees = 2.5;
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // Act
      a.roundDegrees();

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should round with given precision', (): void => {
      // Arrange
      const a = new Angle();
      a.degrees = 1.005;
      const expected = new Angle();
      expected.degrees = 1.01;

      // Act
      a.roundDegrees( 2 );

      // Assert
      expect( a.closeTo( expected ) ).to.be.true;
    } );

    it( 'should round with given negative precision', (): void => {
      // Arrange
      const a = new Angle();
      a.degrees = 1005;
      const expected = new Angle();
      expected.degrees = 1010;

      // Act
      a.roundDegrees( -1 );

      // Assert
      expect( a.closeTo( expected ) ).to.be.true;
    } );
  } );
} );
