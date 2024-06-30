const initialState = {
  customers: [],
  withdraw: [],
  customerDetail: null,
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
    case "GET_CUSTOMER_DETAIL":
      return {
        ...state,
        ...action.payload,
        customerDetail: action.customerDetail,
      };
    default:
      return state;
  }
};
