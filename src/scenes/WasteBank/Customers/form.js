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
import WithdrawUtils from "@utils/WithdrawUtils";

const AddUserForm = ({navigation}) => {

  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [sex, setSex] = useState(true);
  const [hasAccount, setHasAccount] = useState(true);
  const chooseWasteBank = async (values) => {
    let params = {phoneNumber: values}; 
    const isSuccess = await WithdrawUtils.updateWasteBanksCustomer(params)
    if (isSuccess == 200) {
      showToast(translations["save.success"]);
      navigation.goBack();
    }
    else {
      showToast(translations["save.failed"]);
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

  const handleSignUp = async (values) => {
    console.log(values);
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
            onSubmit={(value) => handleSignUp(value)}>
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
                  onPress={() => handleSignUp(values)}
                  style={{ marginTop: RFValue(20) }}
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

const mapStateToProps = function (state) {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(AddUserForm);

const styles = StyleSheet.create({
  authCont: {
    paddingHorizontal: RFValue(15),
  },
});
