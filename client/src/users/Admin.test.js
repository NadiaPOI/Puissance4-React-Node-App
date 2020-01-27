import React from "react";
import { shallow, mount } from "enzyme";

import Admin from "./Admin";

describe("Admin", () => {
  it("Should render a ul list as default", () => {
    const adminWrapper = shallow(<Admin />);
    expect(adminWrapper.find("ul").exists()).toBe(true);
  });

  it("Should fetch data from url :/users", done => {
    const mockFetch = (global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => {
          return Promise.resolve([]);
        }
      });
    }));

    mount(<Admin />);

    expect(mockFetch).toHaveBeenCalledWith("/users");
    done();
  });
});
