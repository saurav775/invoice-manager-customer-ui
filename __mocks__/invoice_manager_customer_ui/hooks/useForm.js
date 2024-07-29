const useForm = () => {
  const handleChange = jest.fn();
  const handleFormSubmit = jest.fn((event, callback) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    callback(formData);
  });
  const formRef = { current: { reset: jest.fn() } };
  const formErrors = {};

  return [formRef, formErrors, handleChange, handleFormSubmit];
};

export default useForm;
