import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { mockStore } from "../../setupJest";
import CustomerDetails from "../../src/components/CustomerDetails";
import {
  getCustomers,
  setSelectedCustomer,
  deleteCustomer,
} from "invoice_manager_customer_ui/actions/customerActions";
import { toggleRightDrawer } from "invoice_manager_customer_ui/actions/rightDrawerActions";
import { togglePopup } from "invoice_manager_customer_ui/actions/popupActions";
import { EDIT, DELETE } from "invoice_manager_customer_ui/constants";

describe("CustomerDetails component tests", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      customers: {
        customers: [{ customer_id: 1, customer_email: "test@example.com" }],
        isLoading: false,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (store) =>
    render(
      <Provider store={store}>
        <CustomerDetails />
      </Provider>
    );

  test("renders Loader when isLoading is true", () => {
    store = mockStore({
      customers: {
        customers: [],
        isLoading: true,
      },
    });

    renderComponent(store);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders TableUI with correct props when isLoading is false", () => {
    renderComponent(store);
    expect(screen.getByTestId("table-ui")).toBeInTheDocument();
  });

  test("dispatches getCustomers on mount", () => {
    renderComponent(store);
    expect(getCustomers).toHaveBeenCalled();
  });

  test("handles edit button click correctly", () => {
    renderComponent(store);
    const editButton = screen.getByText(EDIT);
    fireEvent.click(editButton);

    expect(toggleRightDrawer).toHaveBeenCalledWith(true);
    expect(setSelectedCustomer).toHaveBeenCalledTimes(1);
  });

  test("handles delete button click correctly and confirms deletion", async () => {
    renderComponent(store);
    const deleteButton = screen.getByText(DELETE);
    fireEvent.click(deleteButton);

    expect(togglePopup).toHaveBeenCalledTimes(1);

    const handleCustomerDeletion = togglePopup.mock.calls[0][3];
    handleCustomerDeletion();

    await waitFor(() => {
      expect(deleteCustomer).toHaveBeenCalledWith(1);
    });
  });
});
