import React from "react";
import PropTypes from "prop-types";
import Button from "invoice_manager_customer_ui/Button";

const propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

const Pagination = (props) => {
  const { totalItems, itemsPerPage, currentPage, onPageChange } = props;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages === 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <Button
        handleClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        label="Previous"
        variant="secondary"
      />
      {[...Array(totalPages)].map((_, index) => (
        <Button
          key={index}
          handleClick={() => handlePageChange(index + 1)}
          label={(index + 1).toString()}
          variant={currentPage === index + 1 ? "primary" : "secondary"}
        />
      ))}
      <Button
        handleClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        label="Next"
        variant="secondary"
      />
    </div>
  );
};

Pagination.propTypes = propTypes;

export default Pagination;
