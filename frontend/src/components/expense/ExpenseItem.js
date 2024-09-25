export default function ExpenseItem(props) {
  const { amount, description, category } = props;

  return (
    <li className="flex justify-between gap-x-6 p-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {category}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>
      <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{amount}</p>
      </div>
    </li>
  );
}
