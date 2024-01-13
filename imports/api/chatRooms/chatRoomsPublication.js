import { Meteor } from "meteor/meteor";
import { ChatRoomsCollection } from "./chatRoomsCollection";

Meteor.publish("chatRooms", function () {
  return ChatRoomsCollection.find({users_ids: Meteor.userId()});
});