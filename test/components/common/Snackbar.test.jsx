import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { mockStore } from "../../../setupJest";
import Snackbar from "../../../src/components/common/Snackbar";
import { toggleSnackbar } from "invoice_manager_customer_ui/actions/snackBarActions";
import { INFO, ERROR } from "invoice_manager_customer_ui/constants";

describe("Snackbar component tests", () => {
  jest.mock("invoice_manager_customer_ui/actions/snackBarActions", () => ({
    toggleSnackbar: jest.fn(),
  }));

  let store;
  let message = "Test message";

  beforeEach(() => {
    store = mockStore({
      snackBar: {
        isOpen: true,
        message,
        type: INFO,
      },
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  const renderComponent = (props) => {
    return render(
      <Provider store={store}>
        <Snackbar {...props} />
      </Provider>
    );
  };

  test("renders Snackbar component with required message", () => {
    renderComponent();

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test("auto-hides with default value after the specified time", () => {
    jest.useFakeTimers();
    renderComponent();

    expect(toggleSnackbar).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(toggleSnackbar).toHaveBeenCalledWith(false);
  });

  test("auto-hides after the specified time via prop", () => {
    jest.useFakeTimers();
    renderComponent({ autoHide: 1000 });

    expect(toggleSnackbar).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(toggleSnackbar).toHaveBeenCalledWith(false);
  });

  test("closes when the close button is clicked", () => {
    renderComponent();

    const closeButton = screen.getByRole("button", { name: "×" });
    fireEvent.click(closeButton);

    expect(toggleSnackbar).toHaveBeenCalledWith(false);
  });

  test("renders with the correct class based on the type", () => {
    store = mockStore({
      snackBar: {
        isOpen: true,
        message,
        type: ERROR,
      },
    });
    renderComponent();

    const snackbar = screen
      .getByText(message)
      .closest("div.snackbar-container");
    expect(snackbar).toHaveClass("snackbar-error");
  });

  test("clears the timeout on unmounting", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
    const { unmount } = renderComponent();

    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  test("does not auto-hide if isOpen is false", () => {
    jest.useFakeTimers();
    store = mockStore({
      snackBar: {
        isOpen: false,
        message,
        type: INFO,
      },
    });
    renderComponent();
    jest.advanceTimersByTime(3000);
    expect(toggleSnackbar).not.toHaveBeenCalled();
  });

  test("does not auto-hide if isOpen is false", () => {
    jest.useFakeTimers();
    store = mockStore({
      snackBar: {
        isOpen: false,
        message,
        type: INFO,
      },
    });
    renderComponent();
    jest.advanceTimersByTime(3000);
    expect(toggleSnackbar).not.toHaveBeenCalled();
  });

  test("does not have error class if type is empty", () => {
    store = mockStore({
      snackBar: {
        isOpen: true,
        message,
        type: "",
      },
    });
    renderComponent();

    const snackbar = screen
      .getByText(message)
      .closest("div.snackbar-container");
    expect(snackbar).not.toHaveClass("snackbar-error");
  });
});
