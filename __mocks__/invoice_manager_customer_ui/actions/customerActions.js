export const getCustomers = jest.fn(() => ({
  type: "CUSTOMERS.GET_CUSTOMERS",
}));
export const setSelectedCustomer = jest.fn(() => ({
  type: "CUSTOMERS.SET_SELECTED_CUSTOMERS",
}));
export const deleteCustomer = jest.fn(() => ({
  type: "CUSTOMERS.DELETE_CUSTOMERS",
}));
export const saveCustomer = jest.fn(() => ({
  type: "CUSTOMERS.SAVE_CUSTOMER",
}));
