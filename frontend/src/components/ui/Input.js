import { forwardRef } from "react";

export default forwardRef(function Input(props, ref) {
  const { label, ...rest } = props;

  return (
    <div>
      <label className="font-medium" htmlFor={props.id}>
        {label}
      </label>
      <input
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
        ref={ref}
        {...rest}
      />
    </div>
  );
});
