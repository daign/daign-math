import {expect} from 'chai';
import * as sinon from 'sinon';

import {Color} from './color';

describe( 'Color', () => {
  describe( 'getter r', () => {
    it( 'should get red channel value', () => {
      // arrange
      const c = new Color( 1, 2, 3 );

      // act and assert
      expect( c.r ).to.equal( 1 );
    } );
  } );

  describe( 'setter r', () => {
    it( 'should set red channel value', () => {
      // arrange
      const c = new Color();

      // act
      c.r = 1;

      // assert
      expect( c.r ).to.equal( 1 );
    } );

    it( 'should round the input value for the red channel', () => {
      // arrange
      const c = new Color();

      // act
      c.r = 1.2;

      // assert
      expect( c.r ).to.equal( 1 );
    } );

    it( 'should apply upper limit to the input value for the red channel', () => {
      // arrange
      const c = new Color();

      // act
      c.r = 300;

      // assert
      expect( c.r ).to.equal( 255 );
    } );

    it( 'should apply lower limit to the input value for the red channel', () => {
      // arrange
      const c = new Color();

      // act
      c.r = -5;

      // assert
      expect( c.r ).to.equal( 0 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const c = new Color();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // act
      c.r = 1;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const c = new Color( 1, 2, 3 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // act
      c.r = 1;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter g', () => {
    it( 'should get green channel value', () => {
      // arrange
      const c = new Color( 1, 2, 3 );

      // act and assert
      expect( c.g ).to.equal( 2 );
    } );
  } );

  describe( 'setter g', () => {
    it( 'should set green channel value', () => {
      // arrange
      const c = new Color();

      // act
      c.g = 2;

      // assert
      expect( c.g ).to.equal( 2 );
    } );

    it( 'should round the input value for the green channel', () => {
      // arrange
      const c = new Color();

      // act
      c.g = 1.2;

      // assert
      expect( c.g ).to.equal( 1 );
    } );

    it( 'should apply upper limit to the input value for the green channel', () => {
      // arrange
      const c = new Color();

      // act
      c.g = 300;

      // assert
      expect( c.g ).to.equal( 255 );
    } );

    it( 'should apply lower limit to the input value for the green channel', () => {
      // arrange
      const c = new Color();

      // act
      c.g = -5;

      // assert
      expect( c.g ).to.equal( 0 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const c = new Color();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // act
      c.g = 1;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const c = new Color( 1, 2, 3 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // act
      c.g = 2;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter b', () => {
    it( 'should get blue channel value', () => {
      // arrange
      const c = new Color( 1, 2, 3 );

      // act and assert
      expect( c.b ).to.equal( 3 );
    } );
  } );

  describe( 'setter b', () => {
    it( 'should set blue channel value', () => {
      // arrange
      const c = new Color();

      // act
      c.b = 1;

      // assert
      expect( c.b ).to.equal( 1 );
    } );

    it( 'should round the input value for the blue channel', () => {
      // arrange
      const c = new Color();

      // act
      c.b = 1.2;

      // assert
      expect( c.b ).to.equal( 1 );
    } );

    it( 'should apply upper limit to the input value for the blue channel', () => {
      // arrange
      const c = new Color();

      // act
      c.b = 300;

      // assert
      expect( c.b ).to.equal( 255 );
    } );

    it( 'should apply lower limit to the input value for the blue channel', () => {
      // arrange
      const c = new Color();

      // act
      c.b = -5;

      // assert
      expect( c.b ).to.equal( 0 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const c = new Color();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // act
      c.b = 1;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const c = new Color( 1, 2, 3 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // act
      c.b = 3;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter a', () => {
    it( 'should get opacity channel value', () => {
      // arrange
      const c = new Color( 1, 2, 3, 0.2 );

      // act and assert
      expect( c.a ).to.equal( 0.2 );
    } );
  } );

  describe( 'setter a', () => {
    it( 'should set opacity channel value', () => {
      // arrange
      const c = new Color();

      // act
      c.a = 0.2;

      // assert
      expect( c.a ).to.equal( 0.2 );
    } );

    it( 'should apply upper limit to the input value for the opacity channel', () => {
      // arrange
      const c = new Color();

      // act
      c.a = 1.2;

      // assert
      expect( c.a ).to.equal( 1 );
    } );

    it( 'should apply lower limit to the input value for the opacity channel', () => {
      // arrange
      const c = new Color();

      // act
      c.a = -1;

      // assert
      expect( c.a ).to.equal( 0 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const c = new Color();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // act
      c.a = 0.2;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const c = new Color( 1, 2, 3, 0.2 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // act
      c.a = 0.2;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'getter rgba', () => {
    it( 'should get the rgba string representation', () => {
      // arrange
      const c = new Color( 1, 2, 3, 0.2 );

      // act and assert
      expect( c.rgba ).to.equal( 'rgba(1,2,3,0.2)' );
    } );
  } );

  describe( 'getter hex', () => {
    it( 'should get the hexadecimal string representation', () => {
      // arrange
      const c = new Color( 255, 140, 100 );

      // act and assert
      expect( c.hex ).to.equal( '#ff8c64' );
    } );
  } );

  describe( 'constructor', () => {
    it( 'should set the properties', () => {
      // act
      const c = new Color( 1, 2, 3, 0.2 );

      // assert
      expect( c.r ).to.equal( 1 );
      expect( c.g ).to.equal( 2 );
      expect( c.b ).to.equal( 3 );
      expect( c.a ).to.equal( 0.2 );
    } );

    it( 'should set the opacity channel to 1 if not passed', () => {
      // act
      const c = new Color( 1, 2, 3 );

      // assert
      expect( c.a ).to.equal( 1 );
    } );

    it( 'should set zero values for color channels if uninitialised', () => {
      // act
      const c = new Color();

      // assert
      expect( c.r ).to.equal( 0 );
      expect( c.g ).to.equal( 0 );
      expect( c.b ).to.equal( 0 );
    } );

    it( 'should apply limits to input values', () => {
      // act
      const c = new Color( -6, 34, 300, 2 );
      const expected = new Color( 0, 34, 255, 1 );

      // assert
      expect( c.equals( expected ) ).to.be.true;
    } );

    it( 'should round input values except for opacity', () => {
      // act
      const c = new Color( 0.2, 5.5, 7.7, 0.2 );
      const expected = new Color( 0, 6, 8, 0.2 );

      // assert
      expect( c.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'set', () => {
    it( 'should set the properties', () => {
      // arrange
      const c = new Color();

      // act
      c.set( 1, 2, 3, 0.2 );

      // assert
      expect( c.r ).to.equal( 1 );
      expect( c.g ).to.equal( 2 );
      expect( c.b ).to.equal( 3 );
      expect( c.a ).to.equal( 0.2 );
    } );

    it( 'should apply limits to input values', () => {
      // arrange
      const c = new Color();

      // act
      c.set( -6, 34, 300, 2 );

      // assert
      const expected = new Color( 0, 34, 255, 1 );
      expect( c.equals( expected ) ).to.be.true;
    } );

    it( 'should round input values except for opacity', () => {
      // arrange
      const c = new Color();

      // act
      c.set( 0.2, 5.5, 7.7, 0.2 );

      // assert
      const expected = new Color( 0, 6, 8, 0.2 );
      expect( c.equals( expected ) ).to.be.true;
    } );

    it( 'should not change opacity channel if not passed', () => {
      // arrange
      const c = new Color( 1, 2, 3, 0.2 );

      // act
      c.set( 1, 2, 3 );

      // assert
      expect( c.a ).to.equal( 0.2 );
    } );

    it( 'should call notifyObservers', () => {
      // arrange
      const c = new Color();
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // act
      c.set( 1, 2, 3, 0.2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', () => {
      // arrange
      const c = new Color( 1, 2, 3, 0.2 );
      const spy = sinon.spy( c as any, 'notifyObservers' );

      // act
      c.set( 1, 2, 3, 0.2 );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'setFromHex', () => {
    it( 'should set from hexadecimal string and opacity', () => {
      // arrange
      const c = new Color();

      // act
      c.setFromHex( '#ff8c64', 0.2 );

      // assert
      const expected = new Color( 255, 140, 100, 0.2 );
      expect( c.equals( expected ) ).to.be.true;
    } );

    it( 'should not change opacity channel if not passed', () => {
      // arrange
      const c = new Color( 1, 2, 3, 0.2 );

      // act
      c.setFromHex( '#ff8c64' );

      // assert
      expect( c.a ).to.equal( 0.2 );
    } );

    it( 'should call set', () => {
      // arrange
      const c = new Color();
      const spy = sinon.spy( c, 'set' );

      // act
      c.setFromHex( '#ff8c64' );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'copy', () => {
    it( 'should copy the properties', () => {
      // arrange
      const c1 = new Color();
      const c2 = new Color( 1, 2, 3, 0.2 );

      // act
      c1.copy( c2 );

      // assert
      expect( c1.equals( c2 ) ).to.be.true;
    } );

    it( 'should call set', () => {
      // arrange
      const c1 = new Color();
      const c2 = new Color( 1, 2, 3, 0.2 );
      const spy = sinon.spy( c1, 'set' );

      // act
      c1.copy( c2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clone', () => {
    it( 'should return an object with the same value', () => {
      // arrange
      const c = new Color( 1, 2, 3, 0.2 );

      // act
      const result = c.clone();

      // assert
      expect( result.equals( c ) ).to.be.true;
    } );

    it( 'should not call notifyObservers when original value changes', () => {
      // arrange
      const c = new Color( 1, 2, 3, 0.2 );
      const clone = c.clone();
      const spy = sinon.spy( clone as any, 'notifyObservers' );

      // act
      c.r = 100;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', () => {
    it( 'should return true if values equal', () => {
      // arrange
      const c1 = new Color( 1, 2, 3, 0.2 );
      const c2 = new Color( 1, 2, 3, 0.2 );

      // act
      const result = c1.equals( c2 );

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
      // arrange
      const c1 = new Color( 1, 2, 3, 0.2 );
      const c2 = new Color( 1, 2, 4, 0.2 );

      // act
      const result = c1.equals( c2 );

      // assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'lerp', () => {
    it( 'should interpolate between two Colors', () => {
      // arrange
      const c = new Color();
      const start = new Color( 0, 203, 190, 0.1 );
      const end = new Color( 0, 247, 98, 0.9 );

      // act
      c.lerp( start, end, 0.25 );

      // assert
      expect( c.r ).to.be.closeTo( 0, 0.001 );
      expect( c.g ).to.be.closeTo( 214, 0.001 );
      expect( c.b ).to.be.closeTo( 167, 0.001 );
      expect( c.a ).to.be.closeTo( 0.3, 0.001 );
    } );

    it( 'should call set', () => {
      // arrange
      const c = new Color();
      const start = new Color();
      const end = new Color();
      const spy = sinon.spy( c, 'set' );

      // act
      c.lerp( start, end, 0.5 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );
} );
