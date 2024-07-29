const mockStore = {
  getState: () => ({
    someState: "default value",
  }),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
};

export default mockStore;
