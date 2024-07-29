export const togglePopup = jest.fn((isOpen) => ({
  type: "POPUP.TOGGLE_POPUP",
  payload: isOpen,
}));
