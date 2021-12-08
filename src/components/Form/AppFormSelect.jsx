import React from "react";
import { useFormikContext } from "formik";

export default function AppFormSelect({
  label,
  items,
  name,
  placeholder,
  hideErrorMessage = false,
  ...others
}) {
  const { errors, setFieldValue, values, touched } = useFormikContext();

  const showError = errors[name] && touched[name] && !hideErrorMessage;

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        className="mt-1 relative border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm block w-full pr-10 pl-3 py-2 text-base rounded-md"
        onChange={(event) => setFieldValue(name, event.target.value)}
        placeholder={placeholder}
        value={values[name]}
        {...others}
      >
        {items?.map((item, id) => (
          <option value={item.value} key={id}>
            {item.title}
          </option>
        ))}
      </select>
      <p className="mt-2 h-8 text-sm text-red-600" id={`${name}-error`}>
        {showError && errors[name]}
      </p>
    </div>
  );
}
