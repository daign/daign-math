# daign-math

[![CI][ci-icon]][ci-url]
[![Coverage][coveralls-icon]][coveralls-url]
[![NPM package][npm-icon]][npm-url]

#### Math library in Typescript

Inspired by the math classes from [three.js](https://github.com/mrdoob/three.js/).
But here the focus is on 2D graphics.
Additionally every class implements an [observable pattern](https://github.com/daign/daign-observable).

## Installation

```sh
npm install @daign/math --save
```

## Classes

+ **Vector2** - Two-dimensional vectors and main focus of this library.

<!-- -->

+ **Line2** - Two-dimensional lines with start and end points.
+ **Box2** - Rectangle shape that is defined by a min and max point. Used to represent bounding boxes.
+ **Triangle2** - Basic functionality for two-dimensional triangles.
+ **Vector3** - Basic functionality for three-dimensional vectors.
+ **Matrix3** - 3x3 matrices used for transforming 2D-vectors in homogeneous coordinates.

<!-- -->

+ **Vector1** - Abstract class for 1D vectors.
  + **Value** - Basic implementation of the 1D vector class for numeric values.
  + **Angle** - Extension of 1D vectors for calculations with angles.
+ **StringValue** - Implementation of the observable pattern for a single string.

<!-- -->

+ **GenericArray** - Abstract class for arrays of elements implementing the observable pattern.
  + **Vector2Array** - Arrays of 2D vectors.
  + **StringArray** - Arrays of strings.

<!-- -->

+ **ComplexNumber** - Basic functionality for complex numbers.
+ **MathHelper** - Helper functions.

## Usage example

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

```bash
# Build
npm run build

# Run lint analysis
npm run lint

# Run unit tests with code coverage
npm run test

# Get a full lcov report
npm run coverage
```

[ci-icon]: https://github.com/daign/daign-math/workflows/CI/badge.svg
[ci-url]: https://github.com/daign/daign-math/actions
[coveralls-icon]: https://coveralls.io/repos/github/daign/daign-math/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/daign/daign-math?branch=master
[npm-icon]: https://img.shields.io/npm/v/@daign/math.svg
[npm-url]: https://www.npmjs.com/package/@daign/math
