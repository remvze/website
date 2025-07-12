// Define a node for the doubly linked list
class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  prev: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// Doubly Linked List class
class DoublyLinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length: number = 0;

  // Check if the list is empty
  isEmpty() {
    return !this.head;
  }

  // Add a value at the end of the list
  append(value: T) {
    const newNode = new ListNode(value);

    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  // Add a value at the beginning of the list
  prepend(value: T) {
    const newNode = new ListNode(value);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;
  }

  // Insert a value at a specific index
  insert(index: number, value: T) {
    if (index < 0 || index > this.length) {
      throw new Error('Index out of bound');
    }

    if (index === 0) {
      this.prepend(value);
    } else if (index === this.length) {
      this.append(value);
    } else {
      const newNode = new ListNode(value);
      const current = this.getNodeAt(index);

      if (current) {
        newNode.prev = current.prev;
        newNode.next = current;

        if (current.prev) current.prev.next = newNode;

        current.prev = newNode;
        this.length++;
      }
    }
  }

  // Remove a node at a specific index
  remove(index: number) {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let removedNode: ListNode<T> | null;

    if (index === 0) {
      removedNode = this.head;
      this.head = this.head?.next || null;

      if (this.head) this.head.prev = null;
      if (this.length === 1) this.tail = null;
    } else if (index === this.length - 1) {
      removedNode = this.tail;
      this.tail = this.tail?.prev || null;

      if (this.tail) this.tail.next = null;
    } else {
      removedNode = this.getNodeAt(index);

      if (removedNode) {
        if (removedNode.prev) removedNode.prev.next = removedNode.next;
        if (removedNode.next) removedNode.next.prev = removedNode.prev;
      }
    }

    this.length--;

    return removedNode ? removedNode.value : null;
  }

  // Get the value at a specific index
  get(index: number) {
    const node = this.getNodeAt(index);

    return node ? node.value : null;
  }

  // Return the index of a given value, or -1 if not found
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

  // Return the size of the list
  size() {
    return this.length;
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

  // Convert the list to an array (reversed)
  toReversedArray() {
    const result: Array<T> = [];
    let current = this.tail;

    while (current) {
      result.push(current.value);
      current = current.prev;
    }

    return result;
  }

  // Clear the entire list
  clear() {
    this.head = this.tail = null;
    this.length = 0;
  }

  // Private helper: get node at a given index
  private getNodeAt(index: number): ListNode<T> | null {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let current: ListNode<T> | null;
    let i: number;

    if (index < this.length / 2) {
      current = this.head;
      i = 0;
      while (i < index && current) {
        current = current.next;
        i++;
      }
    } else {
      current = this.tail;
      i = this.length - 1;
      while (i > index && current) {
        current = current.prev;
        i--;
      }
    }

    return current;
  }
}

const list = new DoublyLinkedList<number>();

list.append(10);
list.append(20);
list.prepend(5);
list.insert(1, 15);

console.log(list.toArray()); // => [5, 15, 10, 20]
console.log(list.toReversedArray()); // => [20, 10, 15, 5]
console.log(list.get(2)); // => 10

list.remove(1);

console.log(list.indexOf(20)); // => 2
console.log(list.size()); // => 3
