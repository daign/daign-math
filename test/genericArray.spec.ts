import { expect } from 'chai';
import * as sinon from 'sinon';

import { GenericArray, Value } from '../lib';

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

    it( 'should remove named mappings for all previous elements', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value, 'TestName' );

      // Act
      array.elements = [];

      // Assert
      expect( array.names.length ).to.equal( 0 );
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

  describe( 'get names', (): void => {
    it( 'should return array of names', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value, 'TestName1' );
      array.push( value, 'TestName2' );

      // Act
      const result = array.names;

      // Assert
      expect( result.length ).to.equal( 2 );
      expect( result.indexOf( 'TestName1' ) !== -1 ).to.be.true;
      expect( result.indexOf( 'TestName2' ) !== -1 ).to.be.true;
    } );

    it( 'should return empty array if there are no named mappings', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );

      // Act
      const result = array.names;

      // Assert
      expect( result.length ).to.equal( 0 );
    } );
  } );

  describe( 'containsName', (): void => {
    it( 'should return true if the name is in the mapping', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value, 'TestName1' );
      array.push( value, 'TestName12' );

      // Act
      const result = array.containsName( 'TestName1' );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if the name is not in the mapping', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value, 'TestName12' );
      array.push( value, 'TestName123' );

      // Act
      const result = array.containsName( 'TestName1' );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false if the named mapping is empty', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );

      // Act
      const result = array.containsName( 'TestName1' );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'copyElements', (): void => {
    it( 'should set the elements from another array', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array1 = new TestClass();
      array1.elements = [ value1, value2 ];
      const array2 = new TestClass();

      // Act
      array2.copyElements( array1 );

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
      array2.copyElements( array1 );
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
      array2.copyElements( array1 );

      // Assert
      expect( spy.set.calledOnce ).to.be.true;
    } );

    it( 'should not copy the named mapping', (): void => {
      // Arrange
      const value = new Value();
      const array1 = new TestClass();
      array1.push( value, 'TestName' );
      const array2 = new TestClass();

      // Act
      array2.copyElements( array1 );

      // Assert
      expect( array1.names.length ).to.equal( 1 );
      expect( array2.names.length ).to.equal( 0 );
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

  describe( 'getByName', (): void => {
    it( 'should get the element with the name', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.push( value1, 'TestName1' );
      array.push( value2, 'TestName2' );

      // Act
      const result = array.getByName( 'TestName1' );

      // Assert
      expect( result.x ).to.equal( 1 );
    } );

    it( 'should throw error if the name is not in the named mapping', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value, 'TestName12' );

      // Act
      const badFn = (): void => {
        array.getByName( 'TestName1' );
      };

      // Assert
      expect( badFn ).to.throw( 'No element exists for the given name.' );
    } );
  } );

  describe( 'assignName', (): void => {
    it( 'should add the element to the named mapping', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.elements = [ value1, value2 ];

      // Act
      array.assignName( 'TestName1', 0 );

      // Assert
      expect( array.names.length ).to.equal( 1 );
      expect( array.getByName( 'TestName1' ).x ).to.equal( 1 );
    } );

    it( 'should throw error if the name is not unique', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );
      array.push( value, 'TestName1' );

      // Act
      const badFn = (): void => {
        array.assignName( 'TestName1', 0 );
      };

      // Assert
      expect( badFn ).to.throw( 'Name is not unique.' );
    } );

    it( 'should throw error if index is out of bounds', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.elements = [ value, value ];

      // Act
      const badFn = (): void => {
        array.assignName( 'TestName1', 2 );
      };

      // Assert
      expect( badFn ).to.throw( 'The index of the element to be named is out of bounds.' );
    } );

    it( 'should not call notifyObservers', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.elements = [ value, value ];
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      array.assignName( 'TestName1', 0 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'removeName', (): void => {
    it( 'should remove the name from the named mapping', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.push( value1, 'TestName1' );
      array.push( value2, 'TestName2' );
      expect( array.names.length ).to.equal( 2 );

      // Act
      array.removeName( 'TestName1' );

      // Assert
      expect( array.names.length ).to.equal( 1 );
      expect( array.names[ 0 ] ).to.equal( 'TestName2' );
    } );

    it( 'should not remove the name element from the array', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.push( value1, 'TestName1' );
      array.push( value2, 'TestName2' );

      // Act
      array.removeName( 'TestName1' );

      // Assert
      expect( array.getElement( 0 )!.x ).to.equal( 1 );
    } );

    it( 'should throw error if the name does not exist', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );

      // Act
      const badFn = (): void => {
        array.removeName( 'TestName' );
      };

      // Assert
      expect( badFn ).to.throw( 'Name does not exist in mapping.' );
    } );

    it( 'should not call notifyObservers', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value, 'TestName' );
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      array.removeName( 'TestName' );

      // Assert
      expect( spy.notCalled ).to.be.true;
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

    it( 'should add the element to the named mapping if name is passed', (): void => {
      // Arrange
      const value = new Value( 1 );
      const array = new TestClass();

      // Act
      array.push( value, 'TestName1' );

      // Assert
      expect( array.names.length ).to.equal( 1 );
      expect( array.getByName( 'TestName1' ).x ).to.equal( 1 );
    } );

    it( 'should throw error if the name is not unique', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );
      array.push( value, 'TestName1' );

      // Act
      const badFn = (): void => {
        array.push( value, 'TestName1' );
      };

      // Assert
      expect( badFn ).to.throw( 'Name is not unique.' );
    } );
  } );

  describe( 'insert', (): void => {
    it( 'should add the element at the specified index', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.elements = [ value1, value2 ];

      // Act
      const value3 = new Value( 3 );
      array.insert( value3, 1 );

      // Assert
      expect( array.elements.length ).to.equal( 3 );
      expect( array.elements[ 1 ].x ).to.equal( 3 );
    } );

    it( 'should shift all following elements', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.elements = [ value1, value2 ];

      // Act
      const value3 = new Value( 3 );
      array.insert( value3, 0 );

      // Assert
      expect( array.elements.length ).to.equal( 3 );
      expect( array.elements[ 1 ].x ).to.equal( 1 );
      expect( array.elements[ 2 ].x ).to.equal( 2 );
    } );

    it( 'should allow adding the element at the first unused index', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const array = new TestClass();
      array.elements = [ value1, value2 ];

      // Act
      const value3 = new Value( 3 );
      array.insert( value3, 2 );

      // Assert
      expect( array.elements.length ).to.equal( 3 );
      expect( array.elements[ 2 ].x ).to.equal( 3 );
    } );

    it( 'should add a subscription remover function', (): void => {
      // Arrange
      const array = new TestClass();

      // Act
      const value = new Value();
      array.insert( value, 0 );

      // Assert
      expect( ( array as any ).subscriptionRemovers.length ).to.equal( 1 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const array = new TestClass();
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      const value = new Value();
      array.insert( value, 0 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should call notifyObservers when the added element changes', (): void => {
      // Arrange
      const value = new Value( 1 );
      const array = new TestClass();
      array.insert( value, 0 );
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      value.x = 2;

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should add the element to the named mapping if name is passed', (): void => {
      // Arrange
      const value = new Value( 1 );
      const array = new TestClass();

      // Act
      array.insert( value, 0, 'TestName1' );

      // Assert
      expect( array.names.length ).to.equal( 1 );
      expect( array.getByName( 'TestName1' ).x ).to.equal( 1 );
    } );

    it( 'should throw error if the name is not unique', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );
      array.push( value, 'TestName1' );

      // Act
      const badFn = (): void => {
        array.insert( value, 0, 'TestName1' );
      };

      // Assert
      expect( badFn ).to.throw( 'Name is not unique.' );
    } );

    it( 'should throw error if the index is out of bounds', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );

      // Act
      const badFn = (): void => {
        array.insert( value, 2 );
      };

      // Assert
      expect( badFn ).to.throw( 'The index is out of bounds for array insertion.' );
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

    it( 'should not remove the element from the named mapping', (): void => {
      // Arrange
      const value = new Value( 1 );
      const array = new TestClass();
      array.push( value, 'TestName' );

      // Act
      array.pop();

      // Assert
      expect( array.elements.length ).to.equal( 0 );
      expect( array.getByName( 'TestName' ).x ).to.equal( 1 );
    } );
  } );

  describe( 'remove', (): void => {
    it( 'should remove and return the element at the index position', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const value3 = new Value( 3 );
      const array = new TestClass();
      array.elements = [ value1, value2, value3 ];

      // Act
      const result = array.remove( 1 );

      // Assert
      expect( array.elements.length ).to.equal( 2 );
      expect( result.x ).to.equal( 2 );
    } );

    it( 'should shift all following elements', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const value3 = new Value( 3 );
      const array = new TestClass();
      array.elements = [ value1, value2, value3 ];

      // Act
      array.remove( 1 );

      // Assert
      expect( array.elements.length ).to.equal( 2 );
      expect( array.elements[ 0 ].x ).to.equal( 1 );
      expect( array.elements[ 1 ].x ).to.equal( 3 );
    } );

    it( 'should allow removing the element at the last index', (): void => {
      // Arrange
      const value1 = new Value( 1 );
      const value2 = new Value( 2 );
      const value3 = new Value( 3 );
      const array = new TestClass();
      array.elements = [ value1, value2, value3 ];

      // Act
      const result = array.remove( 2 );

      // Assert
      expect( array.elements.length ).to.equal( 2 );
      expect( result.x ).to.equal( 3 );
    } );

    it( 'should allow removing the only element of the array', (): void => {
      // Arrange
      const value = new Value( 1 );
      const array = new TestClass();
      array.elements = [ value ];

      // Act
      const result = array.remove( 0 );

      // Assert
      expect( array.elements.length ).to.equal( 0 );
      expect( result.x ).to.equal( 1 );
    } );

    it( 'should call the subscription remover function', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );

      // Act
      array.remove( 0 );

      // Assert
      expect( ( value as any ).listeners.length ).to.equal( 0 );
    } );

    it( 'should remove the subscription remover function', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );

      // Act
      array.remove( 0 );

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
      array.remove( 0 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when the removed element changes', (): void => {
      // Arrange
      const value = new Value( 1 );
      const array = new TestClass();
      array.push( value );
      array.remove( 0 );
      const spy = sinon.spy( array as any, 'notifyObservers' );

      // Act
      value.x = 2;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should throw error if the index is out of bounds', (): void => {
      // Arrange
      const value = new Value();
      const array = new TestClass();
      array.push( value );

      // Act
      const badFn = (): void => {
        array.remove( 1 );
      };

      // Assert
      expect( badFn ).to.throw( 'The index is out of bounds for removal from array.' );
    } );

    it( 'should not remove the element from the named mapping', (): void => {
      // Arrange
      const value = new Value( 1 );
      const array = new TestClass();
      array.push( value, 'TestName' );

      // Act
      array.remove( 0 );

      // Assert
      expect( array.elements.length ).to.equal( 0 );
      expect( array.getByName( 'TestName' ).x ).to.equal( 1 );
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

    it( 'should not call the function if array has only one element', (): void => {
      // Arrange
      const value = new Value( 1 );
      const array = new TestClass();
      array.elements = [ value ];
      const spy = sinon.spy();

      // Act
      array.iteratePairwise( spy );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );
} );
