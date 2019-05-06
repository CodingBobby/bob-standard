# Bobs standard library for node.js

This is my personal standard library with handy functions I find myself declaring far too often. Please don't expect anything enormous. The library is dependecy-free as I want to keep the learning effect I experience while implementing algorithms from scratch. Implementations done by other developers I copied / modified are unambiguously marked as such.

## Getting started

To include this library into your node.js project, simply require it like so:
```js
const bob = require('bob-standard')
```
Thats all! Now you have access to all provided functions. Please note that this is just my personal library, I may change content without warning which could make your project thow unexpected errors. If anything strange happens, please report an [issue](https://github.com/CodingBobby/bob-standard/issues) or contact me via [email](mailto:conatct@codingbobby.xyz).

## Example usage

Here are a few examples using methods from this library. For details on each available method, please check out the [documentation](https://github.com/CodingBobby/bob-standard/blob/master/DOCS.md).

### Example 1

```js
// a nested object
let obj = {
   foo: {
      baz: {
         pi: Math.PI
      }
   },
   bar: {
      bat: 'bathtub'
   }
}

// gives you the amount of values spreaded
// through the object
bob.size(obj).values // 2

// amount of keys, excluding 'this'
bob.size(obj).keys // 5
```

### Example 2

```js
// creating two vectors (read more in the DOCS)
let v1 = new bob.Vector2D(2, 5)
let v2 = new bob.Vector2D(6, 1)

// automatically 'upgrades' to 3D when applying the
// cross product on 2D vectors
v1.cross(v2) instanceof Vector3D // true
```

### Example 3

```js
// set up a deeply nested array
let something = [11, ['foo', 'bar', [12, 13], 'baz'], ['nice lib', 14]]

// log a nice tree to the console
bob.printArray(something)

/** output:

▧ 
├─ 11
├─▧ 
│ ├─ foo
│ ├─ bar
│ ├─▧ 
│ │ ├─ 12
│ │ └─ 13
│ └─ baz
└─▧ 
  ├─ nice lib
  └─ 14

**/
```
