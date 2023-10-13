import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./store";

import "./index.scss";

const BaseUrl = (window as any).config.BUILD_NAME;
const BaseName = `/${BaseUrl}`;
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <BrowserRouter basename={BaseName}>
    <React.StrictMode>
      <React.Suspense fallback={<>Teste</>}>
        <Provider store={store}>
          <App />
        </Provider>
      </React.Suspense>
    </React.StrictMode>
  </BrowserRouter>
);
