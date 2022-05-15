import { Tile } from './tile';

/**
 * Top of the tile space document.
 */
export class TileSpace {
  /* The top most tile or null. */
  public root: Tile | null = null;

  /* The number of partitions along one axis.
   * Partition count of 2 means that the tile can be split into 2x2 sub tiles. */
  public partitionCount: number;

  /**
   * Constructor.
   * @param partitionCount - The number of partitions along one axis.
   */
  public constructor( partitionCount: number ) {
    if ( partitionCount < 2 ) {
      throw new Error( 'Number of partitions must be 2 or more.' );
    }
    this.partitionCount = Math.floor( partitionCount );
  }
}
