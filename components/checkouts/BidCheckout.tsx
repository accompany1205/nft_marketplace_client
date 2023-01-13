import React from "react";

import { Form } from "formik";

import { useMakeBid } from "../../hooks";
import { FormFieldLayout, FormLayout } from "../forms";
import { BidCheckoutProps, OrderType } from "./checkoutProps.type";

const BidCheckout: React.FC<BidCheckoutProps> = ({
  product,
  onClose,
  orderType,
}) => {
  const { handleSubmit, initialValues, validationSchema, isLoading } =
    useMakeBid(
      { price: parseFloat(product.price), listing_id: product.id },
      orderType,
      onClose
    );

  return (
    <div className="checkout">
      <FormLayout
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        validateOnBlur
      >
        {({ values, isValid, isSubmitting }) => (
          <Form className="maincheckout">
            <button className="btn-close" onClick={() => onClose()}>
              x
            </button>
            <div className="heading">
              <h3>Place a {orderType === OrderType.ASK ? "Ask" : "Bid"}</h3>
            </div>
            <p>
              You are about to purchase a{" "}
              <span className="bold">{product.productName}&nbsp;</span>
              <span className="bold">from {product.owner.username}</span>
            </p>
            <div className="detailcheckout mt-4">
              <div className="listcheckout">
                <h6>Your bid</h6>
                <FormFieldLayout
                  type="number"
                  name="price"
                  id="price"
                  classes={{ field: "form-control" }}
                />
              </div>
            </div>
            <div className="detailcheckout mt-3">
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
            <div className="heading">
              <p>You will pay</p>
              <div className="subtotal">{values.price * values.quantity}</div>
            </div>
            <button
              className="btn-main lead mb-5"
              type="submit"
              disabled={!isValid || isSubmitting || isLoading}
            >
              Checkout
            </button>
          </Form>
        )}
      </FormLayout>
    </div>
  );
};

export default BidCheckout;
