import React from "react";
import "./conversation.css";

type BubbleT = {
  data: {
    image: string;
    message: string;
    date: Date;
    user: string;
  };
};

export default function Bubble({ data }: BubbleT) {
  const isMe = data.user === "me";
  return (
    <div
      id="chatBubble"
      className="chat-bubble"
      style={{
        flexDirection: isMe ? "row-reverse" : "row",
        justifyContent: isMe ? "right" : "left",
      }}
    >
      <div className="image-capsule">
        <img src={data.image} className="image-bubble" />
      </div>
      <div
        className="container-bubble"
        style={{
          borderRadius: isMe ? "20px 20px 0px 20px" : "20px 20px 20px 0px",
          backgroundColor: isMe ? "#c5d86d" : "#4ba3c3",
        }}
      >
        <p className="message-bubble">{data.message}</p>
        <p className="date-bubble">{`${data.date.getHours()}:${data.date.getMinutes()} ${data.date.getDate()}/${data.date.getMonth()}/${data.date.getFullYear()} `}</p>
      </div>
    </div>
  );
}
