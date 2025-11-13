import { useContext } from "react";

import { authContext } from "./contexts/AuthContext";
import Auth from "./components/auth/Auth";
import Expense from "./components/expense/Expense";

export default function App() {
  const authCtx = useContext(authContext);

  return <>{authCtx.loggedIn ? <Expense /> : <Auth />}</>;
}
