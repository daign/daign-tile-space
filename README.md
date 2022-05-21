# daign-tile-space

[![NPM package][npm]][npm-url]

Data structure for a recursive tile raster.

## Installation

```sh
npm install @daign/tile-space --save
```

## Usage example

```typescript
import { expect } from 'chai';
import { Vector2 } from '@daign/math';
import { Tile, TileSpace } from '@daign/tile-space';

// The number of partitions in a tile along one axis.
const partitionCount = 2;

// Create the tile space document.
const tileSpace = new TileSpace( partitionCount );

// Create the first tile.
const min = new Vector2( 0, 0 );
const max = new Vector2( 8, 8 );
const rootTile = new Tile( min, max, partitionCount );
tileSpace.root = rootTile;

// Split the tile.
rootTile.split();

// Find the tile at a given point.
const point = new Vector2( 7, 3 );
const tile = rootTile.findTile( point );

// The found tile goes from (4, 0) to (8, 4).
expect( tile ).to.not.be.null;
expect( tile!.min.x ).to.equal( 4 );
expect( tile!.min.y ).to.equal( 0 );
expect( tile!.max.x ).to.equal( 8 );
expect( tile!.max.y ).to.equal( 4 );
```

## Scripts

#### Build

    npm run build

#### Run lint analysis

    npm run lint

#### Run unit tests with code coverage

    npm run test

[npm]: https://img.shields.io/npm/v/@daign/tile-space.svg
[npm-url]: https://www.npmjs.com/package/@daign/tile-space
