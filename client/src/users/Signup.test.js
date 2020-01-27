import React from "react";
import { mount } from "enzyme";

import Signup from "./Signup";
import App from "../game/App";

describe("Signup", () => {
  let signupWrapper;
  let props;

  beforeEach(() => {
    props = {
      mockSubmit: (global.fetch = jest.fn(() => {
        return Promise.resolve(res => {
          res.json().then(data => console.log(data));
        });
      })),
      history: { push: jest.fn() }
    };
    signupWrapper = mount(
      <App>
        <Signup {...props} />
      </App>
    );
  });

  it("Should render a form with firstname, email and password inputs", () => {
    expect(signupWrapper.find("form").exists()).toBe(true);
  });

  it("Should signup user and redirect to : http://localhost:8800/login", () => {
    const inputFirstname = signupWrapper.find("input").first();
    const inputEmail = signupWrapper.find('[type="email"]');
    const inputPassword = signupWrapper.find("input").last();

    inputFirstname.simulate("change", { target: { value: "Nina" } });
    inputEmail.simulate("change", { target: { value: "nina@gmail.com" } });
    inputPassword.simulate("change", { target: { value: "nina" } });

    signupWrapper
      .find("form")
      .simulate("submit", { preventDefault: jest.fn() });

    expect(props.mockSubmit).toHaveBeenCalledWith("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: "nina@gmail.com", password: "nina" })
    });
  });
});
