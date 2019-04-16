import { expect } from 'chai';

import { TileSpace } from '../lib/tileSpace';

describe( 'TileSpace', () => {
  describe( 'constructor', () => {
    it( 'should set partitionCount', () => {
      // Act
      const tileSpace = new TileSpace( 2 );

      // Assert
      expect( tileSpace.partitionCount ).to.equal( 2 );
    } );

    it( 'should round the passed partitionCount down', () => {
      // Act
      const tileSpace = new TileSpace( 3.9 );

      // Assert
      expect( tileSpace.partitionCount ).to.equal( 3 );
    } );

    it( 'should throw error if partitionCount is less than 2', () => {
      // Act
      const badFn = (): void => {
        const tileSpace = new TileSpace( 1 );
        tileSpace.root = null;
      };

      // Assert
      expect( badFn ).to.throw( 'Number of partitions must be 2 or more.' );
    } );
  } );
} );
