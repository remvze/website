---
title: 'Run-Length Encoding in JavaScript'
publishDate: '2025-07-13'
updateDate: '2025-07-13'
tags: ['compression', 'javascript']
---

## Introduction

**Run-length encoding** (RLE) is a **lossless** data compression method that replaces sequences of repeated values with a single value and a count of how many times it appears consecutively. For example, 'AAAA' becomes 'A4'.

## Caveat

**Run-Length Encoding** (RLE) is most efficient on data that contains many consecutive repeated values (runs). For data with little repetition, using RLE may actually increase the file size rather than reduce it.

---

## Implementation

```javascript
function runLengthEncode(input) {
  if (input.length === 0) return '';

  let encoded = '';
  let count = 1;

  for (let i = 1; i <= input.length; i++) {
    if (input[i] === input[i - 1]) {
      count++;
    } else {
      encoded += input[i - 1] + count;
      count = 1;
    }
  }

  return encoded;
}

function runLengthDecode(encoded) {
  let decoded = '';
  let i = 0;

  while (i < encoded.length) {
    const char = encoded[i];
    i++;

    let countStr = ''; // Capture the full number
    while (i < encoded.length && /\d/.test(encoded[i])) {
      countStr += encoded[i];
      i++;
    }

    const count = parseInt(countStr, 10);
    decoded += char.repeat(count);
  }

  return decoded;
}
```

## Example Usage

```javascript
const input = 'aaabbbcccaaa';
const encoded = runLengthEncode(input);

console.log('Encoded:', encoded); // => Encoded: a3b3c3a3

const decoded = runLengthDecode(encoded);

console.log('Decoded:', decoded); // => Decoded: aaabbbcccaaa
console.log(input === decoded); // => true
```
