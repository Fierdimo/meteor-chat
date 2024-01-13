import React from "react";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import ChatProvider from "./context/chatContext";
import PlatformProvider from "./context/platformContext";

export function App() {
  return (
    <BrowserRouter>
      <PlatformProvider>
        <SnackbarProvider>
          <ChatProvider>
            <Router />
          </ChatProvider>
        </SnackbarProvider>
      </PlatformProvider>
    </BrowserRouter>
  );
}
