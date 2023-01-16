import * as Yup from 'yup';

export const bidDetailsSchema = Yup.object()
  .shape({
    price: Yup.number()
      .required()
      .transform((_, val) => parseFloat(val || "0"))
      .test("price", (d) => !!d && d > 0),
    quantity: Yup.number()
      .required()
      .min(1, "Quantity must be 1 or more.")
      .transform((_, val) => parseInt(val || "0")),
  })
  .required();

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
export default shippingDetailsSchema;
