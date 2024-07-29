import React from "react";

const TableUI = (props) => (
  <div data-testid="table-ui">
    {props.actions.map((action) => (
      <button
        onClick={(event) => action.handleClick(event, props.rows[0])}
        key={action.label}
      >
        {action.label}
      </button>
    ))}
  </div>
);

export default TableUI;
