import { TOGGLE_POPUP } from "invoice_manager_dashboard_ui/actionTypes";

export const togglePopup =
  (isOpen, message, title, callback) => async (dispatch) => {
    dispatch({
      type: TOGGLE_POPUP,
      payload: { isOpen, message, title, callback },
    });
  };
