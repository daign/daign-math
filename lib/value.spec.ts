import {expect} from 'chai';
import * as sinon from 'sinon';

import {Value} from './value';

describe( 'Value', () => {
  describe( 'getter x', () => {
    it( 'should get x', () => {
      // arrange
      const v = new Value( 1 );

      // act and assert
      expect( v.x ).to.equal( 1 );
    } );
  } );

  describe( 'setter x', () => {
    it( 'should set x', () => {
      // arrange
      const v = new Value();

      // act
      v.x = 1;

      // assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const v = new Value();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.x = 1;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const v = new Value( 1 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.x = 1;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'constructor', () => {
    it( 'should set x property', () => {
      // act
      const v = new Value( 1 );

      // assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should set zero value if uninitialised', () => {
      // act
      const v = new Value();

      // assert
      expect( v.x ).to.equal( 0 );
    } );
  } );

  describe( 'setSilent', () => {
    it( 'should set x property', () => {
      // arrange
      const v = new Value();

      // act
      v.setSilent( 1 );

      // assert
      expect( v.x ).to.equal( 1 );
    } );

    it( 'should not call notifyObservers', () => {
      // arrange
      const v = new Value();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.setSilent( 1 );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', () => {
    it( 'should return an object with the same value', () => {
      // arrange
      const v = new Value( 2 );

      // act
      const result = v.clone();

      // assert
      expect( result.x ).to.equal( v.x );
    } );

    it( 'should not call notifyObservers when original value changes', () => {
      // arrange
      const v = new Value( 2 );
      const clone = v.clone();
      const spy = sinon.spy( clone as any, 'notifyObservers' );

      // act
      v.x = 3;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clamp', () => {
    it( 'should make value smaller if too big', () => {
      // arrange
      const v = new Value( 8 );

      // act
      v.clamp( -3, 5 );

      // assert
      expect( v.x ).to.equal( 5 );
    } );

    it( 'should make value bigger if too small', () => {
      // arrange
      const v = new Value( -5 );

      // act
      v.clamp( -2, 3 );

      // assert
      expect( v.x ).to.equal( -2 );
    } );

    it( 'should not change value that is inside limits', () => {
      // arrange
      const v = new Value( 3 );

      // act
      v.clamp( -4, 4 );

      // assert
      expect( v.x ).to.equal( 3 );
    } );
  } );

  describe( 'snap', () => {
    it( 'should save a snaptshot with the same value', () => {
      // arrange
      const v = new Value( 2 );

      // act
      v.snap();

      // assert
      expect( v.snapshot!.x ).to.equal( v.x );
    } );

    it( 'should not call notifyObservers', () => {
      // arrange
      const v = new Value( 2 );
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.snap();

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'drag', () => {
    it( 'should add to the value of the snapshot', () => {
      // arrange
      const v = new Value( 2 );
      v.snap();
      v.x = 5;

      // act
      v.drag( 4 );

      // assert
      expect( v.x ).to.equal( 6 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const v = new Value( 2 );
      v.snap();
      const spy = sinon.spy( v as any, 'notifyObservers' );

      // act
      v.drag( 4 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );
} );
