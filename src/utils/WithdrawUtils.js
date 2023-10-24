import { GetWasteBanksCustomers, GetWithdraw } from "@actions";
import {
  getWasteBanksCustomers,
  getWasteBanksWithdraw,
  acceptWasteBanksWithdraw,
  getUsersWithdraw,
  createUsersWithdraw,
} from "@constants/apiWithdraw";
import store from "@stores/store";
import usersUtils from "@utils/UsersUtils";

class WithdrawUtils {
  async getWasteBanksCustomers(params) {
    return await getWasteBanksCustomers(params)
      .then((response) => {
        const respon = response.data;

        if (respon.message == "success") {
          store.dispatch(GetWasteBanksCustomers(respon.data));
          return 200;
        }
      })
      .catch((error) => {
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
