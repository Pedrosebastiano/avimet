import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.html"
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
