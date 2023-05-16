import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TArray, TString } from "../../types/types";

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
  if (n >= 5 && n <= 20) return third;
  n = n % 10;
  if (n === 1) return first;
  if (n >= 2 && n <= 4) return second;
  return third;
}

export const bubbleSort = async (arr: TArray[], type: string, setSortArr?: React.Dispatch<React.SetStateAction<TArray[]>>) => {

  const length = arr.length;
  if (length === 1) {
    arr[0].state = ElementStates.Modified;
    setSortArr && setSortArr([...arr]);
  }
  for (let i = 0; i < length - 1; i++) {
    let flag = 0;
    for (let j = 0; j < length - i - 1; j++) {
      arr[j].state = arr[j + 1].state = ElementStates.Changing;
      setSortArr && setSortArr([...arr]);
      if (type === 'asc') {
        if (arr[j].val > arr[j + 1].val) {
          swap(arr, j, j + 1);
          flag = 1;
        }
      }
      else {
        if (arr[j].val < arr[j + 1].val) {
          swap(arr, j, j + 1);
          flag = 1;
        }
      }
      await new Promise(r => setTimeout(r, 500));
      arr[j].state = arr[j + 1].state = ElementStates.Default;
      setSortArr && setSortArr([...arr]);
    }
    arr[length - i - 1].state = ElementStates.Modified;
    setSortArr && setSortArr([...arr]);

    //if the array is already sorted...
    if (!flag || length - i - 1 === 1) {
      for (let k = 0; k < length - i - 1; k++) {
        arr[k].state = ElementStates.Modified;
        setSortArr && setSortArr([...arr]);
      }
      break;
    }
  }
}

export const selectionSort = async (arr: TArray[], type: string, setSortArr?: React.Dispatch<React.SetStateAction<TArray[]>>) => {

  const length = arr.length;
  if (length === 1) {
    arr[0].state = ElementStates.Modified;
    setSortArr && setSortArr([...arr]);
  }
  for (let i = 0; i < length - 1; i++) {
    let ind = i;
    arr[i].state = ElementStates.Changing;
    setSortArr && setSortArr([...arr]);
    for (let j = i + 1; j < length; j++) {
      if (type === 'asc') {
        if (arr[j].val < arr[ind].val) ind = j;
      }
      else {
        if (arr[j].val > arr[ind].val) ind = j;
      }
      arr[j].state = ElementStates.Changing;
      setSortArr && setSortArr([...arr]);
      await new Promise(r => setTimeout(r, 500));
      arr[j].state = ElementStates.Default;
    }
    arr[i].state = ElementStates.Default;
    if (i !== ind) swap(arr, i, ind);
    arr[i].state = ElementStates.Modified;
    if (i === length - 2) arr[i + 1].state = ElementStates.Modified;
    setSortArr && setSortArr([...arr]);
  }
}

export const reverseString = async (str: TString[],
  setString?: React.Dispatch<React.SetStateAction<TString[]>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>) => {

    let first = 0;
    let last = str.length - 1;

  if (str.length === 1) {
    str[0].state = ElementStates.Modified;
    setString && setString([...str]);
    return;
  }

  setString && setString([...str]);
  setLoading && setLoading(true);
  while (first < last) {
    await swapSymbols(first, last, str, setString, setLoading);
    first++;
    last--;
  }
}

export const swapSymbols = async (first: number, last: number, out: TString[],
  setString?: React.Dispatch<React.SetStateAction<TString[]>>, setLoading?: React.Dispatch<React.SetStateAction<boolean>>) => {

    out[first].state = ElementStates.Changing;
    out[last].state = ElementStates.Changing;
    setString && setString([...out]);

  await new Promise(r => setTimeout(r, DELAY_IN_MS));

    if (first !== last) {
      let temp;
      temp = out[first].letter;
      out[first].letter = out[last].letter;
      out[last].letter = temp;
    }
    out[first].state = out[last].state = ElementStates.Modified;
    if (first + 1 === last - 1) {
      out[last - 1].state = ElementStates.Modified;
    }
    setString && setString([...out]);
    if (first + 1 >= last - 1) {
      setLoading && setLoading(false);
    }
}
