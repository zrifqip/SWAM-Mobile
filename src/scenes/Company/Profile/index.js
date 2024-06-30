import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import {
  BaseContainer,
  AppBar,
  FormInput,
  ButtonFlex,
  FormInputPhoto,
} from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { StC, Colors } from "@styles";
import { useTranslation } from "@utils";
import { phoneRegex, requireds, showToast, arrTypeCompany } from "@constants";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { Formik } from "formik";
import { base_uri } from "@constants/BASE_URL";
import { Picker } from "@react-native-community/picker";
import * as yup from "yup";
import usersUtils from "@utils/UsersUtils";
import MMKVStorage from "react-native-mmkv-storage";
import Axios from "axios";
const AxiosForm = Axios.create();

function CompanyProfile({ navigation, users }) {
  let user = users.users;
  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [companyType, setCompanyType] = useState(
    user?.organization?.companyType,
  );

  let organization,
    photo = "";
  if (user.organization) {
    organization = user.organization;

    if (organization.image.length != 0) {
      photo = organization.image[0].thumb.path;
    }
  }

  const usersValidationSchema = yup.object().shape({
    companyName: yup.string().required(translations["companyName.required"]),
    nameCEO: yup.string().required(translations["nameCEO.required"]),
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
      companyName: values.companyName,
      nameCEO: values.fullName,
      companyType: companyType,
      phoneNumber: values.phoneNumber,
      role: "bank-sampah",
      companyService: user?.organization?.service,
      address: {
        country: "Indonesia",
        region: {
          province: "Jawa Timur",
          city: "Lamongan",
        },
        district: "Lamongan",
        street: values.address,
        postalCode: "638392",
        loc: {
          type: "Point",
          coordinates: [-44.54561, -12.12227],
        },
      },
      minimumWithdrawal: user?.minimumWithdrawal ? user?.minimumWithdrawal : 0,
    };

    let respons = await usersUtils.companyUpdate(params);
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
    formData.append("image", {
      uri: respons.uri,
      type: "image/png",
      name: respons.fileName,
    });

    let api = `${base_uri}company/profile`;

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
          usersUtils.companyDetail();
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
          companyName: user?.organization?.companyName,
          nameCEO: user?.organization?.nameCEO,
          phoneNumber: user?.phoneNumber,
          address: user?.organization?.address?.street,
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
                  label={translations["organization.name"]}
                  placeholder={translations["organization.name"]}
                  value={values.companyName}
                  onChangeText={handleChange("companyName")}
                  onBlur={handleBlur("companyName")}
                  isError={errors.companyName && touched.companyName}
                  errorMessage={errors.companyName}
                />
                <Text style={StC.title}>
                  {translations["type"] + " " + translations["waste.bank"]}{" "}
                  {requireds("*")}
                </Text>
                <View style={styles.border}>
                  <Picker
                    selectedValue={companyType}
                    onValueChange={(itemValue) => setCompanyType(itemValue)}>
                    {arrTypeCompany().map((item) => (
                      <Picker.Item label={item.name} value={item.key} />
                    ))}
                  </Picker>
                </View>
                <View style={StC.mB10} />
                <FormInput
                  label={translations["ceo.name"]}
                  placeholder={translations["ceo.name"]}
                  value={values.nameCEO}
                  onChangeText={handleChange("nameCEO")}
                  onBlur={handleBlur("nameCEO")}
                  isError={errors.nameCEO && touched.nameCEO}
                  errorMessage={errors.nameCEO}
                  required
                />
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
  const { users, wasteBanks } = state;
  return { users, wasteBanks };
};

export default connect(mapStateToProps)(CompanyProfile);

const styles = StyleSheet.create({
  authCont: {
    paddingHorizontal: RFValue(15),
    paddingTop: RFValue(20),
  },
  border: {
    borderWidth: RFValue(1),
    borderRadius: RFValue(3),
    height: RFValue(40),
    borderColor: Colors.GRAY_SOFT,
  },
});
