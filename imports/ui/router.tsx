import React from 'react'
import { Routes, Route } from "react-router-dom";

import LoggedUserOnly from './selectors/loggedUserOnly';
import AnonimousOnly from './selectors/anonimousOnly';
import Home from './routes/home';
import Access from './routes/access';
import UpdateProfile from './routes/updateProfile';
import NotFound from './routes/notFound';

export default function Router() {
  return (
    <Routes>
      <Route
        element={
          <LoggedUserOnly>
            <Home />
          </LoggedUserOnly>
        }
        path="/"
      />
      <Route
        element={
          <LoggedUserOnly>
            <UpdateProfile />
          </LoggedUserOnly>
        }
        path="/updateProfile"
      />
      <Route
        element={
          <AnonimousOnly>
            <Access />
          </AnonimousOnly>
        }
        path="/access"
      />
      <Route element={<NotFound />} path="*" />
    </Routes>
  )
}
