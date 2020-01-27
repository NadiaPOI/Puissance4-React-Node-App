import React from "react";
import { mount } from "enzyme";

import Login from "./Login";
import App from "../game/App";

describe("Login", () => {
  let loginWrapper;
  let props;

  beforeEach(() => {
    props = {
      mockSubmit: (global.fetch = jest.fn(() => {
        return Promise.resolve((res, data) => {
          res.json().then(data => console.log(data));
        });
      })),
      history: { push: jest.fn() }
    };

    loginWrapper = mount(
      <App>
        <Login />
      </App>
    );
  });

  it("Should render a form with email and password inputs", () => {
    expect(loginWrapper.find("form").exists()).toBe(true);
  });

  it("Should call fetch backend when submit form", () => {
    const inputEmail = loginWrapper.find("input").first();
    const inputPassword = loginWrapper.find("input").last();

    inputEmail.simulate("change", { target: { value: "x@gmail.com" } });
    inputPassword.simulate("change", { target: { value: "tdd" } });
    loginWrapper.find("form").simulate("submit");

    expect(props.mockSubmit).toHaveBeenCalledWith("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: "x@gmail.com", password: "tdd" })
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
