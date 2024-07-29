import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { mockStore } from "../setupJest";
import App from "../src/App";
import { CUSTOMERS_PAGE, ADD } from "invoice_manager_customer_ui/constants";

describe("App Component tests", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      snackBar: { isOpen: false },
      popup: { isOpen: false },
      customers: [],
    });
  });

  it("should render the component correctly", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(CUSTOMERS_PAGE)).toBeInTheDocument();
    expect(screen.getByText(ADD)).toBeInTheDocument();
  });

  it("should dispatch toggleRightDrawer action on button click", () => {
    const dispatch = jest.fn();
    store = mockStore({
      snackBar: { isOpen: true },
      popup: { isOpen: true },
      customers: [],
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByText(ADD));

    const actions = store.getActions();
    expect(actions).toEqual([
      { type: "CUSTOMERS.GET_CUSTOMERS" },
      { type: "DRAWER.TOGGLE_RIGHT_DRAWER" },
    ]);
  });
});
