import React, { useState, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TString } from "../../types/types";
import styles from './string.module.css';
import { reverseString } from "../utils/utils";

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

    const arrInput = stringInput.split('');
    setStringInput('');

    const arrModString = arrInput.map((letter) => {
      return {
        letter: letter,
        state: ElementStates.Default
      };
    });

    reverseString(arrModString, setStringInputArray, setLoading);
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
          data-testid="str"
        />
        <Button
          text={"Развернуть"}
          onClick={onClick}
          isLoader={isLoading}
          disabled={stringInput === '' ? true : false}
          extraClass={styles.button}
          data-testid="button"
        />
      </form>
      <div className={styles.container}>
        {stringInputArray.map((item, index) => {
          return (
            <Circle state={item.state} letter={item.letter} key={index} data-testid="circle" />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
