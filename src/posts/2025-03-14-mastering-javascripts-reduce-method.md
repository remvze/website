---
title: "Mastering JavaScript's reduce() Method"
publishDate: '2025-03-14'
tags: ['javascript', 'array-methods']
---

The `reduce` method in JavaScript is used to iterate over an array and reduce it to a single value (such as a sum, product, or object). It accepts a callback function with two primary arguments: an accumulator (which stores the running result) and the current element being processed. The method can also accept an initial value for the accumulator. The callback function executes for each element, updating the accumulator based on the provided logic.

---

## Syntax

```javascript
array.reduce(callbackFunction);

// or with an initial value:

array.reduce(callbackFunction, initialValue);
```

---

## Examples

Now let's take a look at some examples.

### 1. Summing an Array

```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((acc, num) => acc + num, 0);

console.log(sum); // 15
```

### 2. Finding the Maximum Value

```javascript
const numbers = [10, 25, 38, 5, 90];

const max = numbers.reduce((acc, num) => (num > acc ? num : acc), numbers[0]);

console.log(max); // 90
```

### 3. Counting Occurrences in an Array

```javascript
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;

  return acc;
}, {});

console.log(count); // { apple: 3, banana: 2, orange: 1 }
```

**Explanation:** The accumulator (`acc`) is an object where we count each occurrence of a fruit.

---

I hope this article has provided a clear understanding of the `reduce()` method. Happy coding!
