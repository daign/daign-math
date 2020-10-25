import { expect } from 'chai';
import * as sinon from 'sinon';

import { Vector3 } from '../lib';

describe( 'Vector3', (): void => {
  describe( 'getter x', (): void => {
    it( 'should get x', (): void => {
      // Arrange
      const v = new Vector3( 1, 0, 0 );

      // Act and assert
      expect( v.x ).to.equal( 1 );
    } );
  } );

  describe( 'setter x', (): void => {
    it( 'should set x', (): void => {
      // Arrange
      const v = new Vector3();

      // Act
      v.x = 1;

      // Assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.x = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const v = new Vector3( 1, 0, 0 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.x = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter y', (): void => {
    it( 'should get y', (): void => {
      // Arrange
      const v = new Vector3( 0, 1, 0 );

      // Act and assert
      expect( v.y ).to.equal( 1 );
    } );
  } );

  describe( 'setter y', (): void => {
    it( 'should set y', (): void => {
      // Arrange
      const v = new Vector3();

      // Act
      v.y = 1;

      // Assert
      expect( v.y ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.y = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const v = new Vector3( 0, 1, 0 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.y = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter z', (): void => {
    it( 'should get z', (): void => {
      // Arrange
      const v = new Vector3( 0, 0, 1 );

      // Act and assert
      expect( v.z ).to.equal( 1 );
    } );
  } );

  describe( 'setter z', (): void => {
    it( 'should set z', (): void => {
      // Arrange
      const v = new Vector3();

      // Act
      v.z = 1;

      // Assert
      expect( v.z ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.z = 1;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const v = new Vector3( 0, 0, 1 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.z = 1;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should set x, y and z properties', (): void => {
      // Act
      const v = new Vector3( 1, 2, 3 );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
      expect( v.z ).to.equal( 3 );
    } );

    it( 'should set zero values if uninitialised', (): void => {
      // Act
      const v = new Vector3();

      // Assert
      expect( v.x ).to.equal( 0 );
      expect( v.y ).to.equal( 0 );
      expect( v.z ).to.equal( 0 );
    } );
  } );

  describe( 'set', (): void => {
    it( 'should set x, y and z properties', (): void => {
      // Arrange
      const v = new Vector3();

      // Act
      v.set( 1, 2, 3 );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
      expect( v.z ).to.equal( 3 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.set( 1, 2, 3 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.set( 1, 2, 3 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setSilent', (): void => {
    it( 'should set x, y and z properties', (): void => {
      // Arrange
      const v = new Vector3();

      // Act
      v.setSilent( 1, 2, 3 );

      // Assert
      expect( v.x ).to.equal( 1 );
      expect( v.y ).to.equal( 2 );
      expect( v.z ).to.equal( 3 );
    } );

    it( 'should not call notifyObservers', (): void => {
      // Arrange
      const v = new Vector3();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // Act
      v.setSilent( 1, 2, 3 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'copy', (): void => {
    it( 'should copy x, y and z properties', (): void => {
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

    it( 'should call set', (): void => {
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

  describe( 'clone', (): void => {
    it( 'should return an object with the same values', (): void => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );

      // Act
      const result = v.clone();

      // Assert
      expect( result.x ).to.equal( 1 );
      expect( result.y ).to.equal( 2 );
      expect( result.z ).to.equal( 3 );
    } );

    it( 'should not call observers when original vector changes', (): void => {
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

  describe( 'equals', (): void => {
    it( 'should return true if values equal', (): void => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 1, 2, 3 );

      // Act
      const result = v1.equals( v2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', (): void => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 1, 3, 5 );

      // Act
      const result = v1.equals( v2 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'add', (): void => {
    it( 'should add vectors', (): void => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 2, 5 );
      const expected = new Vector3( 5, 4, 8 );

      // Act
      v1.add( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
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

  describe( 'sub', (): void => {
    it( 'should subtract vectors', (): void => {
      // Arrange
      const v1 = new Vector3( 4, 2, 5 );
      const v2 = new Vector3( 1, 2, 3 );
      const expected = new Vector3( 3, 0, 2 );

      // Act
      v1.sub( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
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

  describe( 'multiply', (): void => {
    it( 'should multiply vectors', (): void => {
      // Arrange
      const v1 = new Vector3( 1, 2, 3 );
      const v2 = new Vector3( 4, 2, 5 );
      const expected = new Vector3( 4, 4, 15 );

      // Act
      v1.multiply( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
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

  describe( 'divide', (): void => {
    it( 'should divide vectors', (): void => {
      // Arrange
      const v1 = new Vector3( 4, 6, 9 );
      const v2 = new Vector3( 4, 3, 3 );
      const expected = new Vector3( 1, 2, 3 );

      // Act
      v1.divide( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
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

  describe( 'addScalar', (): void => {
    it( 'should add scalar', (): void => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );
      const scalar = 3;
      const expected = new Vector3( 4, 5, 6 );

      // Act
      v.addScalar( scalar );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.addScalar( 3 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiplyScalar', (): void => {
    it( 'should multipy scalar', (): void => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );
      const scalar = 3;
      const expected = new Vector3( 3, 6, 9 );

      // Act
      v.multiplyScalar( scalar );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
      // Arrange
      const v = new Vector3( 1, 2, 3 );
      const spy = sinon.spy( v, 'set' );

      // Act
      v.multiplyScalar( 3 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'min', (): void => {
    it( 'should set to the elementwise minimum of two vectors', (): void => {
      // Arrange
      const v1 = new Vector3( 1, 5, 4 );
      const v2 = new Vector3( 2, 3, 4 );
      const expected = new Vector3( 1, 3, 4 );

      // Act
      v1.min( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
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

  describe( 'max', (): void => {
    it( 'should set to the elementwise maximum of two vectors', (): void => {
      // Arrange
      const v1 = new Vector3( 1, 5, 4 );
      const v2 = new Vector3( 2, 3, 4 );
      const expected = new Vector3( 2, 5, 4 );

      // Act
      v1.max( v2 );

      // Assert
      expect( v1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
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
