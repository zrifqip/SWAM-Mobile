import * as ACTION_TYPES from "@constants/ActionTypes";

export const GetTransactionsUsers = (transactions) => ({
  type: ACTION_TYPES.GET_TRANS_USERS,
  transactions: transactions,
});
export const GetTransactionsUsersDetail = (details) => ({
  type: ACTION_TYPES.GET_TRANS_USERS_DETAILS,
  details: details,
});
export const GetTransactionsItems = (items) => ({
  type: ACTION_TYPES.GET_TRANS_ITEMS,
  items: items,
});
