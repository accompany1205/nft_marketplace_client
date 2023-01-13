const customStyles = {
  option: (base: any, state: any) => ({
    ...base,
    background: '#fff',
    color: '#333',
    borderRadius: state.isFocused ? '0' : 0,
    '&:hover': {
      background: '#eee',
    },
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
  }),
  menuList: (base: any) => ({
    ...base,
    padding: 0,
  }),
  control: (base: any, state: any) => ({
    ...base,
    padding: 2,
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
  }),
};
export default customStyles;
