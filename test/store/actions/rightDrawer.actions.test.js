import { mockStore } from "../../../setupJest";
import { toggleRightDrawer } from "../../../src/store/actions/rightDrawer.actions";
import { TOGGLE_RIGHT_DRAWER } from "invoice_manager_dashboard_ui/actionTypes";

describe("toggleRightDrawer action tests", () => {
  it("should create an action to toggle the right drawer with true", () => {
    const isOpen = true;
    const expectedAction = {
      type: TOGGLE_RIGHT_DRAWER,
      payload: { isOpen },
    };

    const store = mockStore({});
    store.dispatch(toggleRightDrawer(isOpen));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should create an action to toggle the right drawer with false", () => {
    const isOpen = false;
    const expectedAction = {
      type: TOGGLE_RIGHT_DRAWER,
      payload: { isOpen },
    };

    const store = mockStore({});
    store.dispatch(toggleRightDrawer(isOpen));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should create an action to toggle the right drawer with other values", () => {
    const isOpen = "not_a_boolean";
    const expectedAction = {
      type: TOGGLE_RIGHT_DRAWER,
      payload: { isOpen },
    };

    const store = mockStore({});
    store.dispatch(toggleRightDrawer(isOpen));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should create an action with undefined value", () => {
    const isOpen = undefined;
    const expectedAction = {
      type: TOGGLE_RIGHT_DRAWER,
      payload: { isOpen },
    };

    const store = mockStore({});
    store.dispatch(toggleRightDrawer(isOpen));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should dispatch only one action", () => {
    const isOpen = true;

    const store = mockStore({});
    store.dispatch(toggleRightDrawer(isOpen));

    const actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0]).toHaveProperty("type", TOGGLE_RIGHT_DRAWER);
    expect(actions[0].payload).toEqual({ isOpen });
  });
});
