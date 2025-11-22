import { useContext } from "react";

import ExpenseForm from "./ExpenseForm";
import { AuthContext } from "../../contexts/AuthContext";

export default function Expense() {
  const authCtx = useContext(AuthContext);
  const idToken = authCtx.loggedUser.idToken;

  return (
    <div className="w-full space-y-2 text-gray-600 sm:max-w-md">
      <h3 className="text-gray-500 mt-4 px-4 sm:px-0 font-bold text-xl">
        Add an expense
      </h3>
      <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
        <ExpenseForm idToken={idToken} />
      </div>
    </div>
  );
}
