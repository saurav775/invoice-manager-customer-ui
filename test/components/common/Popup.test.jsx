import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { mockStore } from "../../../setupJest";
import Popup from "../../../src/components/common/Popup";
import { togglePopup } from "invoice_manager_customer_ui/actions/popupActions";
import { CLOSE, OK } from "invoice_manager_customer_ui/constants";

describe("Popup component test", () => {
  jest.mock("invoice_manager_customer_ui/actions/popupActions", () => ({
    togglePopup: jest.fn(),
  }));

  let store;
  let mockCallback;
  let title = "Test title";
  let message = "Test message";

  beforeEach(() => {
    mockCallback = jest.fn();
    store = mockStore({
      popup: {
        message,
        title,
        callback: mockCallback,
      },
    });
  });

  const renderComponent = (store) => {
    return render(
      <Provider store={store}>
        <Popup />
      </Provider>
    );
  };

  test("renders Popup component with required props", () => {
    renderComponent(store);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(CLOSE)).toBeInTheDocument();
    expect(screen.getByText(OK)).toBeInTheDocument();
  });

  test("handles close button click correctly", () => {
    renderComponent(store);

    const closeButton = screen.getByRole("button", { name: "×" });
    fireEvent.click(closeButton);

    expect(togglePopup).toHaveBeenCalledWith(false);
  });

  test('handles "Close" button click correctly', () => {
    renderComponent(store);

    const closeButton = screen.getByText(CLOSE);
    fireEvent.click(closeButton);

    expect(togglePopup).toHaveBeenCalledWith(false);
  });

  test('handles "OK" button click correctly', () => {
    renderComponent(store);

    const okButton = screen.getByText(OK);
    fireEvent.click(okButton);

    expect(mockCallback).toHaveBeenCalled();
  });

  test("renders with different message and title props", () => {
    const title = "Another test title";
    const message = "Another test message";
    store = mockStore({
      popup: {
        message,
        title,
        callback: mockCallback,
      },
    });
    render(
      <Provider store={store}>
        <Popup />
      </Provider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
