import React, { useState, useEffect } from "react";
import { act } from "react-dom/test-utils";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const SimpleComponent = () => {
  const [data, setData] = useState("initial");

  useEffect(() => {
    setImmediate(() => setData("updated"));
  }, []);

  return <div>{data}</div>;
};

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

jest.useFakeTimers();

test("SimpleComponent", () => {
  const wrapper = mount(<SimpleComponent />);

  expect(wrapper.text()).toBe("initial");

  act(() => {
    jest.runAllImmediates();
  });
  expect(wrapper.text()).toBe("updated");
});
