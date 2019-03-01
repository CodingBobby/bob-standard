# bob-standard

Welcome to the documentation of the `bob-standard` library.


## Table of Contents
- [Installation](#installation)
- [Example Usage](#example-usage)
- [Helpers](#helpers)
   - [Arrays](#arrays)
- [Maths](#maths)
   - [Constants](#constants)
   - [Vector Analysis](#vector-analysis)
      - [Vector Creation and Printing](#vector-creation-and-printing)
      - [Vector Calculation](#vector-calculation)


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

## Helpers

### Arrays
```js
// Here we create an array with 100 elements,
// of which each will be a random integer between 0 and 100.
let array = bob.make.array(100, () => {
    return bob.round(bob.rand(0, 100))
})

// This sorts the array in an ascending order.
array = bob.arr.sort(array)

// This sorts the array in reversed order (descending).
array = bob.arr.sort(array, 'rev')

// This sorts the array with a split at the center.
// In our case, the resulting array will start with an ascending
// order and when reaching the middle, the sorting will switch
// to a descending order.
array = bob.arr.sort(array, 'split')

// You can also reverse this:
array = bob.arr.sort(array, 'split rev')

// Or define the position it should split at:
array = bob.arr.sort(array, 'split pos', 35)

// And combine both:
array = bob.arr.sort(array, 'split rev pos', 35)
```

## Maths

### Constants
These mathematical constants aare available:
```js
bob.pi      // pi
bob.tau     // 2*pi
bob.pih     // pi/2
bob.rtau    // sq root of 2*pi
bob.rtaue   // sq root of 2*pi*e
bob.e       // e
bob.re      // sq root of e
bob.ree     // e-th root of e
bob.ipi     // i^pi
bob.pie     // pi^e
bob.epi     // e^pi
bob.pis     // pi^2
bob.pip     // pi^pi
bob.es      // e^2
bob.ie      // 1/e
bob.ii      // i^i
bob.phi     // golden ratio
bob.gan     // golden angle in radians
bob.chi     // chi function
bob.r2      // sq root of 2
bob.r3      // sq root of 3
bob.r5      // sq root of 5
bob.r45     // fourth root of 5
bob.ln2     // natural log of 2
bob.llim    // laplace limit
```

### Vector Analysis
For all examples in this chapter we need the `Vector` class from `bob-standard`. We can either use `bob.Vector()` every time or we simplify it like so:
```js
const { Vector } = bob
```

#### Vector Creation and Printing
```js
// This creates a new Vector instance in foo.
let foo = new Vector(6,8)

// You can create Vectors with any dimension.
let bar = new Vector(4,6,2,8,9)

// For debugging purpose, we can easily print it
// to the console.
foo.print() // vector: 6,8

// To get other properties than the vector's
// values, you can pass arguments.
foo.print('v') // vector: 6,8
foo.print('d') // dimension: 2
foo.print('l') // length: 10

// If you want to see multiple properties at once,
// you can simply put them in one string.
foo.print('v d l')
```

#### Vector Calculation
```js
let foo = new Vector(3,4,2)
let bar = new Vector(4,7,2)

// This adds the bar vector to the foo vector.
foo.add(bar)

// Note that this changes foo. It doesn't
// create a new instance.
foo.print() // vector: 7,11,4

// This substracts bar again.
foo.sub(bar)
foo.print() // vector: 3,4,2

// To get a new vector instead of changing the
// existing one, you can clone it before.
let baz = foo.clone()
baz.print() // vector: 3,4,2

// This normalizes the vector to a length of 1.
baz.norm()
baz.print('l') // length: 1

// You can cross-multiply vectors.
foo.xprod(bar)
foo.print() // vector: -6,10,-122

// You can do dot products. Note that this product
// yields a scalar and not a vector. Thus, this
// method returns the result and does not change
// the vector.
let prod = foo.dprod(bar) // -198
foo.print() // vector: -6,10,-122

// Simple multiplication (each element on its own)
// works like this.
bar.mult(3)
bar.print() // vector: 12,21,6

// This also works with different values for
// each element. Division is done with 1/x.
bar.mult(1/4,1/7,3)
bar.print() // vector: 3,3,18
```
