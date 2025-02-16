import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/barlow/300.css";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/700.css";
import "./global.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
