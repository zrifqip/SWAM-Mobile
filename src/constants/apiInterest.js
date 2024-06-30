import Axios from "axios";
import { base_uri } from "@constants/BASE_URL";

export const createInterest = (payload) =>
  Axios.post(`${base_uri}company/interest`, payload);
