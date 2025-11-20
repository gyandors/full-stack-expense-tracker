import { useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { DeleteIcon } from "../../assets/Icons";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteExpense } from "../../reducers/expenseReducer";

export default function ExpenseItem(props) {
  const { id, amount, description, category } = props;

  const authCtx = useContext(AuthContext);
  const idToken = authCtx.loggedUser.idToken;

  const dispatch = useDispatch();

  async function handleDeleteExpense() {
    const response = await axios.delete(
      `http://localhost:4000/api/expense/${id}`,
      {
        headers: { Authorization: idToken },
      }
    );

    console.log(response.data);

    dispatch(deleteExpense(id));
  }

  return (
    <li className="flex justify-between gap-x-6 p-2">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="font-semibold leading-6 text-gray-900">{category}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>
      <div className="shrink-0 flex flex-col items-end">
        <p className="font-semibold text-gray-900 pr-2">₹ {amount}</p>
        <button
          className="text-red-600 hover:bg-gray-300 p-2 rounded-full transition-all"
          onClick={handleDeleteExpense}
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
}
