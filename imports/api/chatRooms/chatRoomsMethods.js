import { Meteor } from "meteor/meteor";
import { ChatRoomsCollection } from "./chatRoomsCollection";


Meteor.methods({
  add_chatroom_in_server({ contact, my_name }) {
    const _id = Meteor.userId();
    const users_ids = [_id, contact.id];
    return ChatRoomsCollection.insert({
      users_ids,
      messages: [],
      names: [contact.email.split("@", 1), my_name],
      createdAt: new Date(),
    });
  },
  thisChatExist(users_ids) {
    return ChatRoomsCollection.findOne({ users_ids: { $all: users_ids } });
  },
  send_message(chat_id, text) {
    const _id = Meteor.userId();
    const message = {
      text,
      user: _id,
      date: new Date(),
    };
    return ChatRoomsCollection.update(
      { _id: chat_id },
      { $push: { messages: message } }
    );
  },
  chats_list(id_list) {
    if (id_list)
      return ChatRoomsCollection.find(
        { _id: { $in: id_list } },
        { fields: { messages: 0 } }
      ).fetch();
  },
  remove_chatroom_in_server(chat_id) {
    const _id = Meteor.userId();
    ChatRoomsCollection.update({ _id: chat_id }, { $pull: { users_ids: _id } });
    const left_users = ChatRoomsCollection.findOne(
      { _id: chat_id },
      { users_ids: 1, _id: 0 }
    );
    if (left_users?.users_ids?.length == 0) ChatRoomsCollection.remove(chat_id);
  },
});
