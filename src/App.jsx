import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "invoice_manager_customer_ui/Button";
import CustomerForm from "invoice_manager_customer_ui/CustomerForm";
import Snackbar from "invoice_manager_customer_ui/Snackbar";
import Popup from "invoice_manager_customer_ui/Popup";
import { toggleRightDrawer } from "invoice_manager_customer_ui/actions/rightDrawerActions";
import CustomerDetails from "./components/CustomerDetails";
import {
  ADD,
  PRIMARY,
  CUSTOMERS_PAGE,
} from "invoice_manager_customer_ui/constants";
import "./style/_customerPage.scss";

const App = (props) => {
  const { toggleRightDrawer, snackBarIsOpen, popupIsOpen } = props;
  const handleAddClick = () => {
    toggleRightDrawer(true);
  };
  return (
    <div className="customer-page-wrp">
      <div className="customer-header">
        <h1>{CUSTOMERS_PAGE}</h1>
        <Button handleClick={handleAddClick} label={ADD} variant={PRIMARY} />
      </div>
      <CustomerDetails />
      <CustomerForm />
      {snackBarIsOpen && <Snackbar />}
      {popupIsOpen && <Popup />}
    </div>
  );
};

const mapStateToProps = ({ snackBar, popup }) => ({
  snackBarIsOpen: snackBar.isOpen,
  popupIsOpen: popup.isOpen,
});

const mapDispatchToProps = {
  toggleRightDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
