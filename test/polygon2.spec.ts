import { expect } from 'chai';
import * as sinon from 'sinon';

import { Polygon2, Vector2 } from '../lib';

describe( 'Polygon2', (): void => {
  describe( 'lengthOfOutline getter', (): void => {
    it( 'should return the length of the outline', (): void => {
      // Arrange
      const points = [
        new Vector2( 0, 0 ), new Vector2( 5, 0 ), new Vector2( 2, 4 ), new Vector2( 0, 4 )
      ];
      const polygon = new Polygon2( points );

      // Act
      const result = polygon.lengthOfOutline;

      // Assert
      expect( result ).to.be.closeTo( 16, 0.001 );
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should create with given points', (): void => {
      // Arrange
      const points = [
        new Vector2( 0, 0 ), new Vector2( 1, 2 ), new Vector2( 4, 3 )
      ];

      // Act
      const polygon = new Polygon2( points );

      // Assert
      expect( polygon.getElement( 0 )!.equals( points[ 0 ] ) ).to.be.true;
      expect( polygon.getElement( 1 )!.equals( points[ 1 ] ) ).to.be.true;
      expect( polygon.getElement( 2 )!.equals( points[ 2 ] ) ).to.be.true;
    } );

    it( 'should initialize with no points if not specified', (): void => {
      // Act
      const polygon = new Polygon2();

      // Assert
      expect( polygon.length ).to.equal( 0 );
    } );

    it( 'should notify observers if a point changes', (): void => {
      // Arrange
      const points = [
        new Vector2( 0, 0 ), new Vector2( 1, 2 ), new Vector2( 4, 3 )
      ];
      const polygon = new Polygon2( points );
      const spy = sinon.spy( polygon as any, 'notifyObservers' );

      // Act
      points[ 1 ].set( 0, 3 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'getBoxCenter', (): void => {
    it( 'should get the center of the polygons bounding box', (): void => {
      // Arrange
      const points = [
        new Vector2( 2, 2 ), new Vector2( 6, -1 ), new Vector2( 8, 2 ), new Vector2( 3, 7 )
      ];
      const polygon = new Polygon2( points );

      // Act
      const center = polygon.getBoxCenter();

      // Assert
      expect( center.x ).to.be.closeTo( 5, 0.001 );
      expect( center.y ).to.be.closeTo( 3, 0.001 );
    } );

    it( 'should return (0/0) for empty polygon', (): void => {
      // Arrange
      const polygon = new Polygon2();

      // Act
      const center = polygon.getBoxCenter();

      // Assert
      expect( center.x ).to.be.closeTo( 0, 0.001 );
      expect( center.y ).to.be.closeTo( 0, 0.001 );
    } );
  } );

  describe( 'iterateLineSegments', (): void => {
    it( 'should call the function with every element', (): void => {
      // Arrange
      const value1 = new Vector2( 3, 3 );
      const value2 = new Vector2( 4, 4 );
      const polygon = new Polygon2( [ value1, value2 ] );
      const spy = sinon.spy();

      // Act
      polygon.iterateLineSegments( spy );

      // Assert
      expect( spy.calledTwice ).to.be.true;
      // Values:
      expect( spy.getCall( 0 ).args[ 0 ].start.equals( value1 ) ).to.be.true;
      expect( spy.getCall( 0 ).args[ 0 ].end.equals( value2 ) ).to.be.true;
      expect( spy.getCall( 1 ).args[ 0 ].start.equals( value2 ) ).to.be.true;
      expect( spy.getCall( 1 ).args[ 0 ].end.equals( value1 ) ).to.be.true;
      // Indices:
      expect( spy.getCall( 0 ).args[ 1 ] ).to.equal( 0 );
      expect( spy.getCall( 1 ).args[ 1 ] ).to.equal( 1 );
    } );

    it( 'should not call the function if polygon is empty', (): void => {
      // Arrange
      const polygon2 = new Polygon2();
      const spy = sinon.spy();

      // Act
      polygon2.iterateLineSegments( spy );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );

    it( 'should not call the function if polygon has a single point', (): void => {
      // Arrange
      const polygon2 = new Polygon2( [ new Vector2() ] );
      const spy = sinon.spy();

      // Act
      polygon2.iterateLineSegments( spy );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'isPointOnEdge', (): void => {
    it( 'should return true if point is on the edge', (): void => {
      // Arrange
      const corners = [ new Vector2( 0, 0 ), new Vector2( 3, 2 ), new Vector2( 1, 3 ) ];
      const polygon = new Polygon2( corners );
      const point = new Vector2( 3 / 2, 1 );

      // Act
      const result = polygon.isPointOnEdge( point );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true if point is a corner point', (): void => {
      // Arrange
      const corners = [ new Vector2( 0, 0 ), new Vector2( 3, 2 ), new Vector2( 1, 3 ) ];
      const polygon = new Polygon2( corners );
      const point = new Vector2( 1, 3 );

      // Act
      const result = polygon.isPointOnEdge( point );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if point is inside of polygon', (): void => {
      // Arrange
      const corners = [ new Vector2( 0, 0 ), new Vector2( 3, 2 ), new Vector2( 1, 3 ) ];
      const polygon = new Polygon2( corners );
      const point = new Vector2( 1, 1 );

      // Act
      const result = polygon.isPointOnEdge( point );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false if point is outside of polygon', (): void => {
      // Arrange
      const corners = [ new Vector2( 0, 0 ), new Vector2( 3, 2 ), new Vector2( 1, 3 ) ];
      const polygon = new Polygon2( corners );
      const point = new Vector2( 0, 2 );

      // Act
      const result = polygon.isPointOnEdge( point );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'isPointInside', (): void => {
    it( 'should return true if point is inside of polygon', (): void => {
      // Arrange
      const corners = [
        new Vector2( 0, 1 ), new Vector2( 1, -1 ), new Vector2( 2, 1 ), new Vector2( 3, -1 ),
        new Vector2( 1, -2 ), new Vector2( -1, -1 )
      ];
      const polygon = new Polygon2( corners );
      const point = new Vector2( 0, 0 );

      // Act
      const result = polygon.isPointInside( point );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if point is outside of polygon', (): void => {
      // Arrange
      const corners = [
        new Vector2( 0, 1 ), new Vector2( 1, -1 ), new Vector2( 2, 1 ), new Vector2( 3, -1 ),
        new Vector2( 1, -2 ), new Vector2( -1, -1 )
      ];
      const polygon = new Polygon2( corners );
      const point = new Vector2( 1, 0 );

      // Act
      const result = polygon.isPointInside( point );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true if point is on the edge', (): void => {
      // Arrange
      const corners = [
        new Vector2( 0, 1 ), new Vector2( 1, -1 ), new Vector2( 2, 1 ), new Vector2( 3, -1 ),
        new Vector2( 1, -2 ), new Vector2( -1, -1 )
      ];
      const polygon = new Polygon2( corners );
      const point = new Vector2( 0, 1 );

      // Act
      const result = polygon.isPointInside( point );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true if ray leaves through point on the edge', (): void => {
      // Arrange
      const corners = [
        new Vector2( 0, 1 ), new Vector2( 1, -1 ), new Vector2( 2, 1 ), new Vector2( 3, -1 ),
        new Vector2( 1, -2 ), new Vector2( -1, -1 )
      ];
      const polygon = new Polygon2( corners );
      const point = new Vector2( 2, -1 );

      // Act
      const result = polygon.isPointInside( point );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if ray touches point on the edge from the outside', (): void => {
      // Arrange
      const corners = [
        new Vector2( 0, 1 ), new Vector2( 1, -1 ), new Vector2( 2, 1 ), new Vector2( 3, -1 ),
        new Vector2( 1, -2 ), new Vector2( -1, -1 )
      ];
      const polygon = new Polygon2( corners );
      const point = new Vector2( 1, 1 );

      // Act
      const result = polygon.isPointInside( point );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true if ray leaves through parallel edge', (): void => {
      // Arrange
      const corners = [
        new Vector2( -1, 1 ), new Vector2( 1, 0 ), new Vector2( 2, 0 ), new Vector2( -1, -2 )
      ];
      const polygon = new Polygon2( corners );
      const point = new Vector2( 0, 0 );

      // Act
      const result = polygon.isPointInside( point );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true for complex example', (): void => {
      // Arrange
      const corners = [
        new Vector2( 0, -2 ), new Vector2( 1, 0 ), new Vector2( 2, 0 ), new Vector2( 3, 1 ),
        new Vector2( 3, 0 ), new Vector2( 4, -1 ), new Vector2( 4, 0 ), new Vector2( 5, 1 ),
        new Vector2( 3, 2 ), new Vector2( -1, 1 )
      ];
      const polygon = new Polygon2( corners );
      const point = new Vector2( 0, 0 );

      // Act
      const result = polygon.isPointInside( point );

      // Assert
      expect( result ).to.be.true;
    } );
  } );

  describe( 'isConvex', (): void => {
    it( 'should return true if polygon is convex', (): void => {
      // Arrange
      const corners = [
        new Vector2( 0, 2 ), new Vector2( 2, 0 ), new Vector2( 2, -1 ), new Vector2( 0, -2 ),
        new Vector2( -1, -1 ), new Vector2( -2, 0 ), new Vector2( -2, 1 )
      ];
      const polygon = new Polygon2( corners );

      // Act
      const result = polygon.isConvex();

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if polygon is not convex', (): void => {
      // Arrange
      const corners = [
        new Vector2( 0, 2 ), new Vector2( 2, 0 ), new Vector2( 2, -1 ), new Vector2( 0, -2 ),
        new Vector2( -1, -3 ), new Vector2( -2, 0 ), new Vector2( -2, 1 )
      ];
      const polygon = new Polygon2( corners );

      // Act
      const result = polygon.isConvex();

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true for special case of self intersecting polygon', (): void => {
      // Arrange
      const corners = [
        new Vector2( 0, 2 ), new Vector2( 2, 0 ), new Vector2( 2, -1 ), new Vector2( 0, -2 ),
        new Vector2( -1, 0 ), new Vector2( 0, -1 ), new Vector2( -2, 0 ), new Vector2( -2, 1 )
      ];
      const polygon = new Polygon2( corners );

      // Act
      const result = polygon.isConvex();

      // Assert
      expect( result ).to.be.true;
    } );
  } );

  describe( 'isSelfIntersecting', (): void => {
    it( 'should return true if polygon self intersects', (): void => {
      // Arrange
      const corners = [
        new Vector2( 0, 1 ), new Vector2( 2, -1 ), new Vector2( 2, 1 ), new Vector2( 0, -1 ),
        new Vector2( -2, 1 ), new Vector2( -2, -1 )
      ];
      const polygon = new Polygon2( corners );

      // Act
      const result = polygon.isSelfIntersecting();

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true if polygon has touching vertices', (): void => {
      // Arrange
      const corners = [
        new Vector2( -2, 1 ), new Vector2( 0, 0 ), new Vector2( 2, 1 ), new Vector2( 2, -1 ),
        new Vector2( 0, 0 ), new Vector2( -2, -1 )
      ];
      const polygon = new Polygon2( corners );

      // Act
      const result = polygon.isSelfIntersecting();

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if polygon does not self intersect', (): void => {
      // Arrange
      const corners = [
        new Vector2( 0, 1 ), new Vector2( 1, -1 ), new Vector2( 2, 0 ), new Vector2( 1, -2 ),
        new Vector2( -1, -1 ), new Vector2( 0, 0 ), new Vector2( -2, -1 )
      ];
      const polygon = new Polygon2( corners );

      // Act
      const result = polygon.isSelfIntersecting();

      // Assert
      expect( result ).to.be.false;
    } );
  } );
} );
