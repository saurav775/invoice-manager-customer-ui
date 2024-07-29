import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableUI from "../../../src/components/common/TableUI";
import { BrowserRouter as Router } from "react-router-dom";
import {
  INVOICE_ID,
  PRODUCT_QTY,
  ACTIONS,
  ENTER_PRODUCT_QTY,
  PRODUCT_NAME_SNAKE_CASE,
} from "invoice_manager_customer_ui/constants";
import { camelToSentenceCase } from "../../../src/utils";

const mockHandleInputChange = jest.fn();

const customProps = {
  rows: [
    {
      [INVOICE_ID]: "1",
      [PRODUCT_QTY]: 10,
      [PRODUCT_NAME_SNAKE_CASE]: "product_one",
    },
    {
      [INVOICE_ID]: "2",
      [PRODUCT_QTY]: 20,
      [PRODUCT_NAME_SNAKE_CASE]: "product_two",
    },
  ],
  columns: [INVOICE_ID, PRODUCT_QTY],
  actions: [{ label: "Edit", handleClick: jest.fn(), variant: "primary" }],
  handleInputChange: mockHandleInputChange,
  isAddInvoicePage: true,
};

const renderComponent = (props = {}) => {
  return render(
    <Router>
      <TableUI {...customProps} {...props} />
    </Router>
  );
};

describe("TableUI component tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with default props", () => {
    const defaultProps = {
      rows: customProps.rows,
      columns: customProps.columns,
    };
    render(
      <Router>
        <TableUI {...defaultProps} />
      </Router>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.queryByText(ACTIONS)).not.toBeInTheDocument();
  });

  test("renders with required props", () => {
    renderComponent();

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getAllByText(customProps.actions[0].label)[0]
    ).toBeInTheDocument();
  });

  test("renders columns correctly", () => {
    renderComponent();

    customProps.columns.forEach((column) => {
      expect(screen.getByText(camelToSentenceCase(column))).toBeInTheDocument();
    });
    expect(screen.getByText(ACTIONS)).toBeInTheDocument();
  });

  test("renders rows correctly", () => {
    renderComponent();

    customProps.rows.forEach((row) => {
      expect(screen.getByText(row[INVOICE_ID])).toBeInTheDocument();
    });
  });

  test("renders invoiceId as a link", () => {
    renderComponent();

    customProps.rows.forEach((row) => {
      const link = screen.getByText(row[INVOICE_ID]);
      expect(link).toBeInTheDocument();
      expect(link.closest("a")).toHaveAttribute(
        "href",
        `/invoices/${row[INVOICE_ID]}`
      );
    });
  });

  test("renders input for productQty on Add Invoice page", () => {
    jest.useFakeTimers();
    renderComponent();

    const inputs = screen.getAllByPlaceholderText(ENTER_PRODUCT_QTY);
    expect(inputs).toHaveLength(customProps.rows.length);

    fireEvent.change(inputs[0], { target: { value: "15" } });
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
    expect(inputs[0].value).toEqual("15");
  });

  test("renders action buttons correctly", () => {
    renderComponent();
    expect(
      screen.getAllByText(customProps.actions[0].label)[0]
    ).toBeInTheDocument();
  });

  test("handles action button click correctly", () => {
    renderComponent();

    const editButton = screen.getAllByText(customProps.actions[0].label)[0];
    fireEvent.click(editButton);

    expect(customProps.actions[0].handleClick).toHaveBeenCalledTimes(1);
  });

  test("handles missing actions gracefully", () => {
    renderComponent({ actions: [] });

    expect(screen.queryByText(ACTIONS)).not.toBeInTheDocument();
  });

  test("handles empty rows gracefully", () => {
    renderComponent({ rows: [] });

    expect(
      screen.queryByText(customProps.rows[0][INVOICE_ID])
    ).not.toBeInTheDocument();
  });

  test("handles missing handleInputChange prop gracefully", () => {
    renderComponent({ handleInputChange: undefined });

    const inputs = screen.getAllByPlaceholderText(ENTER_PRODUCT_QTY);
    fireEvent.change(inputs[0], { target: { value: "15" } });

    expect(mockHandleInputChange).not.toHaveBeenCalled();
  });

  test("render default case in show column if column is not product_qty", () => {
    const customProps = {
      rows: [
        {
          [INVOICE_ID]: "1",
          sample_column: "render as string",
          [PRODUCT_NAME_SNAKE_CASE]: "product_one",
        },
        {
          [INVOICE_ID]: "2",
          sample_column: "render as string again",
          [PRODUCT_NAME_SNAKE_CASE]: "product_two",
        },
      ],
      columns: [INVOICE_ID, "sample_column"],
      actions: [{ label: "Edit", handleClick: jest.fn(), variant: "primary" }],
      handleInputChange: mockHandleInputChange,
      isAddInvoicePage: true,
    };

    render(
      <Router>
        <TableUI {...customProps} />
      </Router>
    );

    expect(screen.getByText("render as string again")).toBeInTheDocument();
  });

  test("render empty cell if column value is null or empty", () => {
    const customProps = {
      rows: [
        {
          [INVOICE_ID]: "1",
          sample_column: "render as string",
          [PRODUCT_NAME_SNAKE_CASE]: "product_one",
        },
        {
          [INVOICE_ID]: "2",
          sample_column: "",
          [PRODUCT_NAME_SNAKE_CASE]: "product_two",
        },
      ],
      columns: [INVOICE_ID, "sample_column"],
      actions: [{ label: "Edit", handleClick: jest.fn(), variant: "primary" }],
      handleInputChange: mockHandleInputChange,
      isAddInvoicePage: true,
    };

    render(
      <Router>
        <TableUI {...customProps} />
      </Router>
    );

    expect(screen.getByText("---")).toBeInTheDocument();
  });
});
