import React from "react";
import "./item_list.css";
import { useTracker } from "meteor/react-meteor-data";
import { imageSet } from "../../misc/imageSet";

type userItem = {
  userId: string | string[];
};

type MyContactData = {
  _id: string;
  emails: { adress: string; verified: boolean }[];
  profile: { name: string; subtitle: string };
  image: number;
  status: string;
};

function notMe(users_ids: string[]) {
  users_ids.filter((id, index, arr) => {
    if (id === Meteor.userId()) {
      arr.splice(index, 1);
      return true;
    }
    return false;
  });
  return users_ids[0];
}

export default function UserItemList({ userId }: userItem) {
  const contactData = useTracker(() => {
    const contactId = typeof userId === "string" ? userId : notMe(userId);
    Meteor.subscribe("contact", contactId);
    return Meteor.users.findOne(contactId);
  }) as unknown as MyContactData;

  return (
    <li className="user-list-item">
      <div
        className="shine"
        style={{
          filter: `drop-shadow(0 0 10px ${
            contactData?.status === "online" ? "#00ff2e" : "#0ac"
          }) saturate(2)`,
        }}
      >
        <a className="clip">
          <img src={imageSet[contactData?.image]} />
        </a>
      </div>
      <div className="list-item-content">
        <h4>{contactData?.profile?.name}</h4>
        <p>{contactData?.profile?.subtitle}</p>
      </div>
      <div className="list-item-signals"></div>
    </li>
  );
}
