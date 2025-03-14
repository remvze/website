---
title: 'TypeScript Type Narrowing Explained'
publishDate: '2025-03-14'
tags: ['typescript']
---

**Type narrowing** in TypeScript is the process of restricting a broader type (such as `unknown`, `any`, or a union type) to a more specific type within a given scope.

This is typically done using **type guards**, which help TypeScript infer and enforce more precise types at compile time. Common type guards include:

- `typeof` (checks primitive types)
- `instanceof` (checks if an object is an instance of a class)
- Equality checks (`===`, `!==`)
- The `in` operator (checks if an object has a property)
- Custom type predicates (`function isFoo(x): x is Foo {}`)

---

## Example

```typescript
function formatValue(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript knows `value` is a string here
    return value.toUpperCase();
  } else {
    // TypeScript narrows `value` to a number in this block
    return value.toFixed(2);
  }
}

console.log(formatValue('hello')); // HELLO
console.log(formatValue(42)); // 42.00
```

This example demonstrates how `typeof` helps TypeScript distinguish between a `string` and a `number`, allowing safe method calls specific to each type.
