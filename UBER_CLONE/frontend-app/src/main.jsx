import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import  SocketProvider  from "./context/SocketProvider.jsx";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptainContext>
      <UserContext>
      <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </SocketProvider>
      </UserContext>
    </CaptainContext>
  </StrictMode>
);
