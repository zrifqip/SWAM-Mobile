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
import withdrawUtils from "@utils/WithdrawUtils";
import { AnimationLayout, showToast } from "@constants";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { base_uri } from "@constants/BASE_URL";
import { SelectedCategory } from "@actions";
import store from "@stores/store";

function EditCustomerForm({ customerDetail, navigation }) {
  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(customerDetail.phoneNumber);
  const [fullName, setFullName] = useState(customerDetail.fullName);
  const [address, setAddress] = useState(customerDetail.address.street);

  const handleSave = async () => {
    setLoading(true); // Show loading indicator

    let params = {
      phoneNumber: phoneNumber,
      fullName: fullName,
      address: {
        ...customerDetail.address,
        street: address,
      },
    };
    let merge = {
      _id: customerDetail._id,
      params: params,
    };

    try {
      let response = await withdrawUtils.updateCustomer(merge);
      if (response === 200) {
        Alert.alert("Success", "Customer details updated successfully.");
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to update customer details.");
      }
    } catch (error) {
      console.error("Error updating customer details:", error);
      Alert.alert(
        "Error",
        "An error occurred while updating customer details.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <BaseContainer loading={loading}>
      <AppBar navigation={navigation} title={translations["edit.customer"]} />
      <Formik
        initialValues={{
          phoneNumber: customerDetail.phoneNumber,
          fullName: customerDetail.fullName,
          address: customerDetail.address.street,
          balance: customerDetail.balance,
        }}
        onSubmit={(values) => handleUpdate(values)}>
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
                  value={phoneNumber}
                  onChangeText={(val) => setPhoneNumber(val)}
                  onBlur={handleBlur("phoneNumber")}
                  placeholder="Enter phone number"
                  isError={errors.phoneNumber && touched.phoneNumber}
                  errorMessage={errors.phoneNumber}
                />
                <FormInput
                  label="Full Name"
                  value={fullName}
                  onChangeText={(val) => setFullName(val)}
                  onBlur={handleBlur("fullName")}
                  placeholder="Enter full name"
                  isError={errors.fullName && touched.fullName}
                  errorMessage={errors.fullName}
                />
                <FormInput
                  label="Alamat" // Assuming "Alamat" is meant to be "Address" in the backend
                  value={address}
                  onChangeText={(val) => setAddress(val)}
                  onBlur={handleBlur("address")}
                  placeholder="Enter address"
                  isError={errors.address && touched.address}
                  errorMessage={errors.address}
                />
                <FormInput
                  label="Balance"
                  value={values.balance}
                  onBlur={handleBlur("balance")}
                  placeholder="Rp 0"
                  prefix="Rp "
                  keyboardType="number-pad"
                  precision={0}
                  isError={errors.balance && touched.balance}
                  errorMessage={errors.balance}
                  editable={false}
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

const mapStateToProps = (state) => ({
  customerDetail: state.withdraw.customerDetail,
});

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
