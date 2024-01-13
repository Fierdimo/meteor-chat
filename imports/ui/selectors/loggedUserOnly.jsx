import React from "react";
import { useLoggedUser } from "meteor/quave:logged-user-react";
import { Navigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import Loader from "../components/loader";

function goUserOnline() {
  Meteor.call("go_online", (error) => {
    if (error) console.log(error.reason);
  });
}

export function goUserOffline() {
  Meteor.call("go_offline", (error) => {
    if (error) console.log(error.reason);
  });
}

export default function LoggedUserOnly({ children }) {
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();

  React.useEffect(() => {
    function detectVisibility() {
      if (document.visibilityState == "hidden") {
        goUserOffline();
      } else goUserOnline();
    }

    if (loggedUser) {
      detectVisibility();
      document.addEventListener("visibilitychange", detectVisibility);
    } else document.removeEventListener("visibilitychange", detectVisibility);
  }, [loggedUser]);

  if (isLoadingLoggedUser) return <Loader />;

  if (!loggedUser) return <Navigate to="/access" />;

  return children;
}
