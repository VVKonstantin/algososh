interface IStack<T> {
  push: (item: T) => void;
  pop: () => T | void;
  peak: () => T | null;
  getElems: () => T[];
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): T | void => {
    if(this.container.length) return this.container.pop();
  };

  clear = (): void => {
    this.container = [];
  };

  peak = (): T | null => {
    if(this.container.length) return this.container[this.container.length - 1];
    return null;
  };

  getElems = () => this.container;
}
