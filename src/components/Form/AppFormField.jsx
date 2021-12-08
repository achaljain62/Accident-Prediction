import React from "react";
import { useFormikContext } from "formik";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import clsx from "clsx";

const AppFormField = ({
  name,
  label,
  multiline = false,
  hideErrorMessage = false,
  rightIcon: RightIcon,
  onRightIconClick,
  containerStyle,
  containerProps,
  errorProps,
  ...otherProps
}) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();

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
      <div className="mt-1 relative rounded-md shadow-sm">
        {!multiline && (
          <input
            type={name}
            name={name}
            id={name}
            className={clsx(
              "pr-10 block w-full focus:outline-none sm:text-sm rounded-md",
              {
                "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500":
                  showError,
              }
            )}
            value={values[name]}
            onChange={handleChange(name)}
            onBlur={() => setFieldTouched(name)}
            {...otherProps}
          />
        )}
        {!RightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {showError && (
              <HiOutlineExclamationCircle
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            )}
            {!errors[name] && (
              <HiOutlineCheckCircle
                className="h-5 w-5 text-green-500"
                aria-hidden="true"
              />
            )}
          </div>
        )}
        {!!RightIcon && (
          <button
            onClick={onRightIconClick}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <RightIcon className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>
      <p className="mt-2 h-8 text-sm text-red-600" id={`${name}-error`}>
        {showError && errors[name]}
      </p>
    </div>
  );
};

export default AppFormField;
