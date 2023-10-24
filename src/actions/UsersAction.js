import * as ACTION_TYPES from "@constants/ActionTypes";

export const CurrentWaste = (currentwaste) => ({
  type: ACTION_TYPES.CURRENT_WASTE,
  currentwaste: currentwaste,
});
export const GetUsersDetail = (users) => ({
  type: ACTION_TYPES.GET_USERS_DETAIL,
  users: users,
});
export const GetCoordinate = (coordinate) => ({
  type: ACTION_TYPES.GET_USERS_COORDINATE,
  coordinate: coordinate,
});
export const GetAddress = (address) => ({
  type: ACTION_TYPES.GET_USERS_ADDRESS,
  address: address,
});
export const ResultCustomers = (customers) => ({
  type: ACTION_TYPES.RESULT_CUSTOMERS,
  customers: customers,
});
