---
title: 'Understanding the with() Method in JavaScript Arrays'
publishDate: '2025-03-14'
tags: ['javascript', 'array-methods']
---

The `with` method in JavaScript is an immutable array method that returns a new array with a specified element replaced at a given index. It does not modify the original array.

---

## Syntax

```javascript
array.with(index, value);
```

`index` is the position of the element to replace, and `value` is the new element.

**Note:** If the index is out of bounds, it throws a `RangeError`.

---

## Example

```javascript
const array = [1, 2, 3];
const newArray = array.with(1, 4);

console.log(array); // 1, 2, 3
console.log(newArray); // 1, 4, 3
```
