import { expect } from 'chai';

import { Color } from '@daign/color';
import { Vector2 } from '@daign/math';

import { Tile } from '../lib/tile';

describe( 'Tile', () => {
  describe( 'constructor', () => {
    it( 'should set partitionCount', () => {
      // Arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );

      // Act
      const tile = new Tile( min, max, 5 );

      // Assert
      expect( tile.partitionCount ).to.equal( 5 );
    } );

    it( 'should round the passed partitionCount down', () => {
      // Arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );

      // Act
      const tile = new Tile( min, max, 3.9 );

      // Assert
      expect( tile.partitionCount ).to.equal( 3 );
    } );

    it( 'should throw error if partitionCount is less than 2', () => {
      // Arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );

      // Act
      const badFn = (): void => {
        const tile = new Tile( min, max, 1 );
        tile.filling = null;
      };

      // Assert
      expect( badFn ).to.throw( 'Number of partitions must be 2 or more.' );
    } );
  } );

  describe( 'split', () => {
    it( 'should split tile with partitionCount 2', () => {
      // Arrange
      const min = new Vector2( 1, 4 );
      const max = new Vector2( 3, 6 );
      const tile = new Tile( min, max, 2 );

      // Act
      tile.split();

      // Assert
      expect( tile.children.length ).to.equal( 4 );
      expect( tile.children[ 0 ].min.equals( new Vector2( 1, 4 ) ) ).to.be.true;
      expect( tile.children[ 0 ].max.equals( new Vector2( 2, 5 ) ) ).to.be.true;
      expect( tile.children[ 1 ].min.equals( new Vector2( 2, 4 ) ) ).to.be.true;
      expect( tile.children[ 1 ].max.equals( new Vector2( 3, 5 ) ) ).to.be.true;
      expect( tile.children[ 2 ].min.equals( new Vector2( 1, 5 ) ) ).to.be.true;
      expect( tile.children[ 2 ].max.equals( new Vector2( 2, 6 ) ) ).to.be.true;
      expect( tile.children[ 3 ].min.equals( new Vector2( 2, 5 ) ) ).to.be.true;
      expect( tile.children[ 3 ].max.equals( new Vector2( 3, 6 ) ) ).to.be.true;
    } );

    it( 'should split tile with partitionCount 3', () => {
      // Arrange
      const min = new Vector2( 1, 5 );
      const max = new Vector2( 4, 8 );
      const tile = new Tile( min, max, 3 );

      // Act
      tile.split();

      // Assert
      expect( tile.children.length ).to.equal( 9 );
      expect( tile.children[ 0 ].min.equals( new Vector2( 1, 5 ) ) ).to.be.true;
      expect( tile.children[ 0 ].max.equals( new Vector2( 2, 6 ) ) ).to.be.true;
      expect( tile.children[ 1 ].min.equals( new Vector2( 2, 5 ) ) ).to.be.true;
      expect( tile.children[ 1 ].max.equals( new Vector2( 3, 6 ) ) ).to.be.true;
      expect( tile.children[ 2 ].min.equals( new Vector2( 3, 5 ) ) ).to.be.true;
      expect( tile.children[ 2 ].max.equals( new Vector2( 4, 6 ) ) ).to.be.true;
      expect( tile.children[ 3 ].min.equals( new Vector2( 1, 6 ) ) ).to.be.true;
      expect( tile.children[ 3 ].max.equals( new Vector2( 2, 7 ) ) ).to.be.true;
      expect( tile.children[ 4 ].min.equals( new Vector2( 2, 6 ) ) ).to.be.true;
      expect( tile.children[ 4 ].max.equals( new Vector2( 3, 7 ) ) ).to.be.true;
      expect( tile.children[ 5 ].min.equals( new Vector2( 3, 6 ) ) ).to.be.true;
      expect( tile.children[ 5 ].max.equals( new Vector2( 4, 7 ) ) ).to.be.true;
      expect( tile.children[ 6 ].min.equals( new Vector2( 1, 7 ) ) ).to.be.true;
      expect( tile.children[ 6 ].max.equals( new Vector2( 2, 8 ) ) ).to.be.true;
      expect( tile.children[ 7 ].min.equals( new Vector2( 2, 7 ) ) ).to.be.true;
      expect( tile.children[ 7 ].max.equals( new Vector2( 3, 8 ) ) ).to.be.true;
      expect( tile.children[ 8 ].min.equals( new Vector2( 3, 7 ) ) ).to.be.true;
      expect( tile.children[ 8 ].max.equals( new Vector2( 4, 8 ) ) ).to.be.true;
    } );

    it( 'should copy the filling to the children', () => {
      // Arrange
      const min = new Vector2( 1, 4 );
      const max = new Vector2( 3, 6 );
      const tile = new Tile( min, max, 2 );
      const color = new Color().setFromHex( '0369cf' );
      tile.filling = color;

      // Act
      tile.split();

      // Assert
      expect( tile.children.length ).to.equal( 4 );
      expect( tile.children[ 0 ].filling!.equals( color ) ).to.be.true;
      expect( tile.children[ 1 ].filling!.equals( color ) ).to.be.true;
      expect( tile.children[ 2 ].filling!.equals( color ) ).to.be.true;
      expect( tile.children[ 3 ].filling!.equals( color ) ).to.be.true;
    } );

    it( 'should copy the partitionCount to the children', () => {
      // Arrange
      const min = new Vector2( 1, 4 );
      const max = new Vector2( 3, 6 );
      const tile = new Tile( min, max, 2 );

      // Act
      tile.split();

      // Assert
      expect( tile.children.length ).to.equal( 4 );
      expect( tile.children[ 0 ].partitionCount ).to.equal( 2 );
      expect( tile.children[ 1 ].partitionCount ).to.equal( 2 );
      expect( tile.children[ 2 ].partitionCount ).to.equal( 2 );
      expect( tile.children[ 3 ].partitionCount ).to.equal( 2 );
    } );
  } );

  describe( 'containsPoint', () => {
    it( 'should return true if point is contained', () => {
      // Arrange
      const min = new Vector2( 1, 4 );
      const max = new Vector2( 3, 6 );
      const tile = new Tile( min, max, 5 );

      // Act
      const point = new Vector2( 1.5, 4.5 );
      const result = tile.containsPoint( point );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return true if point is on lower border', () => {
      // Arrange
      const min = new Vector2( 1, 4 );
      const max = new Vector2( 3, 6 );
      const tile = new Tile( min, max, 5 );

      // Act
      const point = new Vector2( 1.5, 4 );
      const result = tile.containsPoint( point );

      // Assert
      expect( result ).to.be.true;
    } );

    it( 'should return false if point is on upper border', () => {
      // Arrange
      const min = new Vector2( 1, 4 );
      const max = new Vector2( 3, 6 );
      const tile = new Tile( min, max, 5 );

      // Act
      const point = new Vector2( 3, 4.5 );
      const result = tile.containsPoint( point );

      // Assert
      expect( result ).to.be.false;
    } );

    it( 'should return false if point is not contained', () => {
      // Arrange
      const min = new Vector2( 1, 4 );
      const max = new Vector2( 3, 6 );
      const tile = new Tile( min, max, 5 );

      // Act
      const point = new Vector2( 4.5, 1.5 );
      const result = tile.containsPoint( point );

      // Assert
      expect( result ).to.be.false;
    } );
  } );

  describe( 'findTile', () => {
    it( 'should return itself if tile has no children', () => {
      // Arrange
      const min = new Vector2( 1, 2 );
      const max = new Vector2( 3, 4 );
      const tile = new Tile( min, max, 3 );

      // Act
      const point = new Vector2( 2.5, 2.5 );
      const result = tile.findTile( point );

      // Assert
      expect( result ).to.equal( tile );
    } );

    it( 'should find tile for one level nesting', () => {
      // Arrange
      const min = new Vector2( 0, 0 );
      const max = new Vector2( 9, 9 );
      const tile = new Tile( min, max, 3 );
      tile.split();

      // Act
      const point = new Vector2( 2.5, 5.5 );
      const result = tile.findTile( point );

      // Assert
      const expected = tile.children[ 3 ];
      expect( result ).to.equal( expected );
    } );

    it( 'should find tile for two level nesting', () => {
      // Arrange
      const min = new Vector2( 0, 0 );
      const max = new Vector2( 9, 9 );
      const tile = new Tile( min, max, 3 );
      tile.split();
      tile.children[ 3 ].split();

      // Act
      const point = new Vector2( 2.5, 5.5 );
      const result = tile.findTile( point );

      // Assert
      const expected = tile.children[ 3 ].children[ 8 ];
      expect( result ).to.equal( expected );
    } );

    it( 'should return null if given point is not contained', () => {
      // Arrange
      const min = new Vector2( 1, 4 );
      const max = new Vector2( 3, 6 );
      const tile = new Tile( min, max, 3 );
      tile.split();

      // Act
      const point = new Vector2( 4.5, 1.5 );
      const result = tile.findTile( point );

      // Assert
      expect( result ).to.be.null;
    } );
  } );
} );
