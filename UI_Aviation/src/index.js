import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";

// PrimeReact CSS imports should come before your custom CSS
import "primereact/resources/themes/lara-light-indigo/theme.css";  // theme
import "primereact/resources/primereact.min.css";                  // core css
import "primeicons/primeicons.css";                                // icons

// Your custom CSS should come after PrimeReact CSS
import "./index.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./styles/primereact-custom.css";

import App from "./App";
import { store } from "./store/store.jsx";
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
