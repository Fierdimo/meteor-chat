import React from "react";
import { useSnackbar } from "notistack";
import UserItemList from "../userItemList";
import { ChatType } from "../../selectors/types";
import { ChatContext } from "../../context/chatContext";

export default function SearchAContact() {
  const [userSearch, setUserSearch] = React.useState<string>("");
  const [userResults, setUserResults] = React.useState<ChatType[] | null>();
  const { setChatId } = React.useContext(ChatContext);
  const { enqueueSnackbar } = useSnackbar();

  function search() {
    if (!userSearch) {
      enqueueSnackbar("Introduce a search term", { variant: "warning" });
      return;
    }
    Meteor.call("search_friend", userSearch, function (error, results) {
      if (error) {
        enqueueSnackbar(error.reason, { variant: "error" });
        return;
      }
      if (!results.length)
        enqueueSnackbar("I can not find anyone", { variant: "info" });
      setUserResults(results);
    });
  }

  async function startConversation(contact_id: string | string[]) {
    if (contact_id === Meteor.userId()) {
      enqueueSnackbar("You can not Talk alone 😅", { variant: "info" });
      return;
    }
    const isPrevious = await Meteor.callAsync(
      "check_previous_conversation",
      contact_id
    );
    if (!isPrevious) {
      const newId = await Meteor.callAsync("start_chat_with", contact_id);
      Meteor.call("add_chatroom", contact_id, newId )
      setChatId(newId);
    } else setChatId(isPrevious.chat_id);
  }

  return (
    <div>
      <input
        value={userSearch}
        onChange={(e) => setUserSearch(e.currentTarget.value)}
        onKeyUpCapture={(e) => e.key === "Enter" && search()}
        autoFocus
      />
      <ul className="list">
        {userResults &&
          userResults.map((user) => {
            return (
              <div
                key={user.id}
                onClick={() => startConversation(user.users_ids)}
              >
                <UserItemList userId={user.users_ids} />
              </div>
            );
          })}
      </ul>
    </div>
  );
}
