export const toggleSnackbar = jest.fn((isOpen) => ({
  type: "SNACKBAR.TOGGLE_SNACKBAR",
  payload: isOpen,
}));
