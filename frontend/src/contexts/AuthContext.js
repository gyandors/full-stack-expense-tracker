import { createContext } from "react";

export const authContext = createContext({
  loggedIn: false,
  login: () => {},
  loggedUser: {},
});
