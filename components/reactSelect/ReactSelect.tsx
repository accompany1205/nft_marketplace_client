import { isArray, isUndefined, map } from 'lodash';
import Select, { type Props } from 'react-select';

import customStyles from './selectStyles';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<Props, 'onChange'> {
  onChange?: (v: unknown) => void;
}

export const handleSelectChange = (
  values: SelectOption[] | SelectOption,
  isMulti = false,
): string | string[] => {
  if (isUndefined(values) || !values) {
    return values;
  }

  if (isMulti && isArray(values)) {
    return map(values, 'value');
  }
  const { value: singleValue } = values as SelectOption;
  return singleValue;
};

const ReactSelect: React.FC<SelectProps> = ({ onChange, ...props }) => {
  const handleChange = (value: unknown): void => {
    if (onChange) {
      onChange(handleSelectChange(value as SelectOption[] | SelectOption, props?.isMulti));
    }
  };
  return (
    <Select
      styles={customStyles}
      menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
      onChange={handleChange}
      {...props}
    />
  );
};

export default ReactSelect;
