import {
  signInUsers,
  signUpUsers,
  signUpWasteBank,
  verifyOTP,
  signInUsersByPass,
} from '@constants/apiAuth';
import {showToast} from '@constants';
import {SignIn} from '@actions';
import store from '@stores/store';
import usersUtils from '@utils/UsersUtils';
import MMKVStorage from 'react-native-mmkv-storage';
import AsyncStorage from '@react-native-community/async-storage';

class AuthUtils {
  storage = new MMKVStorage.Loader().initialize();

  async signInUsers(params) {
    return (params = await signInUsers(params)
      .then((response) => {
        const respon = response.data;

        if (respon.status == 'success') {
          return 200;
        } else {
          showToast(respon.message);
          return 400;
        }
      })
      .catch((error) => {
        showToast('Pengguna tidak ditemukan');
        return 400;
      }));
  }

  async verifyOTP(params) {
    return (params = await verifyOTP(params)
      .then((response) => {
        const respon = response.data;
        if (respon.status == 'success') {
          this.storage.setItem('token', respon.data.token);

          AsyncStorage.setItem('role', respon.data.role);

          store.dispatch(SignIn(respon.data.token));

          if (respon.data.role == 'user') {
            usersUtils.usersDetail(params);
          } else if (
            respon.data.role == 'bank-sampah' ||
            respon.data.role == 'pengepul'
          ) {
            usersUtils.companyDetail(params);
          }
          return 200;
        } else {
          showToast(respon.message);
          return 400;
        }
      })
      .catch((error) => {
        showToast('Kode OTP Salah');
        return 400;
      }));
  }

  async signInUsersByPass(params) {
    return (params = await signInUsersByPass(params)
      .then((response) => {
        const respon = response.data;

        if (respon.status == 'success') {
          this.storage.setItem('token', respon.data.token);

          AsyncStorage.setItem('role', respon.data.role);

          store.dispatch(SignIn(respon.data.token));

          if (respon.data.role == 'user') {
            usersUtils.usersDetail(params);
          } else if (
            respon.data.role == 'bank-sampah' ||
            respon.data.role == 'pengepul'
          ) {
            usersUtils.companyDetail(params);
          }
          return 200;
        } else {
          showToast(respon.message);
          return 400;
        }
      })
      .catch((error) => {
        showToast('Pengguna tidak dtemukan');
        return 400;
      }));
  }

  async signUpUsers(params) {
    return (params = await signUpUsers(params)
      .then((response) => {
        const respon = response.data;

        if (respon.status == 'success') {
          return 200;
        } else {
          showToast(respon.message);
          return 400;
        }
      })
      .catch((error) => {
        showToast('Data Anda tidak dapat di proses');
        return 400;
      }));
  }

  async signUpWasteBank(params) {
    return (params = await signUpWasteBank(params)
      .then((response) => {
        const respon = response.data;

        if (respon.status == 'success') {
          return 200;
        } else {
          showToast(respon.message);
          return 400;
        }
      })
      .catch((error) => {
        showToast('Data Anda tidak dapat di proses');
        return 400;
      }));
  }
}

const authUtils = new AuthUtils();

Object.freeze(authUtils);

export default authUtils;
