import { useContext } from "react";
import axios from "axios";

import { AuthContext } from "./contexts/AuthContext";
import Auth from "./components/auth/Auth";
import Expense from "./components/expense/Expense";
import Header from "./components/header/Header";
import { useEffect } from "react";

export default function App() {
  const { loggedIn, loggedUser, login, logout } = useContext(AuthContext);

  // Verify token and fetch user data on app load
  useEffect(() => {
    if (loggedIn) {
      axios
        .get("http://localhost:4000/api/user/data", {
          headers: {
            Authorization: loggedUser.idToken,
          },
        })
        .then((response) => {
          login({ ...response.data, idToken: loggedUser.idToken });
        })
        .catch((error) => {
          console.error(error);
          logout();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main className="w-full flex items-center justify-center bg-gray-50 mt-16 sm:px-4">
        {loggedIn ? <Expense /> : <Auth />}
      </main>
    </>
  );
}
