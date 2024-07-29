import React from "react";

const Button = (props) => (
  <button
    onClick={props.handleClick}
    className={`btn btn-${props.variant}`}
    type={props.type}
    disabled={props.disabled}
  >
    {props.label}
  </button>
);

export default Button;
