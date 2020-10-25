import { expect } from 'chai';
import * as sinon from 'sinon';

import { GenericArray } from '../lib/genericArray';
import { Value } from '../lib/value';

class TestClass extends GenericArray<Value> {
  public constructor() {
    super();
  }
}

describe( 'GenericArray', (): void => {
  describe( 'get elements', (): void => {
    it( 'should return the elements', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.elements = [ value1, value2 ];

      // Act
      const result = array.elements;

      // Assert
      expect( result.length ).to.equal( 2 );
      expect( result[ 0 ].x ).to.equal( 1 );
      expect( result[ 1 ].x ).to.equal( 2 );
    } );

    it( 'should not change internal array when returned elements array is changed', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.elements = [ value, value ];

      // Act
      array.elements.pop();
      const result = array.elements;

      // Assert
      expect( result.length ).to.equal( 2 );
    } );
  } );

  describe( 'set elements', (): void => {
    it( 'should set the elements', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();

      // Act
      array.elements = [ value1, value2 ];

      // Assert
      expect( ( array as any )._elements.length ).to.equal( 2 );
      expect( ( array as any )._elements[ 0 ].x ).to.equal( 1 );
      expect( ( array as any )._elements[ 1 ].x ).to.equal( 2 );
    } );

    it( 'should create subscription removers for all elements', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();

      // Act
      array.elements = [ value, value ];

      // Assert
      expect( ( array as any ).subscriptionRemovers.length ).to.equal( 2 );
    } );

    it( 'should call subscription removers for all previous elements', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.elements = [ value, value ];
      expect( ( value as any ).listeners.length ).to.equal( 2 );

      // Act
      array.elements = [];

      // Assert
      expect( ( value as any ).listeners.length ).to.equal( 0 );
    } );

    it( 'should delete subscription removers for all previous elements', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.elements = [ value, value ];

      // Act
      array.elements = [];

      // Assert
      expect( ( array as any ).subscriptionRemovers.length ).to.equal( 0 );
    } );

    it( 'should not change internal array when input array is changed', (): void => {
      // Arrange
      const value = new Value();
      const inputArray = [ value, value ];
      const array = new TestClass();

      // Act
      array.elements = inputArray;
      inputArray.pop();

      // Assert
      expect( array.elements.length ).to.equal( 2 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      array.elements = [ value ];

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should call notifyObservers when an added element changes', (): void => {
      // Arrange
      const value = new Value( 1 );
      const array = new TestClass();
      array.elements = [ value ];
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      value.x = 2;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'get length', (): void => {
    it( 'should return the number of elements', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.elements = [ value1, value2, value1 ];

      // Act
      const result = array.length;

      // Assert
      expect( result ).to.equal( 3 );
    } );

    it( 'should return 0 if the array is empty', (): void => {
      // Arrange
      const array = new TestClass();

      // Act
      const result = array.length;

      // Assert
      expect( result ).to.equal( 0 );
    } );
  } );

  describe( 'copy', (): void => {
    it( 'should set the elements from another array', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array1 = new TestClass();
      array1.elements = [ value1, value2 ];
      const array2 = new TestClass();

      // Act
      array2.copy( array1 );

      // Assert
      expect( array2.elements.length ).to.equal( 2 );
      expect( array2.elements[ 0 ].x ).to.equal( 1 );
      expect( array2.elements[ 1 ].x ).to.equal( 2 );
    } );

    it( 'should not change when the copied array changes', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array1 = new TestClass();
      array1.elements = [ value1, value2 ];
      const array2 = new TestClass();

      // Act
      array2.copy( array1 );
      const value3 = new Value( 3 );
      array1.push( value3 );

      // Assert
      expect( array2.elements.length ).to.equal( 2 );
      expect( array2.elements[ 0 ].x ).to.equal( 1 );
      expect( array2.elements[ 1 ].x ).to.equal( 2 );
    } );

    it( 'should call the setter for the elements', (): void => {
      // Arrange
      const value = new Value();
      const array1 = new TestClass();
      array1.elements = [ value, value ];
      const array2 = new TestClass();
      const spy = sinon.spy( array2, 'elements', [ 'set' ] );

      // Act
      array2.copy( array1 );

      // Assert
      expect( spy.set.calledOnce ).to.be.true;
    } );
  } );

  describe( 'getElement', (): void => {
    it( 'should get the element at the index', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.elements = [ value1, value2 ];

      // Act
      const result = array.getElement( 1 );

      // Assert
      expect( result!.x ).to.equal( 2 );
    } );

    it( 'should return undefined if index is out of bounds', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.elements = [ value1, value2 ];

      // Act
      const result = array.getElement( 2 );

      // Assert
      expect( result ).to.be.undefined;
    } );
  } );

  describe( 'push', (): void => {
    it( 'should add the element to the end', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.elements = [ value1, value2 ];

      // Act
      const value3 = new Value( 3 );
      array.push( value3 );

      // Assert
      expect( array.elements.length ).to.equal( 3 );
      expect( array.elements[ 2 ].x ).to.equal( 3 );
    } );

    it( 'should add a subscription remover function', (): void => {
      // Arrange
      const array = new TestClass();

      // Act
      const value = new Value();
      array.push( value );

      // Assert
      expect( ( array as any ).subscriptionRemovers.length ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const array = new TestClass();
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      const value = new Value();
      array.push( value );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should call notifyObservers when the added element changes', (): void => {
      // Arrange
      const value = new Value( 1 );
      const array = new TestClass();
      array.push( value );
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      value.x = 2;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'pop', (): void => {
    it( 'should remove and return the last element', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.elements = [ value1, value2 ];

      // Act
      const result = array.pop();

      // Assert
      expect( array.elements.length ).to.equal( 1 );
      expect( result!.x ).to.equal( 2 );
    } );

    it( 'should return undefined if the array is empty', (): void => {
      // Arrange
      const array = new TestClass();

      // Act
      const result = array.pop();

      // Assert
      expect( result ).to.be.undefined;
    } );

    it( 'should call the subscription remover function', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );

      // Act
      array.pop();

      // Assert
      expect( ( value as any ).listeners.length ).to.equal( 0 );
    } );

    it( 'should remove the subscription remover function', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );

      // Act
      array.pop();

      // Assert
      expect( ( array as any ).subscriptionRemovers.length ).to.equal( 0 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      array.pop();

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when the array was empty', (): void => {
      // Arrange
      const array = new TestClass();
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      array.pop();

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should not call notifyObservers when the removed element changes', (): void => {
      // Arrange
      const value = new Value( 1 );
      const array = new TestClass();
      array.push( value );
      array.pop();
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      value.x = 2;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'iterate', (): void => {
    it( 'should call the function with every element', (): void => {
      // Arrange
      const value1 = new Value( 3 );
      const value2 = new Value( 4 );
      const array = new TestClass();
      array.elements = [ value1, value2 ];
      const spy = sinon.spy();

      // Act
      array.iterate( spy );

      // Assert
      expect( spy.calledTwice ).to.be.true;
      // Values:
      expect( spy.getCall( 0 ).args[ 0 ].x ).to.equal( 3 );
      expect( spy.getCall( 1 ).args[ 0 ].x ).to.equal( 4 );
      // Indices:
      expect( spy.getCall( 0 ).args[ 1 ] ).to.equal( 0 );
      expect( spy.getCall( 1 ).args[ 1 ] ).to.equal( 1 );
    } );

    it( 'should not call the function if array is empty', (): void => {
      // Arrange
      const array = new TestClass();
      const spy = sinon.spy();

      // Act
      array.iterate( spy );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'iteratePairwise', (): void => {
    it( 'should call the function with every pair of neighboring elements', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const value3 = new Value( 3 );
      const array = new TestClass();
      array.elements = [ value1, value2, value3 ];
      const spy = sinon.spy();

      // Act
      array.iteratePairwise( spy );

      // Assert
      expect( spy.calledTwice ).to.be.true;
      // Values:
      expect( spy.getCall( 0 ).args[ 0 ].x ).to.equal( 1 );
      expect( spy.getCall( 0 ).args[ 1 ].x ).to.equal( 2 );
      expect( spy.getCall( 1 ).args[ 0 ].x ).to.equal( 2 );
      expect( spy.getCall( 1 ).args[ 1 ].x ).to.equal( 3 );
      // Indices:
      expect( spy.getCall( 0 ).args[ 2 ] ).to.equal( 0 );
      expect( spy.getCall( 1 ).args[ 2 ] ).to.equal( 1 );
    } );

    it( 'should not call the function if array is empty', (): void => {
      // Arrange
      const array = new TestClass();
      const spy = sinon.spy();

      // Act
      array.iteratePairwise( spy );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );
} );
