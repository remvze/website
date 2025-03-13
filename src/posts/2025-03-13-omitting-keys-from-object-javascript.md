---
title: 'JavaScript Helper: Object Key Omission Function'
publishDate: '2025-03-13'
tags: ['javascript']
---

Here is a JavaScript helper function that creates a new object by omitting specified keys from an existing object, without modifying the original:

```javascript
function omitKeys(obj, ...keysToOmit) {
  return Object.keys(obj).reduce((newObj, key) => {
    if (!keysToOmit.includes(key)) {
      newObj[key] = obj[key];
    }

    return newObj;
  }, {});
}

// Example:

const obj = { a: 1, b: 2, c: 3 };
const newObj = omitKeys(obj, 'a', 'c');

console.log(newObj); // { b: 2 }
```
