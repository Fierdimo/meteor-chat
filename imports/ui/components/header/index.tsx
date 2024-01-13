import React from "react";
import Logo from "./logo";
import "./header.css";
import { Meteor } from "meteor/meteor";
import AddAContact from "./addAContact";
import Logout from "./logout";
import Modal from "../modal";
import SearchAContact from "../searchAContact";
import { goUserOffline } from "../../selectors/loggedUserOnly";
import { ChatContext } from "../../context/chatContext";

export default function Header() {
  const { setChatId } = React.useContext(ChatContext); 

  return (
    <div className="header-container">
      <div className="logo">
        <Logo />
        <p>My Chat💖</p>
      </div>
      <div className="actions">
        <Modal modalScreen={<SearchAContact />}>
          <div className="header-button">
            <AddAContact />
          </div>
        </Modal>

        <div
          className="header-button"
          onClick={() => {
            goUserOffline();
            Meteor.logout();
            setChatId(null)
          }}
        >
          <Logout />
        </div>
      </div>
    </div>
  );
}
