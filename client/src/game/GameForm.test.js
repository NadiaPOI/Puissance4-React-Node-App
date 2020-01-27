import React from "react";
import { shallow } from "enzyme";

import GameForm from "./GameForm";

describe("GameForm", () => {
  let formWrapper;
  let props;

  beforeEach(() => {
    props = {
      mockChangeRows: jest.fn(),
      mockChangeColumns: jest.fn(),
      mockSubmit: jest.fn(),
      history: { push: jest.fn() }
    };

    formWrapper = shallow(<GameForm {...props} />);
  });

  it("Should render a form with 2 InputForm components", () => {
    expect(formWrapper.find("InputForm").length).toEqual(2);
  });

  it("Should call preventDefault when submit form", () => {
    const preventDefault = jest.fn();

    formWrapper.find("form").simulate("submit", { preventDefault });

    expect(preventDefault).toBeCalled();
  });

  it("Should redirect to url row=5&col=4 when change the row value to 5 and submit form", () => {
    const inputRows = formWrapper.find("InputForm").first();
    const event = { target: { value: 5 } };

    inputRows.simulate("change", event);
    formWrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
    expect(props.history.push).toHaveBeenCalledWith(`/gameboard?row=5&col=4`);
  });

  it("Should redirect to url row=4&col=20 when change the col value to 20 and submit form", () => {
    const inputColumns = formWrapper.find("InputForm").last();
    const event = { target: { value: 20 } };

    inputColumns.simulate("change", event);
    formWrapper.find("form").simulate("submit", { preventDefault: jest.fn() });

    expect(props.history.push).toHaveBeenCalledWith(`/gameboard?row=4&col=20`);
  });

  it("Should redirect to url row=4&col=4 when submit form by default", () => {
    formWrapper.find("form").simulate("submit", { preventDefault: jest.fn() });

    expect(props.history.push).toHaveBeenCalledWith(`/gameboard?row=4&col=4`);
  });
});
