import {expect} from 'chai';
import * as sinon from 'sinon';

import {Line2} from '../lib/line2';
import {Vector2} from '../lib/vector2';

describe( 'Line2', () => {
  describe( 'getter start', () => {
    it( 'should get start vector', () => {
      // arrange
      const start = new Vector2( 1, 2 );
      const end = new Vector2( 3, 4 );
      const line = new Line2( start, end );

      // act and assert
      expect( line.start.equals( start ) ).to.be.true;
    } );
  } );

  describe( 'getter end', () => {
    it( 'should get end vector', () => {
      // arrange
      const start = new Vector2( 1, 2 );
      const end = new Vector2( 3, 4 );
      const line = new Line2( start, end );

      // act and assert
      expect( line.end.equals( end ) ).to.be.true;
    } );
  } );

  describe( 'direction getter', () => {
    it( 'should return the direction', () => {
      // arrange
      const l = new Line2( new Vector2( 1, 1 ), new Vector2( 4, 3 ) );

      // act
      const result = l.direction;

      // assert
      expect( result.x ).to.equal( 3 );
      expect( result.y ).to.equal( 2 );
    } );
  } );

  describe( 'constructor', () => {
    it( 'should create with given points', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );

      // act
      const l = new Line2( p1, p2 );

      // assert
      expect( l.start.equals( p1 ) ).to.be.true;
      expect( l.end.equals( p2 ) ).to.be.true;
    } );

    it( 'should initialize with zero vectors if not specified', () => {
      // arrange
      const p = new Vector2( 0, 0 );

      // act
      const l = new Line2();

      // assert
      expect( l.start.equals( p ) ).to.be.true;
      expect( l.end.equals( p ) ).to.be.true;
    } );

    it( 'should notify observers if start point changes', () => {
      // arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const l = new Line2( p1, p2 );
      const spy = sinon.spy( l as any, 'notifyObservers' );

      // act
      p1.set( 1, 2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should notify observers if end point changes', () => {
      // arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const l = new Line2( p1, p2 );
      const spy = sinon.spy( l as any, 'notifyObservers' );

      // act
      p2.set( 1, 2 );

      // assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'copy', () => {
    it( 'should copy values from other line', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const l1 = new Line2();
      const l2 = new Line2( p1, p2 );

      // act
      l1.copy( l2 );

      // assert
      expect( l1.start.equals( p1 ) ).to.be.true;
      expect( l1.end.equals( p2 ) ).to.be.true;
    } );

    it( 'should call observers twice', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const l1 = new Line2();
      const l2 = new Line2( p1, p2 );
      const spy = sinon.spy( l1 as any, 'notifyObservers' );

      // act
      l1.copy( l2 );

      // assert
      expect( spy.called ).to.be.true;
      expect( spy.callCount ).to.equal( 2 );
    } );

    it( 'should not call observers if copied vectors change', () => {
      // arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const l1 = new Line2();
      const l2 = new Line2( p1, p2 );
      const spy = sinon.spy( l1 as any, 'notifyObservers' );

      // act
      l1.copy( l2 );
      spy.resetHistory();
      p1.set( 5, 6 );

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', () => {
    it( 'should return an object with the same values', () => {
      // arrange
      const start = new Vector2( 1, 2 );
      const end = new Vector2( 3, 4 );
      const line = new Line2( start, end );

      // act
      const result = line.clone();

      // assert
      expect( result.start.equals( start ) ).to.be.true;
      expect( result.end.equals( end ) ).to.be.true;
    } );

    it( 'should not call observers when original line changes', () => {
      // arrange
      const start = new Vector2( 1, 2 );
      const end = new Vector2( 3, 4 );
      const line = new Line2( start, end );
      const result = line.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // act
      line.start.x = 0;

      // assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', () => {
    it( 'should return true if values equal', () => {
      // arrange
      const start = new Vector2( 1, 2 );
      const end = new Vector2( 3, 4 );
      const l1 = new Line2( start, end );
      const l2 = new Line2( start.clone(), end.clone() );

      // act
      const result = l1.equals( l2 );

      // assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', () => {
      // arrange
      const start = new Vector2( 1, 2 );
      const end1 = new Vector2( 3, 4 );
      const end2 = new Vector2( 5, 6 );
      const l1 = new Line2( start, end1 );
      const l2 = new Line2( start.clone(), end2 );

      // act
      const result = l1.equals( l2 );

      // assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'getCenter', () => {
    it( 'should return the center point', () => {
      // arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );

      // act
      const result = l.getCenter();

      // assert
      expect( result.x ).to.be.closeTo( 3, 0.001 );
      expect( result.y ).to.be.closeTo( 2, 0.001 );
    } );
  } );

  describe( 'interpolate', () => {
    it( 'should return the interpolated point', () => {
      // arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 9, 6 ) );

      // act
      const result = l.interpolate( 1 / 3 );

      // assert
      expect( result.x ).to.be.closeTo( 3, 0.001 );
      expect( result.y ).to.be.closeTo( 2, 0.001 );
    } );
  } );

  describe( 'isParallel', () => {
    it( 'should return true for parallel lines', () => {
      // arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 1, 2 ), new Vector2( 4, 4 ) );

      // act and assert
      expect( l1.isParallel( l2 ) ).to.be.true;
    } );

    it( 'should return false if lines are not parallel', () => {
      // arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 1, 2 ), new Vector2( 4, 5 ) );

      // act and assert
      expect( l1.isParallel( l2 ) ).to.be.false;
    } );
  } );

  describe( 'isPerpendicular', () => {
    it( 'should return true for perpendicular lines', () => {
      // arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 3, 1 ), new Vector2( 1, 4 ) );

      // act and assert
      expect( l1.isPerpendicular( l2 ) ).to.be.true;
    } );

    it( 'should return false if lines are not perpendicular', () => {
      // arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 3, 1 ), new Vector2( 2, 4 ) );

      // act and assert
      expect( l1.isPerpendicular( l2 ) ).to.be.false;
    } );
  } );

  describe( 'getIntersection', () => {
    it( 'should return the intersection point', () => {
      // arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );
      const l2 = new Line2( new Vector2( 5, -1 ), new Vector2( 1, 5 ) );

      // act
      const result = l1.getIntersection( l2 );

      // assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should return the intersection point even if outside of segments', () => {
      // arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );
      const l2 = new Line2( new Vector2( 1, 5 ), new Vector2( -1, 8 ) );

      // act
      const result = l1.getIntersection( l2 );

      // assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should return null for parallel lines', () => {
      // arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 1, 2 ), new Vector2( 4, 4 ) );

      // act
      const result = l1.getIntersection( l2 );

      // assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'getSegmentIntersection', () => {
    it( 'should return the intersection point', () => {
      // arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );
      const l2 = new Line2( new Vector2( 5, -1 ), new Vector2( 1, 5 ) );

      // act
      const result = l1.getSegmentIntersection( l2 );

      // assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should return null if intersection is outside of segments', () => {
      // arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );
      const l2 = new Line2( new Vector2( 1, 5 ), new Vector2( -1, 8 ) );

      // act
      const result = l1.getSegmentIntersection( l2 );

      // assert
      expect( result ).to.be.null;
    } );

    it( 'should return null for parallel lines', () => {
      // arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 1, 2 ), new Vector2( 4, 4 ) );

      // act
      const result = l1.getSegmentIntersection( l2 );

      // assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'getSideOfPoint', () => {
    it( 'should return 1 if left of line', () => {
      // arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 1, 2 );

      // act
      const result = l.getSideOfPoint( p );

      // assert
      expect( result ).to.equal( 1 );
    } );

    it( 'should return -1 if right of line', () => {
      // arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 2, 1 );

      // act
      const result = l.getSideOfPoint( p );

      // assert
      expect( result ).to.equal( -1 );
    } );

    it( 'should return 0 if point is on line', () => {
      // arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 3, 2 );

      // act
      const result = l.getSideOfPoint( p );

      // assert
      expect( result ).to.equal( 0 );
    } );
  } );
} );
