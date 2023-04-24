import { ElementStates } from "./element-states";

export type TString = {
  letter: string;
  state: ElementStates;
};

export type TArray = {
  val: number;
  state: ElementStates;
};

export type TQueue = {
  val: string | null;
  state: ElementStates;
};

export type TListElem = {
  val: string;
  upCircle: React.ReactElement | null;
  downCircle: React.ReactElement | null;
  next: boolean;
};
