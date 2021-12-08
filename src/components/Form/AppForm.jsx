import React, { forwardRef, Fragment } from "react";
import { Formik } from "formik";

const AppForm = forwardRef(
  ({ initialValues, onSubmit, validationSchema, children }, ref) => {
    return (
      <Formik
        innerRef={ref}
        initialValues={initialValues || {}}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {() => <Fragment>{children}</Fragment>}
      </Formik>
    );
  }
);

export default AppForm;
