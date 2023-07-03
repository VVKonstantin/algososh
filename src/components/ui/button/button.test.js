import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe('testing Button component', () => {
  it('there is no button text', () => {
    const button = renderer
      .create(<Button />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });

  it('there is button text', () => {
    const button = renderer
      .create(<Button text="test" />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });

  it('button is disabled', () => {
    const button = renderer
      .create(<Button disabled />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });

  it('button has loader', () => {
    const button = renderer
      .create(<Button isLoader />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });

  it('button click', () => {
    const clickButton = jest.fn();

    render(<Button text="testButton" onClick={clickButton} />);
    fireEvent.click(screen.getByText("testButton"));
    expect(clickButton).toHaveBeenCalled();
  });

});
