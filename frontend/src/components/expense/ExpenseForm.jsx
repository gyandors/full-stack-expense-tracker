import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import Input from "../ui/Input";
import Spinner from "../../assets/Spinner";
import { addExpense } from "../../reducers/expenseReducer";
import Alert from "../ui/Alert";

export default function ExpenseForm({ idToken }) {
  const amount = useRef();
  const description = useRef();
  const category = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const expenseData = {
      amount: amount.current.value,
      description: description.current.value,
      category: category.current.value,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/expense",
        expenseData,
        { headers: { Authorization: idToken } }
      );

      dispatch(addExpense(response.data));

      amount.current.value = "";
      description.current.value = "";
      category.current.value = "";
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
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="space-y-5">
        <Input type="number" id="amount" label="Amount" ref={amount} />
        <Input
          type="text"
          id="description"
          label="Description"
          ref={description}
        />
        <div>
          <label className="font-medium" htmlFor="category">
            Category
          </label>
          <select
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            id="category"
            ref={category}
          >
            <option value="" hidden></option>
            <option value="Food">Food</option>
            <option value="Loan">Loan</option>
            <option value="Education">Education</option>
            <option value="Grocery">Grocery</option>
          </select>
        </div>
        <button
          className={`w-full px-4 py-2 text-white font-medium flex justify-center items-center  rounded-lg duration-150
            ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600"
            }
          `}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner /> Loading...
            </>
          ) : (
            <span>Add</span>
          )}
        </button>
      </form>
      {error && (
        <Alert message={error.message} closeError={() => setError(null)} />
      )}
    </>
  );
}
