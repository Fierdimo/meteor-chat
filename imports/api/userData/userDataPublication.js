import { Meteor } from "meteor/meteor";
import { userDataCollection } from "./userDataCollection";

Meteor.publish("userData", function () {
  return userDataCollection.find({});
});
