import { TArray } from "../../types/types";

export const randomNum = (from: number, to: number) => {
  const rand = Math.random() * (to - from + 1) + from;
  return Math.floor(rand);
};

export const randomArr = (minLength: number, maxLength: number, minVal: number, maxVal: number) => {
  const length = randomNum(minLength, maxLength);
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(randomNum(minVal, maxVal));
  }
  return arr;
};

export const swap = (arr: TArray[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const correctNoun = (num: number | undefined, first = 'символ', second = 'символа', third = 'символов') => {

  num = num || 0;

  let n = Math.abs(num);
  n = n % 100;
  if(n >= 5 && n <= 20) return third;
  n = n % 10;
  if(n === 1) return first;
  if(n >= 2 && n <=4) return second;

  return third;
}
