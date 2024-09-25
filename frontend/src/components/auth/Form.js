import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import Spinner from "../../assets/Spinner";
import Alert from "../ui/Alert";
import Input from "../ui/Input";
import { authContext } from "../../contexts/AuthContext";

export default function ({ login }) {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();

  const authCtx = useContext(authContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (login) {
      const userData = {
        email: email.current.value,
        password: password.current.value,
      };

      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:4000/user/signin",
          userData
        );

        if (response) {
          authCtx.login(response.data);
        }

        email.current.value = "";
        password.current.value = "";
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
    } else {
      const userData = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:4000/user/signup",
          userData
        );

        if (response) {
          authCtx.login(response.data);
        }

        firstName.current.value = "";
        lastName.current.value = "";
        email.current.value = "";
        password.current.value = "";
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
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="space-y-5">
        {!login && (
          <div className="flex gap-4">
            <Input
              type="text"
              id="firstName"
              label="First Name"
              ref={firstName}
            />
            <Input type="text" id="lastName" label="Last Name" ref={lastName} />
          </div>
        )}
        <Input type="email" id="email" label="Email" ref={email} />
        <Input type="password" id="password" label="Password" ref={password} />
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
            <span>{login ? "Login" : "Create account"}</span>
          )}
        </button>
      </form>
      {error && (
        <Alert message={error.message} closeError={() => setError(null)} />
      )}
    </>
  );
}
