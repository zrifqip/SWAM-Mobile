import Axios from "axios";
import { base_uri } from "@constants/BASE_URL";

export const sendNotifCompany   = payload => Axios.post(`${base_uri}company/sendnotif`, payload)
export const sendNotifUser      = payload => Axios.post(`${base_uri}users/client/sendnotif`, payload)