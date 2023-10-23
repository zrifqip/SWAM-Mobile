import * as ACTION_TYPES from "@constants/ActionTypes";

export const GetWasteBanksCustomers             = customers     => ({ type: ACTION_TYPES.GET_WASTE_BANK_CUSTOMERS, customers: customers })
export const GetWithdraw                        = withdraw      => ({ type: ACTION_TYPES.GET_WITHDRAW, withdraw: withdraw })