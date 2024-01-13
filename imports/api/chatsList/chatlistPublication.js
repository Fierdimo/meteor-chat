import { Meteor } from "meteor/meteor";
import { chatListCollection } from "./chatListCollection";

Meteor.publish("chatList", function () {
  const my_list = Meteor.call("get_user_chat_list_id", Meteor.userId())
  return chatListCollection.find(my_list);
});