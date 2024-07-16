import { TOGGLE_SNACKBAR } from "invoice_manager_dashboard_ui/actionTypes";
import { INFO } from "invoice_manager_customer_ui/constants";

export const toggleSnackbar =
  (isOpen, message = "", type = INFO) =>
  async (dispatch) => {
    dispatch({ type: TOGGLE_SNACKBAR, payload: { isOpen, message, type } });
  };
