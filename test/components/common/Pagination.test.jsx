import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../../src/components/common/Pagination";

describe("Pagination Component tests", () => {
  const renderComponent = (props) => {
    const defaultProps = {
      totalItems: 20,
      itemsPerPage: 5,
      currentPage: 1,
      onPageChange: jest.fn(),
    };
    return render(<Pagination {...defaultProps} {...props} />);
  };

  it("should render correct number of pages", () => {
    renderComponent();
    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons).toHaveLength(6);
  });

  it("should not render when there is only one page", () => {
    renderComponent({ totalItems: 5, itemsPerPage: 5 });
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("should disable the Previous button on the first page", () => {
    renderComponent();
    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  it("should disable the Next button on the last page", () => {
    renderComponent({ currentPage: 4 });
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("should call onPageChange with the correct page number when a page button is clicked", () => {
    const onPageChange = jest.fn();
    renderComponent({ onPageChange });

    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onPageChange with the correct page number when Previous is clicked", () => {
    const onPageChange = jest.fn();
    renderComponent({ currentPage: 2, onPageChange });

    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("should call onPageChange with the correct page number when Next is clicked", () => {
    const onPageChange = jest.fn();
    renderComponent({ currentPage: 1, onPageChange });

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
