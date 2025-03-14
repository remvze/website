---
title: 'JavaScript Array Methods: every() and some() Explained'
publishDate: '2025-03-14'
tags: ['javascript', 'array-methods']
---

The `every` and `some` methods in JavaScript are array iteration methods that test whether elements in an array meet a specified condition.

`every` checks if all elements pass the test, returning `true` only if every element satisfies the condition; otherwise, it returns `false`.

On the other hand, `some` checks if at least one element passes the test, returning `true` if any element meets the condition and `false` otherwise.

**Note**: Both methods stop iterating as soon as they determine the final result, making them efficient for conditional checks.

---

## Syntax

```javascript
array.every(callback(element, index, array), thisArg);

array.some(callback(element, index, array), thisArg);
```

- `callback` is the function executed for each element.
  - `element` refers to the current array item.
  - `index` is the index of the current element.
  - `array` is the full array being processed.
- `thisArg` (optional) is the value used as `this` inside the callback.

---

## Examples

### Example for `every()`:

```javascript
const numbers = [12, 15, 20, 25];
const allGreaterThan10 = numbers.every(num => num > 10);

console.log(allGreaterThan10); // true
```

**Explanation**: Checks if **all** numbers in the array are greater than 10.

### Example for `some()`:

```javascript
const numbers = [5, 8, 12, 3];
const someGreaterThan10 = numbers.some(num => num > 10);

console.log(someGreaterThan10); // true
```

**Explanation**: Checks if **at least one** number in the array is greater than 10.
