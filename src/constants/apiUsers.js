import Axios from "axios";
import { base_uri } from "@constants/BASE_URL";

export const usersDetail            = payload => Axios.get(`${base_uri}users/client/profile`, payload)
export const usersUpdate            = payload => Axios.patch(`${base_uri}users/client/profile`, payload)
export const companyDetail          = payload => Axios.get(`${base_uri}company/profile`, payload)
export const companyUpdate          = payload => Axios.patch(`${base_uri}company/profile`, payload)