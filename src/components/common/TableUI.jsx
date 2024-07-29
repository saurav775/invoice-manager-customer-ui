import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "invoice_manager_customer_ui/Button";
import Pagination from "./Pagination";
import {
  ACTIONS,
  INVOICE_ID,
  PRODUCT_QTY,
  ENTER_PRODUCT_QTY,
  PRODUCT_NAME_SNAKE_CASE,
} from "invoice_manager_customer_ui/constants";
import { camelToSentenceCase, debounce } from "../../utils";
import "../../style/_table.scss";

const proptypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  actions: PropTypes.array,
  handleInputChange: PropTypes.func,
  isAddInvoicePage: PropTypes.bool,
  itemsPerPage: PropTypes.number,
};

const TableUI = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    rows,
    columns,
    actions = [],
    handleInputChange = () => {},
    isAddInvoicePage = false,
    itemsPerPage = 5,
  } = props;

  /**
   * show column as per row details
   * return React.element
   */
  const showColumn = (row, column) => {
    if (column === INVOICE_ID)
      return <Link to={`/invoices/${row[column]}`}>{row[column]}</Link>;
    if (isAddInvoicePage) {
      const debouncedInputChange = debounce(handleInputChange, 400);
      if (column === PRODUCT_QTY)
        return (
          <input
            defaultValue={row[column]}
            type="number"
            min={1}
            max={10000}
            name={row[PRODUCT_NAME_SNAKE_CASE] + "product_qty"}
            placeholder={ENTER_PRODUCT_QTY}
            autoComplete="off"
            onChange={(event) =>
              debouncedInputChange(event, row[PRODUCT_NAME_SNAKE_CASE])
            }
            required
          />
        );
    }
    return <>{row[column] || "---"}</>;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedRows = rows.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th scope="col" key={column}>
                {camelToSentenceCase(column)}
              </th>
            ))}
            {!!actions && !!actions.length && <th>{ACTIONS}</th>}
          </tr>
        </thead>
        <tbody>
          {!rows?.length && (
            <tr className="no-record-found">
              <td>No record found.</td>
            </tr>
          )}
          {selectedRows.map((row) => (
            <tr key={row[Object.keys(row)[0]]}>
              {columns.map((column, index) => (
                <td
                  data-label={column}
                  key={row[column] + row[Object.keys(row)[0]] + index}
                >
                  {showColumn(row, column)}
                </td>
              ))}
              {!!actions && !!actions.length && (
                <td className="actions-container">
                  {actions.map(({ label, handleClick, variant }) => (
                    <Button
                      label={label}
                      handleClick={(event) => handleClick(event, row)}
                      variant={variant}
                      key={label}
                    />
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={rows.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

TableUI.proptypes = proptypes;

export default TableUI;
