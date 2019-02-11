import {expect} from 'chai';
import * as sinon from 'sinon';

import {Vector3} from '../lib/vector3';

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

  describe( 'clone', () => {
    it( 'should return an object with the same values', () => {
      // arrange
      const v = new Vector3( 1, 2, 3 );

      // act
      const result = v.clone();

      // assert
      expect( result.x ).to.equal( 1 );
      expect( result.y ).to.equal( 2 );
      expect( result.z ).to.equal( 3 );
    } );

    it( 'should not call observers when original vector changes', () => {
      // arrange
      const v = new Vector3( 1, 2, 3 );
      const result = v.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // act
      v.x = 0;

      // assert
      expect( spy.notCalled ).to.be.true;
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

  describe( 'add', () => {
    it( 'should add vectors', () => {
      // arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 2, 5 );
      const expected = new Vector3( 5, 4, 8 );

      // act
      v1.add( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.add( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'sub', () => {
    it( 'should subtract vectors', () => {
      // arrange
      const v1 = new Vector3( 4, 2, 5 );
      const v2 = new Vector3( 1, 2, 3 );
      const expected = new Vector3( 3, 0, 2 );

      // act
      v1.sub( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.sub( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiply', () => {
    it( 'should multiply vectors', () => {
      // arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 2, 5 );
      const expected = new Vector3( 4, 4, 15 );

      // act
      v1.multiply( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.multiply( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'divide', () => {
    it( 'should divide vectors', () => {
      // arrange
      const v1 = new Vector3( 4, 6, 9 );
      const v2 = new Vector3( 4, 3, 3 );
      const expected = new Vector3( 1, 2, 3 );

      // act
      v1.divide( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.divide( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'addScalar', () => {
    it( 'should add scalar', () => {
      // arrange
      const v = new Vector3( 1, 2, 3 );
      const scalar = 3;
      const expected = new Vector3( 4, 5, 6 );

      // act
      v.addScalar( scalar );

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v = new Vector3( 1, 2, 3 );
      const spy = sinon.spy( v, 'set' );

      // act
      v.addScalar( 3 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiplyScalar', () => {
    it( 'should multipy scalar', () => {
      // arrange
      const v = new Vector3( 1, 2, 3 );
      const scalar = 3;
      const expected = new Vector3( 3, 6, 9 );

      // act
      v.multiplyScalar( scalar );

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v = new Vector3( 1, 2, 3 );
      const spy = sinon.spy( v, 'set' );

      // act
      v.multiplyScalar( 3 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'min', () => {
    it( 'should set to the elementwise minimum of two vectors', () => {
      // arrange
      const v1 = new Vector3( 1, 5, 4 );
      const v2 = new Vector3( 2, 3, 4 );
      const expected = new Vector3( 1, 3, 4 );

      // act
      v1.min( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.min( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'max', () => {
    it( 'should set to the elementwise maximum of two vectors', () => {
      // arrange
      const v1 = new Vector3( 1, 5, 4 );
      const v2 = new Vector3( 2, 3, 4 );
      const expected = new Vector3( 2, 5, 4 );

      // act
      v1.max( v2 );

      // assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // act
      v1.max( v2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );
} );
