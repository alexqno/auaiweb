const reactSelectStyle = {
  option: provided => ({
    ...provided,
    color: '#5D636D',
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#F9FAFC',
    border: '1px solid #DEE2E6',
    boxShadow: '0 0 0 1px #DEE2E6',
  }),
};

export { reactSelectStyle };
