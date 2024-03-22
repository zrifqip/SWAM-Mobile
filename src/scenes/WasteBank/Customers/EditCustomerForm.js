import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text, Alert } from "react-native";
import {
  BaseContainer,
  AppBar,
  ButtonFlex,
  FormInputPhoto,
  FormInputCurrency,
  FormInput,
  FormInputPicker,
} from "@components";
import { Formik } from "formik";
import { RFValue } from "react-native-responsive-fontsize";
import { Switch } from "native-base";
import { connect } from "react-redux";
import { useTranslation } from "@utils";
import { Colors, StC, Font } from "@styles";
import { AnimationLayout, showToast } from "@constants";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { base_uri } from "@constants/BASE_URL";
import { SelectedCategory } from "@actions";
import wasteBanksUtils from "@utils/WasteBanksUtils";
import store from "@stores/store";

function EditCustomerForm({ navigation, users }) {
  let user = users.users;
  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const handleSave = async () => {
    // setLoading(true);

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
    navigation.goBack();
    let respons = await usersUtils.usersUpdate(params);

    if (respons == 200) {
      showToast(translations["save.success"]);

      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }

    // setLoading(false);
  };

  
  

  return (
    <BaseContainer loading={loading}>
      <AppBar navigation={navigation} title={translations["edit.customer"]} />
      <Formik
        initialValues={{
          phoneNumber: '',
          fullName: '',
          address: '',
          balance: '',
        }}
        onSubmit={(values) => handleUpdate(values)}
      >
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
                <FormInput
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  placeholder="Enter phone number"
                  isError={errors.phoneNumber && touched.phoneNumber}
                  errorMessage={errors.phoneNumber}
                />
                <FormInput
                  label="Full Name"
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  placeholder="Enter full name"
                  isError={errors.fullName && touched.fullName}
                  errorMessage={errors.fullName}
                />
                <FormInput
                  label="Address"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  placeholder="Enter address"
                  isError={errors.address && touched.address}
                  errorMessage={errors.address}
                />
                <FormInputCurrency
                  label="Balance"
                  value={values.balance}
                  onChangeText={handleChange('balance')}
                  onBlur={handleBlur('balance')}
                  placeholder="Rp 0"
                  prefix="Rp "
                  keyboardType="number-pad"
                  precision={0}
                  isError={errors.balance && touched.balance}
                  errorMessage={errors.balance}
                />
              </View>
            </ScrollView>
            <ButtonFlex
              title="Save"
              onPress={handleSave}
              style={{ marginTop: RFValue(20) }}
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

export default connect(mapStateToProps)(EditCustomerForm);

const styles = StyleSheet.create({
  authCont: {
    padding: RFValue(15),
    backgroundColor: Colors.WHITE,
  },
  desc: {
    ...Font.F10,
    ...Font.GRAY_LABEL,
    ...Font.Regular,
    ...StC.mB5,
    marginTop: RFValue(-5),
  },
});