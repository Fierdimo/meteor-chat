import React from "react";

import "./chatList.css";
import MenuContextual from "../menuContextual";
import UserItemList from "../userItemList";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { chatListCollection } from "../../../api/chatsList/chatListCollection";
import { ChatContext } from "../../context/chatContext";
import { PlatformContext } from "../../context/platformContext";
import Modal from "../modal";
import Conversation from "../conversation";
import SendMessage from "../sendMessage";

export default function ChatList() {
  const response = useTracker(() => {
    Meteor.subscribe("chatList");
    return chatListCollection.find().fetch();
  });
  const { setChatId } = React.useContext(ChatContext);
  const { isMobile } = React.useContext(PlatformContext);

  const menu = [
    {
      label: "Abrir conversacion",
      action: (label) => console.log(label),
    },
    {
      label: "Archivar conversación",
      action: (label) => console.log(label),
    },
    {
      label: "Invitar a alguien",
      action: (label) => console.log(label),
    },
  ];

  return (
    <div className="list-wrapper">
      <ul className="list">
        {response.length > 0 &&
          response[0].chats.map((chat) => {
            return (
              <MenuContextual key={chat.id} menu={menu}>
                {isMobile ? (
                  <Modal
                    modalScreen={
                      <>
                        <Conversation chatId={chat.id} />
                        <SendMessage chatId={chat.id} />
                      </>
                    }
                  >
                    <UserItemList userId={chat.users_ids} />
                  </Modal>
                ) : (
                  <div onClick={() => setChatId(chat.id)}>
                    <UserItemList userId={chat.users_ids} />
                  </div>
                )}
              </MenuContextual>
            );
          })}
      </ul>
    </div>
  );
}
