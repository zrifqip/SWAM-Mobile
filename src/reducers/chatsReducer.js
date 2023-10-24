const initialState = {
  chats: [],
  detail: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHATS':
      return {
        ...state,
        ...action.payload,
        chats: action.chats,
      };
    case 'CHATS_DETAIL':
      return {
        ...state,
        ...action.payload,
        detail: action.detail,
      };
    default:
      return state;
  }
};
