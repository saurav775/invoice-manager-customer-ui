import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "invoice_manager_dashboard_ui/store";
import App from "./App";
import { CUSTOMER_ROOT, DEVELOPMENT } from "invoice_manager_customer_ui/constants";

const CustomerElement = (
  <Provider store={store}>
    <App />
  </Provider>
);

// if (process.env.NODE_ENV === DEVELOPMENT) {
//   const rootNode = document.getElementById(CUSTOMER_ROOT);
//   const root = ReactDOM.createRoot(rootNode);
//   if (rootNode) {
//     root.render(CustomerElement);
//   }
// }

const CustomersPage = () => {
  return CustomerElement;
};

export default CustomersPage;
