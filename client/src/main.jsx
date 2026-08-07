import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import App from "./App";
import { AuthProvider } from "@/context/AuthContext";

import "@fontsource/manrope";
import "./styles/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <App />

        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 3000,

            style: {
              background: "#ffffff",
              color: "#1c1917",
              border: "1px solid #e5e5e5",
              borderRadius: "18px",
              padding: "16px",
              fontSize: "14px",
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.08)",
            },
          }}
        />

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);