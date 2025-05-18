import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./store/store.jsx";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { ToastProvider } from "./components/shared/ui_functions/ToastContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PrimeReactProvider>
        <ToastProvider>
          <App/>
        </ToastProvider>
      </PrimeReactProvider>
    </Provider>
  </BrowserRouter>
);
