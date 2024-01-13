import React from "react";
import { useSubscribe, useFind, useTracker } from "meteor/react-meteor-data";

import Bubble from "./bubble";
import "./conversation.css";
import { ChatRoomsCollection } from "../../../api/chatRooms/chatRoomsCollection";

type ConversationT = {
  chatId: string;
};

type BubbleT = {
  content: string;
  date: Date;
  user: string;
};

export default function Conversation({ chatId }: ConversationT) {
  const conversation = useTracker(() => {
    Meteor.subscribe("chatRooms");
    return ChatRoomsCollection.find(chatId).fetch();
  });

  React.useEffect(() => {
    const endScroll = document.getElementById("endScroll");
    endScroll?.scrollIntoView({ behavior: "instant" });

    return(()=>Meteor.subscribe("chatRooms").stop())
  }, [conversation]);

  return (
    <>
      {chatId ? (
        <div id="conversation">
          {conversation.length > 0 &&
            conversation[0].messages.map((data, index) => {
              return <Bubble key={index} data={data as BubbleT} />;
            })}
          <div id="endScroll"></div>
        </div>
      ) : (
        <div>Selecciona un chat</div>
      )}
    </>
  );
}
