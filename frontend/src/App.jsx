import { useContext, useEffect } from "react";
import axios from "axios";

import { AuthContext } from "./contexts/AuthContext";
import Auth from "./components/auth/Auth";
import Expense from "./components/expense/Expense";
import Header from "./components/header/Header";
import Leaderboard from "./components/leaderboard/Leaderboard";
import ExpenseList from "./components/expense/ExpenseList";

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
      {loggedIn ? (
        <main className="min-h-dvh bg-gray-50 pt-16 sm:px-4">
          <div className="mb-6 flex flex-col sm:flex-row gap-6">
            <Expense />
            <Leaderboard />
          </div>

          <ExpenseList idToken={loggedUser.idToken} />
        </main>
      ) : (
        <Auth />
      )}
    </>
  );
}
