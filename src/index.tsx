import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./index.scss";
import initStore from "./config/initStore";
import ErrorBoundary from "./shared/Components/ErrorBoundary/error-boundary";
import DevTools from "./config/devtools";

const devTools = process.env.NODE_ENV === "development" ? <DevTools /> : null;
const store = initStore();

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ToastProvider>
        {devTools}
        <App />
      </ToastProvider>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);

serviceWorker.unregister();
