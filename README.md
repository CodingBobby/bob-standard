# Bobs standard library for node.js

This is my personal standard library with handy functions I find myself declaring far too often. Please don't expect anything enormous.

## Example usage

```js
const bob = require('bob-standard')

// This creates a matrix with a width of 4 and
// a height of 6 items. Each item will be a rendom
// number betreen 0 and 100.
let matrix = bob.make.matrix(4, 6, () => {
    return bob.round(bob.rand(0, 100))
})

// Print the created matrix to the console.
bob.say(matrix)
```
