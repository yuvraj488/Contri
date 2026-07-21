import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "@fontsource/manrope";

import "./styles/tailwind.css";
import "./styles/colors.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);