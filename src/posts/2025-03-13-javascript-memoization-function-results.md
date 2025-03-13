---
title: 'Memoization in JavaScript: Caching Function Results'
publishDate: '2025-03-13'
tags: ['javascript']
---

We'll explore how to write a memoization function in JavaScript, a technique that caches function results to avoid redundant calculations for identical inputs. This is particularly useful for expensive operations, such as complex mathematical computations or recursive functions like the Fibonacci sequence.

Here's how to do it:

```javascript
function memoize(func) {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);

    cache.set(key, result);

    return result;
  };
}

// Example:

function expensiveCalculation(a, b) {
  console.log('Calculating...');

  return a + b;
}

const memoizedCalculation = memoize(expensiveCalculation);
console.log(memoizedCalculation(5, 10)); // 'Calculating...'; 15
console.log(memoizedCalculation(5, 10)); // 15
```
