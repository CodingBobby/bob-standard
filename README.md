# Bobs standard library for node.js

This is my personal standard library with handy functions I find myself declaring far too often. Please don't expect anything enormous.

## Getting started

To include this library into your node.js project, simply require it like so:
```js
const bob = require('bob-standard')
```
Thats all! Now you have access to all provided functions. Please note that this is just my personal library, I may change content without warning which could make your project thow unexpected errors. If anything strange happens, please report an [issue](https://github.com/CodingBobby/bob-standard/issues) or contact me via [email](mailto:conatct@codingbobby.xyz).

## Example usage

Here are a few examples filled with methods from this library. For more details on each method, please check out the [documentation](https://github.com/CodingBobby/bob-standard/blob/master/DOCS.md).

### Some math

```js
// Logarithm of 8 in base 2
let a = bob.log(8, 2) // 3
```
```js
// Round 10/a to 3 digits
let b = bob.round(10/a, 3) // 3.333
```

### Helpers

```js
// This is just a simple array
let foo = [1,2,3]

// Here we create a hard copy of foo
let bar = bob.clone(foo)

// Now we can modify bar without affecting foo
bar.push(4)
```
```js
// This is just a simple object
let foo = {
    a: 1,
    b: 2,
    c: 3
}

// Here we find out how many items foo holds
let items = bob.length(foo)
```

### Matrix creator

```js
// This creates a matrix with a width of 4 and
// a height of 6 items. Each item will a zero.
let matrix = bob.make.matrix(4, 6, 0)

// Print the created matrix to the console.
bob.say(matrix)
```

### Array sorter

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
