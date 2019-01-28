import {expect} from 'chai';
import * as sinon from 'sinon';

import {Angle} from '../lib/angle';

describe( 'Angle', () => {
  describe( 'getter radians', () => {
    it( 'should get radians', () => {
      // arrange
      const a = new Angle( 1 );

      // act and assert
      expect( a.radians ).to.equal( 1 );
    } );
  } );

  describe( 'setter radians', () => {
    it( 'should set radians', () => {
      // arrange
      const a = new Angle();

      // act
      a.radians = 1;

      // assert
      expect( a.radians ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const a = new Angle();
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // act
      a.radians = 1;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const a = new Angle( 1 );
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // act
      a.radians = 1;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter degrees', () => {
    it( 'should get degrees', () => {
      // arrange
      const a = new Angle( Math.PI );

      // act and assert
      expect( a.degrees ).to.equal( 180 );
    } );
  } );

  describe( 'setter degrees', () => {
    it( 'should convert to radians', () => {
      // arrange
      const a = new Angle();

      // act
      a.degrees = 180;

      // assert
      expect( a.radians ).to.equal( Math.PI );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const a = new Angle();
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // act
      a.degrees = 180;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const a = new Angle( Math.PI );
      const spy = sinon.spy( a as any, 'notifyObservers' );

      // act
      a.degrees = 180;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', () => {
    it( 'should set radians', () => {
      // act
      const a = new Angle( 1 );

      // assert
      expect( a.radians ).to.equal( 1 );
    } );

    it( 'should set zero value if uninitialised', () => {
      // act
      const a = new Angle();

      // assert
      expect( a.radians ).to.equal( 0 );
    } );
  } );

  describe( 'equals', () => {
    it( 'should return true if values equal', () => {
      // arrange
      const a1 = new Angle( 1 );
      const a2 = new Angle( 1 );

      // act
      const result = a1.equals( a2 );

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
      // arrange
      const a1 = new Angle( 1 );
      const a2 = new Angle( 2 );

      // act
      const result = a1.equals( a2 );

      // assert
      expect( result ).to.be.false;
    } );
  } );
} );
