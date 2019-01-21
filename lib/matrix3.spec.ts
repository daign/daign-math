import {expect} from 'chai';
import * as sinon from 'sinon';

import {Angle} from './angle';
import {Matrix3} from './matrix3';
import {Vector2} from './vector2';

describe( 'Matrix3', () => {
  describe( 'getter elements', () => {
    it( 'should get elements', () => {
      // arrange
      const m = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // act
     const result = m.elements;

      // assert
      expect( result.length ).to.equal( 9 );
      expect( result[ 0 ] ).to.equal( 1 );
      expect( result[ 1 ] ).to.equal( 2 );
      expect( result[ 2 ] ).to.equal( 3 );
      expect( result[ 3 ] ).to.equal( 4 );
      expect( result[ 4 ] ).to.equal( 5 );
      expect( result[ 5 ] ).to.equal( 6 );
      expect( result[ 6 ] ).to.equal( 7 );
      expect( result[ 7 ] ).to.equal( 8 );
      expect( result[ 8 ] ).to.equal( 9 );
    } );
  } );

  describe( 'constructor', () => {
    it( 'should set all values', () => {
      // act
      const m = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // assert
      const e = m.elements;
      expect( e[ 0 ] ).to.equal( 1 );
      expect( e[ 1 ] ).to.equal( 2 );
      expect( e[ 2 ] ).to.equal( 3 );
      expect( e[ 3 ] ).to.equal( 4 );
      expect( e[ 4 ] ).to.equal( 5 );
      expect( e[ 5 ] ).to.equal( 6 );
      expect( e[ 6 ] ).to.equal( 7 );
      expect( e[ 7 ] ).to.equal( 8 );
      expect( e[ 8 ] ).to.equal( 9 );
    } );

    it( 'should set zero values if uninitialised', () => {
      // act
      const m = new Matrix3();

      // assert
      expect( m.elements.every( a => a === 0 ) ).to.be.true;
    } );
  } );

  describe( 'set', () => {
    it( 'should set all values', () => {
      // arrange
      const m = new Matrix3();

      // act
      m.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // assert
      const e = m.elements;
      expect( e[ 0 ] ).to.equal( 1 );
      expect( e[ 1 ] ).to.equal( 2 );
      expect( e[ 2 ] ).to.equal( 3 );
      expect( e[ 3 ] ).to.equal( 4 );
      expect( e[ 4 ] ).to.equal( 5 );
      expect( e[ 5 ] ).to.equal( 6 );
      expect( e[ 6 ] ).to.equal( 7 );
      expect( e[ 7 ] ).to.equal( 8 );
      expect( e[ 8 ] ).to.equal( 9 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const m = new Matrix3();
      const spy = sinon.spy( m as any, 'notifyObservers' );

      // act
      m.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const m = new Matrix3();
      m.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const spy = sinon.spy( m as any, 'notifyObservers' );

      // act
      m.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'copy', () => {
    it( 'should copy all values', () => {
      // arrange
      const m1 = new Matrix3();
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // act
      m1.copy( m2 );

      // assert
      expect( m1.equals( m2 ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const m1 = new Matrix3();
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const spy = sinon.spy( m1, 'set' );

      // act
      m1.copy( m2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'equals', () => {
    it( 'should return true if values equal', () => {
      // arrange
      const m1 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // act
      const result = m1.equals( m2 );

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
      // arrange
      const m1 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 10 );

      // act
      const result = m1.equals( m2 );

      // assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'matrixMultiplication', () => {
    it( 'should calculate the product of the matrices', () => {
      // arrange
      const result = new Matrix3();
      const m1 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2 = new Matrix3( 5, 1, 6, 2, 7, 3, 8, 4, 9 );
      const expected = new Matrix3( 33, 27, 39, 78, 63, 93, 123, 99, 147 );

      // act
      result.matrixMultiplication( m1, m2 );

      // assert
      expect( result.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const result = new Matrix3();
      const m1 = new Matrix3();
      const m2 = new Matrix3();
      const spy = sinon.spy( result, 'set' );

      // act
      result.matrixMultiplication( m1, m2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiply', () => {
    it( 'should calculate the product of the matrices', () => {
      // arrange
      const m1 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2 = new Matrix3( 5, 1, 6, 2, 7, 3, 8, 4, 9 );
      const expected = new Matrix3( 33, 27, 39, 78, 63, 93, 123, 99, 147 );

      // act
      m1.multiply( m2 );

      // assert
      expect( m1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const m1 = new Matrix3();
      const m2 = new Matrix3();
      const spy = sinon.spy( m1, 'set' );

      // act
      m1.multiply( m2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'transform', () => {
    it( 'should calculate the left sided product of the matrices', () => {
      // arrange
      const m1 = new Matrix3( 5, 1, 6, 2, 7, 3, 8, 4, 9 );
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const expected = new Matrix3( 33, 27, 39, 78, 63, 93, 123, 99, 147 );

      // act
      m1.transform( m2 );

      // assert
      expect( m1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const m1 = new Matrix3();
      const m2 = new Matrix3();
      const spy = sinon.spy( m1, 'set' );

      // act
      m1.transform( m2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'setIdentity', () => {
    it( 'should set the identity matrix', () => {
      // arrange
      const m = new Matrix3();
      const expected = new Matrix3( 1, 0, 0, 0, 1, 0, 0, 0, 1 );

      // act
      m.setIdentity();

      // assert
      expect( m.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const m = new Matrix3();
      const spy = sinon.spy( m, 'set' );

      // act
      m.setIdentity();

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should calculate the identical matrix when used as a transformation', () => {
      // arrange
      const m1 = new Matrix3().setIdentity();
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2copy = m2.clone();

      // act
      m2.transform( m1 );

      // assert
      expect( m2.equals( m2copy ) ).to.be.true;
    } );
  } );

  describe( 'setTranslation', () => {
    it( 'should set the translation matrix', () => {
      // arrange
      const m = new Matrix3();
      const expected = new Matrix3( 1, 0, 5, 0, 1, 6, 0, 0, 1 );

      // act
      m.setTranslation( new Vector2( 5, 6 ) );

      // assert
      expect( m.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const m = new Matrix3();
      const spy = sinon.spy( m, 'set' );

      // act
      m.setTranslation( new Vector2() );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should calculate the translated vector when used as a transformation', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const translation = new Vector2( 3, 4 );
      const m = new Matrix3().setTranslation( translation );
      const expected = new Vector2( 4, 6 );

      // act
      v.transform( m );

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'setScaling', () => {
    it( 'should set the scaling matrix', () => {
      // arrange
      const m = new Matrix3();
      const expected = new Matrix3( 5, 0, 0, 0, 6, 0, 0, 0, 1 );

      // act
      m.setScaling( new Vector2( 5, 6 ) );

      // assert
      expect( m.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const m = new Matrix3();
      const spy = sinon.spy( m, 'set' );

      // act
      m.setScaling( new Vector2() );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should calculate the scaled vector when used as a transformation', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const scaling = new Vector2( 3, 4 );
      const m = new Matrix3().setScaling( scaling );
      const expected = new Vector2( 3, 8 );

      // act
      v.transform( m );

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'setRotation', () => {
    it( 'should call set', () => {
      // arrange
      const m = new Matrix3();
      const spy = sinon.spy( m, 'set' );

      // act
      m.setRotation( new Angle() );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should calculate the rotated vector when used as a transformation', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const rotation = new Angle( Math.PI / 2 );
      const m = new Matrix3().setRotation( rotation );
      const expected = new Vector2( -2, 1 );

      // act
      v.transform( m );

      // assert
      expect( v.x ).to.be.closeTo( expected.x, 0.001 );
      expect( v.y ).to.be.closeTo( expected.y, 0.001 );
    } );

    it( 'should calculate the rotated vector around a point when used as a transformation', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const rotation = new Angle( Math.PI / 2 );
      const center = new Vector2( 3, 3 );
      const m = new Matrix3().setRotation( rotation, center );
      const expected = new Vector2( 4, 1 );

      // act
      v.transform( m );

      // assert
      expect( v.x ).to.be.closeTo( expected.x, 0.001 );
      expect( v.y ).to.be.closeTo( expected.y, 0.001 );
    } );
  } );

  describe( 'applyTranslation', () => {
    it( 'should apply a translation after a scaling', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const scaling = new Vector2( 3, 2 );
      const translation = new Vector2( 2, 1 );
      const m = new Matrix3().setScaling( scaling );
      const expected = new Vector2( 5, 5 );

      // act
      m.applyTranslation( translation );
      v.transform( m );

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'applyScaling', () => {
    it( 'should apply a scaling after a translation', () => {
      // arrange
      const v = new Vector2( 1, 2 );
      const translation = new Vector2( 2, 1 );
      const scaling = new Vector2( 3, 2 );
      const m = new Matrix3().setTranslation( translation );
      const expected = new Vector2( 9, 6 );

      // act
      m.applyScaling( scaling );
      v.transform( m );

      // assert
      expect( v.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'applyRotation', () => {
    it( 'should apply rotation to a transformation matrix', () => {
      // arrange
      const v = new Vector2();
      const translation = new Vector2( 1, 2 );
      const rotation = new Angle( Math.PI / 2 );

      // transformation is initialised with a translation which should execute before the rotation
      const m = new Matrix3().setTranslation( translation );
      const expected = new Vector2( -2, 1 );

      // act
      m.applyRotation( rotation );
      // the complete transformation is executed on a vector
      v.transform( m );

      // assert
      expect( v.x ).to.be.closeTo( expected.x, 0.001 );
      expect( v.y ).to.be.closeTo( expected.y, 0.001 );
    } );

    it( 'should apply rotation around a point to a transformation matrix', () => {
      // arrange
      const v = new Vector2();
      const translation = new Vector2( 1, 2 );
      const rotation = new Angle( Math.PI / 2 );
      const center = new Vector2( 3, 3 );

      // transformation is initialised with a translation which should execute before the rotation
      const m = new Matrix3().setTranslation( translation );
      const expected = new Vector2( 4, 1 );

      // act
      m.applyRotation( rotation, center );
      // the complete transformation is executed on a vector
      v.transform( m );

      // assert
      expect( v.x ).to.be.closeTo( expected.x, 0.001 );
      expect( v.y ).to.be.closeTo( expected.y, 0.001 );
    } );
  } );

  describe( 'determinant', () => {
    it( 'should calculate the determinant of a matrix', () => {
      // arrange
      const m = new Matrix3( 1, 2, 3, 4, 0, 4, 3, 2, 1 );

      // act
      const result = m.determinant();

      // assert
      expect( result ).to.equal( 32 );
    } );
  } );
} );
