import React from "react";
import "./send_message.css";

type SendMessageT = {
  chatId: string;
};
export default function SendMessage({ chatId }: SendMessageT) {
  const [messageText, setMessageText] = React.useState("");

  function sendMessage() {
    Meteor.call("sendMessage", chatId, messageText, (error) => {
      if (error) {
        console.log(error.reason);
        return;
      }
      setMessageText("");
    });
  }
  return (
    <div className="message-box">
      {chatId && (
        <input
          value={messageText}
          onChange={(e) => setMessageText(e.currentTarget.value)}
          onKeyUpCapture={(e) => e.key === "Enter" && sendMessage()}
        />
      )}
    </div>
  );
}
