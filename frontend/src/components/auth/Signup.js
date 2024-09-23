import Form from "./Form.js";
import GoogleLogo from "../../assets/googleLogo.js";

export default function Signup() {
  return (
    <main className="w-full h-dvh flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center mt-5 space-y-2">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Create an account
          </h3>
          <p>
            Already have an account?{" "}
            <a
              href="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </a>
          </p>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <Form />
          <div className="mt-5">
            <button className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
              <GoogleLogo />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
