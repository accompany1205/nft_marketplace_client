import {
  Formik, FormikConfig, FormikProps, FormikValues,
} from 'formik';

type Props = FormikConfig<FormikValues>;

const FormLayout: React.FC<Props> = ({
  children,
  onSubmit,
  ...formikProps
}) => (
  <Formik
    onSubmit={async (input, actions) => {
      actions.setSubmitting(true);
      try {
        return await onSubmit(input, actions);
      } finally {
        actions.setSubmitting(false);
      }
    }}
    {...formikProps}
  >
    {(props: FormikProps<any>) => (!!children && typeof children === 'function' ? children(props) : children)}
  </Formik>
);
export default FormLayout;
