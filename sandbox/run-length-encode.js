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

const input = 'aaabbbcccaaa';
const encoded = runLengthEncode(input);

console.log('Encoded:', encoded); // => Encoded: a3b3c3a3

const decoded = runLengthDecode(encoded);

console.log('Decoded:', decoded); // => Decoded: aaabbbcccaaa
console.log(input === decoded); // => true
