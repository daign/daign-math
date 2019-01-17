import {expect} from 'chai';
import * as sinon from 'sinon';

import {Vector3} from './vector3';

describe( 'Vector3', () => {
  describe( 'getter x', () => {
    it( 'should get x', () => {
      // arrange
      const v = new Vector3( 1, 0, 0 );

      // act and assert
      expect( v.x ).to.equal( 1 );
    } );
  } );

  describe( 'setter x', () => {
    it( 'should set x', () => {
      // arrange
      const v = new Vector3();

      // act
      v.x = 1;

      // assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.x = 1;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const v = new Vector3( 1, 0, 0 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.x = 1;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter y', () => {
    it( 'should get y', () => {
      // arrange
      const v = new Vector3( 0, 1, 0 );

      // act and assert
      expect( v.y ).to.equal( 1 );
    } );
  } );

  describe( 'setter y', () => {
    it( 'should set y', () => {
      // arrange
      const v = new Vector3();

      // act
      v.y = 1;

      // assert
      expect( v.y ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.y = 1;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const v = new Vector3( 0, 1, 0 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.y = 1;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter z', () => {
    it( 'should get z', () => {
      // arrange
      const v = new Vector3( 0, 0, 1 );

      // act and assert
      expect( v.z ).to.equal( 1 );
    } );
  } );

  describe( 'setter z', () => {
    it( 'should set z', () => {
      // arrange
      const v = new Vector3();

      // act
      v.z = 1;

      // assert
      expect( v.z ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.z = 1;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const v = new Vector3( 0, 0, 1 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.z = 1;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', () => {
    it( 'should set x, y and z properties', () => {
      // act
      const v = new Vector3( 1, 2, 3 );

      // assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
      expect( v.z ).to.equal( 3 );
    } );

    it( 'should set zero values if uninitialised', () => {
      // act
      const v = new Vector3();

      // assert
      expect( v.x ).to.equal( 0 );
      expect( v.y ).to.equal( 0 );
      expect( v.z ).to.equal( 0 );
    } );
  } );

  describe( 'set', () => {
    it( 'should set x, y and z properties', () => {
      // arrange
      const v = new Vector3();

      // act
      v.set( 1, 2, 3 );

      // assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
      expect( v.z ).to.equal( 3 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.set( 1, 2, 3 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const v = new Vector3( 1, 2, 3 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.set( 1, 2, 3 );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setSilent', () => {
    it( 'should set x, y and z properties', () => {
      // arrange
      const v = new Vector3();

      // act
      v.setSilent( 1, 2, 3 );

      // assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
      expect( v.z ).to.equal( 3 );
    } );

    it( 'should not call notifyObservers', () => {
      // arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.setSilent( 1, 2, 3 );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'copy', () => {
    it( 'should copy x, y and z properties', () => {
      // arrange
      const v1 = new Vector3();
      const v2 = new Vector3( 1, 2, 3 );

      // act
      v1.copy( v2 );

      // assert
      expect( v1.x ).to.equal( 1 );
      expect( v1.y ).to.equal( 2 );
      expect( v1.z ).to.equal( 3 );
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector3();
      const v2 = new Vector3( 1, 2, 3 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.copy( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'equals', () => {
    it( 'should return true if values equal', () => {
      // arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 1, 2, 3 );

      // act
      const result = v1.equals( v2 );

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
      // arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 1, 3, 5 );

      // act
      const result = v1.equals( v2 );

      // assert
      expect( result ).to.be.false;
    } );
  } );
} );
