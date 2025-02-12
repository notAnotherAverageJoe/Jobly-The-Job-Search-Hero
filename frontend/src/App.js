import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

import MyRoutes from "./routes-nav/MyRoutes.js";
import Nav from "./routes-nav/MyNav.js";
import UserContext from "./profile/UserContext";
import useLocalStorage from "./localStorage/useLocalStorage";
import JoblyApi from "./api/api";

/** Jobly application.

 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> MyRoutes
 */

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [applications, setApplications] = useState(null);
  const [token, setToken] = useLocalStorage(null);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);

  //Register new User
  async function registerUser(data) {
    const res = await JoblyApi.registerUser(data);
    setToken(res);

    setCurrentUser(res);
  }

  //Login User
  async function loginUser(data) {
    const res = await JoblyApi.loginUser(data);
    setToken(res);
    setCurrentUser(res);
  }

  //Update User
  async function updateUser(data) {
    const user = await JoblyApi.updateUser(currentUser.username, data);
    setCurrentUser(user);
  }

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.
  useEffect(() => {
    async function checkToken() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          JoblyApi.token = token;
          const user = await JoblyApi.getUser(username);
          setCurrentUser(user);
          setApplications(user.applications);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setUserInfoLoaded(true);
    }
    setUserInfoLoaded(false);
    checkToken();
  }, [token]);

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            currentUser,
            setCurrentUser,
            applications,
            setApplications,
            setToken,
            token,
            userInfoLoaded,
            setUserInfoLoaded,
            loginUser,
            registerUser,
            updateUser,
          }}
        >
          <Nav />
          <main>
            <MyRoutes />
          </main>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
