# daign-math

[![NPM package][npm]][npm-url]

#### Math library in Typescript

Inspired by the math classes from [three.js](https://github.com/mrdoob/three.js/).
But here the focus is on 2D graphics.
Additionally every class implements an [observable pattern](https://github.com/daign/daign-observable).

## Installation

```sh
npm install @daign/math --save
```

## Usage

```typescript
import {Line2} from '@daign/math';
import {Vector2} from '@daign/math';

// Create a point
const point = new Vector2( 1, 5 );

// Create a line
const line = new Line2( new Vector2(), new Vector2( 6, 4 ) );

// Calculate result of projecting the point on the line
const projected = point.projectOnLine( line );
console.log( projected.x, projected.y );

// Calculate distance between point and projection
console.log( point.distanceTo( projected ) );
```

## Scripts

#### Build

    npm run build

#### Run lint analysis

    npm run lint

#### Run unit tests with code coverage

    npm run test

[npm]: https://img.shields.io/npm/v/@daign/math.svg
[npm-url]: https://www.npmjs.com/package/@daign/math
