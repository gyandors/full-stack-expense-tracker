import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

export default function () {
  return (
    <main className="w-full min-h-dvh flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center mt-5 space-y-2">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Add an expense
          </h3>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <ExpenseForm />
        </div>

        <div>
          <ExpenseList />
        </div>
      </div>
    </main>
  );
}
