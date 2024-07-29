import { act } from "react";
import { renderHook } from "@testing-library/react-hooks";
import useForm from "../../../src/hooks/useForm";
import {
  REQUIRED,
  MIN,
  MAX,
  SPECIAL_CHARS,
  EMAIL,
  PHONE,
} from "invoice_manager_customer_ui/constants";

const validationTypes = {
  name: `${MIN}:3|${MAX}:30|${SPECIAL_CHARS}|${REQUIRED}`,
  email: `${EMAIL}|${REQUIRED}`,
  phone: `${PHONE}|${REQUIRED}`,
};

describe("useForm custom hook tests", () => {
  it("initializes with no errors", () => {
    const { result } = renderHook(() => useForm(validationTypes));
    const [formRef, formErrors] = result.current;
    expect(formErrors).toEqual({});
  });

  it("handle change call with no form errors", () => {
    const { result } = renderHook(() => useForm(validationTypes));
    const [formRef, formErrors, handleChange, handleFormSubmit] =
      result.current;

    const mockChangeEvent = {
      target: {
        name: "name",
        value: "test",
      },
    };

    act(() => {
      handleChange(mockChangeEvent);
    });

    expect(result.current[1]).toEqual({});
  });

  it("submits the form when validation passes", () => {
    const { result } = renderHook(() => useForm(validationTypes));
    const [formRef, formErrors, handleChange, handleFormSubmit] =
      result.current;

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const formData = new FormData();
    formData.append("name", "test");
    formData.append("email", "test@example.com");
    formData.append("phone", "1234567890");

    jest.spyOn(global, "FormData").mockImplementation(() => formData);

    const mockCallback = jest.fn();

    act(() => {
      handleFormSubmit(mockEvent, mockCallback);
    });

    expect(result.current[1]).toEqual({});
    expect(mockCallback).toHaveBeenCalled();

    global.FormData.mockRestore();
  });

  it("validates form on submit", () => {
    const { result } = renderHook(() => useForm(validationTypes));
    const [formRef, formErrors, handleChange, handleFormSubmit] =
      result.current;

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const formData = new FormData();
    formData.append("name", "us");
    formData.append("email", "invalidEmail");
    formData.append("phone", "12345");

    jest.spyOn(global, "FormData").mockImplementation(() => formData);

    act(() => {
      handleFormSubmit(mockEvent, jest.fn());
    });

    expect(result.current[1]).toEqual({
      email: "Invalid email address",
      name: "name is too short. It should be of minimum 3 characters.",
      phone: "Invalid phone number",
    });

    global.FormData.mockRestore();
  });

  it("handles max input validation", () => {
    const { result } = renderHook(() => useForm(validationTypes));
    const [formRef, formErrors, handleChange, handleFormSubmit] =
      result.current;

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const formData = new FormData();
    formData.append("name", "itisgreaterthan30charactersoflength");
    formData.append("email", "test@example.com");
    formData.append("phone", "1234567890");

    jest.spyOn(global, "FormData").mockImplementation(() => formData);

    act(() => {
      handleFormSubmit(mockEvent, jest.fn());
    });

    expect(result.current[1]).toEqual({
      name: "name is too long. It should be of maximum 30 characters.",
    });

    global.FormData.mockRestore();
  });

  it("required error for all the required fields", () => {
    const { result } = renderHook(() => useForm(validationTypes));
    const [formRef, formErrors, handleChange, handleFormSubmit] =
      result.current;

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const formData = new FormData();
    formData.append("name", "");
    formData.append("email", "");
    formData.append("phone", "");

    jest.spyOn(global, "FormData").mockImplementation(() => formData);

    act(() => {
      handleFormSubmit(mockEvent, jest.fn());
    });

    expect(result.current[1]).toEqual({
      name: "name should not be empty",
      phone: "phone should not be empty",
      email: "email should not be empty",
    });

    global.FormData.mockRestore();
  });

  it("validates special chars correctly", () => {
    const { result } = renderHook(() => useForm(validationTypes));
    const [formRef, formErrors, handleChange, handleFormSubmit] =
      result.current;

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const formData = new FormData();
    formData.append("name", "test_speci@l");
    formData.append("email", "test@example.com");
    formData.append("phone", "1234551212");

    jest.spyOn(global, "FormData").mockImplementation(() => formData);

    act(() => {
      handleFormSubmit(mockEvent, jest.fn());
    });

    expect(result.current[1]).toEqual({
      name: "Invalid name. No special characters are allowed.",
    });

    global.FormData.mockRestore();
  });

  it("validates phone number correctly", () => {
    const { result } = renderHook(() => useForm(validationTypes));
    const [formRef, formErrors, handleChange, handleFormSubmit] =
      result.current;

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const formData = new FormData();
    formData.append("name", "test");
    formData.append("email", "test@example.com");
    formData.append("phone", "123");

    jest.spyOn(global, "FormData").mockImplementation(() => formData);

    act(() => {
      handleFormSubmit(mockEvent, jest.fn());
    });

    expect(result.current[1]).toEqual({
      phone: "Invalid phone number",
    });

    global.FormData.mockRestore();
  });
});
