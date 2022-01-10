import { expect } from 'chai';
import * as sinon from 'sinon';

import { Box2, Matrix3, Vector2, Vector2Array } from '../lib';

describe( 'Vector2Array', (): void => {
  describe( 'initializeElements', (): void => {
    it( 'should add n elements to the array', (): void => {
      // Arrange
      const array = new Vector2Array();

      // Act
      array.initializeElements( 3 );

      // Assert
      expect( array.elements.length ).to.equal( 3 );
    } );

    it( 'should not add elements if n is negative', (): void => {
      // Arrange
      const array = new Vector2Array();

      // Act
      array.initializeElements( -1 );

      // Assert
      expect( array.elements.length ).to.equal( 0 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const array = new Vector2Array();
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      array.initializeElements( 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'copyElementWise', (): void => {
    it( 'should set each vector to the value of the given array of vectors', (): void => {
      // Arrange
      const array1 = new Vector2Array();
      array1.initializeElements( 2 );

      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array2 = new Vector2Array();
      array2.elements = [ point1, point2 ];

      // Act
      array1.copyElementWise( array2 );

      // Assert
      expect( array1.elements.length ).to.equal( 2 );
      expect( array1.elements[ 0 ].equals( point1 ) ).to.be.true;
      expect( array1.elements[ 1 ].equals( point2 ) ).to.be.true;
    } );

    it( 'should call observers for every change when there are multiple changes', (): void => {
      // Arrange
      const array1 = new Vector2Array();
      array1.initializeElements( 2 );

      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array2 = new Vector2Array();
      array2.elements = [ point1, point2 ];

      const spy = sinon.spy( array1 as any, 'notifyObservers' );

      // Act
      array1.copyElementWise( array2 );

      // Assert
      expect( spy.calledTwice ).to.be.true;
    } );

    it( 'should not call observers when there are no actual value changes', (): void => {
      // Arrange
      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );

      const array1 = new Vector2Array();
      array1.elements = [ point1.clone(), point2.clone() ];

      const array2 = new Vector2Array();
      array2.elements = [ point1.clone(), point2.clone() ];

      const spy = sinon.spy( array1 as any, 'notifyObservers' );

      // Act
      array1.copyElementWise( array2 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should not call observers when original array changes', (): void => {
      // Arrange
      const array1 = new Vector2Array();
      array1.initializeElements( 2 );

      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array2 = new Vector2Array();
      array2.elements = [ point1, point2 ];

      // Act
      array1.copyElementWise( array2 );

      const spy = sinon.spy( array1 as any, 'notifyObservers' );
      const point3 = new Vector2( 5, 6 );
      array2.push( point3 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should not call observers when original element changes', (): void => {
      // Arrange
      const array1 = new Vector2Array();
      array1.initializeElements( 2 );

      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array2 = new Vector2Array();
      array2.elements = [ point1, point2 ];

      // Act
      array1.copyElementWise( array2 );

      const spy = sinon.spy( array1 as any, 'notifyObservers' );
      point1.set( 5, 6 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should throw an error when the array lengths do not match', (): void => {
      // Arrange
      const array1 = new Vector2Array();
      array1.initializeElements( 1 );

      const array2 = new Vector2Array();
      array2.initializeElements( 2 );

      // Act
      const badFn = (): void => {
        array1.copyElementWise( array2 );
      };

      // Assert
      expect( badFn ).to.throw( 'Array lengths do not match.' );
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should return an array with the same elements', (): void => {
      // Arrange
      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array1 = new Vector2Array();
      array1.elements = [ point1, point2 ];

      // Act
      const array2 = array1.clone();

      // Assert
      expect( array2.elements.length ).to.equal( 2 );
      expect( array2.elements[ 0 ].equals( point1 ) ).to.be.true;
      expect( array2.elements[ 1 ].equals( point2 ) ).to.be.true;
    } );

    it( 'should not call observers when original array changes', (): void => {
      // Arrange
      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array1 = new Vector2Array();
      array1.elements = [ point1, point2 ];

      const array2 = array1.clone();
      const spy = sinon.spy( array2 as any, 'notifyObservers' );

      // Act
      const point3 = new Vector2( 5, 6 );
      array1.push( point3 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should call observers when original element changes', (): void => {
      // Arrange
      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array1 = new Vector2Array();
      array1.elements = [ point1, point2 ];

      const array2 = array1.clone();
      const spy = sinon.spy( array2 as any, 'notifyObservers' );

      // Act
      point1.set( 5, 6 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'cloneDeep', (): void => {
    it( 'should return an array with equal elements', (): void => {
      // Arrange
      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array1 = new Vector2Array();
      array1.elements = [ point1, point2 ];

      // Act
      const array2 = array1.cloneDeep();

      // Assert
      expect( array2.elements.length ).to.equal( 2 );
      expect( array2.elements[ 0 ].equals( point1 ) ).to.be.true;
      expect( array2.elements[ 1 ].equals( point2 ) ).to.be.true;
    } );

    it( 'should not call observers when original array changes', (): void => {
      // Arrange
      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array1 = new Vector2Array();
      array1.elements = [ point1, point2 ];

      const array2 = array1.cloneDeep();
      const spy = sinon.spy( array2 as any, 'notifyObservers' );

      // Act
      const point3 = new Vector2( 5, 6 );
      array1.push( point3 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should not call observers when original element changes', (): void => {
      // Arrange
      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array1 = new Vector2Array();
      array1.elements = [ point1, point2 ];

      const array2 = array1.cloneDeep();
      const spy = sinon.spy( array2 as any, 'notifyObservers' );

      // Act
      point1.set( 5, 6 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'transform', (): void => {
    it( 'should transform every vector in the array', (): void => {
      // Arrange
      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array = new Vector2Array();
      array.elements = [ point1, point2 ];
      const m = new Matrix3().setTranslation( new Vector2( 5, 6 ) );

      // Act
      array.transform( m );

      // Assert
      expect( array.elements[ 0 ].equals( new Vector2( 6, 8 ) ) ).to.be.true;
      expect( array.elements[ 1 ].equals( new Vector2( 8, 10 ) ) ).to.be.true;
    } );

    it( 'should notify observers', (): void => {
      // Arrange
      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 3, 4 );
      const array = new Vector2Array();
      array.elements = [ point1, point2 ];
      const m = new Matrix3().setTranslation( new Vector2( 5, 6 ) );
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      array.transform( m );

      // Assert
      expect( spy.calledTwice ).to.be.true;
    } );
  } );

  describe( 'getBox', (): void => {
    it( 'should get the bounding box of all vectors of the array', (): void => {
      // Arrange
      const point1 = new Vector2( 1, 2 );
      const point2 = new Vector2( 5, 4 );
      const point3 = new Vector2( 3, 6 );
      const array = new Vector2Array();
      array.elements = [ point1, point2, point3 ];

      // Act
      const result = array.getBox();

      // Assert
      const expectedBox = new Box2( new Vector2( 1, 2 ), new Vector2( 5, 6 ) );
      expect( result.equals( expectedBox ) ).to.be.true;
    } );

    it( 'should return empty box if the array is empty', (): void => {
      // Arrange
      const array = new Vector2Array();

      // Act
      const result = array.getBox();

      // Assert
      expect( result.isEmpty ).to.be.true;
    } );
  } );
} );
