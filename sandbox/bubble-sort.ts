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

const numbers = [5, 1, 4, 2, 8];
const sorted = bubbleSort(numbers);
console.log(sorted); // => [1, 2, 4, 5, 8]
