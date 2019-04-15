import { Color } from '@daign/color';
import { Vector2 } from '@daign/math';

/**
 * Class for a tile in a tile space document.
 */
export class Tile {
  /* Min coordinates, has the smaller x and y values. */
  public min: Vector2;
  /* Max coodinates, has the greater x and y values. */
  public max: Vector2;

  /* The number of partitions along one axis. */
  public partitionCount: number;

  /* The color of the tile or null. */
  public filling: Color | null = null;

  /* The subtiles of the tile.
   * Number of subtiles should always be zero or partitionCount^2. */
  public children: Tile[] = [];

  /**
   * Constructor.
   * @param min The min coordinates.
   * @param max The max coordinates.
   * @param partitionCount The number of partitions along one axis.
   */
  public constructor( min: Vector2, max: Vector2, partitionCount: number ) {
    this.min = min;
    this.max = max;
    this.partitionCount = partitionCount;
  }

  /**
   * Split the tile into subtiles by number of partition count along each axis.
   */
  public split(): void {
    const tileWidth = this.max.clone().sub( this.min ).multiplyScalar(
      1 / this.partitionCount
    );

    for ( let y = 0; y < this.partitionCount; y += 1 ) {
      for ( let x = 0; x < this.partitionCount; x += 1 ) {
        const min = tileWidth.clone().multiply( new Vector2( x, y ) ).add( this.min );
        const max = tileWidth.clone().multiply( new Vector2( x + 1, y + 1 ) ).add( this.min );
        const tile = new Tile( min, max, this.partitionCount );
        this.children.push( tile );
      }
    }
  }

  /**
   * Test whether point lies inside of tile including the lower border.
   * @param p The point.
   * @returns Whether point lies inside of tile.
   */
  public containsPoint( p: Vector2 ): boolean {
    return !(
      p.x < this.min.x || p.x >= this.max.x ||
      p.y < this.min.y || p.y >= this.max.y
    );
  }

  /**
   * Get the tile at a given point.
   * @param p The given point.
   * @returns The resulting tile or null if not found.
   */
  public findTile( point: Vector2 ): Tile | null {
    if ( this.containsPoint( point ) ) {
      if ( this.children.length > 0 ) {
        const m = point.clone().sub( this.min );
        const n = this.max.clone().sub( this.min );
        m.divide( n ).multiplyScalar( this.partitionCount ).floor();
        const i = m.x + m.y * this.partitionCount;
        return this.children[ i ].findTile( point );
      } else {
        return this;
      }
    } else {
      return null;
    }
  }
}
