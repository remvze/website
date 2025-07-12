// Define a node of the singly linked list
class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// Define the singly linked list class
class SinglyLinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length: number = 0;

  // Check if the list is empty
  isEmpty() {
    return this.length === 0;
  }

  // Get the size of the list
  size() {
    return this.length;
  }

  // Add a new value to the end of the list
  append(value: T) {
    const newNode = new ListNode(value);

    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      if (this.tail) this.tail.next = newNode;

      this.tail = newNode;
    }

    this.length++;
  }

  // Add a value to the beginning of the list
  prepend(value: T) {
    const newNode = new ListNode(value);

    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  // Insert a value at a specific index
  insert(index: number, value: T) {
    if (index < 0 || index > this.length) {
      throw new Error('Index is out of bound');
    }

    if (index == 0) {
      this.prepend(value);
    } else if (index === this.length) {
      this.append(value);
    } else {
      const newNode = new ListNode(value);
      const prevNode = this.getNodeAt(index - 1);

      if (prevNode) {
        newNode.next = prevNode.next;
        prevNode.next = newNode;

        this.length++;
      }
    }
  }

  // Remove a node at a specific index
  remove(index: number) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index is out of bound');
    }

    let removed: ListNode<T> | null;

    if (index === 0) {
      removed = this.head;
      this.head = this.head?.next || null;
      if (this.length === 1) this.tail = null;
    } else {
      const prev = this.getNodeAt(index - 1);

      removed = prev?.next || null;

      if (prev && removed) {
        prev.next = removed.next;

        if (index === this.length - 1) {
          this.tail = prev;
        }
      }
    }

    this.length--;

    return removed ? removed.value : null;
  }

  // Get the value at a specific index
  get(index: number) {
    const node = this.getNodeAt(index);

    return node ? node.value : null;
  }

  // Find the index of a value in the list
  indexOf(value: T) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.value === value) return index;

      current = current.next;
      index++;
    }

    return -1;
  }

  // Convert the list to an array
  toArray() {
    const result: Array<T> = [];
    let current = this.head;

    while (current) {
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  // Clear the entire list
  clear() {
    this.head = this.tail = null;
    this.length = 0;
  }

  // Helper Method: Get the node at a specific index
  private getNodeAt(index: number) {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let current = this.head;
    let count = 0;

    while (current && count < index) {
      current = current.next;
      count++;
    }

    return current;
  }
}

const list = new SinglyLinkedList<number>();

list.append(1);
list.append(2);
list.prepend(0);
list.insert(1, 5);

console.log(list.toArray()); // => [0, 5, 1, 2]
console.log(list.get(2)); // => 1

list.remove(1);

console.log(list.indexOf(2)); // => 2
console.log(list.size()); // => 3
