import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TableUI from "invoice_manager_customer_ui/TableUI";
import Loader from "invoice_manager_customer_ui/Loader";
import { toggleRightDrawer } from "invoice_manager_customer_ui/actions/rightDrawerActions";
import { togglePopup } from "invoice_manager_customer_ui/actions/popupActions";
import {
  getCustomers,
  setSelectedCustomer,
  deleteCustomer,
} from "invoice_manager_customer_ui/actions/customerActions";
import {
  EDIT,
  DELETE,
  SECONDARY,
  RED,
  ARE_YOU_SURE_CUSTOMER_DELETION,
} from "invoice_manager_customer_ui/constants";

const CustomerDetails = (props) => {
  const {
    getCustomers,
    customers,
    isLoading,
    toggleRightDrawer,
    setSelectedCustomer,
    togglePopup,
    deleteCustomer,
  } = props;

  useEffect(() => {
    getCustomers();
  }, []);

  const columns = Object.keys(customers?.[0] || {});

  const handleEditClick = (event, row) => {
    toggleRightDrawer(true);
    setSelectedCustomer(row);
  };

  const handleDeleteClick = (event, row) => {
    const { customer_email, customer_id } = row;

    const handleCustomerDeletion = () => {
      deleteCustomer(customer_id);
    };

    togglePopup(
      true,
      ARE_YOU_SURE_CUSTOMER_DELETION,
      `${DELETE} (${customer_email})`,
      handleCustomerDeletion
    );
  };

  const actions = [
    {
      label: EDIT,
      handleClick: handleEditClick,
      variant: SECONDARY,
    },
    {
      label: DELETE,
      handleClick: handleDeleteClick,
      variant: RED,
    },
  ];

  if (isLoading) return <Loader fixedLoader />;

  return <TableUI rows={customers} columns={columns} actions={actions} />;
};

const mapStateToProps = ({ customers }) => ({
  customers: customers.customers,
  isLoading: customers.isLoading,
});

const mapDispatchToProps = {
  getCustomers,
  toggleRightDrawer,
  setSelectedCustomer,
  togglePopup,
  deleteCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetails);
