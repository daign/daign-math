import {expect} from 'chai';

import {MathHelper} from '../lib/mathHelper';

describe( 'MathHelper', () => {
  describe( 'clamp', () => {
    it( 'should make value smaller if too big', () => {
      // act
      const result = MathHelper.clamp( -8, -20, -10 );

      // assert
      expect( result ).to.equal( -10 );
    } );

    it( 'should make value bigger if too small', () => {
      // act
      const result = MathHelper.clamp( 5, 10, 20 );

      // assert
      expect( result ).to.equal( 10 );
    } );

    it( 'should not change a value which is inside the limits', () => {
      // act
      const result = MathHelper.clamp( 15, 10, 20 );

      // assert
      expect( result ).to.equal( 15 );
    } );
  } );

  describe( 'lerp', () => {
    it( 'should interpolate between two values', () => {
      // act
      const result = MathHelper.lerp( 3, 47, 0.25 );

      // assert
      expect( result ).to.equal( 14 );
    } );

    it( 'should interpolate between two values when the end is lower than the start', () => {
      // act
      const result = MathHelper.lerp( 47, 3, 0.25 );

      // assert
      expect( result ).to.equal( 36 );
    } );
  } );
} );
