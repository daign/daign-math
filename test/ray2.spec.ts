import { expect } from 'chai';
import * as sinon from 'sinon';

import { Line2, Ray2, Vector2 } from '../lib';

describe( 'Ray2', (): void => {
  describe( 'getter origin', (): void => {
    it( 'should get origin vector', (): void => {
      // Arrange
      const origin = new Vector2( 1, 2 );
      const direction = new Vector2( 3, 4 );
      const ray = new Ray2( origin, direction );

      // Act and assert
      expect( ray.origin.equals( origin ) ).to.be.true;
    } );
  } );

  describe( 'getter direction', (): void => {
    it( 'should get direction vector', (): void => {
      // Arrange
      const origin = new Vector2( 1, 2 );
      const direction = new Vector2( 3, 4 );
      const ray = new Ray2( origin, direction );

      // Act and assert
      expect( ray.direction.equals( direction ) ).to.be.true;
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should create with given vectors', (): void => {
      // Arrange
      const origin = new Vector2( 1, 2 );
      const direction = new Vector2( 3, 4 );

      // Act
      const ray = new Ray2( origin, direction );

      // Assert
      expect( ray.origin.equals( origin ) ).to.be.true;
      expect( ray.direction.equals( direction ) ).to.be.true;
    } );

    it( 'should initialize with zero vectors if not specified', (): void => {
      // Arrange
      const p = new Vector2( 0, 0 );

      // Act
      const ray = new Ray2();

      // Assert
      expect( ray.origin.equals( p ) ).to.be.true;
      expect( ray.direction.equals( p ) ).to.be.true;
    } );

    it( 'should notify observers if origin point changes', (): void => {
      // Arrange
      const origin = new Vector2();
      const direction = new Vector2();
      const ray = new Ray2( origin, direction );
      const spy = sinon.spy( ray as any, 'notifyObservers' );

      // Act
      origin.set( 1, 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );

    it( 'should notify observers if direction vector changes', (): void => {
      // Arrange
      const origin = new Vector2();
      const direction = new Vector2();
      const ray = new Ray2( origin, direction );
      const spy = sinon.spy( ray as any, 'notifyObservers' );

      // Act
      direction.set( 1, 2 );

      // Assert
      expect( spy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'copy', (): void => {
    it( 'should copy values from other ray', (): void => {
      // Arrange
      const origin = new Vector2( 1, 2 );
      const direction = new Vector2( 3, 4 );
      const ray1 = new Ray2();
      const ray2 = new Ray2( origin, direction );

      // Act
      ray1.copy( ray2 );

      // Assert
      expect( ray1.origin.equals( origin ) ).to.be.true;
      expect( ray1.direction.equals( direction ) ).to.be.true;
    } );

    it( 'should call observers twice', (): void => {
      // Arrange
      const origin = new Vector2( 1, 2 );
      const direction = new Vector2( 3, 4 );
      const ray1 = new Ray2();
      const ray2 = new Ray2( origin, direction );
      const spy = sinon.spy( ray1 as any, 'notifyObservers' );

      // Act
      ray1.copy( ray2 );

      // Assert
      expect( spy.called ).to.be.true;
      expect( spy.callCount ).to.equal( 2 );
    } );

    it( 'should not call observers if copied vectors change', (): void => {
      // Arrange
      const origin = new Vector2( 1, 2 );
      const direction = new Vector2( 3, 4 );
      const ray1 = new Ray2();
      const ray2 = new Ray2( origin, direction );
      const spy = sinon.spy( ray1 as any, 'notifyObservers' );

      // Act
      ray1.copy( ray2 );
      spy.resetHistory();
      origin.set( 5, 6 );

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should return an object with the same values', (): void => {
      // Arrange
      const origin = new Vector2( 1, 2 );
      const direction = new Vector2( 3, 4 );
      const ray = new Ray2( origin, direction );

      // Act
      const result = ray.clone();

      // Assert
      expect( result.origin.equals( origin ) ).to.be.true;
      expect( result.direction.equals( direction ) ).to.be.true;
    } );

    it( 'should not call observers when original ray changes', (): void => {
      // Arrange
      const origin = new Vector2( 1, 2 );
      const direction = new Vector2( 3, 4 );
      const ray = new Ray2( origin, direction );
      const result = ray.clone();
      const spy = sinon.spy( result as any, 'notifyObservers' );

      // Act
      ray.origin.x = 0;

      // Assert
      expect( spy.notCalled ).to.be.true;
    } );
  } );

  describe( 'isParallelToLine', (): void => {
    it( 'should return true if ray is parallel to line', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 1, 4 ), new Vector2( 3, 2 ) );
      const line = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );

      // Act and assert
      expect( ray.isParallelToLine( line ) ).to.be.true;
    } );

    it( 'should return false if ray is not parallel to line', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 1, 4 ), new Vector2( 3, 2 ) );
      const line = new Line2( new Vector2( 0, 0 ), new Vector2( 3, 3 ) );

      // Act and assert
      expect( ray.isParallelToLine( line ) ).to.be.false;
    } );
  } );

  describe( 'isPerpendicularToLine', (): void => {
    it( 'should return true if ray is perpendicular to line', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const line = new Line2( new Vector2( 3, 1 ), new Vector2( 1, 4 ) );

      // Act and assert
      expect( ray.isPerpendicularToLine( line ) ).to.be.true;
    } );

    it( 'should return false if ray is not perpendicular to line', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const line = new Line2( new Vector2( 3, 1 ), new Vector2( 2, 4 ) );

      // Act and assert
      expect( ray.isPerpendicularToLine( line ) ).to.be.false;
    } );
  } );

  describe( 'getLineSegmentIntersection', (): void => {
    it( 'should return the intersection point', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 0, 0 ), new Vector2( 1.5, 1 ) );
      const line = new Line2( new Vector2( 5, -1 ), new Vector2( 1, 5 ) );

      // Act
      const result = ray.getLineSegmentIntersection( line );

      // Assert
      expect( result!.x ).to.be.closeTo( 3, 0.001 );
      expect( result!.y ).to.be.closeTo( 2, 0.001 );
    } );

    it( 'should return the intersection point if intersection is close to endpoint', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 0, 0 ), new Vector2( 4, 2 ) );
      const line = new Line2( new Vector2( 2, 3 ), new Vector2( 2, 1 + 1e-15 ) );

      // Act
      const result = ray.getLineSegmentIntersection( line );

      // Assert
      expect( result!.x ).to.be.closeTo( 2, 0.001 );
      expect( result!.y ).to.be.closeTo( 1, 0.001 );
    } );

    it( 'should return null if intersection is outside of segment', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 0, 0 ), new Vector2( 6, 4 ) );
      const line = new Line2( new Vector2( 1, 5 ), new Vector2( -1, 8 ) );

      // Act
      const result = ray.getLineSegmentIntersection( line );

      // Assert
      expect( result ).to.be.null;
    } );

    it( 'should return null for if ray and line are parallel', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const line = new Line2( new Vector2( 1, 2 ), new Vector2( 4, 4 ) );

      // Act
      const result = ray.getLineSegmentIntersection( line );

      // Assert
      expect( result ).to.be.null;
    } );

    it( 'should return null for if line is on the wrong side of the ray', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const line = new Line2( new Vector2( -2, 0 ), new Vector2( 0, -1 ) );

      // Act
      const result = ray.getLineSegmentIntersection( line );

      // Assert
      expect( result ).to.be.null;
    } );
  } );

  describe( 'getSideOfPoint', (): void => {
    it( 'should return 1 if left of ray', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const point = new Vector2( 1, 2 );

      // Act
      const result = ray.getSideOfPoint( point );

      // Assert
      expect( result ).to.equal( 1 );
    } );

    it( 'should return -1 if right of ray', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const point = new Vector2( 2, 1 );

      // Act
      const result = ray.getSideOfPoint( point );

      // Assert
      expect( result ).to.equal( -1 );
    } );

    it( 'should return 0 if point is on the infinite line through the ray', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const point = new Vector2( -3, -2 );

      // Act
      const result = ray.getSideOfPoint( point );

      // Assert
      expect( result ).to.equal( 0 );
    } );

    it( 'should return 0 if point is very close to the ray', (): void => {
      // Arrange
      const ray = new Ray2( new Vector2( 0, 0 ), new Vector2( 3, 2 ) );
      const point = new Vector2( 3, 2 + 1e-15 );

      // Act
      const result = ray.getSideOfPoint( point );

      // Assert
      expect( result ).to.equal( 0 );
    } );
  } );
} );
