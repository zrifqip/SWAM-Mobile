import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import {
  BaseContainer,
  AppBar,
  FormInput,
  ButtonFlex,
  FormInputPhoto,
  FormInputRadio,
} from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { StC } from "@styles";
import { useTranslation } from "@utils";
import { phoneRegex, requireds, showToast } from "@constants";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { Formik } from "formik";
import { base_uri } from "@constants/BASE_URL";
import * as yup from "yup";
import usersUtils from "@utils/UsersUtils";
import MMKVStorage from "react-native-mmkv-storage";
import Axios from "axios";
const AxiosForm = Axios.create();

function UsersProfile({ navigation, users }) {
  const { translations } = useTranslation();
  let user = users.users;
  const [loading, setLoading] = useState(false);
  const [sex, setSex] = useState(user.biodata.sex == "Male");

  let biodata,
    photo = "";
  if (user.biodata) {
    biodata = user.biodata;

    if (biodata.photo.length != 0) {
      photo = biodata.photo[0].thumb.path;
    }
  }
  const usersValidationSchema = yup.object().shape({
    fullName: yup.string().required(translations["fullname.required"]),
    phoneNumber: yup
      .string()
      .min(10, ({ min }) => `Nomor handphone minimal ${min} digit`)
      .max(13, ({ max }) => `Nomor handphone maksimal ${max} digit`)
      .matches(phoneRegex(), "Format nomor handphone sesuai")
      .required(translations["phoneNumber.required"]),
    address: yup.string().required(translations["fill.address"]),
  });

  const handleUpdate = async (values) => {
    setLoading(true);

    let params = {
      fullName: values.fullName,
      sex: sex ? "Male" : "Female",
      phoneNumber: values.phoneNumber,
      address: {
        country: "Indonesia",
        region: {
          province: "",
          city: "",
        },
        district: "",
        street: values.address,
        postalCode: "",
      },
    };

    let respons = await usersUtils.usersUpdate(params);

    if (respons == 200) {
      showToast(translations["save.success"]);

      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }

    setLoading(false);
  };

  const handlePickImage = (type) => {
    if (type == "camera") {
      launchCamera(
        {
          mediaType: "photo",
          quality: 0.5,
        },
        (response) => {
          if (response.didCancel) {
            console.log("User cancelled image picker");
          } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
          } else if (response.customButton) {
            console.log("User tapped custom button: ", response.customButton);
          } else {
            const res = response?.assets?.[0];

            if (res) {
              handleUpdatePhoto(res);
            } else {
              console.log("Fail to pick image!");
            }
          }
        },
      );
    } else {
      launchImageLibrary(
        {
          mediaType: "photo",
          quality: 0.5,
        },
        (response) => {
          if (response.didCancel) {
            console.log("User cancelled image picker");
          } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
          } else if (response.customButton) {
            console.log("User tapped custom button: ", response.customButton);
          } else {
            const res = response?.assets?.[0];

            if (res) {
              handleUpdatePhoto(res);
            } else {
              console.log("Fail to pick image!");
            }
          }
        },
      );
    }
  };

  const handleUpdatePhoto = async (respons) => {
    const storage = new MMKVStorage.Loader().initialize();

    const session = await storage.getItem("token");

    const formData = new FormData();
    formData.append("photo", {
      uri: respons.uri,
      type: "image/png",
      name: respons.fileName,
    });

    let api = `${base_uri}users/client/profile`;

    AxiosForm({
      url: api,
      method: "PATCH",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Gosnix ${session}`,
      },
    })
      .then(function (response) {
        const respon = response.data;
        if (respon.status == "success") {
          usersUtils.usersDetail();
          showToast(translations["save.success"]);
        } else {
          showToast(translations["save.failed"]);
        }
      })
      .catch(function (error) {
        showToast(translations["save.failed"]);
      });
  };

  const setModal = async () => {
    Alert.alert(
      "Upload Photo From",
      "",
      [
        {
          text: "Close",
        },
        {
          text: "Galery",
          onPress: () => handlePickImage("galery"),
        },
        {
          text: "Camera",
          onPress: () => handlePickImage("camera"),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <BaseContainer loading={loading}>
      <AppBar navigation={navigation} title={translations["edit.profile"]} />
      <Formik
        validationSchema={usersValidationSchema}
        isValidating={true}
        initialValues={{
          fullName: user.biodata.fullName,
          phoneNumber: user.phoneNumber,
          address: user.biodata.address.street,
        }}
        onSubmit={(value) => handleUpdate(value)}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <>
            <ScrollView>
              <View style={styles.authCont}>
                <FormInputPhoto
                  onPress={() => setModal()}
                  label={"Photo"}
                  fileUri={photo ? base_uri + photo : ""}
                />
                <FormInput
                  label={translations["full.name"]}
                  placeholder={translations["full.name"]}
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  isError={errors.fullName && touched.fullName}
                  errorMessage={errors.fullName}
                  required
                />
                <View>
                  <Text style={StC.title}>
                    {translations["sex"]} {requireds("*")}
                  </Text>
                  <View style={StC.flexR}>
                    <FormInputRadio
                      onPress={() => setSex(!sex)}
                      checked={sex}
                      title={translations["male"]}
                      style={{ width: RFValue(90) }}
                    />
                    <FormInputRadio
                      onPress={() => setSex(!sex)}
                      checked={!sex}
                      title={translations["female"]}
                      style={{ width: RFValue(90) }}
                    />
                  </View>
                  <View style={StC.mB10} />
                </View>
                <FormInput
                  label={translations["phone.number"] + " (WhatsApp)"}
                  placeholder={translations["phone.number"]}
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  isError={errors.phoneNumber && touched.phoneNumber}
                  errorMessage={errors.phoneNumber}
                  keyboardType={"number-pad"}
                  required
                  editable={false}
                />
                <FormInput
                  label={translations["address"]}
                  placeholder={translations["address"]}
                  value={values.address}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  isError={errors.address && touched.address}
                  errorMessage={errors.address}
                  required
                />
              </View>
            </ScrollView>
            <ButtonFlex
              title={translations["save"]}
              onPress={() => handleSubmit()}
              style={{ marginTop: RFValue(20) }}
              form
            />
          </>
        )}
      </Formik>
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(UsersProfile);

const styles = StyleSheet.create({
  authCont: {
    paddingHorizontal: RFValue(15),
    paddingTop: RFValue(20),
  },
});
