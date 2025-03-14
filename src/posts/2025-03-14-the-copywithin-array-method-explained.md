---
title: 'The copyWithin() Array Method Explained'
publishDate: '2025-03-14'
tags: ['javascript', 'array-methods']
---

The `copyWithin` method in JavaScript is used to copy a portion of an array to another location within the same array, without changing its length.

**Note**: This method modifies the original array and does not create a new one.

---

## Syntax

```javascript
array.copyWithin(target, start, end);
```

`target` is the index to copy elements to, `start` is the index to begin copying from, and `end` (optional) is the index to stop copying (not inclusive).

---

## Example

```javascript
const array = [1, 2, 3, 4, 5];

array.copyWithin(0, 3);

console.log(array); // [4, 5, 3, 4, 5]
```
