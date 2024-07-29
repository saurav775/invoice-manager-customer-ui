import { mockStore } from "../../../setupJest";
import { togglePopup } from "../../../src/store/actions/popup.actions";
import { TOGGLE_POPUP } from "invoice_manager_dashboard_ui/actionTypes";

describe("togglePopup action tests", () => {
  it("should create an action to toggle popup with all parameters", () => {
    const isOpen = true;
    const message = "Sample message";
    const title = "Sample title";
    const callback = jest.fn();

    const expectedAction = {
      type: TOGGLE_POPUP,
      payload: {
        isOpen,
        message,
        title,
        callback,
      },
    };

    const store = mockStore({});
    store.dispatch(togglePopup(isOpen, message, title, callback));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should create an action to toggle popup with default values", () => {
    const expectedAction = {
      type: TOGGLE_POPUP,
      payload: {
        isOpen: false,
        message: undefined,
        title: undefined,
        callback: undefined,
      },
    };

    const store = mockStore({});
    store.dispatch(togglePopup(false, undefined, undefined, undefined));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should create an action to toggle popup with only isOpen parameter", () => {
    const isOpen = true;

    const expectedAction = {
      type: TOGGLE_POPUP,
      payload: {
        isOpen,
        message: undefined,
        title: undefined,
        callback: undefined,
      },
    };

    const store = mockStore({});
    store.dispatch(togglePopup(isOpen));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should handle callback function correctly", () => {
    const isOpen = true;
    const message = "Sample message";
    const title = "Sample title";
    const callback = jest.fn();

    const expectedAction = {
      type: TOGGLE_POPUP,
      payload: {
        isOpen,
        message,
        title,
        callback,
      },
    };

    const store = mockStore({});
    store.dispatch(togglePopup(isOpen, message, title, callback));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
