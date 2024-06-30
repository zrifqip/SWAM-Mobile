import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const axiosCustomHeader = Axios.create();
const roAxios = Axios.create();

axiosCustomHeader.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers = {
        "Content-Type": "application/json",
        params: token,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// FOR REQUEST WITH USER TOKEN
Axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers = {
        params: token,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const apiGet = async (url) => {
  return Axios.get(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const apiPost = (url, data, config = null) => {
  return Axios.post(url, data, config)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const apiPostJSON = async (url, data) => {
  return axiosCustomHeader
    .post(url, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const apiDelete = (url) => {
  return Axios.delete(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};
