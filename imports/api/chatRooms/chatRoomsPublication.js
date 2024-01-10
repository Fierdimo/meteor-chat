import { Meteor } from "meteor/meteor";
import { ChatRoomsCollection } from "./chatRoomsCollection";

Meteor.publish("chatRooms", function publishAllContacts() {
  return ChatRoomsCollection.find({});
});