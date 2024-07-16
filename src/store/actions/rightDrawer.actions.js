import { TOGGLE_RIGHT_DRAWER } from "invoice_manager_dashboard_ui/actionTypes";

export const toggleRightDrawer = (isOpen) => async (dispatch) => {
  dispatch({ type: TOGGLE_RIGHT_DRAWER, payload: { isOpen } });
};
