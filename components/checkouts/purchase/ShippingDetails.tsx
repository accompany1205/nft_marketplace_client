import React from 'react';

import { Form } from 'formik';

import { cities, countries } from '../../../constants';
import { FormFieldLayout, FormLayout, ReactSelectFormField } from '../../forms';
import { shippingDetailsSchema } from '../../schema';
import { PurchaseForms } from './purchaseProps.type';
import { ShippingInformationProps } from './shippingInformationProps.type';

const ShippingDetails: React.FC<ShippingInformationProps> = ({
  onNextStep,
  purchaseDetails,
}) => {
  const handleSubmit = (input: any) => {
    const shipping = shippingDetailsSchema.cast(input, {
      assert: false,
      stripUnknown: true,
    });
    onNextStep({ ...purchaseDetails, shipping }, PurchaseForms.SUMMARY);
  };

  const initialValues = shippingDetailsSchema.cast(
    {},
    {
      assert: false,
      stripUnknown: true,
    },
  );

  return (
    <>
      <div className="heading">
        <h3>Shipping Information</h3>
      </div>
      <FormLayout
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={shippingDetailsSchema}
      >
        {(props) => (
          <Form>
            <div>
              <h6>Name</h6>
              <FormFieldLayout
                type="text"
                name="name"
                id="name"
                classes={{ field: 'form-control' }}
              />
            </div>
            <div>
              <h6>Address Line 1</h6>
              <FormFieldLayout
                type="text"
                name="addressLine1"
                id="address_line_1"
                classes={{ field: 'form-control' }}
              />
            </div>
            <div>
              <h6>Address Line 2</h6>
              <FormFieldLayout
                type="text"
                name="addressLine2"
                id="address_line_2"
                classes={{ field: 'form-control' }}
              />
            </div>
            <div>
              <h6>City/Region</h6>
              <ReactSelectFormField
                name="city"
                placeholder="Select City"
                options={cities.map((c) => ({ value: c, label: c }))}
                isSearchable={false}
              />
            </div>
            <div>
              <h6>Country</h6>
              <ReactSelectFormField
                name="country"
                placeholder="Select country"
                options={countries.map((c) => ({ value: c, label: c }))}
                isSearchable={false}
              />
            </div>
            <div>
              <h6>Post Code</h6>
              <FormFieldLayout
                type="text"
                name="postCode"
                id="post_code"
                classes={{ field: 'form-control' }}
              />
            </div>
            <button
              className="btn-main lead mb-5"
              type="submit"
              disabled={!props.isValid || props.isSubmitting}
            >
              Next
            </button>
          </Form>
        )}
      </FormLayout>
    </>
  );
};

export default ShippingDetails;
