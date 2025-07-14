---
title: 'Basic PackBits in JavaScript'
publishDate: '2025-07-14'
updateDate: '2025-07-14'
tags: ['javascript', 'compression']
---

## Introduction

**PackBits** is a simple form of run-length encoding (RLE), used to compress data by replacing repeated bytes with a shorter representation. It was introduced by Apple and is commonly used in formats like TIFF.

### The PackBits Format

PackBits compresses data using **control bytes**, each followed by data bytes. The control byte tells the decoder how to interpret the next part of the stream:

- **0 to 127**: Copy the next `n + 1` bytes literally.
- **129 to 255**: Repeat the next byte `257 - n` times.
- **128**: No operation (should be ignored).

**Example:**

A control byte of `3` means _"copy the next 4 bytes as-is."_

A control byte of `254` means _"repeat the next byte 3 times"_ (since 257 - 254 = 3).

#### Signed vs Unsigned Bytes

The original PackBits format was defined using signed bytes (`-128 to 127`), but in JavaScript (and most modern environments), we use unsigned bytes (`0 to 255`). This doesn’t affect functionality — just how control bytes are interpreted.

---

## Implementation

### The Encoder

The `packBitsEncode` function takes a `Uint8Array` and compresses it using the PackBits format. It scans the input for repeated bytes (runs) or sequences of non-repeated bytes (literals), then encodes them accordingly.

```javascript
/**
 * Encodes a byte array using the PackBits algorithm.
 *
 * @param {Uint8Array} bytes - The input byte array to encode.
 *
 * @returns {Uint8Array} The PackBits-encoded byte array.
 */
function packBitsEncode(bytes) {
  const encoded = [];
  let i = 0;

  while (i < bytes.length) {
    let runLength = 1;

    // Detect run of identical bytes
    while (
      i + runLength < bytes.length &&
      bytes[i] === bytes[i + runLength] &&
      runLength < 128
    ) {
      runLength++;
    }

    if (runLength > 1) {
      // Encode repeated bytes
      const controlByte = 257 - runLength;
      const value = bytes[i];

      encoded.push(controlByte, value);
      i += runLength;
    } else {
      // Encode literal bytes
      const literalStart = i;
      i++;

      while (
        i < bytes.length &&
        (i + 1 >= bytes.length || bytes[i] !== bytes[i + 1]) &&
        i - literalStart < 128
      ) {
        i++;
      }

      const length = i - literalStart;
      const controlByte = length - 1;
      const values = bytes.slice(literalStart, i);

      encoded.push(controlByte, ...values);
    }
  }

  return Uint8Array.from(encoded);
}
```

**How It Works:**

- **Repeated bytes** are compressed using `257 - runLength`.
- **Literal bytes** are grouped and stored with a prefix indicating how many follow.
- The encoder ensures no group exceeds 128 bytes, as required by the PackBits spec.

### The Decoder

The `packBitsDecode` function reverses the encoding process. It reads each control byte and either copies the following bytes literally or repeats a byte multiple times, depending on the value.

```javascript
/**
 * Decodes a PackBits-encoded byte array.
 *
 * @param {Uint8Array} bytes - The PackBits-encoded input byte array.
 *
 * @returns {Uint8Array} The decoded (original) byte array.
 */
function packBitsDecode(bytes) {
  const decoded = [];
  let i = 0;

  while (i < bytes.length) {
    const controlByte = bytes[i];
    i++;

    if (controlByte === 128) {
      // 128 is a no-op according to the PackBits spec
      continue;
    } else if (controlByte > 128) {
      // Repeated value
      const count = 257 - controlByte;
      const value = bytes[i];
      i++;

      for (let j = 0; j < count; j++) {
        decoded.push(value);
      }
    } else {
      // Literal sequence
      const count = controlByte + 1;
      const literals = bytes.slice(i, i + count);

      decoded.push(...literals);
      i += count;
    }
  }

  return Uint8Array.from(decoded);
}
```

**How It Works:**

- If `control === 128`: it's a no-op and skipped.
- If `control > 128`: the next byte is repeated `257 - control` times.
- If `control ≤ 127`: the next `control + 1` bytes are copied directly.

### Example Usage

Let’s test the encoder and decoder with a simple input string. We’ll use `TextEncoder` and `TextDecoder` to work with binary data in JavaScript.

```javascript
const input = new TextEncoder().encode(
  'AAAABBBCCDDEEEEEEEEFF33333333PPPPPPPPPPPPPPPWWWWWWWWWW',
);

const encoded = packBitsEncode(input);
const decoded = packBitsDecode(encoded);
const output = new TextDecoder().decode(decoded);

console.log(output); // Should match the original string
```
