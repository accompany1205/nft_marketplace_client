import React from 'react';

import { ReactSelect, SelectProps } from '../reactSelect';
import FormFieldLayout, { FormFieldProps } from './FormFieldLayout';

interface Props extends FormFieldProps, SelectProps {}

export const formatValue = (value: any, options: any, isMulti = false) => {
  if (isMulti) {
    return (value || [])?.map((id: string) => options?.find((d: any) => d?.value === id));
  }
  return options?.find((d: any) => d?.value === value);
};

const ReactSelectFormField: React.FC<Props> = ({ name, label, ...props }) => (
  <FormFieldLayout name={name} label={label}>
    {({ field, form }: FormFieldProps) => {
      const value = formatValue(field?.value, props?.options, props?.isMulti);
      return (
        <ReactSelect
          {...props}
          value={value}
          onChange={(element: any) => {
            form?.setFieldValue(field.name, element);
            if (props?.onChange) props?.onChange(element);
          }}
          onBlur={() => form.setFieldTouched(field.name)}
        />
      );
    }}
  </FormFieldLayout>
);

export default ReactSelectFormField;
