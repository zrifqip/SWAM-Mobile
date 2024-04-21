import {
  getWasteBanks,
  getWasteBanksDetails,
  getWasteBanksItems,
  getWasteBanksProduct,
  addWasteBanksProduct,
  addWasteBanksProductCategory,
  updateWasteBanksProductCategory,
  getWasteBanksProductCategory,
  getWasteBanksProductDetail,
  updateWasteBanksProduct,
  deleteWasteBanksProduct,
  getWasteBanksSchedule,
  addWasteBanksSchedule,
  updateWasteBanksSchedule,
  deleteWasteBanksSchedule,
  getWasteBanksScheduleDetail,
  getWasteBanksCompany,
  getWasteBanksCompanyItems,
  getSummary,
  getCompanyDashboard,
  getStock,
} from "@constants/apiWasteBanks";
import {
  GetWasteBanks,
  GetWasteBanksDetails,
  GetWasteBanksItems,
  GetWasteBanksProduct,
  GetWasteBanksProductCategory,
  GetWasteBanksProductDetail,
  GetWasteBanksSchedule,
  GetWasteBanksScheduleDetail,
  GetSummary,
  GetCompanyDashboard,
  GetStock,
} from "@actions";
import { base_uri } from "@constants/BASE_URL";
import store from "@stores/store";
import MMKVStorage from "react-native-mmkv-storage";
import Axios from "axios";
const AxiosForms = Axios.create();

class WasteBanksUtils {
  async getWasteBanks(params) {
    return (params = await getWasteBanks(params)
      .then((response) => {
        const respon = response.data;

        if (respon.status == "success") {
          return store.dispatch(GetWasteBanks(respon.data));
        }
      })
      .catch((error) => {
        // showToast('Data tidak dtemukan')
        return 400;
      }));
  }

  async getWasteBanksDetails(params) {
    return (params = await getWasteBanksDetails(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          let arr = respon.data[0];

          arr.scheduleActive = arr.schedule.length == 0 ? "" : arr.schedule[0];
          arr.serviceActive = arr.companyService[0];
          arr.itemActive = [];

          this.getWasteBanksItems(params);

          return store.dispatch(GetWasteBanksDetails(respon.data[0]));
        }
      })
      .catch((error) => {
        // showToast('Data tidak dtemukan')
        return 400;
      }));
  }

  async getWasteBanksItems(params) {
    return (params = await getWasteBanksItems(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return store.dispatch(GetWasteBanksItems(respon.data));
        }
      })
      .catch((error) => {
        // showToast('Data tidak dtemukan')
        return 400;
      }));
  }

  // CATEGORY PRODUCT
  async getWasteBanksProductCategory(params) {
    return (params = await getWasteBanksProductCategory(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return store.dispatch(GetWasteBanksProductCategory(respon.data));
        }
      })
      .catch((error) => {
        // showToast('Data tidak dtemukan')
        return 400;
      }));
  }

  async addWasteBanksProductCategory(params) {
    return (params = await addWasteBanksProductCategory(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          this.getWasteBanksProductCategory();
          return 200;
        }
      })
      .catch((error) => {
        // showToast('Data tidak dtemukan')
        return 400;
      }));
  }

  async updateWasteBanksProductCategory(params) {
    return (params = await updateWasteBanksProductCategory(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          this.getWasteBanksProductCategory();
          return 200;
        }
      })
      .catch((error) => {
        alert(JSON.stringify(error));
        // return 400
      }));
  }

  // PRODUCT
  async getWasteBanksProduct(params) {
    return (params = await getWasteBanksProduct(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return store.dispatch(GetWasteBanksProduct(respon.data));
        }
      })
      .catch((error) => {
        // showToast('Data tidak dtemukan')
        return 400;
      }));
  }

  async getWasteBanksProductDetail(params) {
    return (params = await getWasteBanksProductDetail(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return store.dispatch(GetWasteBanksProductDetail(respon.data));
        }
      })
      .catch((error) => {
        // showToast('Data tidak dtemukan')
        return 400;
      }));
  }

  async addWasteBanksProduct(params) {
    return (params = await addWasteBanksProduct(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return respon.data._id;
        }
      })
      .catch((error) => {
        return 400;
      }));
  }

  async updateWasteBanksProduct(params) {
    return (params = await updateWasteBanksProduct(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return 200;
        }
      })
      .catch((error) => {
        return 400;
      }));
  }

  async deleteWasteBanksProduct(params) {
    return (params = await deleteWasteBanksProduct(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          this.getWasteBanksProduct();
          return 200;
        }
      })
      .catch((error) => {
        return 400;
      }));
  }

  async updatePhotoWasteBanksProduct(photo, id) {
    const storage = new MMKVStorage.Loader().initialize();
    const session = await storage.getItem("token");

    const formData = new FormData();
    formData.append("images", photo);

    let api = `${base_uri}company/item?id=` + id;

    AxiosForms({
      url: api,
      method: "PATCH",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Gosnix ${session}`,
      },
    })
      .then(function (response) {})
      .catch(function (error) {});
  }

  // SCHEDULE
  async getWasteBanksSchedule(params) {
    return (params = await getWasteBanksSchedule(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return store.dispatch(GetWasteBanksSchedule(respon.data));
        }
      })
      .catch((error) => {
        return 400;
      }));
  }

  async getWasteBanksScheduleDetail(params) {
    return (params = await getWasteBanksScheduleDetail(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          let data = respon.data;
          data._id = params;
          return store.dispatch(GetWasteBanksScheduleDetail(data));
        }
      })
      .catch((error) => {
        return 400;
      }));
  }

  async addWasteBanksSchedule(params) {
    return (params = await addWasteBanksSchedule(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          this.getWasteBanksSchedule();
          return 200;
        }
      })
      .catch((error) => {
        return 400;
      }));
  }
  async CreateInterest(params) {
    return (params = await createWasteBankInterest(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return 200;
        }
      })
      .catch((error) => {
        return 400;
      }));
    }
  async updateWasteBanksSchedule(params) {
    return (params = await updateWasteBanksSchedule(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          this.getWasteBanksSchedule();
          return 200;
        }
      })
      .catch((error) => {
        return 400;
      }));
  }

  async deleteWasteBanksSchedule(params) {
    return (params = await deleteWasteBanksSchedule(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          this.getWasteBanksSchedule();
          return 200;
        }
      })
      .catch((error) => {
        return 400;
      }));
  }

  //COMPANY
  async getWasteBanksCompany(params) {
    return (params = await getWasteBanksCompany(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          store.dispatch(GetWasteBanks(respon.data));
          return respon.data.length;
        }
      })
      .catch((error) => {
        // showToast('Data tidak dtemukan')
        return 400;
      }));
  }

  async getWasteBanksCompanyItems(params) {
    return (params = await getWasteBanksCompanyItems(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return store.dispatch(GetWasteBanksItems(respon.data));
        }
      })
      .catch((error) => {
        // showToast('Data tidak dtemukan')
        return 400;
      }));
  }

  async getSummary(params) {
    return (params = await getSummary(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return store.dispatch(GetSummary(respon.data));
        }
      })
      .catch((error) => {
        return 400;
      }));
  }

  async getCompanyDashboard(params) {
    return (params = await getCompanyDashboard(params)
      .then((response) => {
        const respon = response.data;

        if (respon.status == "success") {
          return store.dispatch(GetCompanyDashboard(respon.data));
        }
      })
      .catch((error) => {
        return 400;
      }));
  }

  async getStock(params) {
    return (params = await getStock(params)
      .then((response) => {
        const respon = response.data;

        if (respon.status == "success") {
          return store.dispatch(GetStock(respon.data));
        }
      })
      .catch((error) => {
        return 400;
      }));
  }
}

const wasteBanksUtils = new WasteBanksUtils();

Object.freeze(wasteBanksUtils);

export default wasteBanksUtils;
