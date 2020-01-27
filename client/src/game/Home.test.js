import React from "react";
import { mount } from "enzyme";

import Home from "./Home";
import App from "./App";

describe("Home", () => {
  const wrapper = mount(
    <App>
      <Home />
    </App>
  );

  it("Should render a Link", () => {
    expect(wrapper.find("Link").exists()).toBe(true);
  });
});
