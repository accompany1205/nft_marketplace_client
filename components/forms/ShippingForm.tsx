import React, { useState } from "react";

import { ReactSelect } from "../reactSelect";

import { cities, countries } from "../../constants";
import { ShippingAddress, ShippingFormProps } from "./shippingFormProps.type";

const defaultValues: ShippingAddress = {
  name: "",
  addressLine1: "",
  city: "",
  country: "",
  postCode: "",
  addressLine2: "",
};

const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingAddress: initialValues,
  onClose,
  onSubmit,
}) => {
  const [shippingAddress, setShippingAddress] = useState({
    ...defaultValues,
    ...initialValues,
  });

  const handleOnChange = (key: string, value: string) => {
    setShippingAddress({ ...shippingAddress, [key]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(shippingAddress);
  };

  return (
    <div className="shipping">
      <div className="main-shipping">
        <button className="btn-close" onClick={() => onClose()}>
          x
        </button>
        <div className="heading">
          <h3>Shipping Information</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <h6>Name</h6>
            <input
              type="text"
              name="name"
              id="name"
              value={shippingAddress.name}
              onChange={(e) => handleOnChange("name", e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div>
            <h6>Address Line 1</h6>
            <input
              type="text"
              name="addressLine1"
              id="address_line_1"
              value={shippingAddress.addressLine1}
              onChange={(e) => handleOnChange("addressLine1", e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div>
            <h6>Address Line 2</h6>
            <input
              type="text"
              name="addressLine2"
              id="address_line_2"
              value={shippingAddress.addressLine2}
              onChange={(e) => handleOnChange("addressLine2", e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div>
            <h6>City/Region</h6>
            <div className="react-select">
              <ReactSelect
                options={cities.map((c) => ({ value: c, label: c }))}
                onChange={(value: string) => handleOnChange("city", value)}
                required
              />
            </div>
          </div>
          <div>
            <h6>Country</h6>
            <div className="react-select">
              <ReactSelect
                options={countries.map((c) => ({ value: c, label: c }))}
                onChange={(value: string) => handleOnChange("country", value)}
                required
              />
            </div>
          </div>
          <div>
            <h6>Post Code</h6>
            <input
              type="text"
              name="postCode"
              id="post_code"
              value={shippingAddress.postCode}
              onChange={(e) => handleOnChange("postCode", e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button className="btn-main lead mb-5" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingForm;
