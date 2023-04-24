import React, { useState, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TString } from "../../types/types";
import styles from './string.module.css';

export const StringComponent: React.FC = () => {

  const [stringInput, setStringInput] = useState<string>('');
  const [stringInputArray, setStringInputArray] = useState<TString[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStringInput(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onClick = () => {
    let first = 0;
    let last = stringInput.length - 1;
    let timeGap = 0;

    const arrInput = stringInput.split('');
    setStringInput('');

    const arrModString = arrInput.map((letter) => {
      return {
        letter: letter,
        state: ElementStates.Default
      };
    });

    if (arrModString.length === 1) {
      arrModString[0].state = ElementStates.Modified;
      setStringInputArray([...arrModString]);
      return;
    }

    setStringInputArray([...arrModString]);
    setLoading(true);

    setTimeout(() => {
      while (first < last) {
        reverse(first, last, arrModString, timeGap);
        first++;
        last--;
        timeGap += DELAY_IN_MS;
      }
    }, 0);
  }

  const reverse = (first: number, last: number, out: TString[], timeGap: number) => {

    setTimeout(() => {
      out[first].state = ElementStates.Changing;
      out[last].state = ElementStates.Changing;
      setStringInputArray([...out]);
    }, timeGap);

    setTimeout(() => {
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
      setStringInputArray([...out]);
      if (first + 1 >= last - 1) {
        setLoading(false);
      }
    }, timeGap + DELAY_IN_MS);
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          maxLength={11}
          max={11}
          isLimitText={true}
          onChange={onChange}
          value={stringInput}
          extraClass={styles.input}
        />
        <Button
          text={"Развернуть"}
          onClick={onClick}
          isLoader={isLoading}
          disabled={stringInput === '' ? true : false}
          extraClass={styles.button}
        />
      </form>
      <div className={styles.container}>
        {stringInputArray.map((item, index) => {
          return (
            <Circle state={item.state} letter={item.letter} key={index} />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
