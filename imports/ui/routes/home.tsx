import React from "react";
import { Meteor } from "meteor/meteor";

import "./styles/home.css";
import ChatList from "../components/chatsList";
import Conversation from "../components/conversation";
import SendMessage from "../components/sendMessage";
import { ChatContext } from "../context/chatContext";

export default function Home() {
  const { chatId } = React.useContext(ChatContext); 

  return (
    <div className="home-container">
      <header>
        <div>Home</div>
        <button onClick={() => Meteor.logout()}>log out</button>
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
