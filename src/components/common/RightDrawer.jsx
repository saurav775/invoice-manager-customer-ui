import React from "react";
import PropTypes from "prop-types";
import { RIGHT_DRAWER } from "invoice_manager_customer_ui/constants";
import "../../style/_rightDrawer.scss";

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
};

const RightDrawer = (props) => {
  const { children, title = RIGHT_DRAWER, isOpen } = props;
  const rightDrawerClassNames = [
    "right-drawer-wrp",
    isOpen ? "right-drawer-visible" : "",
  ].join(" ").trim();

  return (
    <div className={rightDrawerClassNames}>
      <div className="right-drawer-content-wrp">
        <h2>{title}</h2>
        <div className="right-drawer-body">{children}</div>
      </div>
    </div>
  );
};

RightDrawer.propTypes = propTypes;

export default RightDrawer;
