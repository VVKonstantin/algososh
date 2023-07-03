import { TListElem } from "../../types/types";

export class Node<T> {
  value: T
  next: Node<T> | null

  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  getSize: () => number;
  insertAt: (element: T, position: number) => void;
  modify: () => TListElem[];
  removeHead: () => void;
  removeTail: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex < index - 1) {
          curr = curr!.next;
          currIndex++;
        }
        node.next = curr!.next;
        curr!.next = node;
      }
      this.size++;
    }
  }

  append(element: T) {
    const node = new Node(element);

    if (this.head === null) {
      this.head = node;
    }
    else {
      let curr = this.head;
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    }
    this.size++;
  }

  removeTail() {
    if (!this.head) {
      return;
    }
    let curr = this.head;
    if (!curr.next) {
      this.removeHead();
      return;
    }

    while (curr.next) {
      if (curr.next.next) curr = curr.next;
      else break;
    }
    curr.next = null;
    this.size--;
  }

  removeHead() {
    if (!this.head) {
      return;
    }
    this.head.next ? this.head = this.head.next : this.head = null;
    this.size--;
  }

  removeAt(index: number) {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      let curr = this.head;
      let prev = curr;
      let currItem = 0;

      if (index === 0) {
        this.head = curr ? curr.next : null;
      }
      else {
        while (currItem < index) {
          currItem++;
          prev = curr;
          if (curr) {
            curr = curr.next;
          }
        }
        if (prev) {
          prev.next = curr ? curr.next : null;
        }
      }
      this.size--;
    }
  }

  getSize() {
    return this.size;
  }

  modify() {
    let curr = this.head;
    let res: TListElem[] = [];

    while (curr) {
      res = [...res, {
        val: `${curr.value} `,
        upCircle: null,
        downCircle: null,
        next: curr.next ? true : false
      }];
      curr = curr.next;
    }
    return res;
  }
}

