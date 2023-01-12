import React, { useEffect } from "react";

import {
  ErrorMessage,
  Field,
  FieldAttributes,
  FieldProps,
  useFormikContext
} from "formik";

export interface FormFieldProps extends Partial<FieldAttributes<any>> {
  classes?: {
    field?: string;
    error?: string;
    container?: string;
  };
}

const FormFieldLayout: React.FC<FormFieldProps> = ({
  name,
  type = "text",
  renderError,
  children,
  classes,
  ...props
}) => {
  const { isSubmitting, setFieldTouched } = useFormikContext();

  useEffect(() => {
    if (isSubmitting) {
      setFieldTouched(name, true);
    }
  }, [isSubmitting]);

  return (
    <Field name={name}>
      {({ field, meta, ...formProps }: FieldProps<any>) => (
        <div className={classes?.container}>
          {!!children && typeof children === "function" ? (
            children({
              name,
              type,
              field,
              meta,
              classes,
              ...formProps,
              ...props,
            })
          ) : (
            <input
              {...props}
              id={name}
              type={type}
              className={classes?.field}
              {...field}
            />
          )}
          <ErrorMessage
            name={name}
            component="div"
            className={`error-message ${classes?.error}`}
          />
        </div>
      )}
    </Field>
  );
};

export default FormFieldLayout;
