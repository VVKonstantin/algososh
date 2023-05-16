import React, { ChangeEvent, FormEvent, useState, useMemo } from "react";
import { Stack } from "./stack-class";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [stringInput, setStringInput] = useState<string>('');
  const [stackArr, setStackArr] = useState<string[]>([]);
  const [colour, setColour] = useState<ElementStates>(ElementStates.Default);

  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
  const [isPopLoading, setIsPopLoading] = useState<boolean>(false);
  const [isClearLoading, setIsClearLoading] = useState<boolean>(false);

  const stack = useMemo(() => new Stack<string>(), []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStringInput(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAddClick = () => {
    stack.push(stringInput);
    setStringInput('');
    setIsAddLoading(true);
    setColour(ElementStates.Changing);
    setStackArr([...stack.getElems()]);
    setTimeout(() => {
      setColour(ElementStates.Default);
      setStackArr([...stack.getElems()]);
      setIsAddLoading(false);
    },
      SHORT_DELAY_IN_MS);
  };

  const handleClearClick = () => {
    setIsClearLoading(true);
    setColour(ElementStates.Changing);
    setStackArr([...stack.getElems()]);
    setTimeout(() => {
      setColour(ElementStates.Default);
      stack.clear();
      setStackArr([...stack.getElems()]);
      setIsClearLoading(false);
    }, SHORT_DELAY_IN_MS);
    setStackArr([...stack.getElems()]);
  };

  const handlePopClick = () => {
    setIsPopLoading(true);
    setColour(ElementStates.Changing);
    setStackArr([...stack.getElems()]);
    setTimeout(() => {
      stack.pop();
      setColour(ElementStates.Default);
      setStackArr([...stack.getElems()]);
      setIsPopLoading(false);
    },
      SHORT_DELAY_IN_MS)
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form__container}>
          <Input
            maxLength={4}
            isLimitText={true}
            placeholder={'Введите значение'}
            onChange={onChange}
            extraClass={styles.input}
            value={stringInput}
          />
          <Button
            text={"Добавить"}
            extraClass={styles.buttonadd}
            onClick={handleAddClick}
            disabled={(stringInput === '' || isClearLoading || isPopLoading) ? true : false}
            isLoader={isAddLoading ? true : false}
            data-testid="add"
          />
          <Button
            text={"Удалить"}
            extraClass={styles.buttondel}
            onClick={handlePopClick}
            disabled={(stackArr.length === 0 || isClearLoading || isAddLoading) ? true : false}
            isLoader={isPopLoading ? true : false}
            data-testid="del"
          />
        </div>
        <Button
          text={"Очистить"}
          extraClass={styles.buttonclear}
          onClick={handleClearClick}
          disabled={(stackArr.length === 0 || isPopLoading || isAddLoading) ? true : false}
          isLoader={isClearLoading ? true : false}
          data-testid="clear"
        />
      </form>
      <div className={styles.container}>
        {stackArr.length > 0 &&
          stackArr.map((item, index) => {

            return (
              <Circle
                letter={item}
                index={index}
                key={index}
                head={index === stackArr.length - 1 ? 'top' : ''}
                state={!isClearLoading ? (stackArr.length === index + 1 ? colour : ElementStates.Default) : colour}
              />
            )
          })
        }
      </div>
    </SolutionLayout>
  );
};
