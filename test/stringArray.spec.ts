import { expect } from 'chai';
import * as sinon from 'sinon';

import { StringArray } from '../lib/stringArray';
import { StringValue } from '../lib/stringValue';

describe( 'StringArray', (): void => {
  describe( 'clone', (): void => {
    it( 'should return an array with the same elements', (): void => {
      // Arrange
      const string1 = new StringValue( 'one' );
      const string2 = new StringValue( 'two' );
      const array1 = new StringArray();
      array1.elements = [ string1, string2 ];

      // Act
      const array2 = array1.clone();

      // Assert
      expect( array2.elements.length ).to.equal( 2 );
      expect( array2.elements[ 0 ].equals( string1 ) ).to.be.true;
      expect( array2.elements[ 1 ].equals( string2 ) ).to.be.true;
    } );

    it( 'should not call observers when original array changes', (): void => {
      // Arrange
      const string1 = new StringValue( 'one' );
      const string2 = new StringValue( 'two' );
      const array1 = new StringArray();
      array1.elements = [ string1, string2 ];

      const array2 = array1.clone();
      const spy = sinon.spy( array2 as any, 'notifyObservers' );

      // Act
      const string3 = new StringValue( 'three' );
      array1.push( string3 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should call observers when original element changes', (): void => {
      // Arrange
      const string1 = new StringValue( 'one' );
      const string2 = new StringValue( 'two' );
      const array1 = new StringArray();
      array1.elements = [ string1, string2 ];

      const array2 = array1.clone();
      const spy = sinon.spy( array2 as any, 'notifyObservers' );

      // Act
      string1.value = 'three';

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'cloneDeep', (): void => {
    it( 'should return an array with equal elements', (): void => {
      // Arrange
      const string1 = new StringValue( 'one' );
      const string2 = new StringValue( 'two' );
      const array1 = new StringArray();
      array1.elements = [ string1, string2 ];

      // Act
      const array2 = array1.cloneDeep();

      // Assert
      expect( array2.elements.length ).to.equal( 2 );
      expect( array2.elements[ 0 ].equals( string1 ) ).to.be.true;
      expect( array2.elements[ 1 ].equals( string2 ) ).to.be.true;
    } );

    it( 'should not call observers when original array changes', (): void => {
      // Arrange
      const string1 = new StringValue( 'one' );
      const string2 = new StringValue( 'two' );
      const array1 = new StringArray();
      array1.elements = [ string1, string2 ];

      const array2 = array1.cloneDeep();
      const spy = sinon.spy( array2 as any, 'notifyObservers' );

      // Act
      const string3 = new StringValue( 'three' );
      array1.push( string3 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should not call observers when original element changes', (): void => {
      // Arrange
      const string1 = new StringValue( 'one' );
      const string2 = new StringValue( 'two' );
      const array1 = new StringArray();
      array1.elements = [ string1, string2 ];

      const array2 = array1.cloneDeep();
      const spy = sinon.spy( array2 as any, 'notifyObservers' );

      // Act
      string1.value = 'three';

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );
} );
