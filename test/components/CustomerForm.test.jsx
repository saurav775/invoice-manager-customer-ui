import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { mockStore } from "../../setupJest";
import CustomerForm from "../../src/components/CustomerForm";
import {
  saveCustomer,
  setSelectedCustomer,
} from "invoice_manager_customer_ui/actions/customerActions";
import { toggleRightDrawer } from "invoice_manager_customer_ui/actions/rightDrawerActions";
import {
  CANCEL,
  SAVE,
  ENTER_NAME,
  ENTER_EMAIL,
  ENTER_PHONE,
} from "invoice_manager_customer_ui/constants";

describe("CustomerForm component tests", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      customers: {
        selectedCustomer: {},
      },
      rightDrawer: {
        isOpen: true,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (store) =>
    render(
      <Provider store={store}>
        <CustomerForm />
      </Provider>
    );

  test("renders the form with default values", () => {
    renderComponent(store);

    expect(screen.getByPlaceholderText(ENTER_NAME)).toHaveValue("");
    expect(screen.getByPlaceholderText(ENTER_EMAIL)).toHaveValue("");
    expect(screen.getByPlaceholderText(ENTER_PHONE)).toHaveValue("");
  });

  test("renders the form with selected customer values", () => {
    store = mockStore({
      customers: {
        selectedCustomer: {
          customer_id: 1,
          customer_name: "test",
          customer_email: "test@example.com",
          customer_phone: "1234567890",
        },
      },
      rightDrawer: {
        isOpen: true,
      },
    });

    renderComponent(store);

    expect(screen.getByPlaceholderText(ENTER_NAME)).toHaveValue("test");
    expect(screen.getByPlaceholderText(ENTER_EMAIL)).toHaveValue(
      "test@example.com"
    );
    expect(screen.getByPlaceholderText(ENTER_PHONE)).toHaveValue("1234567890");
  });

  test("handles form submission with valid inputs", async () => {
    renderComponent(store);

    fireEvent.change(screen.getByPlaceholderText(ENTER_NAME), {
      target: { value: "test2" },
    });
    fireEvent.change(screen.getByPlaceholderText(ENTER_EMAIL), {
      target: { value: "test2@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(ENTER_PHONE), {
      target: { value: "0987654321" },
    });

    fireEvent.click(screen.getByText(SAVE));

    expect(saveCustomer).toHaveBeenCalledTimes(1);
  });

  test("handles form submission with invalid inputs", async () => {
    renderComponent(store);

    fireEvent.change(screen.getByPlaceholderText(ENTER_NAME), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByPlaceholderText(ENTER_EMAIL), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByPlaceholderText(ENTER_PHONE), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByText(SAVE));

    expect(saveCustomer).not.toHaveBeenCalled();
  });

  test("handles cancel button click", () => {
    renderComponent(store);

    fireEvent.click(screen.getByText(CANCEL));

    expect(toggleRightDrawer).toHaveBeenCalledWith(false);
    expect(setSelectedCustomer).toHaveBeenCalledWith({});
  });

  test("resets the form on drawer open", () => {
    renderComponent(store);

    fireEvent.change(screen.getByPlaceholderText(ENTER_NAME), {
      target: { value: "test 2" },
    });
    fireEvent.change(screen.getByPlaceholderText(ENTER_EMAIL), {
      target: { value: "test2@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(ENTER_PHONE), {
      target: { value: "0987654321" },
    });

    store = mockStore({
      customers: {
        selectedCustomer: {},
      },
      rightDrawer: {
        isOpen: true,
      },
    });

    renderComponent(store);

    expect(screen.getAllByPlaceholderText(ENTER_NAME)[1]).toHaveValue("");
    expect(screen.getAllByPlaceholderText(ENTER_EMAIL)[1]).toHaveValue("");
    expect(screen.getAllByPlaceholderText(ENTER_PHONE)[1]).toHaveValue("");
  });

  test("update form with selected customer values", () => {
    store = mockStore({
      customers: {
        selectedCustomer: {
          customer_id: 1,
          customer_name: "test",
          customer_email: "test@example.com",
          customer_phone: "1234567890",
        },
      },
      rightDrawer: {
        isOpen: true,
      },
    });

    renderComponent(store);

    fireEvent.change(screen.getByPlaceholderText(ENTER_NAME), {
      target: { value: "test 2" },
    });

    fireEvent.click(screen.getByText(SAVE));
    expect(screen.getByPlaceholderText(ENTER_NAME)).toHaveValue("test 2");
    expect(saveCustomer).toHaveBeenCalledTimes(1);
  });
});
