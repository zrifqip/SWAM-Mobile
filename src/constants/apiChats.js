import Axios from "axios";
import { base_uri } from "@constants/BASE_URL";

export const chatsCompany           = payload => Axios.get(`${base_uri}company/chat`, payload)
export const chatsCompanyDetail     = payload => Axios.get(`${base_uri}company/chat?id=` + payload)
export const chatsCompanyStart      = payload => Axios.post(`${base_uri}company/startchat`, payload)