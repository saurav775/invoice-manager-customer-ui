import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../../../src/components/common/Loader";

describe("Loader component tests", () => {
  test("renders loader with default props", () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId("common-loader-test");
    expect(loaderContainer).toBeInTheDocument();
    expect(loaderContainer).toHaveClass("loader-container");
    expect(loaderContainer).not.toHaveClass("fixed-loader");
    const spinner = loaderContainer.firstChild;
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("spinner");
  });

  test("renders loader with fixedLoader prop set to true", () => {
    render(<Loader fixedLoader={true} />);
    const loaderContainer = screen.getByTestId("common-loader-test");
    expect(loaderContainer).toBeInTheDocument();
    expect(loaderContainer).toHaveClass("loader-container", "fixed-loader");
  });
});
