module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setupJest.js"],
  moduleNameMapper: {
    '^invoice_manager_customer_ui/(.*)$': '<rootDir>/__mocks__/invoice_manager_customer_ui/$1.js',
    '^invoice_manager_dashboard_ui/(.*)$': '<rootDir>/__mocks__/invoice_manager_dashboard_ui/$1.js'
  },
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  testMatch: ["**/*.test.(js|jsx)"],
  setupFiles: ['./jest.setup.js'],
};
