import {
    createInterest,
  } from "@constants/apiInterest";
import { showToast } from "@constants";
import { base_uri } from "@constants/BASE_URL";
import store from "@stores/store";
import MMKVStorage from "react-native-mmkv-storage";
import Axios from "axios";
const AxiosForms = Axios.create();

class InterestUtils {
    async createInterest(params) {
        return await createInterest(params)
          .then(async (response) => {
            const respon = response.data;
            if (respon.status == "success") {
                showToast("Save Berhasil");
              return 200;
            } else {
              showToast("Save Gagal");
              return 400;
            }
          })
          .catch((error) => {
            showToast("Save Gagal");
            return 400;
          });
      }
}

const interestUtils = new InterestUtils();

Object.freeze(interestUtils);

export default interestUtils;
