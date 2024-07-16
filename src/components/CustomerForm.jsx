import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RightDrawer from "invoice_manager_customer_ui/RightDrawer";
import Button from "invoice_manager_customer_ui/Button";
import {
  SECONDARY,
  NEW_CUSTOMER,
  CANCEL,
  SAVE,
  NAME,
  EMAIL,
  PHONE,
  ENTER_NAME,
  ENTER_EMAIL,
  ENTER_PHONE,
  SUBMIT,
  EDIT_CUSTOMER,
} from "invoice_manager_customer_ui/constants";
import {
  saveCustomer,
  setSelectedCustomer,
} from "invoice_manager_customer_ui/actions/customerActions";
import { toggleRightDrawer } from "invoice_manager_customer_ui/actions/rightDrawerActions";
import useForm from "invoice_manager_customer_ui/hooks/useForm";

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

const customerValidationTypes = {
  customer_name: "min:3|max:50|special_chars|required",
  customer_email: "Email|required",
  customer_phone: "Phone|required",
};

const CustomerForm = (props) => {
  const {
    isOpen,
    toggleRightDrawer,
    saveCustomer,
    selectedCustomer,
    setSelectedCustomer,
  } = props;
  const [formRef, formErrors, handleChange, handleFormSubmit] = useForm(
    customerValidationTypes
  );

  const {
    customer_id: selectedCustomerId,
    customer_name: selectedCustomerName = "",
    customer_email: selectedCustomerEmail = "",
    customer_phone: selectedCustomerPhone = "",
  } = selectedCustomer;

  const handleCancelClick = () => {
    toggleRightDrawer(false);
    setSelectedCustomer({});
  };

  const handleCutomerFormSubmit = (event) => {
    handleFormSubmit(event, (formData) => {
      const customer_name = formData.get("customer_name");
      const customer_email = formData.get("customer_email");
      const customer_phone = formData.get("customer_phone");
      if (selectedCustomerId)
        saveCustomer(
          customer_name,
          customer_email,
          customer_phone,
          selectedCustomerId
        );
      else saveCustomer(customer_name, customer_email, customer_phone);
    });
  };

  useEffect(() => {
    formRef?.current?.reset();
  }, [isOpen]);

  const {
    customer_name: customer_name_error,
    customer_email: customer_email_error,
    customer_phone: customer_phone_error,
  } = formErrors;

  const drawerTitle = selectedCustomerId ? EDIT_CUSTOMER : NEW_CUSTOMER;

  return (
    <RightDrawer title={drawerTitle} isOpen={isOpen}>
      <form onSubmit={handleCutomerFormSubmit} ref={formRef}>
        <div className="form-input-wrp">
          <div className="form-element">
            <label htmlFor="customer_name">{NAME}</label>
            <input
              type="text"
              name="customer_name"
              placeholder={ENTER_NAME}
              autoComplete="off"
              onChange={handleChange}
              defaultValue={selectedCustomerName}
            />
            {!!customer_name_error && <span>{customer_name_error}</span>}
          </div>
          <div className="form-element">
            <label htmlFor="customer_email">{EMAIL}</label>
            <input
              type="email"
              name="customer_email"
              placeholder={ENTER_EMAIL}
              autoComplete="off"
              onChange={handleChange}
              defaultValue={selectedCustomerEmail}
            />
            {!!customer_email_error && <span>{customer_email_error}</span>}
          </div>
          <div className="form-element">
            <label htmlFor="customer_phone">{PHONE}</label>
            <input
              type="text"
              name="customer_phone"
              placeholder={ENTER_PHONE}
              autoComplete="off"
              onChange={handleChange}
              defaultValue={selectedCustomerPhone}
            />
            {!!customer_phone_error && <span>{customer_phone_error}</span>}
          </div>
        </div>
        <div className="form-actions-wrp">
          <Button
            label={CANCEL}
            handleClick={handleCancelClick}
            variant={SECONDARY}
          />
          <Button label={SAVE} type={SUBMIT} />
        </div>
      </form>
    </RightDrawer>
  );
};

CustomerForm.propTypes = propTypes;

const mapStateToProps = ({ customers, rightDrawer }) => ({
  selectedCustomer: customers.selectedCustomer,
  isOpen: rightDrawer.isOpen,
});

const mapDispatchToProps = {
  saveCustomer,
  toggleRightDrawer,
  setSelectedCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
