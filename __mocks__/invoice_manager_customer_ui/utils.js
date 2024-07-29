jest.mock("../../utils", () => ({
  camelToSentenceCase: jest.fn((str) => str),
  debounce: jest.fn((fn) => fn),
}));
