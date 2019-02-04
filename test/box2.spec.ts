import {expect} from 'chai';
import * as sinon from 'sinon';

import {Box2} from '../lib/box2';
import {Vector2} from '../lib/vector2';

describe( 'Box2', () => {
  describe( 'getter min', () => {
    it( 'should get min', () => {
      // arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );
      const b = new Box2( min, max );

      // act and assert
      expect( b.min.equals( min ) ).to.be.true;
    } );
  } );

  describe( 'getter max', () => {
    it( 'should get max', () => {
      // arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );
      const b = new Box2( min, max );

      // act and assert
      expect( b.max.equals( max ) ).to.be.true;
    } );
  } );

  describe( 'isEmpty getter', () => {
    it( 'should return true on uninitialized box', () => {
      // arrange
      const b = new Box2();

      // act
      const result = b.isEmpty;

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return true on inverted box', () => {
      // arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p2, p1 );

      // act
      const result = b.isEmpty;

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false on non-empty box', () => {
      // arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p1, p2 );

      // act
      const result = b.isEmpty;

      // assert
      expect( result ).to.be.false;
    } );

    it( 'should return false on point-size box', () => {
      // arrange
      const p1 = new Vector2( 1, 1 );
      const p2 = new Vector2( 1, 1 );
      const b = new Box2( p1, p2 );

      // act
      const result = b.isArea;

      // assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'isArea getter', () => {
    it( 'should return false on uninitialized box', () => {
      // arrange
      const b = new Box2();

      // act
      const result = b.isArea;

      // assert
      expect( result ).to.be.false;
    } );

    it( 'should return false on inverted box', () => {
      // arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p2, p1 );

      // act
      const result = b.isArea;

      // assert
      expect( result ).to.be.false;
    } );

    it( 'should return true on non-empty box', () => {
      // arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p1, p2 );

      // act
      const result = b.isArea;

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false on point-size box', () => {
      // arrange
      const p1 = new Vector2( 1, 1 );
      const p2 = new Vector2( 1, 1 );
      const b = new Box2( p1, p2 );

      // act
      const result = b.isArea;

      // assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'size getter', () => {
    it( 'should return zero vector on uninitialized box', () => {
      // arrange
      const b = new Box2();
      const zero = new Vector2();

      // act
      const result = b.size;

      // assert
      expect( result.equals( zero ) ).to.be.true;
    } );

    it( 'should return zero vector on inverted box', () => {
      // arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p2, p1 );
      const zero = new Vector2();

      // act
      const result = b.size;

      // assert
      expect( result.equals( zero ) ).to.be.true;
    } );

    it( 'should return size on non-empty box', () => {
      // arrange
      const p1 = new Vector2( -3, -4 );
      const p2 = new Vector2( 5, 6 );
      const b = new Box2( p1, p2 );
      const size = new Vector2( 8, 10 );

      // act
      const result = b.size;

      // assert
      expect( result.equals( size ) ).to.be.true;
    } );

    it( 'should return zero vector on point-size box', () => {
      // arrange
      const p1 = new Vector2( 1, 1 );
      const p2 = new Vector2( 1, 1 );
      const b = new Box2( p1, p2 );
      const zero = new Vector2();

      // act
      const result = b.size;

      // assert
      expect( result.equals( zero ) ).to.be.true;
    } );
  } );

  describe( 'constructor', () => {
    it( 'should create with given points', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );

      // act
      const b = new Box2( p1, p2 );

      // assert
      expect( b.min.equals( p1 ) ).to.be.true;
      expect( b.max.equals( p2 ) ).to.be.true;
    } );

    it( 'should initialize with Infinity if not specified', () => {
      // act
      const b = new Box2();

      // assert
      expect( b.min.x === +Infinity ).to.be.true;
      expect( b.min.y === +Infinity ).to.be.true;
      expect( b.max.x === -Infinity ).to.be.true;
      expect( b.max.y === -Infinity ).to.be.true;
    } );

    it( 'should notify observers if min point changes', () => {
      // arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const b = new Box2( p1, p2 );
      const spy = sinon.spy( b as any, 'notifyObservers' );

      // act
      p1.set( 1, 2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should notify observers if max point changes', () => {
      // arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const b = new Box2( p1, p2 );
      const spy = sinon.spy( b as any, 'notifyObservers' );

      // act
      p2.set( 1, 2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'copy', () => {
    it( 'should copy values from other box', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const b1 = new Box2();
      const b2 = new Box2( p1, p2 );

      // act
      b1.copy( b2 );

      // assert
      expect( b1.min.equals( p1 ) ).to.be.true;
      expect( b1.max.equals( p2 ) ).to.be.true;
    } );

    it( 'should call observers twice', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const b1 = new Box2();
      const b2 = new Box2( p1, p2 );
      const spy = sinon.spy( b1 as any, 'notifyObservers' );

      // act
      b1.copy( b2 );

      // assert
      expect( spy.called ).to.be.true;
      expect( spy.callCount ).to.equal( 2 );
    } );

    it( 'should not call observers if copied vectors change', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const b1 = new Box2();
      const b2 = new Box2( p1, p2 );
      const spy = sinon.spy( b1 as any, 'notifyObservers' );

      // act
      b1.copy( b2 );
      spy.resetHistory();
      p1.set( 5, 6 );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', () => {
    it( 'should return an object with the same values', () => {
      // arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );
      const b = new Box2( min, max );

      // act
      const result = b.clone();

      // assert
      expect( result.min.equals( min ) ).to.be.true;
      expect( result.max.equals( max ) ).to.be.true;
    } );

    it( 'should not call observers when original box changes', () => {
      // arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );
      const b = new Box2( min, max );
      const result = b.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // act
      max.set( 5, 6 );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', () => {
    it( 'should return true if values equal', () => {
      // arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );
      const b1 = new Box2( min, max );
      const b2 = new Box2( min.clone(), max.clone() );

      // act
      const result = b1.equals( b2 );

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
      // arrange
      const min = new Vector2( 1, 2 );
      const max1 = new Vector2( 3, 4 );
      const max2 = new Vector2( 5, 6 );
      const b1 = new Box2( min, max1 );
      const b2 = new Box2( min.clone(), max2 );

      // act
      const result = b1.equals( b2 );

      // assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'makeEmpty', () => {
    it( 'should make box equal to initial box', () => {
      // arrange
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );
      const bInit = new Box2();

      // act
      b.makeEmpty();

      // assert
      expect( b.equals( bInit ) ).to.be.true;
    } );

    it( 'should call notifyObservers 4 times', () => {
      // arrange
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );
      const spy = sinon.spy( b as any, 'notifyObservers' );

      // act
      b.makeEmpty();

      // assert
      expect( spy.callCount ).to.equal( 4 );
    } );
  } );

  describe( 'expandByScalar', () => {
    it( 'should make box equal to initial box', () => {
      // arrange
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );
      const expected = new Box2(
        new Vector2( 2, 3 ),
        new Vector2( 6, 7 )
      );

      // act
      b.expandByScalar( 1 );

      // assert
      expect( b.equals( expected ) ).to.be.true;
    } );

    it( 'should call notifyObservers twice', () => {
      // arrange
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );
      const spy = sinon.spy( b as any, 'notifyObservers' );

      // act
      b.expandByScalar( 1 );

      // assert
      expect( spy.callCount ).to.equal( 2 );
    } );
  } );

  describe( 'expandByPoint', () => {
    it( 'should expand to point', () => {
      // arrange
      const p = new Vector2( -1, -2 );
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );

      // act
      b.expandByPoint( p );

      // assert
      expect( b.min.equals( p ) ).to.be.true;
    } );

    it( 'should not expand if point is inside box', () => {
      // arrange
      const p = new Vector2( 3, 4 );
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 5, 6 );
      const minCopy = min.clone();
      const maxCopy = max.clone();
      const b = new Box2( min, max );

      // act
      b.expandByPoint( p );

      // assert
      expect( b.min.equals( minCopy ) ).to.be.true;
      expect( b.max.equals( maxCopy ) ).to.be.true;
    } );

    it( 'should call notifyObservers twice if both min and max change', () => {
      // arrange
      const p = new Vector2( 1, 8 );
      const min = new Vector2( 3, 4 );
      const max = new Vector2( 5, 6 );
      const b = new Box2( min, max );
      const spy = sinon.spy( b as any, 'notifyObservers' );

      // act
      b.expandByPoint( p );

      // assert
      expect( spy.callCount ).to.equal( 2 );
    } );

    describe( 'expandByBox', () => {
      it( 'should expand to contain both boxes', () => {
        // arrange
        const b1 = new Box2(
          new Vector2( 1, 3 ),
          new Vector2( 4, 5 )
        );
        const b2 = new Box2(
          new Vector2( 3, 1 ),
          new Vector2( 5, 4 )
        );

        // act
        b1.expandByBox( b2 );

        // assert
        expect( b1.min.equals( new Vector2( 1, 1 ) ) ).to.be.true;
        expect( b1.max.equals( new Vector2( 5, 5 ) ) ).to.be.true;
      } );

      it( 'should not expand if box is inside box', () => {
        // arrange
        const b1 = new Box2(
          new Vector2( 1, 2 ),
          new Vector2( 5, 6 )
        );
        const b2 = new Box2(
          new Vector2( 2, 3 ),
          new Vector2( 4, 5 )
        );

        // act
        b1.expandByBox( b2 );

        // assert
        expect( b1.min.equals( new Vector2( 1, 2 ) ) ).to.be.true;
        expect( b1.max.equals( new Vector2( 5, 6 ) ) ).to.be.true;
      } );

      it( 'should call notifyObservers twice if both min and max change', () => {
        // arrange
        const b1 = new Box2(
          new Vector2( 1, 3 ),
          new Vector2( 4, 5 )
        );
        const b2 = new Box2(
          new Vector2( 3, 1 ),
          new Vector2( 5, 4 )
        );
        const spy = sinon.spy( b1 as any, 'notifyObservers' );

        // act
        b1.expandByBox( b2 );

        // assert
        expect( spy.callCount ).to.equal( 2 );
      } );
    } );

    describe( 'containsPoint', () => {
      it( 'should return true if point is contained', () => {
        // arrange
        const p = new Vector2( 2, 4 );
        const b = new Box2(
          new Vector2( 1, 3 ),
          new Vector2( 4, 5 )
        );

        // act
        const result = b.containsPoint( p );

        // assert
        expect( result ).to.be.true;
      } );

      it( 'should return true if point is on the border', () => {
        // arrange
        const p = new Vector2( 3, 3 );
        const b = new Box2(
          new Vector2( 1, 3 ),
          new Vector2( 4, 5 )
        );

        // act
        const result = b.containsPoint( p );

        // assert
        expect( result ).to.be.true;
      } );

      it( 'should return false if point is outside of box', () => {
        // arrange
        const p = new Vector2( 5, 4 );
        const b = new Box2(
          new Vector2( 1, 3 ),
          new Vector2( 4, 5 )
        );

        // act
        const result = b.containsPoint( p );

        // assert
        expect( result ).to.be.false;
      } );
    } );

    describe( 'containsBox', () => {
      it( 'should return true if box is contained', () => {
        // arrange
        const b1 = new Box2(
          new Vector2( 1, 3 ),
          new Vector2( 4, 6 )
        );
        const b2 = new Box2(
          new Vector2( 2, 4 ),
          new Vector2( 3, 5 )
        );

        // act
        const result = b1.containsBox( b2 );

        // assert
        expect( result ).to.be.true;
      } );

      it( 'should return true if box is contained and touches the border', () => {
        // arrange
        const b1 = new Box2(
          new Vector2( 1, 3 ),
          new Vector2( 4, 6 )
        );
        const b2 = new Box2(
          new Vector2( 2, 3 ),
          new Vector2( 4, 5 )
        );

        // act
        const result = b1.containsBox( b2 );

        // assert
        expect( result ).to.be.true;
      } );

      it( 'should return false if box is outside of the other box', () => {
        // arrange
        const b1 = new Box2(
          new Vector2( 1, 3 ),
          new Vector2( 4, 6 )
        );
        const b2 = new Box2(
          new Vector2( 7, 7 ),
          new Vector2( 8, 8 )
        );

        // act
        const result = b1.containsBox( b2 );

        // assert
        expect( result ).to.be.false;
      } );

      it( 'should return false if box intersects the other box', () => {
        // arrange
        const b1 = new Box2(
          new Vector2( 1, 3 ),
          new Vector2( 4, 6 )
        );
        const b2 = new Box2(
          new Vector2( 2, 1 ),
          new Vector2( 4, 8 )
        );

        // act
        const result = b1.containsBox( b2 );

        // assert
        expect( result ).to.be.false;
      } );
    } );
  } );
} );
