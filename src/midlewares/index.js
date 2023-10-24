import axios from "axios";
import MMKVStorage from "react-native-mmkv-storage";
import DeviceInfo from "react-native-device-info";

export default async () => {
  const storage = new MMKVStorage.Loader().initialize();
  let version = DeviceInfo.getVersion();

  axios.interceptors.request.use(
    async (config) => {
      const session = await storage.getItem("token");
      if (session !== null) {
        config.headers["Authorization"] = `Gosnix ${session}`;
        config.headers["Content-Type"] = "application/json";
      } else {
        config.headers["Content-Type"] = "application/json";
      }

      config.headers["x-app-version"] = version;

      return config;
    },
    (err) => Promise.reject(err),
  );
};
