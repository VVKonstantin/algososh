interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  getElems: () => (T | null)[];
  getParams: () => { head: number, tail: number, length: number, size: number };
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  isEmpty = () => this.length === 0;

  getElems = () => {
    const arr = [];
    for (let i of this.container) arr.push(i);
    return arr;
  }

  clear = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  getParams = () => {
    let head = this.head;
    let tail = this.tail;
    let length = this.length;
    let size = this.size;
    return { head: head, tail: tail, length: length, size: size };
  }
}
