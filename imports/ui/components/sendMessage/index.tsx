import React from "react";
import "./send_message.css";

type SendMessageT = {
  chatId: string;
};
export default function SendMessage({ chatId }: SendMessageT) {
  const [messageText, setMessageText] = React.useState("");

  React.useEffect(()=>{
    document.getElementById("message-input")?.focus()
  },[])

  function sendMessage() {
    Meteor.call("send_message", chatId, messageText, (error) => {
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
          className="message-input"
          id="message-input"
          value={messageText}
          onChange={(e) => setMessageText(e.currentTarget.value)}
          onKeyUpCapture={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Your message here"
        />
      )}
    </div>
  );
}
