import {expect} from 'chai';
import * as sinon from 'sinon';

import {Matrix3} from './matrix3';

describe( 'Matrix3', () => {
  describe( 'getter elements', () => {
    it( 'should get elements', () => {
      // arrange
      const m = new Matrix3();
      m.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

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
    it( 'should initialise with zeros', () => {
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
      const m2 = new Matrix3();
      m2.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // act
      m1.copy( m2 );

      // assert
      expect( m1.equals( m2 ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const m1 = new Matrix3();
      const m2 = new Matrix3();
      m2.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
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
      const m1 = new Matrix3();
      m1.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2 = new Matrix3();
      m2.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // act
      const result = m1.equals( m2 );

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
      // arrange
      const m1 = new Matrix3();
      m1.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2 = new Matrix3();
      m2.set( 1, 2, 3, 4, 5, 6, 7, 8, 10 );

      // act
      const result = m1.equals( m2 );

      // assert
      expect( result ).to.be.false;
    } );
  } );
} );
