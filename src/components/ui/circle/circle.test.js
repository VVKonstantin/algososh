import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe('testing Circle component', () => {
  it('no letter in circle', () => {
    const circle = renderer
      .create(<Circle letter="" />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('letters in circle', () => {
    const circle = renderer
      .create(<Circle letter="lttr" />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('head in circle', () => {
    const circle = renderer
      .create(<Circle head="hd" />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('react-elem in head in circle', () => {
    const circle = renderer
      .create(<Circle head={ <Circle /> } />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('tail in circle', () => {
    const circle = renderer
      .create(<Circle tail="hd" />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('react-elem in tail in circle', () => {
    const circle = renderer
      .create(<Circle tail={ <Circle /> } />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('index in circle', () => {
    const circle = renderer
      .create(<Circle index="indx" />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('props isSmall in circle', () => {
    const circle = renderer
      .create(<Circle isSmall={true} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('default circle', () => {
    const circle = renderer
      .create(<Circle state={ ElementStates.Default } />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('changing circle', () => {
    const circle = renderer
      .create(<Circle state={ ElementStates.Changing } />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('modified circle', () => {
    const circle = renderer
      .create(<Circle state={ ElementStates.Modified } />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });

});
