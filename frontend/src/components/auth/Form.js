import { useRef, useState } from "react";
import axios from "axios";

import Spinner from "../../assets/spinner";
import Alert from "../modals/Alert";

export default function () {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/user/signup",
        userData
      );

      console.log(response);
      if (response) alert("Account created");

      firstName.current.value = "";
      lastName.current.value = "";
      email.current.value = "";
      password.current.value = "";
    } catch (error) {
      console.error(error);
      setError({ message: error.response.data });
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="space-y-5">
        <div className="flex gap-4">
          <div>
            <label className="font-medium" htmlFor="firstName">
              First name
            </label>
            <input
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              type="text"
              id="firstName"
              ref={firstName}
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="lastName">
              Last name
            </label>
            <input
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              type="text"
              id="lastName"
              ref={lastName}
            />
          </div>
        </div>
        <div>
          <label className="font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            type="email"
            id="email"
            ref={email}
          />
        </div>
        <div>
          <label className="font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            type="password"
            id="password"
            ref={password}
          />
        </div>
        <button
          className="w-full px-4 py-2 text-white font-medium flex justify-center items-center bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner /> Loading...
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>
      {error && (
        <Alert message={error.message} closeError={() => setError(null)} />
      )}
    </>
  );
}
