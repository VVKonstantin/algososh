import { ElementStates } from "../../types/element-states";
import { reverseString } from "../utils/utils";
import { TString } from "../../types/types";

describe('testing reverse string algorithm', () => {
  it('even strings length', async () => {
    const arr: Array<TString> = [
      { letter: 't', state: ElementStates.Default },
      { letter: 'e', state: ElementStates.Default },
      { letter: 's', state: ElementStates.Default },
      { letter: 'y', state: ElementStates.Default }];
    await reverseString(arr);
    expect(arr).toEqual([
      { letter: 'y', state: ElementStates.Modified },
      { letter: 's', state: ElementStates.Modified },
      { letter: 'e', state: ElementStates.Modified },
      { letter: 't', state: ElementStates.Modified }]);
  });

  it('odd strings length', async () => {
    const arr: Array<TString> = [
      { letter: 't', state: ElementStates.Default },
      { letter: 'e', state: ElementStates.Default },
      { letter: 's', state: ElementStates.Default }];
    await reverseString(arr);
    expect(arr).toEqual([
      { letter: 's', state: ElementStates.Modified },
      { letter: 'e', state: ElementStates.Modified },
      { letter: 't', state: ElementStates.Modified }]);
  });

  it('length 1', async () => {
    const arr: Array<TString> = [
      { letter: 't', state: ElementStates.Default }];
    await reverseString(arr);
    expect(arr).toEqual([
      { letter: 't', state: ElementStates.Modified }]);
  });

  it('length 0', async () => {
    const arr: Array<TString> = [];
    await reverseString(arr);
    expect(arr).toEqual([]);
  });

});
