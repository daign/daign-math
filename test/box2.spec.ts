import { expect } from 'chai';
import * as sinon from 'sinon';

import { Box2 } from '../lib/box2';
import { Matrix3 } from '../lib/matrix3';
import { Vector2 } from '../lib/vector2';

describe( 'Box2', (): void => {
  describe( 'getter min', (): void => {
    it( 'should get min', (): void => {
      // Arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );
      const b = new Box2( min, max );

      // Act and assert
      expect( b.min.equals( min ) ).to.be.true;
    } );
  } );

  describe( 'getter max', (): void => {
    it( 'should get max', (): void => {
      // Arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );
      const b = new Box2( min, max );

      // Act and assert
      expect( b.max.equals( max ) ).to.be.true;
    } );
  } );

  describe( 'isEmpty getter', (): void => {
    it( 'should return true on uninitialized box', (): void => {
      // Arrange
      const b = new Box2();

      // Act
      const result = b.isEmpty;

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true on inverted box', (): void => {
      // Arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p2, p1 );

      // Act
      const result = b.isEmpty;

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false on non-empty box', (): void => {
      // Arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p1, p2 );

      // Act
      const result = b.isEmpty;

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false on point-size box', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 1 );
      const p2 = new Vector2( 1, 1 );
      const b = new Box2( p1, p2 );

      // Act
      const result = b.isArea;

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'isArea getter', (): void => {
    it( 'should return false on uninitialized box', (): void => {
      // Arrange
      const b = new Box2();

      // Act
      const result = b.isArea;

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false on inverted box', (): void => {
      // Arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p2, p1 );

      // Act
      const result = b.isArea;

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true on non-empty box', (): void => {
      // Arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p1, p2 );

      // Act
      const result = b.isArea;

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false on point-size box', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 1 );
      const p2 = new Vector2( 1, 1 );
      const b = new Box2( p1, p2 );

      // Act
      const result = b.isArea;

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'size getter', (): void => {
    it( 'should return zero vector on uninitialized box', (): void => {
      // Arrange
      const b = new Box2();
      const zero = new Vector2();

      // Act
      const result = b.size;

      // Assert
      expect( result.equals( zero ) ).to.be.true;
    } );

    it( 'should return zero vector on inverted box', (): void => {
      // Arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p2, p1 );
      const zero = new Vector2();

      // Act
      const result = b.size;

      // Assert
      expect( result.equals( zero ) ).to.be.true;
    } );

    it( 'should return size on non-empty box', (): void => {
      // Arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p1, p2 );
      const size = new Vector2( 8, 10 );

      // Act
      const result = b.size;

      // Assert
      expect( result.equals( size ) ).to.be.true;
    } );

    it( 'should return zero vector on point-size box', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 1 );
      const p2 = new Vector2( 1, 1 );
      const b = new Box2( p1, p2 );
      const zero = new Vector2();

      // Act
      const result = b.size;

      // Assert
      expect( result.equals( zero ) ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should create with given points', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );

      // Act
      const b = new Box2( p1, p2 );

      // Assert
      expect( b.min.equals( p1 ) ).to.be.true;
      expect( b.max.equals( p2 ) ).to.be.true;
    } );

    it( 'should initialize with Infinity if not specified', (): void => {
      // Act
      const b = new Box2();

      // Assert
      expect( b.min.x === +Infinity ).to.be.true;
      expect( b.min.y === +Infinity ).to.be.true;
      expect( b.max.x === -Infinity ).to.be.true;
      expect( b.max.y === -Infinity ).to.be.true;
    } );

    it( 'should notify observers if min point changes', (): void => {
      // Arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const b = new Box2( p1, p2 );
      const spy = sinon.spy( b as any, 'notifyObservers' );

      // Act
      p1.set( 1, 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should notify observers if max point changes', (): void => {
      // Arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const b = new Box2( p1, p2 );
      const spy = sinon.spy( b as any, 'notifyObservers' );

      // Act
      p2.set( 1, 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'copy', (): void => {
    it( 'should copy values from other box', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const b1 = new Box2();
      const b2 = new Box2( p1, p2 );

      // Act
      b1.copy( b2 );

      // Assert
      expect( b1.min.equals( p1 ) ).to.be.true;
      expect( b1.max.equals( p2 ) ).to.be.true;
    } );

    it( 'should call observers twice', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const b1 = new Box2();
      const b2 = new Box2( p1, p2 );
      const spy = sinon.spy( b1 as any, 'notifyObservers' );

      // Act
      b1.copy( b2 );

      // Assert
      expect( spy.called ).to.be.true;
      expect( spy.callCount ).to.equal( 2 );
    } );

    it( 'should not call observers if copied vectors change', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const b1 = new Box2();
      const b2 = new Box2( p1, p2 );
      const spy = sinon.spy( b1 as any, 'notifyObservers' );

      // Act
      b1.copy( b2 );
      spy.resetHistory();
      p1.set( 5, 6 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should return an object with the same values', (): void => {
      // Arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );
      const b = new Box2( min, max );

      // Act
      const result = b.clone();

      // Assert
      expect( result.min.equals( min ) ).to.be.true;
      expect( result.max.equals( max ) ).to.be.true;
    } );

    it( 'should not call observers when original box changes', (): void => {
      // Arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );
      const b = new Box2( min, max );
      const result = b.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // Act
      max.set( 5, 6 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', (): void => {
    it( 'should return true if values equal', (): void => {
      // Arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );
      const b1 = new Box2( min, max );
      const b2 = new Box2( min.clone(), max.clone() );

      // Act
      const result = b1.equals( b2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', (): void => {
      // Arrange
      const min = new Vector2( 1, 2 );
      const max1 = new Vector2( 3, 4 );
      const max2 = new Vector2( 5, 6 );
      const b1 = new Box2( min, max1 );
      const b2 = new Box2( min.clone(), max2 );

      // Act
      const result = b1.equals( b2 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true if both boxes are empty', (): void => {
      // Arrange
      const b1 = new Box2();
      const b2 = new Box2();

      // Act
      const result = b1.equals( b2 );

      // Assert
      expect( result ).to.be.true;
    } );
  } );

  describe( 'makeEmpty', (): void => {
    it( 'should make box equal to initial box', (): void => {
      // Arrange
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );
      const bInit = new Box2();

      // Act
      b.makeEmpty();

      // Assert
      expect( b.equals( bInit ) ).to.be.true;
    } );

    it( 'should call notifyObservers 4 times', (): void => {
      // Arrange
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );
      const spy = sinon.spy( b as any, 'notifyObservers' );

      // Act
      b.makeEmpty();

      // Assert
      expect( spy.callCount ).to.equal( 4 );
    } );
  } );

  describe( 'expandByScalar', (): void => {
    it( 'should make box equal to expected box', (): void => {
      // Arrange
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );
      const expected = new Box2(
        new Vector2( 2, 3 ),
        new Vector2( 6, 7 )
      );

      // Act
      b.expandByScalar( 1 );

      // Assert
      expect( b.equals( expected ) ).to.be.true;
    } );

    it( 'should call notifyObservers twice', (): void => {
      // Arrange
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );
      const spy = sinon.spy( b as any, 'notifyObservers' );

      // Act
      b.expandByScalar( 1 );

      // Assert
      expect( spy.callCount ).to.equal( 2 );
    } );

    it( 'should not change an empty box', (): void => {
      // Arrange
      const b = new Box2();
      const expected = new Box2();

      // Act
      b.expandByScalar( 1 );

      // Assert
      expect( b.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'expandByPoint', (): void => {
    it( 'should expand to point', (): void => {
      // Arrange
      const p = new Vector2( -1, 8 );
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );

      // Act
      b.expandByPoint( p );

      // Assert
      expect( b.min.equals( new Vector2( -1, 4 ) ) ).to.be.true;
      expect( b.max.equals( new Vector2( 5, 8 ) ) ).to.be.true;
    } );

    it( 'should equal the point to expand to when box was empty', (): void => {
      // Arrange
      const p = new Vector2( 1, 2 );
      const b = new Box2();

      // Act
      b.expandByPoint( p );

      // Assert
      expect( b.min.equals( p ) ).to.be.true;
      expect( b.max.equals( p ) ).to.be.true;
    } );

    it( 'should not expand if point is inside box', (): void => {
      // Arrange
      const p = new Vector2( 3, 4 );
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 5, 6 );
      const minCopy = min.clone();
      const maxCopy = max.clone();
      const b = new Box2( min, max );

      // Act
      b.expandByPoint( p );

      // Assert
      expect( b.min.equals( minCopy ) ).to.be.true;
      expect( b.max.equals( maxCopy ) ).to.be.true;
    } );

    it( 'should call notifyObservers twice if both min and max change', (): void => {
      // Arrange
      const p = new Vector2( 1, 8 );
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );
      const spy = sinon.spy( b as any, 'notifyObservers' );

      // Act
      b.expandByPoint( p );

      // Assert
      expect( spy.callCount ).to.equal( 2 );
    } );
  } );

  describe( 'expandByBox', (): void => {
    it( 'should expand to contain both boxes', (): void => {
      // Arrange
      const b1 = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 5 )
      );
      const b2 = new Box2(
        new Vector2( 3, 1 ),
        new Vector2( 5, 4 )
      );

      // Act
      b1.expandByBox( b2 );

      // Assert
      expect( b1.min.equals( new Vector2( 1, 1 ) ) ).to.be.true;
      expect( b1.max.equals( new Vector2( 5, 5 ) ) ).to.be.true;
    } );

    it( 'should not expand if box is inside box', (): void => {
      // Arrange
      const b1 = new Box2(
        new Vector2( 1, 2 ),
        new Vector2( 5, 6 )
      );
      const b2 = new Box2(
        new Vector2( 2, 3 ),
        new Vector2( 4, 5 )
      );

      // Act
      b1.expandByBox( b2 );

      // Assert
      expect( b1.min.equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( b1.max.equals( new Vector2( 5, 6 ) ) ).to.be.true;
    } );

    it( 'should not expand if box to expand to is empty', (): void => {
      // Arrange
      const b1 = new Box2(
        new Vector2( 1, 2 ),
        new Vector2( 5, 6 )
      );
      const b2 = new Box2();

      // Act
      b1.expandByBox( b2 );

      // Assert
      expect( b1.min.equals( new Vector2( 1, 2 ) ) ).to.be.true;
      expect( b1.max.equals( new Vector2( 5, 6 ) ) ).to.be.true;
    } );

    it( 'should call notifyObservers twice if both min and max change', (): void => {
      // Arrange
      const b1 = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 5 )
      );
      const b2 = new Box2(
        new Vector2( 3, 1 ),
        new Vector2( 5, 4 )
      );
      const spy = sinon.spy( b1 as any, 'notifyObservers' );

      // Act
      b1.expandByBox( b2 );

      // Assert
      expect( spy.callCount ).to.equal( 2 );
    } );
  } );

  describe( 'transform', (): void => {
    it( 'should transform min and max points', (): void => {
      // Arrange
      const b = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 5 )
      );
      const m = new Matrix3().setTranslation( new Vector2( 2, 4 ) );

      // Act
      b.transform( m );

      // Assert
      expect( b.min.equals( new Vector2( 3, 7 ) ) ).to.be.true;
      expect( b.max.equals( new Vector2( 6, 9 ) ) ).to.be.true;
    } );

    it( 'should not change an empty box', (): void => {
      // Arrange
      const b = new Box2();
      const m = new Matrix3().setTranslation( new Vector2( 2, 4 ) );

      // Act
      b.transform( m );

      // Assert
      expect( b.equals( new Box2() ) ).to.be.true;
    } );

    it( 'should mirror min and max points with negative scaling transformation', (): void => {
      // Arrange
      const b = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 5 )
      );
      const m = new Matrix3().setScaling( new Vector2( -1, -1 ) );

      // Act
      b.transform( m );

      // Assert
      expect( b.min.equals( new Vector2( -4, -5 ) ) ).to.be.true;
      expect( b.max.equals( new Vector2( -1, -3 ) ) ).to.be.true;
    } );
  } );

  describe( 'containsPoint', (): void => {
    it( 'should return true if point is contained', (): void => {
      // Arrange
      const p = new Vector2( 2, 4 );
      const b = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 5 )
      );

      // Act
      const result = b.containsPoint( p );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true if point is on the border', (): void => {
      // Arrange
      const p = new Vector2( 3, 3 );
      const b = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 5 )
      );

      // Act
      const result = b.containsPoint( p );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if point is outside of box', (): void => {
      // Arrange
      const p = new Vector2( 5, 4 );
      const b = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 5 )
      );

      // Act
      const result = b.containsPoint( p );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false if box is empty', (): void => {
      // Arrange
      const p = new Vector2( 5, 4 );
      const b = new Box2();

      // Act
      const result = b.containsPoint( p );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'containsBox', (): void => {
    it( 'should return true if box is contained', (): void => {
      // Arrange
      const b1 = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 6 )
      );
      const b2 = new Box2(
        new Vector2( 2, 4 ),
        new Vector2( 3, 5 )
      );

      // Act
      const result = b1.containsBox( b2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true if box is contained and touches the border', (): void => {
      // Arrange
      const b1 = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 6 )
      );
      const b2 = new Box2(
        new Vector2( 2, 3 ),
        new Vector2( 4, 5 )
      );

      // Act
      const result = b1.containsBox( b2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if box is outside of the other box', (): void => {
      // Arrange
      const b1 = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 6 )
      );
      const b2 = new Box2(
        new Vector2( 7, 7 ),
        new Vector2( 8, 8 )
      );

      // Act
      const result = b1.containsBox( b2 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false if box intersects the other box', (): void => {
      // Arrange
      const b1 = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 6 )
      );
      const b2 = new Box2(
        new Vector2( 2, 1 ),
        new Vector2( 4, 8 )
      );

      // Act
      const result = b1.containsBox( b2 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false if box is empty', (): void => {
      // Arrange
      const b1 = new Box2();
      const b2 = new Box2(
        new Vector2( 7, 7 ),
        new Vector2( 8, 8 )
      );

      // Act
      const result = b1.containsBox( b2 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true if box to contain is empty', (): void => {
      // Arrange
      const b1 = new Box2(
        new Vector2( 1, 3 ),
        new Vector2( 4, 6 )
      );
      const b2 = new Box2();

      // Act
      const result = b1.containsBox( b2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true if both boxes are empty', (): void => {
      // Arrange
      const b1 = new Box2();
      const b2 = new Box2();

      // Act
      const result = b1.containsBox( b2 );

      // Assert
      expect( result ).to.be.true;
    } );
  } );
} );
