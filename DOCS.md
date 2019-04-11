# bob-standard

Welcome to the documentation of the `bob-standard` library. Attention as this might be incomplete.


## Table of Contents
- [Installation](#installation)
- [Example Usage](#example-usage)
- [Constants](#constants)
- [Checkers](#checkers)
- [Calculation](#calculation)
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

| variable | value |
|---|---|
| bob.pi | pi |
| bob.tau | 2*pi |
| bob.pih | pi/2 |
| bob.rtau | sq root of 2*pi |
| bob.rtaue | sq root of 2*pi\*e |
| bob.e | e |
| bob.re | sq root of e |
| bob.ree | e-th root of e |
| bob.ipi | i^pi |
| bob.pie | pi^e |
| bob.epi | e^pi |
| bob.pis | pi^2 |
| bob.pip | pi^pi |
| bob.es | e^2 |
| bob.ie | 1/e |
| bob.ii | i^i |
| bob.phi | golden ratio |
| bob.gan | golden angle in radians |
| bob.chi | chi function |
| bob.r2 | sq root of 2 |
| bob.r3 | sq root of 3 |
| bob.r5 | sq root of 5 |
| bob.r45 | fourth root of 5 |
| bob.ln2 | natural log of 2 |
| bob.llim | laplace limit |

## Checkers

| function | arguments | returns | comment |
|---|---|---|---|
| isPrime | x: number | boolean |  |
| isPalin | x: number | boolean |  |
| isSquare | x: number | boolean |  |
| isInt | x: any | boolean |  |

## Calculation

| function | arguments | returns | comment |
|---|---|---|---|
| log | x: number, [base: number] | number | default: e |
| round | x: number, [digits: number] | number | default: 0 |
| arrSum | array: number[] | number | sums up an array |
| gcd | array: number[] | number | finds greatest common divisor |

## Classes

### Vector2D

| method | arguments | returns | comment |
|---|---|---|---|
| **constructor** | x: number, y: number | Vector2D |  |
| clone |  | Vector2D | creates a new instance |
| expand | [z: number] | Vector3D | adds 3rd dimension, default: 0 |
| add | other: Vector2D, [newInstance: 1] | void, [Vector2D] |  |
| sub | other: Vector2D, [newInstance: 1] | void, [Vector2D] |  |
| times | other: [number, Vector2D], [newInstance: 1] | void, [Vector2D] |  |
| dot | other: Vector2D | number |  |
| cross | other: [Vector2D, Vector3D] | Vector3D |  |
| mag |  | number | 'length‘ or magnitude of vector |
| norm | [newInstance: 1] | void, [Vector2D] | normalizes it |

### Vector3D

| method | arguments | returns | comment |
|---|---|---|---|
| **constructor** | x: number, y: number, z: number | Vector3D |  |
| clone |  | Vector3D | creates a new instance |
| add | other: Vector3D, [newInstance: 1] | void, [Vector3D] |  |
| sub | other: Vector3D, [newInstance: 1] | void, [Vector3D] |  |
| times | other: [number, Vector3D], [newInstance: 1] | void, [Vector3D] |  |
| dot | other: Vector3D | number |  |
| cross | other: [Vector2D, Vector3D] | Vector3D |  |
| mag |  | number | 'length‘ or magnitude of vector |
| norm | [newInstance: 1] | void, [Vector3D] | normalizes it | 

### Angle2D

| method | arguments | returns | comment |
|---|---|---|---|
| **constructor** | x: number, y: number, [isPiFrac: [*0*, 1]] | Angle2D |  |

### Angle3D

| method | arguments | returns | comment |
|---|---|---|---|
| **constructor** | x: number, y: number, z: number, [isPiFrac: [*0*, 1]] | Angle3D |  |
