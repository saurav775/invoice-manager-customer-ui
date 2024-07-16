import { useState, useRef } from "react";
import {
  REQUIRED,
  REQUIRED_FIELD,
  MIN,
  MAX,
  SPECIAL_CHARS,
  SPECIAL_CHARS_REGEX,
  INVALID_EMAIL,
  EMAIL,
  PHONE,
  INVALID_PHONE,
  EMAIL_REGEX,
} from "invoice_manager_customer_ui/constants";
import { camelToSentenceCase } from "../utils";

const useForm = (validationTypes) => {
  const [formErrors, setFormErrors] = useState({});
  const formRef = useRef(null);

  const handleChange = (event) => {
    if (Object.keys(formErrors).length > 0) {
      const { target } = event;
      const errors = { ...formErrors };
      const formElement = target.getAttribute("name");
      if (formElement in errors) {
        delete errors[formElement];
        setFormErrors(errors);
      }
    }
  };

  const checkValidation = (formData) => {
    let errors = {};

    for (let key in validationTypes) {
      const validations = validationTypes[key].split("|");
      for (const validation of validations) {
        const [type, param] = validation.split(":");
        const value = formData.get(key);
        const sentenceCaseField = camelToSentenceCase(key);
        switch (type) {
          case REQUIRED:
            if (!value) errors[key] = sentenceCaseField + REQUIRED_FIELD;
            break;
          case MIN:
            if (value.length < param)
              errors[
                key
              ] = `${sentenceCaseField} is too short. It should be of minimum ${param} characters.`;
            break;
          case MAX:
            if (value.length > param)
              errors[
                key
              ] = `${sentenceCaseField} is too long. It should be of maximum ${param} characters.`;
            break;
          case SPECIAL_CHARS:
            if (SPECIAL_CHARS_REGEX.test(value))
              errors[
                key
              ] = `Invalid ${sentenceCaseField}. No special characters are allowed.`;
            break;
          case EMAIL:
            if (!EMAIL_REGEX.test(value)) errors[key] = INVALID_EMAIL;
            break;
          case PHONE:
            if (value.length !== 10 || Number.isNaN(Number(value)))
              errors[key] = INVALID_PHONE;
            break;
        }
      }
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return false;
    }
    return true;
  };

  const handleFormSubmit = (event, callback) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const isValid = checkValidation(formData);
    if (isValid) {
      callback(formData);
    }
  };

  return [formRef, formErrors, handleChange, handleFormSubmit];
};

export default useForm;
