import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { TArray } from "../../types/types";
import { randomArr } from "../utils/utils";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { selectionSort, bubbleSort } from "../utils/utils";

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

  useEffect(() => {
    handleNewArr();
  }, []);

  const reset = () => {
    let arr: TArray[] = [];
    for (let i = 0; i < sortArr.length; i++) {
      let item = sortArr[i];
      item.state = ElementStates.Default;
      arr.push(item);
    }
    return arr;
  }

  const handleSort = async (type: string) => {
    let arr: TArray[] = reset();
    if (sort === 'selection') {
      (type === 'asc') ? setAscLoading(true) : setDescLoading(true);
      await selectionSort(arr, type, setSortArr);
      (type === 'asc') ? setAscLoading(false) : setDescLoading(false);
    }
    else {
      (type === 'asc') ? setAscLoading(true) : setDescLoading(true);
      await bubbleSort(arr, type, setSortArr);
      (type === 'asc') ? setAscLoading(false) : setDescLoading(false);
    }
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
