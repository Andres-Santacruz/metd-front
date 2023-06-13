import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./contexts/UserContext.tsx";
import theme from "./theme/theme.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <App />
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
