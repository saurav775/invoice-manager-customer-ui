const { ModuleFederationPlugin } = require("webpack").container;
const { merge } = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.common");
const packageJson = require("./package.json");

module.exports = () => {
  const devConfig = {
    mode: "development",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.[name].[contenthash].js",
    },
    devServer: {
      port: 3001,
      historyApiFallback: true,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "invoice_manager_customer_ui",
        filename: "remoteEntry.js",
        remotes: {
          invoice_manager_dashboard_ui:
            "invoice_manager_dashboard_ui@http://localhost:3000/remoteEntry.js",
          invoice_manager_customer_ui:
            "invoice_manager_customer_ui@http://localhost:3001/remoteEntry.js",
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

  return merge(commonConfig, devConfig);
};