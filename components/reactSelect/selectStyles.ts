import { CSSObjectWithLabel } from 'react-select';

const customStyles = {
  option: (base: CSSObjectWithLabel, state: any) => ({
    ...base,
    background: '#fff',
    color: '#333',
    borderRadius: state.isFocused ? '0' : 0,
    '&:hover': {
      background: '#eee',
    },
  }),
  menu: (base: CSSObjectWithLabel) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
  }),
  menuList: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: 0,
  }),
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    padding: 2,
  }),
  menuPortal: (provided: CSSObjectWithLabel) => ({
    ...provided,
    zIndex: 9999,
  }),
};
export default customStyles;
