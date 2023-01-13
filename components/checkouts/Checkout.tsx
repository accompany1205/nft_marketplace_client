import React from "react";

import { Form } from "formik";

import { FormFieldLayout, FormLayout } from "../forms";
import { bidDetailsSchema } from "../schema";
import { CheckoutProps } from "./checkoutProps.type";

const Checkout: React.FC<CheckoutProps> = ({
  product,
  onClose,
  onCheckout,
}) => {
  const initialValues = bidDetailsSchema.cast(
    {
      price: parseFloat(product.price),
      quantity: 1,
    },
    {
      assert: false,
      stripUnknown: true,
    }
  );

  return (
    <div className="checkout">
      <FormLayout
        onSubmit={({ price, quantity }) => onCheckout({ bid: price, quantity })}
        initialValues={initialValues}
        validationSchema={bidDetailsSchema}
      >
        {({ values, isValid, isSubmitting }) => (
          <Form className="maincheckout">
            <button
              className="btn-close"
              type="button"
              onClick={() => onClose()}
            >
              x
            </button>
            <div className="heading">
              <h3>Checkout</h3>
            </div>
            <p>
              You are about to purchase a{" "}
              <span className="bold">{product.productName}&nbsp;</span>
              <span className="bold">from {product.owner.username}</span>
            </p>
            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>
                  Enter quantity.
                  <span className="color">10 available</span>
                </h6>
                <FormFieldLayout
                  type="number"
                  name="quantity"
                  id="quantity"
                  classes={{ field: "form-control" }}
                />
              </div>
            </div>
            <div className="heading mt-3">
              <p>You will pay</p>
              <div className="subtotal">{values.price * values.quantity}</div>
            </div>
            <button
              className="btn-main lead mb-5"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Checkout
            </button>
          </Form>
        )}
      </FormLayout>
    </div>
  );
};

export default Checkout;
