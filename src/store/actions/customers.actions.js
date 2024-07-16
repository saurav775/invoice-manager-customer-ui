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
} from "invoice_manager_dashboard_ui/actionTypes";
import { toggleRightDrawer } from "invoice_manager_customer_ui/actions/rightDrawerActions";
import { toggleSnackbar } from "invoice_manager_customer_ui/actions/snackBarActions";
import { togglePopup } from "invoice_manager_customer_ui/actions/popupActions";
import {
  BASE_URL_V1,
  NAME_EXISTS,
  PHONE_EXISTS,
  EMAIL_EXISTS,
  ERROR,
  INFO,
} from "invoice_manager_customer_ui/constants";

export const toggleCustomerLoader = (isLoading) => (dispatch) => {
  dispatch({ type: TOGGLE_CUSTOMER_LOADER, payload: { isLoading } });
};

export const setSelectedCustomer = (customerData) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_CUSTOMER,
    payload: {
      customerData,
    },
  });
};

export const getCustomers = () => async (dispatch) => {
  dispatch({ type: GET_CUSTOMERS_REQUEST });
  try {
    const response = await fetch(`${BASE_URL_V1}/customer`);
    const transformedResponse = await response.json();
    dispatch({ type: GET_CUSTOMERS_SUCCESS, payload: transformedResponse });
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_CUSTOMERS_FAILURE, error });
  }
};

export const saveCustomer =
  (customer_name, customer_email, customer_phone, customer_id = "") =>
  async (dispatch) => {
    dispatch({ type: SAVE_CUSTOMER_REQUEST });
    dispatch(toggleRightDrawer(false));
    dispatch(setSelectedCustomer({}));
    try {
      const requestBody = {
        customer_name,
        customer_email,
        customer_phone,
      };
      if (customer_id) {
        requestBody.customer_id = customer_id;
      }
      const saveCustomerUrl = customer_id
        ? `${BASE_URL_V1}/customer/${customer_id}`
        : `${BASE_URL_V1}/customer`;
      const saveCustomerMethod = customer_id ? "PUT" : "POST";

      const response = await fetch(saveCustomerUrl, {
        method: saveCustomerMethod,
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { message, payload } = await response.json();

      if (
        message === NAME_EXISTS ||
        message === PHONE_EXISTS ||
        message === EMAIL_EXISTS
      ) {
        dispatch(toggleSnackbar(true, message, ERROR));
        dispatch(toggleCustomerLoader(false));
      } else {
        dispatch({
          type: SAVE_CUSTOMER_SUCCESS,
          payload: {
            customerData: {
              customer_id: customer_id || payload?.customer_id,
              customer_name,
              customer_email,
              customer_phone,
            },
            isEditing: !!customer_id,
          },
        });
        dispatch(toggleSnackbar(true, message, INFO));
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: SAVE_CUSTOMER_FAILURE, error });
      dispatch(toggleSnackbar(true, error, ERROR));
    }
  };

export const deleteCustomer = (customer_id) => async (dispatch) => {
  dispatch({ type: DELETE_CUSTOMER_REQUEST });
  dispatch(togglePopup(false));
  try {
    const response = await fetch(`${BASE_URL_V1}/customer/${customer_id}`, {
      method: "DELETE",
    });
    const { message } = await response.json();
    dispatch({ type: DELETE_CUSTOMER_SUCCESS, payload: { customer_id } });
    dispatch(toggleSnackbar(true, message, INFO));
  } catch (error) {
    console.error(error);
    dispatch({ type: DELETE_CUSTOMER_FAILURE, error });
    dispatch(toggleSnackbar(true, error, ERROR));
  }
};
