import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DowgoDApp } from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DowgoDApp />
  </React.StrictMode>
);

reportWebVitals();
