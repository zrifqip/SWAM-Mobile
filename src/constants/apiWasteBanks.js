import Axios from 'axios';
import {base_uri} from '@constants/BASE_URL';

export const getWasteBanks = (payload) =>
  Axios.get(`${base_uri}users/client/company/all?page=1&limit=` + payload);
export const getWasteBanksDetails = (payload) =>
  Axios.get(`${base_uri}users/client/company?id=` + payload);
export const getWasteBanksItems = (payload) =>
  Axios.get(`${base_uri}users/client/company/item?id=` + payload);
export const getWasteBanksProduct = (payload) =>
  Axios.get(`${base_uri}company/item`, payload);
export const getWasteBanksProductCategory = (payload) =>
  Axios.get(`${base_uri}company/itemcategory`);
export const addWasteBanksProductCategory = (payload) =>
  Axios.post(`${base_uri}company/itemcategory`, payload);
export const updateWasteBanksProductCategory = (payload) =>
  Axios.patch(
    `${base_uri}company/itemcategory?id=` + payload._id,
    payload.params,
  );
export const addWasteBanksProduct = (payload) =>
  Axios.post(`${base_uri}company/item`, payload);
export const updateWasteBanksProduct = (payload) =>
  Axios.patch(`${base_uri}company/item?id=` + payload._id, payload.params);
export const deleteWasteBanksProduct = (payload) =>
  Axios.delete(`${base_uri}company/item?id=` + payload);
export const getWasteBanksProductDetail = (payload) =>
  Axios.get(`${base_uri}company/item/` + payload);
export const getWasteBanksSchedule = (payload) =>
  Axios.get(`${base_uri}company/schedule`);
export const addWasteBanksSchedule = (payload) =>
  Axios.post(`${base_uri}company/schedule`, payload);
export const updateWasteBanksSchedule = (payload) =>
  Axios.patch(`${base_uri}company/schedule?id=` + payload._id, payload.params);
export const deleteWasteBanksSchedule = (payload) =>
  Axios.delete(`${base_uri}company/schedule?id=` + payload);
export const getWasteBanksScheduleDetail = (payload) =>
  Axios.get(`${base_uri}company/schedule/` + payload);
export const getWasteBanksCompany = (payload) =>
  Axios.get(`${base_uri}company/list?page=1&limit=` + payload);
export const getWasteBanksCompanyItems = (payload) =>
  Axios.get(`${base_uri}company/list/item?id=` + payload);
export const getSummary = (payload) =>
  Axios.get(`${base_uri}company/item/summary?` + payload);
export const getCompanyDashboard = (payload) =>
  Axios.get(`${base_uri}company/dashboard?` + payload);
export const getStock = (payload) =>
  Axios.get(`${base_uri}company/stock?id=` + payload);
