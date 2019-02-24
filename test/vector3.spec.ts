import { expect } from 'chai';
import * as sinon from 'sinon';

import { Vector3 } from '../lib/vector3';

describe( 'Vector3', () => {
  describe( 'getter x', () => {
    it( 'should get x', () => {
      // Arrange
      const v = new Vector3( 1, 0, 0 );

      // Act and assert
      expect( v.x ).to.equal( 1 );
    } );
  } );

  describe( 'setter x', () => {
    it( 'should set x', () => {
      // Arrange
      const v = new Vector3();

      // Act
      v.x = 1;

      // Assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.x = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // Arrange
      const v = new Vector3( 1, 0, 0 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.x = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter y', () => {
    it( 'should get y', () => {
      // Arrange
      const v = new Vector3( 0, 1, 0 );

      // Act and assert
      expect( v.y ).to.equal( 1 );
    } );
  } );

  describe( 'setter y', () => {
    it( 'should set y', () => {
      // Arrange
      const v = new Vector3();

      // Act
      v.y = 1;

      // Assert
      expect( v.y ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.y = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // Arrange
      const v = new Vector3( 0, 1, 0 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.y = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter z', () => {
    it( 'should get z', () => {
      // Arrange
      const v = new Vector3( 0, 0, 1 );

      // Act and assert
      expect( v.z ).to.equal( 1 );
    } );
  } );

  describe( 'setter z', () => {
    it( 'should set z', () => {
      // Arrange
      const v = new Vector3();

      // Act
      v.z = 1;

      // Assert
      expect( v.z ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.z = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // Arrange
      const v = new Vector3( 0, 0, 1 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.z = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', () => {
    it( 'should set x, y and z properties', () => {
      // Act
      const v = new Vector3( 1, 2, 3 );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
      expect( v.z ).to.equal( 3 );
    } );

    it( 'should set zero values if uninitialised', () => {
      // Act
      const v = new Vector3();

      // Assert
      expect( v.x ).to.equal( 0 );
      expect( v.y ).to.equal( 0 );
      expect( v.z ).to.equal( 0 );
    } );
  } );

  describe( 'set', () => {
    it( 'should set x, y and z properties', () => {
      // Arrange
      const v = new Vector3();

      // Act
      v.set( 1, 2, 3 );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
      expect( v.z ).to.equal( 3 );
    } );

    it( 'should call notifyObservers', () => {
      // Arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.set( 1, 2, 3 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.set( 1, 2, 3 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setSilent', () => {
    it( 'should set x, y and z properties', () => {
      // Arrange
      const v = new Vector3();

      // Act
      v.setSilent( 1, 2, 3 );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
      expect( v.z ).to.equal( 3 );
    } );

    it( 'should not call notifyObservers', () => {
      // Arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.setSilent( 1, 2, 3 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'copy', () => {
    it( 'should copy x, y and z properties', () => {
      // Arrange
      const v1 = new Vector3();
      const v2 = new Vector3( 1, 2, 3 );

      // Act
      v1.copy( v2 );

      // Assert
      expect( v1.x ).to.equal( 1 );
      expect( v1.y ).to.equal( 2 );
      expect( v1.z ).to.equal( 3 );
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector3();
      const v2 = new Vector3( 1, 2, 3 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.copy( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clone', () => {
    it( 'should return an object with the same values', () => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );

      // Act
      const result = v.clone();

      // Assert
      expect( result.x ).to.equal( 1 );
      expect( result.y ).to.equal( 2 );
      expect( result.z ).to.equal( 3 );
    } );

    it( 'should not call observers when original vector changes', () => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );
      const result = v.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // Act
      v.x = 0;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', () => {
    it( 'should return true if values equal', () => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 1, 2, 3 );

      // Act
      const result = v1.equals( v2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 1, 3, 5 );

      // Act
      const result = v1.equals( v2 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'add', () => {
    it( 'should add vectors', () => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 2, 5 );
      const expected = new Vector3( 5, 4, 8 );

      // Act
      v1.add( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.add( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'sub', () => {
    it( 'should subtract vectors', () => {
      // Arrange
      const v1 = new Vector3( 4, 2, 5 );
      const v2 = new Vector3( 1, 2, 3 );
      const expected = new Vector3( 3, 0, 2 );

      // Act
      v1.sub( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.sub( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiply', () => {
    it( 'should multiply vectors', () => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 2, 5 );
      const expected = new Vector3( 4, 4, 15 );

      // Act
      v1.multiply( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.multiply( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'divide', () => {
    it( 'should divide vectors', () => {
      // Arrange
      const v1 = new Vector3( 4, 6, 9 );
      const v2 = new Vector3( 4, 3, 3 );
      const expected = new Vector3( 1, 2, 3 );

      // Act
      v1.divide( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.divide( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'addScalar', () => {
    it( 'should add scalar', () => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );
      const scalar = 3;
      const expected = new Vector3( 4, 5, 6 );

      // Act
      v.addScalar( scalar );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.addScalar( 3 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiplyScalar', () => {
    it( 'should multipy scalar', () => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );
      const scalar = 3;
      const expected = new Vector3( 3, 6, 9 );

      // Act
      v.multiplyScalar( scalar );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.multiplyScalar( 3 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'min', () => {
    it( 'should set to the elementwise minimum of two vectors', () => {
      // Arrange
      const v1 = new Vector3( 1, 5, 4 );
      const v2 = new Vector3( 2, 3, 4 );
      const expected = new Vector3( 1, 3, 4 );

      // Act
      v1.min( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.min( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'max', () => {
    it( 'should set to the elementwise maximum of two vectors', () => {
      // Arrange
      const v1 = new Vector3( 1, 5, 4 );
      const v2 = new Vector3( 2, 3, 4 );
      const expected = new Vector3( 2, 5, 4 );

      // Act
      v1.max( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 5, 6 );
      const spy = sinon.spy( v1, 'set' );

      // Act
      v1.max( v2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );
} );
