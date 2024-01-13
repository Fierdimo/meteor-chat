import React from "react";

import "./chatList.css";
import MenuContextual from "../menuContextual";
import UserItemList from "../userItemList";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { chatListCollection } from "../../../api/chatsList/chatListCollection";

export default function ChatList() {
  const response = useTracker(() => {
    Meteor.subscribe("chatList");
    return chatListCollection.find().fetch();
  });

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
                <UserItemList userId={chat.users_ids} />
              </MenuContextual>
            );
          })}
      </ul>
    </div>
  );
}
