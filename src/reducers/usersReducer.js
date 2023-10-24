const initialState = {
  users: [],
  coordinate: [],
  currentwaste: false,
  address: {
    country: "Indonesia",
    region: {
      province: "Jawa Timur",
      city: "Kediri",
    },
    district: "Kediri",
    street: "",
    postalCode: 64112,
    loc: {
      type: "Point",
      coordinates: [112.011864, -7.82284],
    },
  },
  customers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS_DETAIL":
      return {
        ...state,
        ...action.payload,
        users: action.users,
      };
    case "GET_USERS_COORDINATE":
      return {
        ...state,
        ...action.payload,
        coordinate: action.coordinate,
      };
    case "CURRENT_WASTE":
      return {
        ...state,
        ...action.payload,
        currentwaste: action.currentwaste,
      };
    case "GET_USERS_ADDRESS":
      return {
        ...state,
        ...action.payload,
        address: action.address,
      };
    case "RESULT_CUSTOMERS":
      return {
        ...state,
        ...action.payload,
        customers: action.customers,
      };
    default:
      return state;
  }
};
