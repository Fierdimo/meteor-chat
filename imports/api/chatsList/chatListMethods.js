import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { chatListCollection } from "./chatListCollection";

Meteor.methods({
  start_chat_with(contact_id) {
    const users_ids = [contact_id, Meteor.userId()];
    var my_chat_id = "";
    users_ids.forEach((user_id) => {
      var chatListId = Meteor.call("get_user_chat_list_id", user_id);
      if (!chatListId) {
        chatListId = chatListCollection.insert({
          createdAt: new Date(),
          chats: [],
        });
        //add id of new chat to each user
        Meteor.call("set_chat_list", user_id, chatListId);
      }

      //add chat to personal list of chats
      const id = Random.id();
      if (user_id === Meteor.userId()) my_chat_id = id;
      const chat = {
        id,
        users_ids,
        visible: true, //active
        //TODO: add chat extra data
      };

      chatListCollection.update(
        { _id: chatListId },
        { $addToSet: { chats: chat } }
      );
    });
    return my_chat_id;
  },
  check_previous_conversation(contact_id) {
    const chatListId = Meteor.call("get_user_chat_list_id", Meteor.userId());
    if (chatListId) {
      return chatListCollection.findOne(
        {
          _id: chatListId,
          "chats.users_ids": contact_id,
        },
        {
          transform: (document) => {
            const previous_chat = document.chats.filter((chat) =>
              chat.users_ids.includes(contact_id)
            );
            return { chat_id: previous_chat[0].id };
          },
        }
      );
    } else return undefined;
  },
  archive_chat(chat_id) {
    const my_chats_id = Meteor.call("get_user_chat_list_id");
    return chatListCollection.update(
      { $and: [{ _id: my_chats_id }, { "chat.id": chat_id }] },
      { $set: { "chat.visible": false } } //inactive
    );
  },
  delete_chat(chat_id) {
    const my_chats_id = Meteor.call("get_user_chat_list_id");
    return chatListCollection.remove({
      $and: [{ _id: my_chats_id }, { "chat.id": chat_id }],
    });
  },
  my_chats_cursor() {
    const my_chats_id = Meteor.call("get_user_chat_list_id");
    chatListCollection.find({ _id: my_chats_id });
  },
});
