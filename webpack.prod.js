const { ModuleFederationPlugin } = require("webpack").container;
const { merge } = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.common");
const packageJson = require("./package.json");

const domain = process.env.CUSTOMER_PRODUCTION_DOMAIN;

module.exports = () => {
  const prodConfig = {
    mode: "production",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.[name].[contenthash].js",
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "invoice_manager_customer_ui",
        filename: "remoteEntry.js",
        remotes: {
          invoice_manager_dashboard_ui:
            "invoice_manager_dashboard_ui@https://invoice-manager-dashboard-ui.vercel.app/remoteEntry.js",
          invoice_manager_customer_ui:
            "invoice_manager_customer_ui@https://invoice-manager-customer-ui.vercel.app/remoteEntry.js",
        },
        exposes: {
          "./CustomersPage": "./src/Bootstrap",
          "./TableUI": "./src/components/common/TableUI",
          "./Button": "./src/components/common/Button",
          "./RightDrawer": "./src/components/common/RightDrawer",
          "./Loader": "./src/components/common/Loader",
          "./Snackbar": "./src/components/common/Snackbar",
          "./Popup": "./src/components/common/Popup",
          "./CustomerForm": "./src/components/CustomerForm",
          "./constants": "./src/constants",
          "./actions/rightDrawerActions":
            "./src/store/actions/rightDrawer.actions",
          "./actions/snackBarActions": "./src/store/actions/snackBar.actions",
          "./actions/popupActions": "./src/store/actions/popup.actions",
          "./actions/customerActions": "./src/store/actions/customers.actions",
          "./hooks/useForm": "./src/hooks/useForm",
        },
        shared: packageJson.dependencies,
      }),
    ],
  };

  return merge(commonConfig, prodConfig);
};
