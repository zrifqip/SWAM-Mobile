import React from "react";
import {
  Alert,
  Dimensions,
  LayoutAnimation,
  Platform,
  ToastAndroid,
  Text,
} from "react-native";
import { Font, Colors } from "@styles";
import Toast from "react-native-simple-toast";
import moment from "moment";
import "moment/locale/id";
import { useTranslation } from "@utils";

export const currencyFloat = (number) => {
  let num = parseFloat(number);
  if (!isNaN(num)) {
    if (num.toString().indexOf(".") != -1) {
      return (
        "Rp " +
        num
          .toFixed(2)
          .replace(".", ",")
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      );
    } else {
      var rupiah = "";
      var numrev = num.toString().split("").reverse().join("");
      for (var i = 0; i < numrev.length; i++)
        if (i % 3 == 0) rupiah += numrev.substr(i, 3) + ".";

      let ret = rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("");

      if (ret < 0) {
        return "- Rp " + ret.replace("-", "");
      } else {
        return "Rp " + ret;
      }
    }
  } else {
    return 0;
  }
};

export const numberFloat = (number) => {
  let num = parseFloat(number);
  if (!isNaN(num)) {
    if (num.toString().indexOf(".") != -1) {
      return num
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    } else {
      var rupiah = "";
      var numrev = num.toString().split("").reverse().join("");
      for (var i = 0; i < numrev.length; i++)
        if (i % 3 == 0) rupiah += numrev.substr(i, 3) + ".";
      return rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("");
    }
  } else {
    return 0;
  }
};

export const formatDate = (date, short) => {
  return short
    ? moment(date).format("DD MMM YYYY")
    : moment(date).format("DD MMMM YYYY");
};

export const formatDateTime = (date, type) => {
  return moment(date).format("DD MMMM YYYY (HH:mm)");
};

export const formatDateChats = (date) => {
  return moment(date).format("DD/MM/YY, HH:mm");
};

export const formatDateChatsDetail = (date) => {
  return moment(date).format("HH:mm");
};

export const formatDateDay = (date, short) => {
  return short
    ? moment(date).format("ddd, D MMM YYYY")
    : moment(date).format("dddd, DD MMMM YYYY");
};

export const onRotate = () => {
  const { width, height } = Dimensions.get("window");
  return height >= width;
};

export const Notif = (title, message) => {
  if (message) {
    Alert.alert(title, message);
  }
};

export const ToastConnection = () => {
  Alert.alert("Perhatian", "Tidak dapat memproses data, silahkan coba kembali");
};

export const AnimationLayout = () => {
  return LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const regexEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return (regex = reg.test(email) === false);
};

export const mailRegex = () => {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
};

export const phoneRegex = () => {
  return /^08[1-9][0-9]{7,10}$/;
};

export const showToast = async (msg) => {
  if (Platform.OS == "ios") {
    Toast.show(`${msg}`, Toast.SHORT);
  } else {
    ToastAndroid.show(`${msg}`, ToastAndroid.SHORT);
  }
};

export const requireds = (required) => {
  return required ? <Text style={Font.required}>*</Text> : null;
};

export const serviceWasteBank = (service) => {
  const { translations } = useTranslation();
  let arr = [
    {
      service: "pickup",
      name: translations["pick.up"],
      enabled: service.find((x) => x == "pickup"),
      color: Colors.SECONDARY,
    },
    {
      service: "self-delivery",
      name: translations["self.delivery"],
      enabled: service.find((x) => x == "self-delivery"),
      color: Colors.THIRD,
    },
  ];

  return arr.filter((x) => x.enabled);
};

export const serviceWasteBankName = (service) => {
  const { translations } = useTranslation();

  let findPickup = service.find((x) => x == "pickup");
  let findDelivery = service.find((x) => x == "self-delivery");
  let str;

  if (findPickup && findDelivery) {
    str =
      "[ " +
      translations["pick.up"] +
      ", " +
      translations["self.delivery"] +
      " ]";
  } else if (findPickup) {
    str = "[ " + translations["pick.up"] + " ]";
  } else {
    str = "[ " + translations["self.delivery"] + " ]";
  }

  return str;
};

export const serviceName = (service) => {
  const { translations } = useTranslation();

  let res = translations["self.delivery"];

  if (service == "pickup") {
    res = translations["pick.up"];
  }

  return res;
};

export const arrTypeCompany = (filter) => {
  let arr = [
    {
      name: "PT",
      key: "pt",
    },
    {
      name: "Maatschap",
      key: "maatschap",
    },
    {
      name: "CV",
      key: "cv",
    },
    {
      name: "Firma",
      key: "firma",
    },
    {
      name: "Yayasan",
      key: "yayasan",
    },
    {
      name: "Keperasi",
      key: "koperasi",
    },
    {
      name: "BUMN",
      key: "bumn",
    },
  ];

  if (filter) {
    let find = arr.find((x) => x.key == filter);
    return find.name;
  } else {
    return arr;
  }
};

export const arrDay = (filter) => {
  const { translations } = useTranslation();
  let arr = [
    {
      name: translations["day.monday"],
      key: "Senin",
    },
    {
      name: translations["day.tuesday"],
      key: "Selasa",
    },
    {
      name: translations["day.wednesday"],
      key: "Rabu",
    },
    {
      name: translations["day.thursday"],
      key: "Kamis",
    },
    {
      name: translations["day.friday"],
      key: "Jumat",
    },
    {
      name: translations["day.saturday"],
      key: "Sabtu",
    },
    {
      name: translations["day.sunday"],
      key: "Minggu",
    },
  ];

  if (filter) {
    let find = arr.find((x) => x.key == filter);
    return find.name;
  } else {
    return arr;
  }
};

export const arrDayAll = () => {
  const { translations } = useTranslation();
  let arr = [
    {
      name: translations["all.day"],
      key: "Semua",
    },
    {
      name: translations["day.monday"],
      key: "Senin",
    },
    {
      name: translations["day.tuesday"],
      key: "Selasa",
    },
    {
      name: translations["day.wednesday"],
      key: "Rabu",
    },
    {
      name: translations["day.thursday"],
      key: "Kamis",
    },
    {
      name: translations["day.friday"],
      key: "Jumat",
    },
    {
      name: translations["day.saturday"],
      key: "Sabtu",
    },
    {
      name: translations["day.sunday"],
      key: "Minggu",
    },
  ];

  return arr;
};

export const arrService = (service) => {
  if (service) {
    let str = JSON.stringify(service);
    let str2 = str.replace(/(")/g, " ");

    return str2;
  } else {
    return JSON.stringify(service);
  }
};

export const arrStatus = (status) => {
  const { translations } = useTranslation();

  let sts = "";

  if (status == "success") {
    sts = {
      label: translations["status.success"],
      color: Colors.SUCCESS,
    };
  }

  return sts;
};

export const arrSortDistance = (arr, coordinate) => {
  for (let i = 0; i < arr.length; i++) {
    let loc = arr[i].address?.loc?.coordinates;
    arr[i].distance = getDistance(coordinate, loc[0], loc[1]);
  }

  var sorted = arr.sort(function (a, b) {
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  return sorted;
};

export const getDistance = (coordinate, lon, lat) => {
  var p = 0.017453292519943295;
  var c = Math.cos;
  var a =
    0.5 -
    c((coordinate?.latitude - lat) * p) / 2 +
    (c(lat * p) *
      c(coordinate?.latitude * p) *
      (1 - c((coordinate?.longitude - lon) * p))) /
      2;

  let distance = 12742 * Math.asin(Math.sqrt(a));

  return distance;
};

export const filterCategory = (arr) => {
  let cat = [];
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i].category;

    let find = cat.find((x) => x._id == temp._id);

    if (!find) {
      cat.push(temp);
    }
  }

  return cat;
};
