# bob-standard

Welcome to the documentation of the `bob-standard` library.

At the moment, this is just a collection of available methods with the input and output types along with some comments on it. I will extend this soon to provide further explaination.


## Table of Contents
- [Installation](#installation)
- [Example Usage](#example-usage)
- [Constants](#constants)
- [Checkers](#checkers)
- [Calculation](#calculation)
- [Helpers](#helpers)
- [Classes](#classes)
   - [Vector2D](#vector2d)
   - [Vector3D](#vector3d)
   - [Angle2D](#angle2d)
   - [Angle3D](#angle3d)


## Installation

Here's how you can include `bob-standard` in your project.

1. In your terminal you enter:
`
npm install bob-standard
`

2. And in your JavaScript project file you put:
`
const bob = require('bob-standard')
`

## Example Usage
```js
const bob = require('bob-standard')

bob.say('hello world')
```

## Constants

| variable  | value                   |
| --------- | ----------------------- |
| bob.pi    | pi                      |
| bob.tau   | 2*pi                    |
| bob.pih   | pi/2                    |
| bob.rtau  | square root of 2*pi     |
| bob.rtaue | square root of 2*pi\*e  |
| bob.e     | e                       |
| bob.re    | square root of e        |
| bob.ree   | e-th root of e          |
| bob.ipi   | i^pi                    |
| bob.pie   | pi^e                    |
| bob.epi   | e^pi                    |
| bob.pis   | pi^2                    |
| bob.pip   | pi^pi                   |
| bob.es    | e^2                     |
| bob.ie    | 1/e                     |
| bob.ii    | i^i                     |
| bob.phi   | golden ratio            |
| bob.gan   | golden angle in radians |
| bob.chi   | chi function            |
| bob.r2    | square root of 2        |
| bob.r3    | square root of 3        |
| bob.r5    | square root of 5        |
| bob.r45   | fourth root of 5        |
| bob.ln2   | natural log of 2        |
| bob.llim  | laplace limit           |

## Checkers

| function | arguments           | returns | comment                                     |
| -------- | ------------------- | ------- | ------------------------------------------- |
| isPrime  | x: number           | boolean | takes some time when checking large numbers |
| isPalin  | x: [number, string] | boolean |                                             |
| isSquare | x: number           | boolean |                                             |
| isInt    | x: any              | boolean |                                             |

## Calculation

| function | arguments                   | returns | comment                                             |
| -------- | --------------------------- | ------- | --------------------------------------------------- |
| log      | x: number, [base: number]   | number  | default: e                                          |
| round    | x: number, [digits: number] | number  | default: 0                                          |
| arrSum   | array: number[]             | number  | sums up an array                                    |
| gcd      | array: number[]             | number  | finds greatest common divisor                        |
| smti     | x: number                   | number  | finds smallest multiple that multiplies x to integer |
| mean     | items: number[]             | number  | finds mean value of items                            |
| medi     | items: number[]             | number  | finds median value of items                          |
| devi     | items: number[]             | number  | finds maximum deviation of items from mean           |
| min      | items: number[]             | number  | finds minimum value of items                         |
| max      | items: number[]             | number  | finds maximum value of items                         |

## Helpers

| function | arguments                                    | returns          | comment                           |
| -------- | -------------------------------------------- | ---------------- | --------------------------------- |
| rand     | from: number, to: number                     | number           | random number within given range  |
| clone    | object: any                                  | any              | creates deep copy of object       |
| pick     | array: any[]                                 | any              | picks random element from array   |
| swap     | array: any[], indexA: number, indexB: number | any[]            | swaps items in array              |
| remove   | array: any[], remove: any[]                  | any[]            | removes items from array          |
| weight   | items: any[], weights: number[]              | any[]            | weights items in array            |
| extract  | input: string, identifier: string             | any[]            | creates array from table          |
| size     | object: object                               | { keys, values } | counts keys and values of object  |
| type     | item: any                                    | string           | identifies the actual type of item |
| say      | arguments: ?                                 | void             | logging helper                    |
| err      | msg: string                                  | void             | alert message for errors          |

## Classes

### Vector2D

| method          | arguments                                   | returns          | comment                         |
| --------------- | ------------------------------------------- | ---------------- | ------------------------------- |
| **constructor** | x: number, y: number                        | Vector2D         |                                 |
| clone           |                                             | Vector2D         | creates a new instance          |
| expand          | [z: number]                                 | Vector3D         | adds 3rd dimension, default: 0  |
| add             | other: Vector2D, [newInstance: 1]           | void, [Vector2D] |                                 |
| sub             | other: Vector2D, [newInstance: 1]           | void, [Vector2D] |                                 |
| times           | other: [number, Vector2D], [newInstance: 1] | void, [Vector2D] |                                 |
| dot             | other: Vector2D                             | number           |                                 |
| cross           | other: [Vector2D, Vector3D]                 | Vector3D         |                                 |
| mag             |                                             | number           | 'length' or magnitude of vector |
| norm            | [newInstance: 1]                            | void, [Vector2D] | normalizes it                   |

### Vector3D

| method          | arguments                                   | returns          | comment                         |
| --------------- | ------------------------------------------- | ---------------- | ------------------------------- |
| **constructor** | x: number, y: number, z: number             | Vector3D         |                                 |
| clone           |                                             | Vector3D         | creates a new instance          |
| add             | other: Vector3D, [newInstance: 1]           | void, [Vector3D] |                                 |
| sub             | other: Vector3D, [newInstance: 1]           | void, [Vector3D] |                                 |
| times           | other: [number, Vector3D], [newInstance: 1] | void, [Vector3D] |                                 |
| dot             | other: Vector3D                             | number           |                                 |
| cross           | other: [Vector2D, Vector3D]                 | Vector3D         |                                 |
| mag             |                                             | number           | 'length' or magnitude of vector |
| norm            | [newInstance: 1]                            | void, [Vector3D] | normalizes it                   |

### Angle2D

| method          | arguments                                | returns | comment    |
| --------------- | ---------------------------------------- | ------- | ---------- |
| **constructor** | x: number, y: number, [isPiFrac: [0, 1]] | Angle2D | default: 0 |

### Angle3D

| method          | arguments                                           | returns | comment    |
| --------------- | --------------------------------------------------- | ------- | ---------- |
| **constructor** | x: number, y: number, z: number, [isPiFrac: [0, 1]] | Angle3D | dafault: 0 |
