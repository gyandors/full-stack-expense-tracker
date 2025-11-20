import { useContext } from "react";

import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { AuthContext } from "../../contexts/AuthContext";

export default function Expense() {
  const authCtx = useContext(AuthContext);
  const idToken = authCtx.loggedUser.idToken;

  return (
    <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
      <h3 className="text-gray-800 text-center mt-4 text-2xl font-bold sm:text-3xl">
        Add an expense
      </h3>
      <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
        <ExpenseForm idToken={idToken} />
      </div>

      <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
        <ExpenseList idToken={idToken} />
      </div>
    </div>
  );
}
