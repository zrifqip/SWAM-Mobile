const initialState = {
  customers: [],
  withdraw: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_WASTE_BANK_CUSTOMERS":
      return {
        ...state,
        ...action.payload,
        customers: action.customers,
      };
    case "GET_WITHDRAW":
      return {
        ...state,
        ...action.payload,
        withdraw: action.withdraw,
      };
    default:
      return state;
  }
};
