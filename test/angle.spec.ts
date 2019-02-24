import { expect } from 'chai';
import * as sinon from 'sinon';

import { Angle } from '../lib/angle';

describe( 'Angle', () => {
  describe( 'getter radians', () => {
    it( 'should get radians', () => {
      // Arrange
      const a = new Angle( 1 );

      // Act and assert
      expect( a.radians ).to.equal( 1 );
    } );
  } );

  describe( 'setter radians', () => {
    it( 'should set radians', () => {
      // Arrange
      const a = new Angle();

      // Act
      a.radians = 1;

      // Assert
      expect( a.radians ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const a = new Angle();
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // Act
      a.radians = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // Arrange
      const a = new Angle( 1 );
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // Act
      a.radians = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter degrees', () => {
    it( 'should get degrees', () => {
      // Arrange
      const a = new Angle( Math.PI );

      // Act and assert
      expect( a.degrees ).to.equal( 180 );
    } );
  } );

  describe( 'setter degrees', () => {
    it( 'should convert to radians', () => {
      // Arrange
      const a = new Angle();

      // Act
      a.degrees = 180;

      // Assert
      expect( a.radians ).to.equal( Math.PI );
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const a = new Angle();
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // Act
      a.degrees = 180;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // Arrange
      const a = new Angle( Math.PI );
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // Act
      a.degrees = 180;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', () => {
    it( 'should set radians', () => {
      // Act
      const a = new Angle( 1 );

      // Assert
      expect( a.radians ).to.equal( 1 );
    } );

    it( 'should set zero value if uninitialised', () => {
      // Act
      const a = new Angle();

      // Assert
      expect( a.radians ).to.equal( 0 );
    } );
  } );

  describe( 'equals', () => {
    it( 'should return true if values equal', () => {
      // Arrange
      const a1 = new Angle( 1 );
      const a2 = new Angle( 1 );

      // Act
      const result = a1.equals( a2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
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
