import React from "react";
import { Meteor } from "meteor/meteor";

import "./styles/home.css"
import ChatList from "../components/chatsList";

export default function Home() {
  return (
    <div className="home-container">
      <header>
        <div>Home</div>
        <button onClick={() => Meteor.logout()}>log out</button>
      </header>
      <nav>
       <ChatList /> 
      </nav>
      <main>main</main>
      <footer>footer</footer>
    </div>
  );
}
