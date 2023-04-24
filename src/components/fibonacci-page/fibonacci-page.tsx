import React, { useState, FormEvent, ChangeEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {

  const [numberInput, setNumberInput] = useState<string>('');
  const [fibArr, setFibArray] = useState<number[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberInput(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const onClick = () => {
    const n = Number(numberInput);
    const arrayFib: number[] = fibonacci(n);

    setLoading(true);

    const showArray = async (n: number) => {
      for (let i = 0; i <= n; i++) {
        setFibArray([...arrayFib.slice(0, i + 1)]);
        await new Promise(r => setTimeout(r, 500));
        if(i === n) setLoading(false);
      }
    }
    showArray(n);
  }

  const fibonacci = (n: number): number[] => {
    const seq: number[] = [1, 1];
    for (let i = 2; i < n + 1; i++) {
      seq[i] = seq[i - 1] + seq[i - 2];
    }
    return seq;
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          maxLength={2}
          min={1}
          max={19}
          isLimitText={true}
          type='number'
          onChange={onChange}
          extraClass={styles.input}
          value={numberInput}
          placeholder={"Введите число"}
        />
        <Button
          text={"Рассчитать"}
          onClick={onClick}
          isLoader={isLoading}
          extraClass={styles.button}
          disabled={(Number(numberInput) <= 0 || Number(numberInput) > 19)}
        />
      </form>
      <div className={styles.container}>
        {fibArr.map((item, index) => {
          return (
            <Circle letter={`${item}`} key={index} index={index} />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
