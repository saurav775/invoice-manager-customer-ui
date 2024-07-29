import fetchMock from "jest-fetch-mock";
import {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
  SAVE_CUSTOMER_REQUEST,
  SAVE_CUSTOMER_SUCCESS,
  SAVE_CUSTOMER_FAILURE,
  TOGGLE_CUSTOMER_LOADER,
  SET_SELECTED_CUSTOMER,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,
  TOGGLE_RIGHT_DRAWER,
  TOGGLE_SNACKBAR,
  TOGGLE_POPUP,
} from "invoice_manager_dashboard_ui/actionTypes";
import { mockStore } from "../../../setupJest";
import {
  toggleCustomerLoader,
  setSelectedCustomer,
  getCustomers,
  saveCustomer,
  deleteCustomer,
} from "../../../src/store/actions/customers.actions";
import { NAME_EXISTS } from "invoice_manager_customer_ui/constants";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Customer Actions test", () => {
  it("should create an action to toggle the customer loader", () => {
    const expectedAction = {
      type: TOGGLE_CUSTOMER_LOADER,
      payload: { isLoading: true },
    };
    const store = mockStore({});
    store.dispatch(toggleCustomerLoader(true));
    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  it("should create an action to set the selected customer", () => {
    const customerData = { customer_id: 1, customer_name: "test" };
    const expectedAction = {
      type: SET_SELECTED_CUSTOMER,
      payload: { customerData },
    };
    const store = mockStore({});
    store.dispatch(setSelectedCustomer(customerData));

    const actions = store.getActions();
    expect(actions).toEqual([expectedAction]);
  });

  describe("getCustomers", () => {
    it("creates GET_CUSTOMERS_SUCCESS when fetching customers has been done", () => {
      const customers = [{ id: 1, name: "test" }];
      fetchMock.mockResponseOnce(JSON.stringify(customers));

      const expectedActions = [
        { type: GET_CUSTOMERS_REQUEST },
        { type: GET_CUSTOMERS_SUCCESS, payload: customers },
      ];
      const store = mockStore({});

      return store.dispatch(getCustomers()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("creates GET_CUSTOMERS_FAILURE when fetching customers fails", () => {
      fetchMock.mockReject(new Error("Failed to fetch"));

      const expectedActions = [
        { type: GET_CUSTOMERS_REQUEST },
        { type: GET_CUSTOMERS_FAILURE, error: new Error("Failed to fetch") },
      ];
      const store = mockStore({});

      return store.dispatch(getCustomers()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("saveCustomer", () => {
    it("creates SAVE_CUSTOMER_SUCCESS when saving a new customer succeeds", () => {
      const customerData = {
        customer_name: "test",
        customer_email: "test@example.com",
        customer_phone: "1234567890",
      };
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: "Success", payload: { customer_id: 2 } })
      );

      const expectedActions = [
        { type: SAVE_CUSTOMER_REQUEST },
        { type: TOGGLE_RIGHT_DRAWER },
        { type: SET_SELECTED_CUSTOMER, payload: { customerData: {} } },
        {
          type: SAVE_CUSTOMER_SUCCESS,
          payload: {
            customerData: {
              customer_id: 2,
              ...customerData,
            },
            isEditing: false,
          },
        },
        { type: TOGGLE_SNACKBAR, payload: true },
      ];

      const store = mockStore({});
      return store
        .dispatch(saveCustomer(...Object.values(customerData)))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("creates SAVE_CUSTOMER_SUCCESS when updating existing customer", () => {
      const customerData = {
        customer_name: "test",
        customer_email: "test@example.com",
        customer_phone: "1234567890",
        customer_id: "5",
      };
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: "Success", payload: {} })
      );

      const expectedActions = [
        { type: SAVE_CUSTOMER_REQUEST },
        { type: TOGGLE_RIGHT_DRAWER },
        { type: SET_SELECTED_CUSTOMER, payload: { customerData: {} } },
        {
          type: SAVE_CUSTOMER_SUCCESS,
          payload: {
            customerData,
            isEditing: true,
          },
        },
        { type: TOGGLE_SNACKBAR, payload: true },
      ];

      const store = mockStore({});
      return store
        .dispatch(saveCustomer(...Object.values(customerData)))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("creates SAVE_CUSTOMER_FAILURE when saving a customer fails", () => {
      fetchMock.mockReject(new Error("Failed to save"));

      const expectedActions = [
        { type: SAVE_CUSTOMER_REQUEST },
        { type: TOGGLE_RIGHT_DRAWER },
        { type: SET_SELECTED_CUSTOMER, payload: { customerData: {} } },
        { type: SAVE_CUSTOMER_FAILURE, error: new Error("Failed to save") },
        { type: TOGGLE_SNACKBAR, payload: true },
      ];

      const store = mockStore({});
      return store
        .dispatch(saveCustomer("test", "test@example.com", "1234567890"))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it("handles existing customer errors correctly", () => {
      fetchMock.mockResponseOnce(JSON.stringify({ message: NAME_EXISTS }));

      const expectedActions = [
        { type: SAVE_CUSTOMER_REQUEST },
        { type: TOGGLE_RIGHT_DRAWER },
        { type: SET_SELECTED_CUSTOMER, payload: { customerData: {} } },
        { type: TOGGLE_SNACKBAR, payload: true },
        { type: TOGGLE_CUSTOMER_LOADER, payload: { isLoading: false } },
      ];

      const store = mockStore({});
      return store
        .dispatch(saveCustomer("test", "test@example.com", "1234567890"))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe("deleteCustomer", () => {
    it("creates DELETE_CUSTOMER_SUCCESS when deleting a customer succeeds", () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ message: "Customer deleted" })
      );

      const customer_id = 1;
      const expectedActions = [
        { type: DELETE_CUSTOMER_REQUEST },
        { type: TOGGLE_POPUP, payload: false },
        { type: DELETE_CUSTOMER_SUCCESS, payload: { customer_id } },
        { type: TOGGLE_SNACKBAR, payload: true },
      ];

      const store = mockStore({});
      return store.dispatch(deleteCustomer(customer_id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it("creates DELETE_CUSTOMER_FAILURE when deleting a customer fails", () => {
      fetchMock.mockReject(new Error("Failed to delete"));

      const customer_id = 1;
      const expectedActions = [
        { type: DELETE_CUSTOMER_REQUEST },
        { type: TOGGLE_POPUP, payload: false },
        { type: DELETE_CUSTOMER_FAILURE, error: new Error("Failed to delete") },
        { type: TOGGLE_SNACKBAR, payload: true },
      ];

      const store = mockStore({});
      return store.dispatch(deleteCustomer(customer_id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
