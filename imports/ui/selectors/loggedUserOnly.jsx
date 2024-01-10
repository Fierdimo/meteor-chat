import React from "react";
import { useLoggedUser } from "meteor/quave:logged-user-react";
import { Navigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import Loader from "../components/loader";

export default function LoggedUserOnly({ children }) {
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();

  React.useEffect(() => {
    function detectVisibility() {
      if (document.visibilityState == "hidden") {
        Meteor.call("go_offline", (error) => {
          if (error) console.log(error.reason);
        });
      } else
        Meteor.call("go_online", (error) => {
          if (error) console.log(error.reason);
        });
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
