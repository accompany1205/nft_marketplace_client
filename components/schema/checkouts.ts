import * as Yup from "yup";

export const shippingDetailsSchema = Yup.object()
  .shape({
    name: Yup.string().required().ensure(),
    addressLine1: Yup.string().required().ensure(),
    addressLine2: Yup.string(),
    city: Yup.string().required().ensure(),
    country: Yup.string().required().ensure(),
    postCode: Yup.string().required().ensure(),
  })
  .required();
