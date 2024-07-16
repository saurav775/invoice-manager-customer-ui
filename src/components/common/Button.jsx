import React from "react";
import PropTypes from "prop-types";
import { PRIMARY, SUBMIT, BUTTON } from "invoice_manager_customer_ui/constants";
import "../../style/_button.scss";

const propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  handleClick: PropTypes.func,
  variant: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

const Button = (props) => {
  const {
    label = SUBMIT,
    handleClick = () => {},
    variant = PRIMARY,
    type = BUTTON,
    disabled = false,
  } = props;
  const buttonContainerClassNames = ["btn", `btn-${variant}`].join(" ").trim();
  return (
    <button
      className={buttonContainerClassNames}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = propTypes;

export default Button;
