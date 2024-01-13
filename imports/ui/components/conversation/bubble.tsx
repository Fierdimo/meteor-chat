import React from "react";
import "./conversation.css";
import { imageSet } from "../../misc/imageSet";

type BubbleT = {
  data: {
    content: string;
    date: Date;
    user: string;
  };
};

export default function Bubble({ data }: BubbleT) {
  const { content, date, user } = data;
  const isMe = user === Meteor.userId();
  const [image, setImage] = React.useState<number>(0);

  React.useEffect(() => {
    Meteor.call("get_user_image", user, (error, image) =>
      error ? console.log(error.reason) : setImage(image)
    );
  }, []);

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
        <img src={imageSet[image]} className="image-bubble" />
      </div>
      <div
        className="container-bubble"
        style={{
          borderRadius: isMe ? "20px 20px 0px 20px" : "20px 20px 20px 0px",
          backgroundColor: isMe ? "#c5d86d" : "#4ba3c3",
        }}
      >
        <p className="message-bubble">{content}</p>
        <p className="date-bubble">{`${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `}</p>
      </div>
    </div>
  );
}
