import { expect } from 'chai';
import * as sinon from 'sinon';

import { Line2, Vector2 } from '../lib';

describe( 'Line2', (): void => {
  describe( 'getter start', (): void => {
    it( 'should get start vector', (): void => {
      // Arrange
      const start = new Vector2( 1, 2 );
      const end = new Vector2( 3, 4 );
      const line = new Line2( start, end );

      // Act and assert
      expect( line.start.equals( start ) ).to.be.true;
    } );
  } );

  describe( 'getter end', (): void => {
    it( 'should get end vector', (): void => {
      // Arrange
      const start = new Vector2( 1, 2 );
      const end = new Vector2( 3, 4 );
      const line = new Line2( start, end );

      // Act and assert
      expect( line.end.equals( end ) ).to.be.true;
    } );
  } );

  describe( 'direction getter', (): void => {
    it( 'should return the direction', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 1, 1 ), new Vector2( 4, 3 ) );

      // Act
      const result = l.direction;

      // Assert
      expect( result.x ).to.equal( 3 );
      expect( result.y ).to.equal( 2 );
    } );
  } );

  describe( 'length getter', (): void => {
    it( 'should return the length', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 1, 1 ), new Vector2( 4, 5 ) );

      // Act
      const result = l.length;

      // Assert
      expect( result ).to.be.closeTo( 5, 0.001 );
    } );
  } );

  describe( 'slop getter', (): void => {
    it( 'should return the slope', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 1, 1 ), new Vector2( 4, 3 ) );

      // Act
      const result = l.slope;

      // Assert
      expect( result ).to.be.closeTo( 2 / 3, 0.001 );
    } );

    it( 'should return a negative slope', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 1, 1 ), new Vector2( -3, 4 ) );

      // Act
      const result = l.slope;

      // Assert
      expect( result ).to.be.closeTo( -3 / 4, 0.001 );
    } );

    it( 'should return infinity for a vertical line', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 1, 1 ), new Vector2( 1, 4 ) );

      // Act
      const result = l.slope;

      // Assert
      expect( result ).to.equal( Infinity );
    } );
  } );

  describe( 'yIntercept getter', (): void => {
    it( 'should return the yIntercept', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 3, 0 ), new Vector2( 5, 1 ) );

      // Act
      const result = l.yIntercept;

      // Assert
      expect( result ).to.be.closeTo( -3 / 2, 0.001 );
    } );

    it( 'should return null for a vertical line', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 1, 1 ), new Vector2( 1, 4 ) );

      // Act
      const result = l.yIntercept;

      // Assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should create with given points', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );

      // Act
      const l = new Line2( p1, p2 );

      // Assert
      expect( l.start.equals( p1 ) ).to.be.true;
      expect( l.end.equals( p2 ) ).to.be.true;
    } );

    it( 'should initialize with zero vectors if not specified', (): void => {
      // Arrange
      const p = new Vector2( 0, 0 );

      // Act
      const l = new Line2();

      // Assert
      expect( l.start.equals( p ) ).to.be.true;
      expect( l.end.equals( p ) ).to.be.true;
    } );

    it( 'should notify observers if start point changes', (): void => {
      // Arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const l = new Line2( p1, p2 );
      const spy = sinon.spy( l as any, 'notifyObservers' );

      // Act
      p1.set( 1, 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should notify observers if end point changes', (): void => {
      // Arrange
      const p1 = new Vector2();
      const p2 = new Vector2();
      const l = new Line2( p1, p2 );
      const spy = sinon.spy( l as any, 'notifyObservers' );

      // Act
      p2.set( 1, 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'copy', (): void => {
    it( 'should copy values from other line', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const l1 = new Line2();
      const l2 = new Line2( p1, p2 );

      // Act
      l1.copy( l2 );

      // Assert
      expect( l1.start.equals( p1 ) ).to.be.true;
      expect( l1.end.equals( p2 ) ).to.be.true;
    } );

    it( 'should call observers twice', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const l1 = new Line2();
      const l2 = new Line2( p1, p2 );
      const spy = sinon.spy( l1 as any, 'notifyObservers' );

      // Act
      l1.copy( l2 );

      // Assert
      expect( spy.called ).to.be.true;
      expect( spy.callCount ).to.equal( 2 );
    } );

    it( 'should not call observers if copied vectors change', (): void => {
      // Arrange
      const p1 = new Vector2( 1, 2 );
      const p2 = new Vector2( 3, 4 );
      const l1 = new Line2();
      const l2 = new Line2( p1, p2 );
      const spy = sinon.spy( l1 as any, 'notifyObservers' );

      // Act
      l1.copy( l2 );
      spy.resetHistory();
      p1.set( 5, 6 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should return an object with the same values', (): void => {
      // Arrange
      const start = new Vector2( 1, 2 );
      const end = new Vector2( 3, 4 );
      const line = new Line2( start, end );

      // Act
      const result = line.clone();

      // Assert
      expect( result.start.equals( start ) ).to.be.true;
      expect( result.end.equals( end ) ).to.be.true;
    } );

    it( 'should not call observers when original line changes', (): void => {
      // Arrange
      const start = new Vector2( 1, 2 );
      const end = new Vector2( 3, 4 );
      const line = new Line2( start, end );
      const result = line.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // Act
      line.start.x = 0;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', (): void => {
    it( 'should return true if values equal', (): void => {
      // Arrange
      const start = new Vector2( 1, 2 );
      const end = new Vector2( 3, 4 );
      const l1 = new Line2( start, end );
      const l2 = new Line2( start.clone(), end.clone() );

      // Act
      const result = l1.equals( l2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', (): void => {
      // Arrange
      const start = new Vector2( 1, 2 );
      const end1 = new Vector2( 3, 4 );
      const end2 = new Vector2( 5, 6 );
      const l1 = new Line2( start, end1 );
      const l2 = new Line2( start.clone(), end2 );

      // Act
      const result = l1.equals( l2 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'getCenter', (): void => {
    it( 'should return the center point', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );

      // Act
      const result = l.getCenter();

      // Assert
      expect( result.x ).to.be.closeTo( 3, 0.001 );
      expect( result.y ).to.be.closeTo( 2, 0.001 );
    } );
  } );

  describe( 'interpolate', (): void => {
    it( 'should return the interpolated point', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 9, 6 ) );

      // Act
      const result = l.interpolate( 1 / 3 );

      // Assert
      expect( result.x ).to.be.closeTo( 3, 0.001 );
      expect( result.y ).to.be.closeTo( 2, 0.001 );
    } );
  } );

  describe( 'isParallel', (): void => {
    it( 'should return true for parallel lines', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 1, 2 ), new Vector2( 4, 4 ) );

      // Act and assert
      expect( l1.isParallel( l2 ) ).to.be.true;
    } );

    it( 'should return false if lines are not parallel', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 1, 2 ), new Vector2( 4, 5 ) );

      // Act and assert
      expect( l1.isParallel( l2 ) ).to.be.false;
    } );
  } );

  describe( 'isPerpendicular', (): void => {
    it( 'should return true for perpendicular lines', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 3, 1 ), new Vector2( 1, 4 ) );

      // Act and assert
      expect( l1.isPerpendicular( l2 ) ).to.be.true;
    } );

    it( 'should return false if lines are not perpendicular', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 3, 1 ), new Vector2( 2, 4 ) );

      // Act and assert
      expect( l1.isPerpendicular( l2 ) ).to.be.false;
    } );
  } );

  describe( 'getIntersection', (): void => {
    it( 'should return the intersection point', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );
      const l2 = new Line2( new Vector2( 5, -1 ), new Vector2( 1, 5 ) );

      // Act
      const result = l1.getIntersection( l2 );

      // Assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should return the intersection point even if outside of segments', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );
      const l2 = new Line2( new Vector2( 1, 5 ), new Vector2( -1, 8 ) );

      // Act
      const result = l1.getIntersection( l2 );

      // Assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should return null for parallel lines', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 1, 2 ), new Vector2( 4, 4 ) );

      // Act
      const result = l1.getIntersection( l2 );

      // Assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'getSegmentIntersection', (): void => {
    it( 'should return the intersection point', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );
      const l2 = new Line2( new Vector2( 5, -1 ), new Vector2( 1, 5 ) );

      // Act
      const result = l1.getSegmentIntersection( l2 );

      // Assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should return the intersection point if intersection is close to endpoint', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0 + 1e-15, 0 ), new Vector2( 4, 0 ) );
      const l2 = new Line2( new Vector2( 0, -2 ), new Vector2( 0, 2 ) );

      // Act
      const result = l1.getSegmentIntersection( l2 );

      // Assert
      expect( result!.x ).to.be.closeTo( 0, 0.001 );
      expect( result!.y ).to.be.closeTo( 0, 0.001 );
    } );

    it( 'should return null if intersection is outside of segments', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );
      const l2 = new Line2( new Vector2( 1, 5 ), new Vector2( -1, 8 ) );

      // Act
      const result = l1.getSegmentIntersection( l2 );

      // Assert
      expect( result ).to.be.null;
    } );

    it( 'should return null for parallel lines', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 1, 2 ), new Vector2( 4, 4 ) );

      // Act
      const result = l1.getSegmentIntersection( l2 );

      // Assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'getSegmentAndLineIntersection', (): void => {
    it( 'should return the intersection point', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );
      const l2 = new Line2( new Vector2( 5, -1 ), new Vector2( 1, 5 ) );

      // Act
      const result = l1.getSegmentAndLineIntersection( l2 );

      // Assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should return the intersection point if intersection is close to endpoint', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0 + 1e-15, 0 ), new Vector2( 4, 0 ) );
      const l2 = new Line2( new Vector2( 0, 2 ), new Vector2( 0, 4 ) );

      // Act
      const result = l1.getSegmentAndLineIntersection( l2 );

      // Assert
      expect( result!.x ).to.be.closeTo( 0, 0.001 );
      expect( result!.y ).to.be.closeTo( 0, 0.001 );
    } );

    it( 'should return null if intersection is outside of first line segment', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 1, 5 ), new Vector2( -1, 8 ) );
      const l2 = new Line2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );

      // Act
      const result = l1.getSegmentAndLineIntersection( l2 );

      // Assert
      expect( result ).to.be.null;
    } );

    it( 'should return intersection point if the second line is infinite', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 5, -1 ), new Vector2( 1, 5 ) );
      const l2 = new Line2( new Vector2( 0, 0 ), new Vector2( -6, -4 ) );

      // Act
      const result = l1.getSegmentAndLineIntersection( l2 );

      // Assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should return null for parallel lines', (): void => {
      // Arrange
      const l1 = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const l2 = new Line2( new Vector2( 1, 2 ), new Vector2( 4, 4 ) );

      // Act
      const result = l1.getSegmentAndLineIntersection( l2 );

      // Assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'getSideOfPoint', (): void => {
    it( 'should return 1 if left of line', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 1, 2 );

      // Act
      const result = l.getSideOfPoint( p );

      // Assert
      expect( result ).to.equal( 1 );
    } );

    it( 'should return -1 if right of line', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 2, 1 );

      // Act
      const result = l.getSideOfPoint( p );

      // Assert
      expect( result ).to.equal( -1 );
    } );

    it( 'should return 0 if point is on the line', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 3, 2 );

      // Act
      const result = l.getSideOfPoint( p );

      // Assert
      expect( result ).to.equal( 0 );
    } );

    it( 'should return 0 if point is very close to the line', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 3, 2 + 1e-15 );

      // Act
      const result = l.getSideOfPoint( p );

      // Assert
      expect( result ).to.equal( 0 );
    } );
  } );

  describe( 'containsPoint', (): void => {
    it( 'should return false if not on the line', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 1, 2 );

      // Act
      const result = l.containsPoint( p );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true if point is on the infinite line', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 6, 4 );

      // Act
      const result = l.containsPoint( p );

      // Assert
      expect( result ).to.be.true;
    } );
  } );

  describe( 'containsPointInSegment', (): void => {
    it( 'should return false if not on the line', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 1, 2 );

      // Act
      const result = l.containsPointInSegment( p );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true if point is on the line segment', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 3 / 2, 1 );

      // Act
      const result = l.containsPointInSegment( p );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true if point is close to the start point of the segment', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 3, 2 ), new Vector2( 6, 4 ) );
      const p = new Vector2( 3 - 1e-15, 2 );

      // Act
      const result = l.containsPointInSegment( p );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true if point is close to the end point of the segment', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 3 + 1e-15, 2 );

      // Act
      const result = l.containsPointInSegment( p );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if point is on the line but outside of segment', (): void => {
      // Arrange
      const l = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const p = new Vector2( 6, 4 );

      // Act
      const result = l.containsPointInSegment( p );

      // Assert
      expect( result ).to.be.false;
    } );
  } );
} );
