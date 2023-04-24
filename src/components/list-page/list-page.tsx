import React, { useState, FormEvent, ChangeEvent, useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from './list-class'
import { TListElem } from "../../types/types";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

interface ILoader {
  [index: string]: boolean
}

export const ListPage: React.FC = () => {

  const [valInput, setValInput] = useState<string>('');
  const [indInput, setIndInput] = useState<string>('');

  const [list, setList] = useState<TListElem[]>([]);
  const [colour, setColour] = useState({ ind: 0, colour: false });
  const [colouredIndex, setColouredIndex] = useState(0);

  const [isLoading, setIsLoading] = useState<ILoader>({
    addHead: false,
    addTail: false,
    delHead: false,
    delTail: false,
    addAtIndex: false,
    delAtIndex: false
  });

  const isAnythingLoading = () => {
    for (let key in isLoading) {
      if (isLoading[key]) return true;
    }
    return false;
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onValChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValInput(e.target.value);
  };

  const onIndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndInput(e.target.value);
  };

  const initialList = useMemo(() => {
    const linkedList = new LinkedList<string>();
    linkedList.append('0');
    linkedList.append('34');
    linkedList.append('8');
    linkedList.append('1');
    setList([...linkedList.modify()]);
    return linkedList;
  }, []);

  const insertHead = (isFromInsertAt: boolean=false) => {
    if(!isFromInsertAt) setIsLoading({ ...isLoading, addHead: true });
    initialList.insertAt(valInput, 0);

    const listToChange = list;
    if (list.length > 0) listToChange[0].upCircle = <Circle letter={valInput} state={ElementStates.Changing} isSmall={true} />
    setList([...listToChange]);

    setTimeout(() => {
      setList([...initialList.modify()]);
      setValInput('');
      setColour({ ind: 0, colour: true });
      setTimeout(() => {
        setColour({ ind: 0, colour: false });
        setIsLoading({ ...isLoading, addHead: false });
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }

  const insertTail = () => {
    setIsLoading({ ...isLoading, addTail: true });
    initialList.append(valInput);

    const listToChange = list;
    const tailIndex = list.length - 1;
    if (list.length > 0) listToChange[tailIndex].upCircle = <Circle letter={valInput} state={ElementStates.Changing} isSmall={true} />
    setList([...listToChange]);

    setTimeout(() => {
      setList([...initialList.modify()]);
      setValInput('');
      setColour({ ind: tailIndex + 1, colour: true });
      setTimeout(() => {
        setColour({ ind: tailIndex + 1, colour: false });
        setIsLoading({ ...isLoading, addTail: false });
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }

  const deleteHead = (isFromDeleteAt: boolean=false) => {
    if(!isFromDeleteAt) setIsLoading({ ...isLoading, deleteHead: true });
    initialList.removeHead();
    const listToChange = list;
    listToChange[0].downCircle = <Circle letter={listToChange[0].val} state={ElementStates.Changing} isSmall={true} />;
    listToChange[0].val = '';
    setList([...listToChange]);

    setTimeout(() => {
      setList([...initialList.modify()]);
      setIsLoading({ ...isLoading, deleteHead: false });
    }, SHORT_DELAY_IN_MS);
  }

  const deleteTail = () => {
    setIsLoading({ ...isLoading, deleteTail: true });
    initialList.removeTail();
    const listToChange = list;
    const tailIndex = list.length - 1;
    listToChange[tailIndex].downCircle = <Circle letter={listToChange[tailIndex].val} state={ElementStates.Changing} isSmall={true} />;
    listToChange[tailIndex].val = '';
    setList([...listToChange]);

    setTimeout(() => {
      setList([...initialList.modify()]);
      setIsLoading({ ...isLoading, deleteTail: false });
    }, SHORT_DELAY_IN_MS);
  }

  const insertAtIndex = () => {
    setIsLoading({ ...isLoading, addAtIndex: true });
    let index = Number(indInput);
    if (index === 0) insertHead(true);
    if (index > list.length - 1) return;

    const listToChange = list;

    for (let i = 0; i < index + 1; i++) {
      setTimeout(() => {
        listToChange[i].upCircle = <Circle letter={valInput} state={ElementStates.Changing} isSmall={true} />;
        if (i > 0) listToChange[i - 1].upCircle = <></>;
        setColouredIndex(i);
        setList([...listToChange]);
        i++;
      }, SHORT_DELAY_IN_MS * i);
    }

    setTimeout(() => {
      setColouredIndex(0);
      setColour({ ind: index, colour: true });
      if (index) initialList.insertAt(valInput, index);
      setList([...initialList.modify()]);
    }, SHORT_DELAY_IN_MS * (index + 1));

    setTimeout(() => {
      setColour({ ind: index, colour: false });
      setList([...initialList.modify()]);
      setIsLoading({ ...isLoading, addAtIndex: false });
    }, SHORT_DELAY_IN_MS * (index + 2));

    setIndInput('');
    setValInput('');
  }

  const deleteAtIndex = () => {
    setIsLoading({ ...isLoading, delAtIndex: true });
    let index = Number(indInput);
    if (index === 0) deleteHead(true);
    if (index > list.length - 1) return;

    if (index > 0) {
      initialList.removeAt(index);
      const listToChange = list;

      for (let i = 0; i < index + 1; i++) {
        setTimeout(() => {
          setColouredIndex(i + 1);
        }, SHORT_DELAY_IN_MS * i);
      }

      setTimeout(() => {
        listToChange[index].downCircle = <Circle letter={list[index].val} state={ElementStates.Changing} isSmall={true} />;
        listToChange[index].val = '';
        setColouredIndex(index);
        setList([...listToChange]);
      }, SHORT_DELAY_IN_MS * (index + 1));

      setTimeout(() => {
        setColouredIndex(0);
        setList([...initialList.modify()]);
        setIsLoading({ ...isLoading, delAtIndex: false });
      }, SHORT_DELAY_IN_MS * (index + 2));
    }
    setIndInput('');
    setValInput('');
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          maxLength={4}
          isLimitText={true}
          placeholder={'Введите значение'}
          onChange={onValChange}
          value={valInput}
        />
        <Button
          text={"Добавить в head"}
          extraClass={styles.button1}
          onClick={() => insertHead()}
          isLoader={isLoading.addHead}
          disabled={valInput === '' || isAnythingLoading()}
        />
        <Button
          text={"Добавить в tail"}
          extraClass={styles.button1}
          onClick={insertTail}
          isLoader={isLoading.addTail}
          disabled={valInput === '' || isAnythingLoading() || list.length === 0}
        />
        <Button
          text={"Удалить из head"}
          extraClass={styles.button1}
          onClick={() => deleteHead()}
          isLoader={isLoading.deleteHead}
          disabled={isAnythingLoading() || list.length === 0}
        />
        <Button
          text={"Удалить из tail"}
          extraClass={styles.button1}
          onClick={deleteTail}
          isLoader={isLoading.deleteTail}
          disabled={isAnythingLoading() || list.length === 0}
        />
      </form>
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          maxLength={4}
          placeholder={'Введите индекс'}
          onChange={onIndChange}
          value={indInput}
          type="number"
          min={0}
          max={Math.max(list.length - 1, 0)}
        />
        <Button
          text={"Добавить по индексу"}
          extraClass={styles.button2}
          onClick={insertAtIndex}
          disabled={Number(indInput) < 0 || Number(indInput) > Math.max(list.length - 1, 0) || indInput === '' || valInput === '' || isAnythingLoading()}
          isLoader={isLoading.addAtIndex}
        />
        <Button
          text={"Удалить по индексу"}
          extraClass={styles.button2}
          onClick={deleteAtIndex}
          disabled={(Number(indInput) < 0 || Number(indInput) > list.length - 1 || indInput === '' || isAnythingLoading())}
          isLoader={isLoading.delAtIndex}
        />
      </form>
      <div className={styles.container}>
        {list.map((item, index) => {
          return (
            <div key={index} className={styles.list__elem}>
              <Circle
                letter={item.val}
                index={index}
                head={item.upCircle ? item.upCircle : index === 0 ? 'head' : ""}
                tail={item.downCircle ? item.downCircle : index === list.length - 1 ? 'tail' : ''}
                state={
                  colour.ind === index && colour.colour ? ElementStates.Modified :
                    index < colouredIndex ? ElementStates.Changing : ElementStates.Default
                }
              />
              {item.next && <ArrowIcon />}
            </div>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
