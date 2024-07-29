import React from "react";
import { render, screen } from "@testing-library/react";
import RightDrawer from "../../../src/components/common/RightDrawer";
import { RIGHT_DRAWER } from "invoice_manager_customer_ui/constants";

describe("RightDrawer component tests", () => {
  const renderComponent = (props) => {
    return render(<RightDrawer {...props} />);
  };

  test("renders RightDrawer component with required props", () => {
    renderComponent({ children: <div>Test Content</div>, isOpen: true });

    expect(screen.getByText(RIGHT_DRAWER)).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("applies the correct class name when isOpen is true", () => {
    renderComponent({ children: <div>Test Content</div>, isOpen: true });

    const drawer = screen
      .getByText(RIGHT_DRAWER)
      .closest("div.right-drawer-wrp");
    expect(drawer).toHaveClass("right-drawer-visible");
  });

  test("does not apply the visible class name when isOpen is false", () => {
    renderComponent({ children: <div>Test Content</div>, isOpen: false });

    const drawer = screen
      .getByText(RIGHT_DRAWER)
      .closest("div.right-drawer-wrp");
    expect(drawer).not.toHaveClass("right-drawer-visible");
  });

  test("renders with a custom title", () => {
    const customTitle = "Custom Title";
    renderComponent({
      children: <div>Test Content</div>,
      title: customTitle,
      isOpen: true,
    });

    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });

  test("renders multiple children correctly", () => {
    renderComponent({
      children: (
        <>
          <div>Child 1</div>
          <div>Child 2</div>
        </>
      ),
      isOpen: true,
    });

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
