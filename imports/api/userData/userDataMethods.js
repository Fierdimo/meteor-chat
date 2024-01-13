import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { userDataCollection } from "./userDataCollection";
import { Random } from "meteor/random";

Meteor.methods({
  go_online() {
    Meteor.userId();
    return Meteor.users.update(
      { _id: Meteor.userId() },
      { $set: { status: "online" } }
    );
  },
  go_offline() {
    return Meteor.users.update(
      { _id: Meteor.userId() },
      { $set: { status: "offline" } }
    );
  },
  new_user({ email, password }, checkAccess) {
    Accounts.createUser({ email, password }, checkAccess);
  },
  update_image(image) {
    return Meteor.users.update({ _id: Meteor.userId() }, { $set: { image } });
  },
  add_chatroom_in_user(chat_id) {
    return Meteor.users.update(
      { _id: Meteor.userId() },
      { $addToSet: { chatrooms: chat_id } }
    );
  },
  remove_chatroom_in_user(chat_id) {
    return Meteor.users.update(
      { _id: Meteor.userId() },
      { $pull: { chatrooms: chat_id } }
    );
  },
  add_friend_in_user(friend_id) {
    return Meteor.users.update(
      { _id: Meteor.userId() },
      { $addToSet: { friends: friend_id } }
    );
  },
  remove_friend_in_user(friend_id) {
    return Meteor.users.update(
      { _id: Meteor.userId() },
      { $pull: { friends: friend_id } }
    );
  },
  remove_me() {
    return userDataCollection.remove({ _id: Meteor.userId() });
  },
  search_friend(regexTerm) {
    return Meteor.users
      .find(
        { "emails.address": { $regex: regexTerm } },
        {
          fields: { _id: 1 },
          transform: (document) => {
            return {
              users_ids: document._id,
              id: Random.id(),
              visible: true,
            };
          },
        }
      )
      .fetch();
  },
  get_user_image(_id) {
    return Meteor.users({ _id }, { image: 1 }).image;
  },
  get_user_chat_list_id(user_id) {
    return Meteor.users.findOne(user_id, {
      fields: { chat_list_id: 1 },
    })?.chat_list_id;
  },
  set_chat_list(user_id, chat_list_id) {
    return Meteor.users.update({ _id: user_id }, { $set: { chat_list_id } });
  },
});
