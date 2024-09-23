export default function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin h-5 w-5 mr-3 text-white"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        strokeWidth="4"
        stroke="currentColor"
        r="10"
        cy="12"
        cx="12"
        className="opacity-50"
      ></circle>
      <path
        d="M4 12a8 8 0 018-8v8H4z"
        fill="currentColor"
        className="opacity-95"
      ></path>
    </svg>
  );
}
