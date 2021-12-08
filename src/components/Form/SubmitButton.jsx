import React from "react";
import { useFormikContext } from "formik";

const SubmitButton = ({ title, submittingTitle, ...others }) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
    <button type="submit" onClick={() => handleSubmit()} {...others}>
      {isSubmitting ? submittingTitle ?? title : title}
    </button>
  );
};

export default SubmitButton;
