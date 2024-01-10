import React from "react";
import { useLoggedUser } from "meteor/quave:logged-user-react";
import { Navigate } from "react-router-dom";
import Loader from "../components/loader";

export default function AnonimousOnly({ children }) {
  const { loggedUser, isLoadingLoggedUser } = useLoggedUser();

  if (isLoadingLoggedUser) return <Loader />;

  if (loggedUser) return <Navigate to="/" />;

  return children;
}