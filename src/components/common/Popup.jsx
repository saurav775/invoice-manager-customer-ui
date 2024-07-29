import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "invoice_manager_customer_ui/Button";
import { togglePopup } from "invoice_manager_customer_ui/actions/popupActions";
import { CLOSE, OK, SECONDARY } from "invoice_manager_customer_ui/constants";
import "../../style/_popup.scss";

const propTypes = {
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  togglePopup: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
};

const Popup = (props) => {
  const { message, title, togglePopup, callback } = props;

  /**
   * close popup on close button click
   * returns undefined
   */
  const handleClose = () => {
    togglePopup(false);
  };

  return (
    <div className="popup-container">
      <div className="popup-inner">
        <div className="popup-title">
          <p>{title}</p>
          <Button
            label={<>&times;</>}
            handleClick={handleClose}
            variant="transparent"
          />
        </div>
        <p className="popup-body">{message}</p>
        <div className="popup-footer">
          <Button label={CLOSE} handleClick={handleClose} variant={SECONDARY} />
          <Button label={OK} handleClick={callback} />
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = propTypes;

const mapStateToProps = ({ popup }) => ({
  message: popup.message,
  title: popup.title,
  callback: popup.callback,
});

const mapDispatchToProps = {
  togglePopup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
