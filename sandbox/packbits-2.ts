function packBitsEncode(bytes: Uint8Array) {
  const encoded: number[] = [];
  let i = 0;

  while (i < bytes.length) {
    let runLength = 1;

    while (
      i + runLength < bytes.length &&
      bytes[i] === bytes[i + runLength] &&
      runLength < 128
    ) {
      runLength++;
    }

    if (runLength > 1) {
      const controlByte = 257 - runLength;
      const value = bytes[i];

      encoded.push(controlByte, value);
      i += runLength;
    } else {
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

function packBitsDecode(bytes: Uint8Array) {
  const decoded = [];
  let i = 0;

  while (i < bytes.length) {
    const controlByte = bytes[i];
    i++;

    if (controlByte === 128) {
      continue;
    } else if (controlByte > 128) {
      const count = 257 - controlByte;
      const value = bytes[i];
      i++;

      for (let j = 0; j < count; j++) decoded.push(value);
    } else {
      const count = controlByte + 1;
      const literals = bytes.slice(i, i + count);

      decoded.push(...literals);
      i += count;
    }
  }

  return Uint8Array.from(decoded);
}

const input = new TextEncoder().encode(
  'AAAABBBCCDDEEEEEEEEFF33333333PPPPPPPPPPPPPPPWWWWWWWWWW',
);
const encoded = packBitsEncode(input);
const decoded = packBitsDecode(encoded);
const output = new TextDecoder().decode(decoded);

console.log(output);
