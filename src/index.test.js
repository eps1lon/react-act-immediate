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

test("SimpleComponent", done => {
  const wrapper = mount(<SimpleComponent />);

  jest.runAllImmediates();
  console.log(wrapper.text());

  setImmediate(() => done());
});
