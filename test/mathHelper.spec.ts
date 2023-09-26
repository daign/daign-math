import { expect } from 'chai';

import { MathHelper } from '../lib';

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

  describe( 'withinOrCloseToLimits', (): void => {
    it( 'should return true for a value within limits', (): void => {
      // Act
      const result = MathHelper.withinOrCloseToLimits( 1, 0, 2 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true for a value close to minimum limit', (): void => {
      // Act
      const result = MathHelper.withinOrCloseToLimits( 0 - 0.001, 0, 2, 0.002 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true for a value close to maximum limit', (): void => {
      // Act
      const result = MathHelper.withinOrCloseToLimits( 2 + 0.001, 0, 2, 0.002 );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false for a value outside of limits', (): void => {
      // Act
      const result = MathHelper.withinOrCloseToLimits( 2 + 0.001, 0, 2 );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'precisionRound', (): void => {
    it( 'should round with given precision', (): void => {
      // Act
      const result = MathHelper.precisionRound( 1.005, 2 );

      // Assert
      expect( result ).to.equal( 1.01 );
    } );

    it( 'should round with given negative precision', (): void => {
      // Act
      const result = MathHelper.precisionRound( 1005, -1 );

      // Assert
      expect( result ).to.equal( 1010 );
    } );
  } );
} );
