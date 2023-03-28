import { expect } from 'chai';
import { spy } from 'sinon';

import { Angle, Matrix3, Vector2 } from '../lib';

describe( 'Matrix3', (): void => {
  describe( 'getter elements', (): void => {
    it( 'should get elements', (): void => {
      // Arrange
      const m = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // Act
      const result = m.elements;

      // Assert
      expect( result.length ).to.equal( 9 );
      expect( result[ 0 ] ).to.equal( 1 );
      expect( result[ 1 ] ).to.equal( 2 );
      expect( result[ 2 ] ).to.equal( 3 );
      expect( result[ 3 ] ).to.equal( 4 );
      expect( result[ 4 ] ).to.equal( 5 );
      expect( result[ 5 ] ).to.equal( 6 );
      expect( result[ 6 ] ).to.equal( 7 );
      expect( result[ 7 ] ).to.equal( 8 );
      expect( result[ 8 ] ).to.equal( 9 );
    } );
  } );

  describe( 'constructor', (): void => {
    it( 'should set all values', (): void => {
      // Act
      const m = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // Assert
      const e = m.elements;
      expect( e[ 0 ] ).to.equal( 1 );
      expect( e[ 1 ] ).to.equal( 2 );
      expect( e[ 2 ] ).to.equal( 3 );
      expect( e[ 3 ] ).to.equal( 4 );
      expect( e[ 4 ] ).to.equal( 5 );
      expect( e[ 5 ] ).to.equal( 6 );
      expect( e[ 6 ] ).to.equal( 7 );
      expect( e[ 7 ] ).to.equal( 8 );
      expect( e[ 8 ] ).to.equal( 9 );
    } );

    it( 'should set zero values if uninitialised', (): void => {
      // Act
      const m = new Matrix3();

      // Assert
      expect( m.elements.every( ( a: number ): boolean => a === 0 ) ).to.be.true;
    } );
  } );

  describe( 'set', (): void => {
    it( 'should set all values', (): void => {
      // Arrange
      const m = new Matrix3();

      // Act
      m.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // Assert
      const e = m.elements;
      expect( e[ 0 ] ).to.equal( 1 );
      expect( e[ 1 ] ).to.equal( 2 );
      expect( e[ 2 ] ).to.equal( 3 );
      expect( e[ 3 ] ).to.equal( 4 );
      expect( e[ 4 ] ).to.equal( 5 );
      expect( e[ 5 ] ).to.equal( 6 );
      expect( e[ 6 ] ).to.equal( 7 );
      expect( e[ 7 ] ).to.equal( 8 );
      expect( e[ 8 ] ).to.equal( 9 );
    } );

    it( 'should call notifyObservers', (): void => {
      // Arrange
      const m = new Matrix3();
      const notifyObserversSpy = spy( m as any, 'notifyObservers' );

      // Act
      m.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // Assert
      expect( notifyObserversSpy.calledOnce ).to.be.true;
    } );

    it( 'should not call notifyObservers when value does not change', (): void => {
      // Arrange
      const m = new Matrix3();
      m.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const notifyObserversSpy = spy( m as any, 'notifyObservers' );

      // Act
      m.set( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // Assert
      expect( notifyObserversSpy.notCalled ).to.be.true;
    } );
  } );

  describe( 'copy', (): void => {
    it( 'should copy all values', (): void => {
      // Arrange
      const m1 = new Matrix3();
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // Act
      m1.copy( m2 );

      // Assert
      expect( m1.equals( m2 ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
      // Arrange
      const m1 = new Matrix3();
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const setSpy = spy( m1, 'set' );

      // Act
      m1.copy( m2 );

      // Assert
      expect( setSpy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'clone', (): void => {
    it( 'should return an object with the same values', (): void => {
      // Arrange
      const m = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // Act
      const result = m.clone();

      // Assert
      expect( result.equals( m ) ).to.be.true;
    } );

    it( 'should not call observers when original matrix changes', (): void => {
      // Arrange
      const m = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const result = m.clone();
      const notifyObserversSpy = spy( ( result as any ), 'notifyObservers' );

      // Act
      m.setIdentity();

      // Assert
      expect( notifyObserversSpy.notCalled ).to.be.true;
    } );
  } );

  describe( 'equals', (): void => {
    it( 'should return true if values equal', (): void => {
      // Arrange
      const m1 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );

      // Act
      const result = m1.equals( m2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if values do not equal', (): void => {
      // Arrange
      const m1 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 10 );

      // Act
      const result = m1.equals( m2 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'matrixMultiplication', (): void => {
    it( 'should calculate the product of the matrices', (): void => {
      // Arrange
      const result = new Matrix3();
      const m1 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2 = new Matrix3( 5, 1, 6, 2, 7, 3, 8, 4, 9 );
      const expected = new Matrix3( 33, 27, 39, 78, 63, 93, 123, 99, 147 );

      // Act
      result.matrixMultiplication( m1, m2 );

      // Assert
      expect( result.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
      // Arrange
      const result = new Matrix3();
      const m1 = new Matrix3();
      const m2 = new Matrix3();
      const setSpy = spy( result, 'set' );

      // Act
      result.matrixMultiplication( m1, m2 );

      // Assert
      expect( setSpy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'multiply', (): void => {
    it( 'should calculate the product of the matrices', (): void => {
      // Arrange
      const m1 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2 = new Matrix3( 5, 1, 6, 2, 7, 3, 8, 4, 9 );
      const expected = new Matrix3( 33, 27, 39, 78, 63, 93, 123, 99, 147 );

      // Act
      m1.multiply( m2 );

      // Assert
      expect( m1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
      // Arrange
      const m1 = new Matrix3();
      const m2 = new Matrix3();
      const setSpy = spy( m1, 'set' );

      // Act
      m1.multiply( m2 );

      // Assert
      expect( setSpy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'transform', (): void => {
    it( 'should calculate the left sided product of the matrices', (): void => {
      // Arrange
      const m1 = new Matrix3( 5, 1, 6, 2, 7, 3, 8, 4, 9 );
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const expected = new Matrix3( 33, 27, 39, 78, 63, 93, 123, 99, 147 );

      // Act
      m1.transform( m2 );

      // Assert
      expect( m1.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
      // Arrange
      const m1 = new Matrix3();
      const m2 = new Matrix3();
      const setSpy = spy( m1, 'set' );

      // Act
      m1.transform( m2 );

      // Assert
      expect( setSpy.calledOnce ).to.be.true;
    } );
  } );

  describe( 'setIdentity', (): void => {
    it( 'should set the identity matrix', (): void => {
      // Arrange
      const m = new Matrix3();
      const expected = new Matrix3( 1, 0, 0, 0, 1, 0, 0, 0, 1 );

      // Act
      m.setIdentity();

      // Assert
      expect( m.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
      // Arrange
      const m = new Matrix3();
      const setSpy = spy( m, 'set' );

      // Act
      m.setIdentity();

      // Assert
      expect( setSpy.calledOnce ).to.be.true;
    } );

    it( 'should calculate the identical matrix when used as a transformation', (): void => {
      // Arrange
      const m1 = new Matrix3().setIdentity();
      const m2 = new Matrix3( 1, 2, 3, 4, 5, 6, 7, 8, 9 );
      const m2copy = m2.clone();

      // Act
      m2.transform( m1 );

      // Assert
      expect( m2.equals( m2copy ) ).to.be.true;
    } );
  } );

  describe( 'setTranslation', (): void => {
    it( 'should set the translation matrix', (): void => {
      // Arrange
      const m = new Matrix3();
      const expected = new Matrix3( 1, 0, 5, 0, 1, 6, 0, 0, 1 );

      // Act
      m.setTranslation( new Vector2( 5, 6 ) );

      // Assert
      expect( m.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
      // Arrange
      const m = new Matrix3();
      const setSpy = spy( m, 'set' );

      // Act
      m.setTranslation( new Vector2() );

      // Assert
      expect( setSpy.calledOnce ).to.be.true;
    } );

    it( 'should calculate the translated vector when used as a transformation', (): void => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const translation = new Vector2( 3, 4 );
      const m = new Matrix3().setTranslation( translation );
      const expected = new Vector2( 4, 6 );

      // Act
      v.transform( m );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'setScaling', (): void => {
    it( 'should set the scaling matrix', (): void => {
      // Arrange
      const m = new Matrix3();
      const expected = new Matrix3( 5, 0, 0, 0, 6, 0, 0, 0, 1 );

      // Act
      m.setScaling( new Vector2( 5, 6 ) );

      // Assert
      expect( m.equals( expected ) ).to.be.true;
    } );

    it( 'should call set', (): void => {
      // Arrange
      const m = new Matrix3();
      const setSpy = spy( m, 'set' );

      // Act
      m.setScaling( new Vector2() );

      // Assert
      expect( setSpy.calledOnce ).to.be.true;
    } );

    it( 'should calculate the scaled vector when used as a transformation', (): void => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const scaling = new Vector2( 3, 4 );
      const m = new Matrix3().setScaling( scaling );
      const expected = new Vector2( 3, 8 );

      // Act
      v.transform( m );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'setRotation', (): void => {
    it( 'should call set', (): void => {
      // Arrange
      const m = new Matrix3();
      const setSpy = spy( m, 'set' );

      // Act
      m.setRotation( new Angle() );

      // Assert
      expect( setSpy.calledOnce ).to.be.true;
    } );

    it( 'should calculate the rotated vector when used as a transformation', (): void => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const rotation = new Angle( Math.PI / 2 );
      const m = new Matrix3().setRotation( rotation );
      const expected = new Vector2( -2, 1 );

      // Act
      v.transform( m );

      // Assert
      expect( v.x ).to.be.closeTo( expected.x, 0.001 );
      expect( v.y ).to.be.closeTo( expected.y, 0.001 );
    } );

    it( 'should calculate the rotated vector around a point when used as a transformation',
      (): void => {
        // Arrange
        const v = new Vector2( 1, 2 );
        const rotation = new Angle( Math.PI / 2 );
        const center = new Vector2( 3, 3 );
        const m = new Matrix3().setRotation( rotation, center );
        const expected = new Vector2( 4, 1 );

        // Act
        v.transform( m );

        // Assert
        expect( v.x ).to.be.closeTo( expected.x, 0.001 );
        expect( v.y ).to.be.closeTo( expected.y, 0.001 );
      }
    );
  } );

  describe( 'setSkewX', (): void => {
    it( 'should call set', (): void => {
      // Arrange
      const m = new Matrix3();
      const setSpy = spy( m, 'set' );

      // Act
      m.setSkewX( new Angle() );

      // Assert
      expect( setSpy.calledOnce ).to.be.true;
    } );

    it( 'should calculate the skewed vector when used as a transformation', (): void => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const angle = new Angle( 0.17 );
      const m = new Matrix3().setSkewX( angle );
      const expected = new Vector2( 1.343, 2 );

      // Act
      v.transform( m );

      // Assert
      expect( v.x ).to.be.closeTo( expected.x, 0.001 );
      expect( v.y ).to.be.closeTo( expected.y, 0.001 );
    } );
  } );

  describe( 'setSkewY', (): void => {
    it( 'should call set', (): void => {
      // Arrange
      const m = new Matrix3();
      const setSpy = spy( m, 'set' );

      // Act
      m.setSkewY( new Angle() );

      // Assert
      expect( setSpy.calledOnce ).to.be.true;
    } );

    it( 'should calculate the skewed vector when used as a transformation', (): void => {
      // Arrange
      const v = new Vector2( 2, 1 );
      const angle = new Angle( 0.17 );
      const m = new Matrix3().setSkewY( angle );
      const expected = new Vector2( 2, 1.343 );

      // Act
      v.transform( m );

      // Assert
      expect( v.x ).to.be.closeTo( expected.x, 0.001 );
      expect( v.y ).to.be.closeTo( expected.y, 0.001 );
    } );
  } );

  describe( 'applyTranslation', (): void => {
    it( 'should apply a translation after a scaling', (): void => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const scaling = new Vector2( 3, 2 );
      const translation = new Vector2( 2, 1 );
      const m = new Matrix3().setScaling( scaling );
      const expected = new Vector2( 5, 5 );

      // Act
      m.applyTranslation( translation );
      v.transform( m );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'applyScaling', (): void => {
    it( 'should apply a scaling after a translation', (): void => {
      // Arrange
      const v = new Vector2( 1, 2 );
      const translation = new Vector2( 2, 1 );
      const scaling = new Vector2( 3, 2 );
      const m = new Matrix3().setTranslation( translation );
      const expected = new Vector2( 9, 6 );

      // Act
      m.applyScaling( scaling );
      v.transform( m );

      // Assert
      expect( v.equals( expected ) ).to.be.true;
    } );
  } );

  describe( 'applyRotation', (): void => {
    it( 'should apply rotation to a transformation matrix', (): void => {
      // Arrange
      const v = new Vector2();
      const translation = new Vector2( 1, 2 );
      const rotation = new Angle( Math.PI / 2 );

      // Transformation is initialised with a translation which should execute before the rotation.
      const m = new Matrix3().setTranslation( translation );
      const expected = new Vector2( -2, 1 );

      // Act
      m.applyRotation( rotation );
      // The complete transformation is executed on a vector.
      v.transform( m );

      // Assert
      expect( v.x ).to.be.closeTo( expected.x, 0.001 );
      expect( v.y ).to.be.closeTo( expected.y, 0.001 );
    } );

    it( 'should apply rotation around a point to a transformation matrix', (): void => {
      // Arrange
      const v = new Vector2();
      const translation = new Vector2( 1, 2 );
      const rotation = new Angle( Math.PI / 2 );
      const center = new Vector2( 3, 3 );

      // Transformation is initialised with a translation which should execute before the rotation.
      const m = new Matrix3().setTranslation( translation );
      const expected = new Vector2( 4, 1 );

      // Act
      m.applyRotation( rotation, center );
      // The complete transformation is executed on a vector.
      v.transform( m );

      // Assert
      expect( v.x ).to.be.closeTo( expected.x, 0.001 );
      expect( v.y ).to.be.closeTo( expected.y, 0.001 );
    } );
  } );

  describe( 'applySkewX', (): void => {
    it( 'should apply skew along the x axis to a transformation matrix', (): void => {
      // Arrange
      const v = new Vector2();
      const translation = new Vector2( 1, 2 );
      const skewX = new Angle( 0.17 );

      // Transformation is initialised with a translation which should execute before the skew.
      const m = new Matrix3().setTranslation( translation );
      const expected = new Vector2( 1.343, 2 );

      // Act
      m.applySkewX( skewX );
      // The complete transformation is executed on a vector.
      v.transform( m );

      // Assert
      expect( v.x ).to.be.closeTo( expected.x, 0.001 );
      expect( v.y ).to.be.closeTo( expected.y, 0.001 );
    } );
  } );

  describe( 'applySkewY', (): void => {
    it( 'should apply skew along the y axis to a transformation matrix', (): void => {
      // Arrange
      const v = new Vector2();
      const translation = new Vector2( 2, 1 );
      const skewY = new Angle( 0.17 );

      // Transformation is initialised with a translation which should execute before the skew.
      const m = new Matrix3().setTranslation( translation );
      const expected = new Vector2( 2, 1.343 );

      // Act
      m.applySkewY( skewY );
      // The complete transformation is executed on a vector.
      v.transform( m );

      // Assert
      expect( v.x ).to.be.closeTo( expected.x, 0.001 );
      expect( v.y ).to.be.closeTo( expected.y, 0.001 );
    } );
  } );

  describe( 'determinant', (): void => {
    it( 'should calculate the determinant of a matrix', (): void => {
      // Arrange
      const m = new Matrix3( 1, 2, 3, 4, 0, 4, 3, 2, 1 );

      // Act
      const result = m.determinant();

      // Assert
      expect( result ).to.equal( 32 );
    } );
  } );

  describe( 'setToInverse', (): void => {
    it( 'should set to the inverse of a matrix', (): void => {
      // Arrange
      const m = new Matrix3( 1, 2, 3, 4, 0, 4, 3, 2, 1 );
      const expected = new Matrix3(
        -2 / 8, 1 / 8, 2 / 8,
        2 / 8, -2 / 8, 2 / 8,
        2 / 8, 1 / 8, -2 / 8
      );

      // Act
      const result = new Matrix3().setToInverse( m );

      // Assert
      expect( result.equals( expected ) ).to.be.true;
    } );

    it( 'should throw error when matrix cannot be inverted', (): void => {
      // Arrange
      const m = new Matrix3( 1, 2, 3, 4, 0, 4, 0, 0, 0 );

      // Act
      const badFn = (): void => {
        new Matrix3().setToInverse( m );
      };

      // Assert
      expect( badFn ).to.throw( 'Can not invert matrix because determinant is 0.' );
    } );

    it( 'should result in identity matrix when multiplied with original matrix', (): void => {
      // Arrange
      const m = new Matrix3( 1, 2, 3, 4, 0, 4, 3, 2, 1 );
      const inverse = new Matrix3().setToInverse( m );
      const expected = new Matrix3().setIdentity();

      // Act
      m.multiply( inverse );

      // Assert
      expect( m.equals( expected ) ).to.be.true;
    } );
  } );
} );
