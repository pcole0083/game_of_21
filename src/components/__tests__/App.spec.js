import React from "react";
import { shallow, mount, render, configure } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";

configure({ adapter: new Adapter() });

//*******************************************************************************************************
describe(">>>App --- Render REACT COMPONENT", () => {
  let props = {};
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App {...props} />);
  });

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
/**
 * This should be working, but getting a ModuleNotFoundError
 * Appears to be a bug with codesandbox client: https://github.com/CompuIves/codesandbox-client/issues/866
 */
