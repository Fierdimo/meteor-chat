import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { userDataCollection } from "./userDataCollection";


Meteor.methods({
  go_online(){
    Meteor.userId()
    return Meteor.users.update({ _id:Meteor.userId() }, { $set: { status: "online" } });
  },
  go_offline(){
    return Meteor.users.update({ _id:Meteor.userId() }, { $set: { status: "offline" } });
  },
  new_user({ email, password }, checkAccess) {
    Accounts.createUser({ email, password }, checkAccess);
  },
  update_image(image) {
    return Meteor.users.update({ _id:Meteor.userId() }, { $set: { image } });
  },
  add_chatroom_in_user(chat_id) {
    return Meteor.users.update({ _id:Meteor.userId() }, { $addToSet: { chatrooms: chat_id } });
  },
  remove_chatroom_in_user(chat_id) {
    return Meteor.users.update({ _id:Meteor.userId() }, { $pull: { chatrooms: chat_id } });
  },
  add_friend_in_user(friend_id) {
    return Meteor.users.update({ _id:Meteor.userId() }, { $addToSet: { friends: friend_id } });
  },
  remove_friend_in_user(friend_id) {
    return Meteor.users.update({ _id:Meteor.userId() }, { $pull: { friends: friend_id } });
  },
  remove_me() {
    return userDataCollection.remove({ _id:Meteor.userId() });
  },
  searchFriend(regexTerm) {
    return Meteor.users
      .find(
        { "emails.address": { $regex: regexTerm } },
        {
          fields: { emails: 1, image: 1 },
          transform: (document) => {
            return {
              email: document.emails[0].address,
              image: document.image,
              id: document._id,
            };
          },
        }
      )
      .fetch();
  },
});
