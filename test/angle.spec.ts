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

  describe( 'equals', (): void => {
    it( 'should return true if values equal', (): void => {
      // Arrange
      const a1 = new Angle( 1 );
      const a2 = new Angle( 1 );

      // Act
      const result = a1.equals( a2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', (): void => {
      // Arrange
      const a1 = new Angle( 1 );
      const a2 = new Angle( 2 );

      // Act
      const result = a1.equals( a2 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );
} );
