import {
  GetWasteBanksCustomers,
  GetWithdraw,
  GetCustomerDetails,
} from "@actions";
import {
  getWasteBanksCustomers,
  updateWasteBanksCustomer,
  getWasteBanksWithdraw,
  acceptWasteBanksWithdraw,
  getUsersWithdraw,
  createUsersWithdraw,
  getCustomerDetails,
  updateCustomer,
} from "@constants/apiWithdraw";
import store from "@stores/store";
import usersUtils from "@utils/UsersUtils";

class WithdrawUtils {
  async getWasteBanksCustomers(params) {
    return await getWasteBanksCustomers(params)
      .then((response) => {
        const respon = response.data;

        if (respon.message == "success") {
          return store.dispatch(GetWasteBanksCustomers(respon.data));
        }
      })
      .catch((error) => {
        return 400;
      });
  }
  async updateWasteBanksCustomer(params) {
    return await updateWasteBanksCustomer(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return 200;
        }
      })
      .catch((error) => {
        console.error("Error updating Waste Banks customer:", error);
        return 400;
      });
  }
  async getWasteBanksWithdraw(params) {
    return await getWasteBanksWithdraw(params)
      .then((response) => {
        const respon = response.data;

        if (respon.status == "success") {
          store.dispatch(GetWithdraw(respon.data));
          return 200;
        }
      })
      .catch((error) => {
        return 400;
      });
  }

  async acceptWasteBanksWithdraw(params) {
    return await acceptWasteBanksWithdraw(params)
      .then((response) => {
        const respon = response.data;

        if (respon.status == "success") {
          this.getWasteBanksWithdraw();
          return 200;
        }
      })
      .catch((error) => {
        return 400;
      });
  }

  async getUsersWithdraw(params) {
    return await getUsersWithdraw(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          store.dispatch(GetWithdraw(respon.data));
          return 200;
        }
      })
      .catch((error) => {
        return 400;
      });
  }
  async getCustomerDetails(params) {
    try {
      const response = await getCustomerDetails(params);
      const respon = response.data;

      if (respon.status == "success") {
        store.dispatch(GetCustomerDetails(respon.data));
      } else {
        console.error("Failed to get customer details:", respon.message);
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  }
  async updateCustomer(params) {
    return (params = await updateCustomer(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          return 200;
        }
        console.log(response);
      })
      .catch((error) => {
        console.error("Error updating Waste Banks customer:", error);
        return 400;
      }));
  }
  async createUsersWithdraw(params) {
    return await createUsersWithdraw(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == "success") {
          usersUtils.usersDetail(params);
          this.getUsersWithdraw();
          return 200;
        }
      })
      .catch((error) => {
        return 400;
      });
  }
}

const withdrawUtils = new WithdrawUtils();

Object.freeze(withdrawUtils);

export default withdrawUtils;
