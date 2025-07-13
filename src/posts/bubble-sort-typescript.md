---
title: 'Bubble Sort in TypeScript'
publishDate: '2025-07-13'
updateDate: '2025-07-13'
tags: ['algorithm', 'sorting', 'typescript']
---

## Introduction

**Bubble sort** is a simple sorting algorithm that repeatedly steps through the list, compares each pair of adjacent elements, and swaps them if they are in the wrong order. This process continues until no more swaps are needed, meaning the list is sorted.

---

## Implementation

```typescript
function bubbleSort(arr: number[]) {
  const n = arr.length;
  let swapped: boolean;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];

        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return arr;
}
```

### Optional

If you want to avoid mutating the input array, you could clone it at the start:

```typescript
function bubbleSort(arr: number[]) {
  const clone = [...arr];

  // rest of your code using `clone`

  return clone;
}
```

## Example Usage

```typescript
const numbers = [5, 1, 4, 2, 8];
const sorted = bubbleSort(numbers);
console.log(sorted); // => [1, 2, 4, 5, 8]
```
