import { expect } from 'chai';

import { MathHelper } from '../lib/mathHelper';

describe( 'MathHelper', (): void => {
  describe( 'clamp', (): void => {
    it( 'should make value smaller if too big', (): void => {
      // Act
      const result = MathHelper.clamp( -8, -20, -10 );

      // Assert
      expect( result ).to.equal( -10 );
    } );

    it( 'should make value bigger if too small', (): void => {
      // Act
      const result = MathHelper.clamp( 5, 10, 20 );

      // Assert
      expect( result ).to.equal( 10 );
    } );

    it( 'should not change a value which is inside the limits', (): void => {
      // Act
      const result = MathHelper.clamp( 15, 10, 20 );

      // Assert
      expect( result ).to.equal( 15 );
    } );
  } );

  describe( 'lerp', (): void => {
    it( 'should interpolate between two values', (): void => {
      // Act
      const result = MathHelper.lerp( 3, 47, 0.25 );

      // Assert
      expect( result ).to.equal( 14 );
    } );

    it( 'should interpolate between two values when the end is lower than the start', (): void => {
      // Act
      const result = MathHelper.lerp( 47, 3, 0.25 );

      // Assert
      expect( result ).to.equal( 36 );
    } );
  } );

  describe( 'closeTo', (): void => {
    it( 'should return true for values close to each other using a given delta', (): void => {
      // Act
      const result = MathHelper.closeTo( 1, 1.001, 0.002 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false for values not close to each other using a given delta', (): void => {
      // Act
      const result = MathHelper.closeTo( 1, 1.003, 0.002 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return true for values close to each other using epsilon delta', (): void => {
      // Act
      const result = MathHelper.closeTo( 0.1 + 0.2, 0.3 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false for values not close to each other using epsilon delta', (): void => {
      // Act
      const result = MathHelper.closeTo( 1, 1.000000001 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false for values completely equal if delta is zero', (): void => {
      // Act
      const result = MathHelper.closeTo( 1, 1, 0 );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false for values not completely equal if delta is zero', (): void => {
      // Act
      const result = MathHelper.closeTo( 0.1 + 0.2, 0.3, 0 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );
} );
