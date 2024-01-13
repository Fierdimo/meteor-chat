import React from "react";
import { useSubscribe, useFind } from "meteor/react-meteor-data";

import Bubble from "./bubble";
import "./conversation.css";
import { ChatRoomsCollection } from "../../../api/chatRooms/chatRoomsCollection";

type ConversationT = {
  chatId: string;
};

export default function Conversation({ chatId }: ConversationT) {
  const isLoading = useSubscribe("chatRooms");
  const conversation = useFind(() => {
    return ChatRoomsCollection.find(chatId);
  });

  React.useEffect(() => {
    const endScroll = document.getElementById("endScroll");
    endScroll?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <>
      {chatId ? (
        <div id="conversation">
          {conversation.length > 0 &&
            conversation.map((data, index) => {
              const message = {
                message: data.message,
                date: data.date,
                user: data.user,
              };

              return <Bubble key={index} data={message} />;
            })}
          <div id="endScroll"></div>
        </div>
      ) : (
        <div>Selecciona un chat</div>
      )}
    </>
  );
}
