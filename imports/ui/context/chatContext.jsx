import React from "react";

export const ChatContext = React.createContext();

export default function ChatProvider({ children }) {
  const [chatId, setChatId] = React.useState(null);

  return (
    <ChatContext.Provider value={{ chatId, setChatId }}>
      {children}
    </ChatContext.Provider>
  );
}
