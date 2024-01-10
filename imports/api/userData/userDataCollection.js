import { Mongo } from "meteor/mongo";

export const userDataCollection = new Mongo.Collection("userData");