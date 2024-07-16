import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "invoice_manager_customer_ui/Button";
import { toggleSnackbar } from "invoice_manager_customer_ui/actions/snackBarActions";
import { INFO, ERROR } from "invoice_manager_customer_ui/constants";
import "../../style/_snackBar.scss";

const propTypes = {
  message: PropTypes.string.isRequired,
  autoHide: PropTypes.number,
};

const Snackbar = (props) => {
  const {
    message,
    autoHide = 3000,
    isOpen,
    toggleSnackbar,
    type,
  } = props;

  let TIMER;

  /**
   * auto close snackbar after autoHide timer expires
   * returns undefined
   */
  const handleTimeout = () => {
    TIMER = setTimeout(() => {
      toggleSnackbar(false);
    }, autoHide);
  };

  useEffect(() => {
    if (isOpen) handleTimeout();

    // clear timer before unmount;
    return () => clearTimeout(TIMER);
  }, [isOpen, autoHide]);

  /**
   * close snackbar on close button click
   * returns undefined
   */
  const handleClose = () => {
    toggleSnackbar(false);
  };

  const snackBarClasses = [
    "snackbar-container",
    type === ERROR ? "snackbar-error" : "",
  ].join(" ").trim();

  return (
    <div className={snackBarClasses}>
      <p>{message}</p>
      <Button
        label={<>&times;</>}
        handleClick={handleClose}
        variant="transparent"
      />
    </div>
  );
};

Snackbar.propTypes = propTypes;

const mapStateToProps = ({ snackBar }) => ({
  isOpen: snackBar.isOpen,
  message: snackBar.message,
  type: snackBar.type
});

const mapDispatchToProps = {
  toggleSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
