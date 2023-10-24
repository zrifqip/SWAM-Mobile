const initialState = {
  isLoggedIn: false,
  registered: false,
  isLoading: true,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        ...action.payload,
        token: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
        isLoading: false,
      };
    case "SIGN_UP":
      return {
        ...state,
        isLoggedIn: false,
        registered: true,
        isLoading: true,
        token: action.token,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isLoggedIn: false,
        isLoading: true,
        token: null,
        state: [],
      };
    default:
      return state;
  }
};
