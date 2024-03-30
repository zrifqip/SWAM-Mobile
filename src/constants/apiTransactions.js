import Axios from "axios";
import { base_uri } from "@constants/BASE_URL";

export const createTransactionsWasteBank = (payload) =>
  Axios.post(`${base_uri}company/transaction`, payload);
export const getTransactionsUsers = (payload) =>
  Axios.get(`${base_uri}users/client/transaction/list`);
export const getTransactionsUsersDetail = (payload) =>
  Axios.get(`${base_uri}users/client/transaction?id=` + payload);
export const getTransactionsWasteBanks = (payload) =>
  Axios.get(`${base_uri}company/transaction/all?` + payload);
export const getTransactionsWasteBanksDetail = (payload) =>
  Axios.get(`${base_uri}company/transaction?id=` + payload);
export const getTransactionsSummary = (payload) =>
  Axios.get(`${base_uri}company/transaction/summary?` + payload);