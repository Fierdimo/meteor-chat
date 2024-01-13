import { Meteor } from "meteor/meteor";
import { ChatRoomsCollection } from "./chatRoomsCollection";

Meteor.publish("chatRooms", function (chat_id) {
  return ChatRoomsCollection.find(chat_id);
});