import React from "react";

import "./styles/home.css";
import ChatList from "../components/chatsList";
import Conversation from "../components/conversation";
import SendMessage from "../components/sendMessage";
import { ChatContext } from "../context/chatContext";
import Header from "../components/header";

export default function Home() {
  const { chatId } = React.useContext(ChatContext); 

  return (
    <div className="home-container">
      <header>
        <div><Header /></div>        
      </header>
      <nav>
        <ChatList />
      </nav>
      <main>
        <Conversation chatId={chatId} key={chatId} />
      </main>
      <footer>
        <SendMessage chatId={chatId} />
      </footer>
    </div>
  );
}
