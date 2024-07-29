import { mockStore } from "../../../setupJest";
import { toggleSnackbar } from "../../../src/store/actions/snackBar.actions";
import { TOGGLE_SNACKBAR } from "invoice_manager_dashboard_ui/actionTypes";
import { INFO } from "invoice_manager_customer_ui/constants";

describe("toggleSnackbar action tests", () => {
  it("should create an action to toggle the snackbar with default values", () => {
    const isOpen = true;
    const expectedAction = {
      type: TOGGLE_SNACKBAR,
      payload: { isOpen, message: "", type: INFO },
    };

    const store = mockStore({});
    store.dispatch(toggleSnackbar(isOpen));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should create an action to toggle the snackbar with a custom message", () => {
    const isOpen = true;
    const message = "Custom message";
    const expectedAction = {
      type: TOGGLE_SNACKBAR,
      payload: { isOpen, message, type: INFO },
    };

    const store = mockStore({});
    store.dispatch(toggleSnackbar(isOpen, message));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should create an action to toggle the snackbar with a custom type", () => {
    const isOpen = true;
    const type = "SUCCESS";
    const expectedAction = {
      type: TOGGLE_SNACKBAR,
      payload: { isOpen, message: "", type },
    };

    const store = mockStore({});
    store.dispatch(toggleSnackbar(isOpen, "", type));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should create an action to toggle the snackbar with all custom values", () => {
    const isOpen = false;
    const message = "Another custom message";
    const type = "ERROR";
    const expectedAction = {
      type: TOGGLE_SNACKBAR,
      payload: { isOpen, message, type },
    };

    const store = mockStore({});
    store.dispatch(toggleSnackbar(isOpen, message, type));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should create an action to toggle the snackbar with only a message", () => {
    const isOpen = true;
    const message = "Message only";
    const expectedAction = {
      type: TOGGLE_SNACKBAR,
      payload: { isOpen, message, type: INFO },
    };

    const store = mockStore({});
    store.dispatch(toggleSnackbar(isOpen, message));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
