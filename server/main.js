import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

//userData
import "../imports/api/userData/userDataCollection";
import "../imports/api/userData/userDataMethods";
import "../imports/api/userData/userDataPublication";

//chatList
import "../imports/api/chatsList/chatListCollection";
import "../imports/api/chatsList/chatListMethods";
import "../imports/api//chatsList/chatlistPublication";


Meteor.methods({
  userFriends() {
    return Meteor.user({ fields: { friends: 1 } }).friends;
  },
  user_chats() {
    return Meteor.user({ fields: { chatrooms: 1 } }).chatrooms;
  },
});

Meteor.startup(async () => {
  Accounts.onCreateUser((_, user) => {
    const profile = {
      name: user.emails[0].address.split("@", 1)[0],
      subtitle: "New user",
    };
    user = {
      ...user,
      image: 0,
      chatrooms: [],
      friends: [],
      status: "online",
      profile,
    };
    return user;
  });
  Meteor.publish("Meteor.users.image", function () {
    if (this.userId) {
      return Meteor.users.find(
        { _id: this.userId },
        {
          fields: { image: 1 },
        }
      );
    } else {
      this.ready();
    }
  });

  Meteor.publish("Meteor.users.status", function () {
    if (this.userId) {
      return Meteor.users.find(
        { _id: this.userId },
        {
          fields: { status: 1 },
        }
      );
    } else {
      this.ready();
    }
  });
  Meteor.publish("contact", function ( contact_id) {
    if (this.userId) {
      return Meteor.users.find(
        { _id: contact_id },
        {
          fields: { image: 1, profile: 1, status: 1 },
        }
      );
    } else {
      this.ready();
    }
  });
  Meteor.publish("userChatRooms", function () {
    if (this.userId) {
      return Meteor.callAsync("my_chats_cursor");
    } else {
      this.ready();
    }
  });
});
