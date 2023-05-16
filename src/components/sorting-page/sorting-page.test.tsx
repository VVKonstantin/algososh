import { ElementStates } from "../../types/element-states";
import { TArray } from "../../types/types";
import { selectionSort, bubbleSort } from "../utils/utils";

describe('testing sorting algorithms', () => {
  it('empty array, selection, ascending', async () => {
    const arr: Array<TArray> = [];
    await selectionSort(arr, 'asc');
    expect(arr).toEqual([]);
  });

  it('empty array, selection, descending', async () => {
    const arr: Array<TArray> = [];
    await selectionSort(arr, 'desc');
    expect(arr).toEqual([]);
  });

  it('empty array, bubble, ascending', async () => {
    const arr: Array<TArray> = [];
    await bubbleSort(arr, 'asc');
    expect(arr).toEqual([]);
  });

  it('empty array, bubble, descending', async () => {
    const arr: Array<TArray> = [];
    await bubbleSort(arr, 'desc');
    expect(arr).toEqual([]);
  });

  it('length 1 array, selection, ascending', async () => {
    const arr: Array<TArray> = [{ val: 33, state: ElementStates.Default }];
    await selectionSort(arr, 'asc');
    expect(arr).toEqual([{ val: 33, state: ElementStates.Modified }]);
  });

  it('length 1 array, selection, descending', async() => {
    const arr: Array<TArray> = [{ val: 33, state: ElementStates.Default }];
    await selectionSort(arr, 'desc');
    expect(arr).toEqual([{ val: 33, state: ElementStates.Modified }]);
  });

  it('length 1 array, bubble, ascending', async() => {
    const arr: Array<TArray> = [{ val: 33, state: ElementStates.Default }];
    await bubbleSort(arr, 'asc');
    expect(arr).toEqual([{ val: 33, state: ElementStates.Modified }]);
  });

  it('length 1 array, bubble, descending', async () => {
    const arr: Array<TArray> = [{ val: 33, state: ElementStates.Default }];
    await bubbleSort(arr, 'desc');
    expect(arr).toEqual([{ val: 33, state: ElementStates.Modified }]);
  });

  it('length > 1 array, selection, ascending', async () => {
    const arr: Array<TArray> = [
      { val: 33, state: ElementStates.Default },
      { val: 15, state: ElementStates.Default },
      { val: 47, state: ElementStates.Default }];
    await selectionSort(arr, 'asc');
    expect(arr).toEqual([{ val: 15, state: ElementStates.Modified },
      { val: 33, state: ElementStates.Modified },
      { val: 47, state: ElementStates.Modified }]);
  });

  it('length > 1 array, selection, descending', async () => {
    const arr: Array<TArray> = [
      { val: 33, state: ElementStates.Default },
      { val: 15, state: ElementStates.Default },
      { val: 47, state: ElementStates.Default }];
    await selectionSort(arr, 'desc');
    expect(arr).toEqual([{ val: 47, state: ElementStates.Modified },
      { val: 33, state: ElementStates.Modified },
      { val: 15, state: ElementStates.Modified }]);
  });

  it('length > 1 array, bubble, ascending', async () => {
    const arr: Array<TArray> = [
      { val: 33, state: ElementStates.Default },
      { val: 15, state: ElementStates.Default },
      { val: 47, state: ElementStates.Default }];
    await bubbleSort(arr, 'asc');
    expect(arr).toEqual([{ val: 15, state: ElementStates.Modified },
      { val: 33, state: ElementStates.Modified },
      { val: 47, state: ElementStates.Modified }]);
  });

  it('length > 1 array, bubble, descending', async () => {
    const arr: Array<TArray> = [
      { val: 33, state: ElementStates.Default },
      { val: 15, state: ElementStates.Default },
      { val: 47, state: ElementStates.Default }];
    await bubbleSort(arr, 'desc');
    expect(arr).toEqual([{ val: 47, state: ElementStates.Modified },
      { val: 33, state: ElementStates.Modified },
      { val: 15, state: ElementStates.Modified }]);
  });

});
