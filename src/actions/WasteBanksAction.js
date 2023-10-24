import * as ACTION_TYPES from '@constants/ActionTypes';

export const GetWasteBanks = (list) => ({
  type: ACTION_TYPES.GET_WASTE_BANK,
  list: list,
});
export const GetWasteBanksItems = (items) => ({
  type: ACTION_TYPES.GET_WASTE_BANK_ITEMS,
  items: items,
});
export const GetWasteBanksDetails = (details) => ({
  type: ACTION_TYPES.GET_WASTE_BANK_DETAILS,
  details: details,
});
export const GetWasteBanksProduct = (product) => ({
  type: ACTION_TYPES.GET_WASTE_BANK_PRODUCT,
  product: product,
});
export const GetWasteBanksProductCategory = (productcategory) => ({
  type: ACTION_TYPES.GET_WASTE_BANK_PRODUCT_CATEGORY,
  productcategory: productcategory,
});
export const GetWasteBanksProductDetail = (productdetail) => ({
  type: ACTION_TYPES.GET_WASTE_BANK_PRODUCT_DETAIL,
  productdetail: productdetail,
});
export const GetWasteBanksSchedule = (schedule) => ({
  type: ACTION_TYPES.GET_WASTE_BANK_SCHEDULE,
  schedule: schedule,
});
export const GetWasteBanksScheduleDetail = (scheduledetail) => ({
  type: ACTION_TYPES.GET_WASTE_BANK_SCHEDULE_DETAIL,
  scheduledetail: scheduledetail,
});
export const SelectedCategory = (selectedCategory) => ({
  type: ACTION_TYPES.SELECTED_CATEGORY,
  selectedCategory: selectedCategory,
});
export const GetWasteBanksItemsActive = (itemsActive) => ({
  type: ACTION_TYPES.GET_WASTE_BANK_ITEMS_ACTIVE,
  itemsActive: itemsActive,
});
export const GetSummary = (payload) => ({
  type: ACTION_TYPES.GET_SUMMARY,
  summary: payload,
});
export const GetCompanyDashboard = (payload) => ({
  type: ACTION_TYPES.GET_COMPANY_DASHBOARD,
  dashboard: payload,
});
export const GetStock = (payload) => ({
  type: ACTION_TYPES.GET_STOCK,
  stock: payload,
});
