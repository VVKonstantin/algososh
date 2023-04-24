import React, { useState, useMemo, ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Queue } from "./queue-class";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from './queue-page.module.css';

export const QueuePage: React.FC = () => {
  const [stringInput, setStringInput] = useState<string>('');
  const [queueArr, setQueueArr] = useState<(string | null)[]>([]);
  const [colour, setColour] = useState({ head: false, tail: false });

  const queue = useMemo(() => {
    const queue = new Queue<string>(7);
    setQueueArr([...queue.getElems()]);
    return queue;
  }, []);

  const { head, tail, length, size } = queue.getParams();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStringInput(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAddClick = () => {
    queue.enqueue(stringInput);
    setColour({ ...colour, tail: true });
    setTimeout(() => {
      setQueueArr([...queue.getElems()]);
      setTimeout(() => {
        setColour({ ...colour, tail: false });
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
    setStringInput('');
  };

  const handleDelClick = () => {
    setColour({ ...colour, head: true });
    setTimeout(() => {
      queue.dequeue();
      setQueueArr([...queue.getElems()]);
      setColour({ ...colour, head: false });
    }, SHORT_DELAY_IN_MS);
  }

  const handleClearClick = () => {
    queue.clear();
    setQueueArr([...queue.getElems()]);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form__container}>
          <Input
            maxLength={4}
            isLimitText={true}
            placeholder={'Введите значение'}
            onChange={onChange}
            value={stringInput}
          />
          <Button
            text={"Добавить"}
            extraClass={styles.buttonadd}
            onClick={handleAddClick}
            disabled={(stringInput === '' || (tail === size)) ? true : false}
          />
          <Button
            text={"Удалить"}
            extraClass={styles.buttondel}
            onClick={handleDelClick}
            disabled={(tail === head) ? true : false}
          />
        </div>
        <Button
          text={"Очистить"}
          extraClass={styles.buttonclear}
          onClick={handleClearClick}
          disabled={(length === 0 && head === 0 && tail === 0) ? true : false}
        />
      </form>
      <div className={styles.container}>
        {queueArr.length > 0 &&
          queueArr.map((item, index) => {
            return (
              <Circle
                letter={item ? item : ""}
                index={index}
                key={index}
                head={((index === head && queueArr[index]) || (index + 1 === head && length === 0)) ? 'head' : ''}
                tail={(index === tail - 1 && queueArr[index]) || (index === tail - 2 && !queueArr[tail - 1] && length) ? 'tail' : ''}
                state={(index === head && colour.head) || (index === tail - 1 && colour.tail) ?
                  ElementStates.Changing : ElementStates.Default}
              />
            )
          })
        }
      </div>
    </SolutionLayout>
  );
};
