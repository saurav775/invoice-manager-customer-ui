import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../src/components/common/Button";
import {
  PRIMARY,
  SUBMIT,
  BUTTON,
  SECONDARY,
} from "invoice_manager_customer_ui/constants";

describe("Button component tests", () => {
  test("renders with default props", () => {
    render(<Button />);
    const button = screen.getByRole("button", { name: SUBMIT });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn", `btn-${PRIMARY}`);
    expect(button).toHaveAttribute("type", BUTTON);
    expect(button).not.toBeDisabled();
  });

  test("renders with custom label", () => {
    const customLabel = "Click Me";
    render(<Button label={customLabel} />);
    const button = screen.getByRole("button", { name: customLabel });
    expect(button).toBeInTheDocument();
  });

  test("renders with custom variant", () => {
    const customVariant = SECONDARY;
    render(<Button variant={customVariant} />);
    const button = screen.getByRole("button", { name: SUBMIT });
    expect(button).toHaveClass("btn", `btn-${customVariant}`);
  });

  test("renders with custom type", () => {
    const customType = "submit";
    render(<Button type={customType} />);
    const button = screen.getByRole("button", { name: SUBMIT });
    expect(button).toHaveAttribute("type", customType);
  });

  test("renders as disabled", () => {
    render(<Button disabled />);
    const button = screen.getByRole("button", { name: SUBMIT });
    expect(button).toBeDisabled();
  });

  test("calls handleClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button handleClick={handleClick} />);
    const button = screen.getByRole("button", { name: SUBMIT });
    act(() => {
      fireEvent.click(button);
    });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call handleClick when disabled and clicked", () => {
    const handleClick = jest.fn();
    render(<Button handleClick={handleClick} disabled />);
    const button = screen.getByRole("button", { name: SUBMIT });
    act(() => {
      fireEvent.click(button);
    });
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("renders with React element label", () => {
    const customLabel = <span>Icon Button</span>;
    render(<Button label={customLabel} />);
    const button = screen.getByRole("button", { name: /Icon Button/i });
    expect(button).toBeInTheDocument();
  });

  test("handles no handleClick prop gracefully", () => {
    render(<Button />);
    const button = screen.getByRole("button", { name: SUBMIT });
    expect(() =>
      act(() => {
        fireEvent.click(button);
      })
    ).not.toThrow();
  });
});
