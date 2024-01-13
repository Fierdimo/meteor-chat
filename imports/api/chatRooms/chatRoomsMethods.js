import { Meteor } from "meteor/meteor";
import { ChatRoomsCollection } from "./chatRoomsCollection";


Meteor.methods({
  add_chatroom({ contact_id, chat_id }) {
    const users_ids = [contact_id, Meteor.userId()];
    return ChatRoomsCollection.insert({
      _id: chat_id,
      users_ids,
      messages: [],
      createdAt: new Date(),
    });
  },
  send_message(_id, content) {
    const message = {
      content,
      user: Meteor.userId(),
      date: new Date(),
    };
    return ChatRoomsCollection.update(
      { _id },
      { $push: { messages: message } }
    );
  },
  remove_chatroom_(chat_id) {
    const _id = Meteor.userId();
    ChatRoomsCollection.update({ _id: chat_id }, { $pull: { users_ids: _id } });
    const left_users = ChatRoomsCollection.findOne(
      { _id: chat_id },
      { users_ids: 1, _id: 0 }
    );
    if (left_users?.users_ids?.length == 0) ChatRoomsCollection.remove(chat_id);
  },
});
