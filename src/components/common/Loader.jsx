import React from "react";
import PropTypes from "prop-types";
import "../../style/_loader.scss";

const propTypes = {
  fixedLoader: PropTypes.bool,
};

const Loader = (props) => {
  const { fixedLoader = false } = props;
  const loaderContainerClasses = [
    "loader-container",
    fixedLoader ? "fixed-loader" : "",
  ]
    .join(" ")
    .trim();
  return (
    <div className={loaderContainerClasses} data-testid="common-loader-test">
      <div className="spinner"></div>
    </div>
  );
};

Loader.propTypes = propTypes;
export default Loader;
