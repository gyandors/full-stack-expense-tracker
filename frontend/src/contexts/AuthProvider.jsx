import { useState } from "react";
import { AuthContext } from "./AuthContext";

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

  function logout() {
    localStorage.removeItem("userData");
    setLoggedIn(false);
    setLoggedUser(null);
  }

  function setIsPremiumUser(value) {
    const updatedUser = { ...loggedUser, isPremiumUser: value };
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    setLoggedUser(updatedUser);
  }

  const value = {
    loggedIn,
    login,
    logout,
    loggedUser,
    setIsPremiumUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
