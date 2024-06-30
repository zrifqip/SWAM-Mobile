import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { Colors, StC, Font } from "@styles";
import {
  BaseContainer,
  TypographyText,
  ButtonFlex,
  AppBar,
  FormInput,
  FormInputPicker,
  FormInputRadio,
} from "@components";
import { responsiveHeight, useTranslation } from "@utils";
import { phoneRegex, requireds, Notif } from "@constants";
import { Formik } from "formik";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import authUtils from "@utils/AuthUtils";
import * as yup from "yup";
import { showToast } from "@constants";
import withdrawUtils from "@utils/WithdrawUtils";


const AddUserForm = ({navigation,customer}) => {
  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [sex, setSex] = useState(true);
  const [hasAccount, setHasAccount] = useState(true);

  const chooseWasteBank = async (values) => {
    setLoading(true);
    let params = { phoneNumber: values };
  
    try {
      const response = await withdrawUtils.updateWasteBanksCustomer(params);
      if (response === 200) {
        showToast(translations["save.success"]);
        navigation.goBack();
      } else {
        showToast(translations["save.failed"]);
      }
    } catch (error) {
      console.error("Error updating Waste Banks customer:", error);
      showToast("An error occurred while updating the customer");
    } finally {
      setLoading(false);
    }
  };
  const usersValidationSchema = yup.object().shape({
    fullName: yup.string().required(translations["fullname.required"]),
    phoneNumber: yup
      .string()
      .max(13, ({ max }) => `Nomor handphone maksimal ${max} digit`)
      .required(translations["phoneNumber.required"]),
    address: yup.string().required(translations["fill.address"]),
  });

  const handleSubmit = async (values) => {
    if(hasAccount) {
      return await chooseWasteBank(values.phoneNumber);
    }

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

    let signupUser = await authUtils.signUpUsers(params);
    if(signupUser == 200) {
      if (!hasAccount) {
        await chooseWasteBank(values.phoneNumber);
      }
    } 
    else{
        setLoading(false);
        showToast(translations["save.failed"])
      }  
  };

  return (
    <BaseContainer loading={loading}>
      <AppBar navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.WHITE }}>
        <View style={styles.authCont}>
          <TypographyText
            text={translations["addcustomer"]}
            fontType="bold"
            fontSize="L"
          />
          <Formik
            validationSchema={usersValidationSchema}
            initialValues={{
              fullName: "",
              phoneNumber: "",
              address: "",
            }}
            onSubmit={(value) => handleSubmit(value)}>
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <>
                <View>
                  <Text style={StC.title}>
                    {translations["customer.question"]} {requireds("*")}
                  </Text>
                  <View style={StC.flexR}>
                    <FormInputRadio
                      onPress={() => setHasAccount(true)}
                      checked={hasAccount}
                      title={translations["account.yes"]}
                      style={{ width: RFValue(90) }}
                    />
                    <FormInputRadio
                      onPress={() => setHasAccount(false)}
                      checked={!hasAccount}
                      title={translations["account.no"]}
                      style={{ width: RFValue(90) }}
                    />
                  </View>
                  <View style={StC.mB10} />
                </View>
                {!hasAccount && (
                  <>
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
                          onPress={() => setSex(true)}
                          checked={sex}
                          title={translations["male"]}
                          style={{ width: RFValue(90) }}
                        />
                        <FormInputRadio
                          onPress={() => setSex(false)}
                          checked={!sex}
                          title={translations["female"]}
                          style={{ width: RFValue(90) }}
                        />
                      </View>
                      <View style={StC.mB10} />
                    </View>
                    <FormInput
                      label={translations["phone.number"]}
                      placeholder={translations["phone.number"]}
                      value={values.phoneNumber}
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                      isError={errors.phoneNumber && touched.phoneNumber}
                      errorMessage={errors.phoneNumber}
                      keyboardType={"number-pad"}
                      required
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
                  </>
                )}
                {hasAccount && ( 
                  <FormInput
                    label={translations["phone.number"]}
                    placeholder={translations["phone.number"]}
                    value={values.phoneNumber}
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    isError={errors.phoneNumber && touched.phoneNumber}
                    errorMessage={errors.phoneNumber}
                    keyboardType={"number-pad"}
                    required
                  />
                )}
                <ButtonFlex
                  title={translations["addcustomer"]}
                  onPress={() => handleSubmit(values)}
                  style={{ marginTop: RFValue(40) }}
                  flex
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </BaseContainer>
  );
};

const mapStateToProps = (state) => ({
  customer: state.withdraw.customerDetail,
});

export default connect(mapStateToProps)(AddUserForm);

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
