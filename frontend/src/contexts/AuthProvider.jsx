import { useState } from "react";
import { authContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("userData"));
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  function login(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
    setLoggedIn(true);
    setLoggedUser(userData);
  }

  const value = {
    loggedIn,
    login,
    loggedUser,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
