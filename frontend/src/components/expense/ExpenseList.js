import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ExpenseItem from "./ExpenseItem";
import { getExpense } from "../../reducers/expenseReducer";
import Alert from "../ui/Alert";

export default function ExpenseList({ idToken }) {
  const expenseItems = useSelector((state) => state.expense.expenseItems);

  const dispatch = useDispatch();

  const [error, setError] = useState();

  const fetchExpenses = useCallback(
    async function () {
      try {
        const response = await axios.get("http://localhost:4000/api/expense", {
          headers: { Authorization: idToken },
        });

        dispatch(getExpense(response.data));
      } catch (error) {
        console.error(error);
        if (error.response) {
          setError({ message: error.response.data });
        } else {
          setError({
            message: "Someting went wrong, try again after some time.",
          });
        }
      }
    },
    [dispatch, idToken]
  );

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <>
      <ul className="divide-y divide-gray-300">
        {expenseItems.map((e) => {
          return (
            <ExpenseItem
              key={e.id}
              id={e.id}
              amount={e.amount}
              description={e.description}
              category={e.category}
            />
          );
        })}
      </ul>
      {error && (
        <Alert message={error.message} closeError={() => setError(null)} />
      )}
    </>
  );
}
