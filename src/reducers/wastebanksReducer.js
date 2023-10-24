const initialState = {
  list: [],
  details: null,
  product: [],
  productSort: [],
  productdetail: null,
  schedule: [],
  scheduledetail: null,
  productcategory: [],
  items: [],
  selectedCategory: {
    _id: "",
    name: "",
  },
  itemsActive: [],
  summary: [],
  dashboard: [],
  stock: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_WASTE_BANK":
      return {
        ...state,
        ...action.payload,
        list: action.list,
      };
    case "GET_WASTE_BANK_DETAILS":
      return {
        ...state,
        ...action.payload,
        details: action.details,
      };
    case "GET_WASTE_BANK_ITEMS":
      return {
        ...state,
        ...action.payload,
        items: action.items,
      };
    case "GET_WASTE_BANK_ITEMS_ACTIVE":
      return {
        ...state,
        ...action.payload,
        itemsActive: action.itemsActive,
      };
    case "GET_WASTE_BANK_PRODUCT":
      let str = [];

      for (let i = 0; i < action.product.length; i++) {
        let ar = {
          Name: action.product[i].name,
        };

        const obj1 = action.product[i];
        const obj2 = ar;

        const mergedObject = { ...obj1, ...obj2 };

        str.push(mergedObject);
      }

      return {
        ...state,
        ...action.payload,
        product: action.product,
        productSort: str,
      };
    case "GET_WASTE_BANK_PRODUCT_DETAIL":
      return {
        ...state,
        ...action.payload,
        productdetail: action.productdetail,
      };
    case "GET_WASTE_BANK_SCHEDULE":
      return {
        ...state,
        ...action.payload,
        schedule: action.schedule,
      };
    case "GET_WASTE_BANK_SCHEDULE_DETAIL":
      return {
        ...state,
        ...action.payload,
        scheduledetail: action.scheduledetail,
      };
    case "GET_WASTE_BANK_PRODUCT_CATEGORY":
      return {
        ...state,
        ...action.payload,
        productcategory: action.productcategory,
      };
    case "GET_SUMMARY":
      return {
        ...state,
        ...action.payload,
        summary: action.summary,
      };
    case "GET_COMPANY_DASHBOARD":
      return {
        ...state,
        ...action.payload,
        dashboard: action.dashboard,
      };
    case "SELECTED_CATEGORY":
      return {
        ...state,
        ...action.payload,
        selectedCategory: action.selectedCategory,
      };
    case "GET_STOCK":
      return {
        ...state,
        ...action.payload,
        stock: action.stock,
      };
    default:
      return state;
  }
};
