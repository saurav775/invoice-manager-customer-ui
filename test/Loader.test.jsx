import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Loader from "../src/components/common/Loader";

describe("Loader component", () => {
  let wrapper;
  const props = {
    fixedLoader: false,
  };

  it("component rendered", () => {
    wrapper = render(<Loader {...props} />);
    expect(wrapper.container.firstChild).toBeInTheDocument();
  });

  it("Loader components with no props passed", () => {
    wrapper = render(<Loader />);
    expect(
      wrapper.container.getElementsByClassName("fixed-loader").length
    ).toBe(0);
  });

  it("Loader components with fixedLoader", () => {
    wrapper = render(<Loader fixedLoader />);
    expect(
      wrapper.container.getElementsByClassName("fixed-loader").length
    ).toBe(1);
  });
});
