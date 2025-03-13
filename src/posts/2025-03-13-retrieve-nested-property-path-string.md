---
title: 'Retrieve Nested Object Values Using Dot-Separated Path in JavaScript'
publishDate: '2025-03-13'
tags: ['javascript']
---

Here is a JavaScript helper function to retrieve the value of a nested property from an object using a dot-separated string path:

```javascript
function getByPath(obj, keys) {
  const keysArray = keys.split('.');

  return keysArray.reduce((obj, key) => obj?.[key] ?? null, obj);
}

// Example:

const obj = { a: 1, b: { c: 2 } };

console.log(getByPath(obj, 'a')); // 1
console.log(getByPath(obj, 'b.c')); // 2
```
