import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

//userData
import "../imports/api/userData/userDataCollection";
import "../imports/api/userData/userDataMethods";
import "../imports/api/userData/userDataPublication";

Meteor.startup(async () => {
  Accounts.onCreateUser((_, user) => {
    user = { ...user, image: 0, chatrooms: [], friends: [], status: "online" };
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
  Meteor.publish("Meteor.users.chatrooms", function () {
    if (this.userId) {
      return Meteor.users.find(
        { _id: this.userId },
        {
          fields: { chatrooms: 1 },
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
  Meteor.publish("Meteor.users.friends", function () {
    if (this.userId) {
      return Meteor.users.find(
        { _id: this.userId },
        {
          fields: { friends: 1 },
        }
      );
    } else {
      this.ready();
    }
  });
});
