import React from "react";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import ChatProvider from "./context/chatContext";

export function App() {
 
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <ChatProvider>
          <Router />
        </ChatProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}
