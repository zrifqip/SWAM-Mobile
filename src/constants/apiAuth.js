import Axios from "axios";
import { base_uri } from "@constants/BASE_URL";

export const signUpUsers = (payload) =>
  Axios.post(`${base_uri}users/client/register`, payload);
export const signUpWasteBank = (payload) =>
  Axios.post(`${base_uri}company/register`, payload);
export const signInUsers = (payload) =>
  Axios.post(`${base_uri}users/client/login`, payload);
export const signInUsersByPass = (payload) =>
  Axios.post(`${base_uri}users/client/loginbypass`, payload);
export const verifyOTP = (payload) =>
  Axios.post(`${base_uri}users/client/verify`, payload);
