import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { TArray } from "../../types/types";
import { randomArr, swap } from "../utils/utils";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  const [sort, setSort] = useState<string>('selection');
  const [sortArr, setSortArr] = useState<TArray[]>([]);
  const [isAscLoading, setAscLoading] = useState<boolean>(false);
  const [isDescLoading, setDescLoading] = useState<boolean>(false);

  const handleNewArr = () => {
    const newArr = randomArr(3, 17, 0, 100);

    const modArr = newArr.map((val) => {
      return {
        val: val,
        state: ElementStates.Default
      };
    });
    setSortArr([...modArr]);
  }

  const reset = () => {
    let arr: TArray[] = [];
    for (let i = 0; i < sortArr.length; i++) {
      let item = sortArr[i];
      item.state = ElementStates.Default;
      arr.push(item);
    }
    return arr;
  }

  const handleSort = (type: string) => {
    let arr: TArray[] = reset();
    if (sort === 'selection') {
      selectionSort(arr, type);
    }
    else {
      bubbleSort(arr, type);
    }
  }

  const bubbleSort = async (arr: TArray[], type: string) => {
    (type === 'asc') ? setAscLoading(true) : setDescLoading(true);

    const length = arr.length;

    for (let i = 0; i < length - 1; i++) {
      let flag = 0;
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].state = arr[j + 1].state = ElementStates.Changing;
        setSortArr([...arr]);
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
        setSortArr([...arr]);
      }
      arr[length - i - 1].state = ElementStates.Modified;
      setSortArr([...arr]);

      //if the array is already sorted...
      if (!flag || length - i - 1 === 1) {
        for (let k = 0; k < length - i - 1; k++) {
          arr[k].state = ElementStates.Modified;
          setSortArr([...arr]);
        }
        break;
      }
    }
    (type === 'asc') ? setAscLoading(false) : setDescLoading(false);
  }

  const selectionSort = async (arr: TArray[], type: string) => {

    (type === 'asc') ? setAscLoading(true) : setDescLoading(true);

    const length = arr.length;
    for (let i = 0; i < length - 1; i++) {
      let ind = i;
      arr[i].state = ElementStates.Changing;
      setSortArr([...arr]);
      for (let j = i + 1; j < length; j++) {
        if (type === 'asc') {
          if (arr[j].val < arr[ind].val) ind = j;
        }
        else {
          if (arr[j].val > arr[ind].val) ind = j;
        }
        arr[j].state = ElementStates.Changing;
        setSortArr([...arr]);
        await new Promise(r => setTimeout(r, 500));
        arr[j].state = ElementStates.Default;
      }
      arr[i].state = ElementStates.Default;
      if (i !== ind) swap(arr, i, ind);
      arr[i].state = ElementStates.Modified;
      if (i === length - 2) arr[i + 1].state = ElementStates.Modified;
      setSortArr([...arr]);
    }

    (type === 'asc') ? setAscLoading(false) : setDescLoading(false);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.field}>
        <form className={styles.form}>
          <div className={styles.radio}>
            <RadioInput
              label={"Выбор"}
              value="selection"
              checked={sort === 'selection' ? true : false}
              onChange={() => setSort('selection')}
            />
            <RadioInput
              label={"Пузырёк"}
              value="bubble"
              checked={sort === 'bubble' ? true : false}
              onChange={() => setSort('bubble')}
            />
          </div>
          <div className={styles.ascdesc}>
            <Button
              text={'По возрастанию'}
              sorting={Direction.Ascending}
              extraClass={styles.asc}
              onClick={() => handleSort('asc')}
              disabled={(sortArr.length > 0 && !isDescLoading) ? false : true}
              isLoader={isAscLoading}
            />
            <Button
              text={'По убыванию'}
              sorting={Direction.Descending}
              extraClass={styles.desc}
              onClick={() => handleSort('desc')}
              disabled={(sortArr.length > 0 && !isAscLoading) ? false : true}
              isLoader={isDescLoading}
            />
          </div>
          <Button
            text={'Новый массив'}
            extraClass={styles.grow}
            onClick={handleNewArr}
            disabled={(isAscLoading || isDescLoading) ? true : false}
          />
        </form>
        <div className={styles.container}>
          {sortArr.map((item, index) => {
            return (
              <Column
                state={item.state}
                index={item.val}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
