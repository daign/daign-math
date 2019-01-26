import {expect} from 'chai';
import * as sinon from 'sinon';

import {Color} from './color';
import {Gradient} from './gradient';

describe( 'Gradient', () => {
  describe( 'stops getter', () => {
    it( 'should return the stops array', () => {
      // arrange
      const g = new Gradient();
      g.addColorStop( 0.5, new Color() );

      // act
      const result = g.stops;

      // assert
      expect( result.length ).to.equal( 1 );
    } );
  } );

  describe( 'constructor', () => {
    it( 'should initialize empty stop array', () => {
      // act
      const g = new Gradient();

      // assert
      expect( g.stops.length ).to.equal( 0 );
    } );
  } );

  describe( 'addColorStop', () => {
    it( 'should add a color stop', () => {
      // arrange
      const g = new Gradient();

      // act
      g.addColorStop( 0.2, new Color() );

      // assert
      expect( g.stops.length ).to.equal( 1 );
    } );

    it( 'should call observers', () => {
      // arrange
      const g = new Gradient();
      const spy = sinon.spy( g as any, 'notifyObservers' );

      // act
      g.addColorStop( 0.2, new Color() );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should call sortStops', () => {
      // arrange
      const g = new Gradient();
      const spy = sinon.spy( g as any, 'sortStops' );

      // act
      g.addColorStop( 0.2, new Color() );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should call observers if the passed color changes', () => {
      // arrange
      const g = new Gradient();
      const c = new Color();
      const spy = sinon.spy( g as any, 'notifyObservers' );

      // act
      g.addColorStop( 0.2, c );
      spy.resetHistory();
      c.r = 1;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should call sortStops if the position of the color stop changes', () => {
      // arrange
      const g = new Gradient();
      const spy = sinon.spy( g as any, 'sortStops' );

      // act
      g.addColorStop( 0.2, new Color() );
      spy.resetHistory();
      g.stops[ 0 ].position = 0.3;

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'colorAt', () => {
    it( 'should get the interpolated color', () => {
      // arrange
      const g = new Gradient();
      const c1 = new Color( 0, 203, 190, 0.1 );
      const c2 = new Color( 0, 247, 98, 0.9 );

      g.addColorStop( 0, new Color() );
      g.addColorStop( 0.2, c1 );
      g.addColorStop( 0.6, c2 );

      // act
      const result = g.colorAt( 0.3 );

      // assert
      expect( result.r ).to.be.closeTo( 0, 0.001 );
      expect( result.g ).to.be.closeTo( 214, 0.001 );
      expect( result.b ).to.be.closeTo( 167, 0.001 );
      expect( result.a ).to.be.closeTo( 0.3, 0.001 );
    } );

    it( 'should get the color of the first stop if requested position is smaller', () => {
      // arrange
      const g = new Gradient();
      const c = new Color( 0, 203, 190, 0.1 );

      g.addColorStop( 0.2, c );
      g.addColorStop( 0.6, new Color() );

      // act
      const result = g.colorAt( 0.1 );

      // assert
      expect( result.equals( c ) ).to.be.true;
    } );

    it( 'should get the color of the last stop if requested position is the same', () => {
      // arrange
      const g = new Gradient();
      const c = new Color( 0, 203, 190, 0.1 );

      g.addColorStop( 0.2, new Color() );
      g.addColorStop( 1, c );

      // act
      const result = g.colorAt( 1 );

      // assert
      expect( result.equals( c ) ).to.be.true;
    } );
  } );

  describe( 'clear', () => {
    it( 'should not call observers if referenced color changes afterwards', () => {
      // arrange
      const g = new Gradient();
      const c = new Color();
      g.addColorStop( 0.2 , c );
      const spy = sinon.spy( g as any, 'notifyObservers' );

      // act
      g.clear();
      spy.resetHistory();
      c.r = 1;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should remove listeners from referenced colors', () => {
      // arrange
      const g = new Gradient();
      const c = new Color();
      g.addColorStop( 0.2 , c );

      // act
      g.clear();

      // assert
      expect( ( c as any ).listeners.length ).to.equal( 0 );
    } );
  } );

  describe( 'copy', () => {
    it( 'should copy color value from other gradient', () => {
      // arrange
      const g1 = new Gradient();
      const g2 = new Gradient();
      const c = new Color( 1, 2, 3 );
      g2.addColorStop( 0.2, c );

      // act
      g1.copy( g2 );

      // assert
      expect( g1.stops[ 0 ].color.equals( c ) ).to.be.true;
    } );

    it( 'should call observers', () => {
      // arrange
      const g1 = new Gradient();
      const g2 = new Gradient();
      g2.addColorStop( 0.2, new Color() );
      const spy = sinon.spy( g1 as any, 'notifyObservers' );

      // act
      g1.copy( g2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call observers if copied color changes', () => {
      // arrange
      const g1 = new Gradient();
      const g2 = new Gradient();
      const c = new Color();
      g2.addColorStop( 0.2, c );
      const spy = sinon.spy( g1 as any, 'notifyObservers' );

      // act
      g1.copy( g2 );
      spy.resetHistory();
      c.r = 1;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', () => {
    it( 'should copy color value from other gradient', () => {
      // arrange
      const g = new Gradient();
      const c = new Color( 1, 2, 3 );
      g.addColorStop( 0.2, c );

      // act
      const result = g.clone();

      // assert
      expect( result.stops[ 0 ].color.equals( c ) ).to.be.true;
    } );

    it( 'should not call observers if copied color changes', () => {
      // arrange
      const g = new Gradient();
      const c = new Color();
      g.addColorStop( 0.2, c );

      // act
      const result = g.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );
      c.r = 1;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'sortStops', () => {
    it( 'should sort the color stops', () => {
      // arrange
      const g = new Gradient();
      g.addColorStop( 0.2, new Color() );
      g.addColorStop( 1, new Color() );
      g.addColorStop( 0, new Color() );

      // act
      ( g as any ).sortStops();

      // assert
      const stops = g.stops;
      expect( stops[ 0 ].position ).to.equal( 0 );
      expect( stops[ 1 ].position ).to.equal( 0.2 );
      expect( stops[ 2 ].position ).to.equal( 1 );
    } );
  } );
} );
