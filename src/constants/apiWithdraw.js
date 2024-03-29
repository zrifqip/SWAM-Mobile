import Axios from "axios";
import { base_uri } from "@constants/BASE_URL";

export const getWasteBanksCustomers = (payload) =>
  Axios.get(`${base_uri}company/customer?page=1&offset=` + payload);
export const getWasteBanksWithdraw = (payload) =>
  Axios.get(`${base_uri}company/withdraw`);
export const acceptWasteBanksWithdraw = (payload) =>
  Axios.patch(`${base_uri}company/withdraw?id=` + payload._id, payload.params);
export const getUsersWithdraw = (payload) =>
  Axios.get(`${base_uri}users/client/withdraw`);
export const createUsersWithdraw = (payload) =>
  Axios.post(`${base_uri}users/client/withdraw`, payload);
export const updateWasteBanksCustomer = (payload) =>{
  Axios.patch(`${base_uri}company/customer?id=` + payload.phoneNumber, payload.params);
}
export const getCustomerDetails = (payload) =>     
  Axios.get(`${base_uri}company/customer/detail/` + payload);
export const updateCustomer = (payload) =>     {
  console.log("Payload " + payload.params)
  Axios.patch(`${base_uri}company/customer/detail?id=` + payload._id, payload.params)
  Axios.patch(
    `${base_uri}company/customer/detail?id=` + payload._id,
    payload.params,
  );;
}