---
title: 'Understanding Type Predicates in TypeScript'
publishDate: '2025-03-14'
tags: ['typescript']
---

In TypeScript, **type predicates** are special functions that refine the type of a variable within a conditional block.

They enable you to tell the TypeScript compiler that a variable is of a specific type if the function returns `true`, effectively narrowing the variable's type for the subsequent code within that block.

This allows for more precise type checking and eliminates the need for manual type assertions in certain situations.

---

## Example

```typescript
interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return (animal as Cat).meow !== undefined;
}

function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow();
  } else {
    animal.bark();
  }
}

const myCat: Cat = { meow: () => console.log('Meow!') };
const myDog: Dog = { bark: () => console.log('Woof!') };

makeSound(myCat);
makeSound(myDog);
```

In this example, `isCat` is a **type predicate**. It checks if an `animal` has a `meow` method, indicating it's a `Cat`. The `animal is Cat` return type tells TypeScript that if `isCat` returns `true`, the `animal` within the `if` block is guaranteed to be a `Cat`.
