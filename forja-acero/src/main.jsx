// src/main.jsx (o el archivo root que uses)

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Estilos globales primero
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// JS de Bootstrap (dropdowns, modals, etc.)
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Contextos
import { AuthProvider } from "./context/AuthContext";

// App principal
import App from "./app/App";

// Render
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
