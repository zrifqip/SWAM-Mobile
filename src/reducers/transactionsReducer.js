const initialState = {
    transactions: [],
    details: [],
    items: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TRANS_USERS':
            return {
                ...state,
                ...action.payload,
                transactions: action.transactions,
            };
        case 'GET_TRANS_USERS_DETAILS':
            return {
                ...state,
                ...action.payload,
                details: action.details,
            };
        case 'GET_TRANS_ITEMS':
            return {
                ...state,
                ...action.payload,
                items: action.items,
            };
        default:
            return state
    }
}