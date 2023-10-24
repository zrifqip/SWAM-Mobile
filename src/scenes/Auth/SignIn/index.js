import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Colors, StC, Font } from "@styles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {
  BaseContainer,
  TypographyText,
  ButtonFlex,
  AppBar,
  FormInput,
  ModalOTP,
} from "@components";
import { responsiveHeight, useTranslation } from "@utils";
import { phoneRegex } from "@constants";
import { Formik } from "formik";
import { RFValue } from "react-native-responsive-fontsize";
import authUtils from "@utils/AuthUtils";
import * as yup from "yup";

const SignIn = ({ navigation }) => {
  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const refModalOTP = useRef();

  const profileValidationSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .min(10, ({ min }) => `Nomor handphone minimal ${min} digit`)
      .max(13, ({ max }) => `Nomor handphone maksimal ${max} digit`)
      .matches(phoneRegex(), translations["phoneNumber.invalid"])
      .required(translations["phoneNumber.required"]),
  });

  const actionNavigation = (uri) => {
    navigation.navigate(uri);
  };

  const handleSignIn = async (values) => {
    setLoading(true);
    setPhoneNumber(values.phoneNumber);

    let params = {
      phoneNumber: values.phoneNumber,
    };

    let response = await authUtils.signInUsers(params);
    // let response =  await authUtils.signInUsersByPass(params)

    if (response == 200) {
      // navigation.navigate('dashboard')
      refModalOTP.current.open();
    }

    setLoading(false);
  };

  return (
    <BaseContainer loading={loading}>
      <AppBar navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.WHITE }}>
        <View style={styles.authCont}>
          <TypographyText
            text={translations["login"]}
            fontType="bold"
            fontSize="L"
          />
          <TypographyText
            text={translations["sub.login"]}
            style={{ marginTop: responsiveHeight(8) }}
            fontSize="S"
            color={Colors.GRAY_DARK}
          />
          <View style={{ marginTop: RFValue(80) }} />
          <Formik
            validationSchema={profileValidationSchema}
            isValidating={true}
            initialValues={{ phoneNumber: "" }}
            // initialValues={{ phoneNumber: '081325666958'}}
            // initialValues={{ phoneNumber: '081227617570'}}
            onSubmit={(value) => handleSignIn(value)}>
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
            }) => (
              <>
                <FormInput
                  label={translations["phone.number"] + " (WhatsApp)"}
                  placeholder={translations["phone.number"]}
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  isError={errors.phoneNumber && touched.phoneNumber}
                  errorMessage={errors.phoneNumber}
                  keyboardType={"number-pad"}
                />
                <ButtonFlex
                  title={translations["login"]}
                  onPress={() => handleSubmit()}
                  style={{ marginTop: RFValue(20) }}
                  flex
                />
                <Text style={styles.labelSignIn}>
                  {translations["dont.have.acc"]}
                  <Text
                    style={[Font.SemiBold, Font.PRIMARY]}
                    onPress={actionNavigation.bind(this, "SignUp")}>
                    {translations["register"]}
                  </Text>
                </Text>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <ModalOTP
        open={refModalOTP}
        navigation={navigation}
        onPress={() => refModalOTP.current.close()}
        phoneNumber={phoneNumber}
      />
    </BaseContainer>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  authCont: {
    paddingHorizontal: wp(5),
    marginTop: wp(10),
  },
  imgCont: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: wp(40),
  },
  labelForgot: {
    ...StC.mB15,
    ...Font.F12,
    ...Font.Medium,
    ...Font.PRIMARY,
    textAlign: "right",
  },
  labelSignIn: {
    ...Font.F12,
    ...Font.Regular,
    ...Font.BLACK,
    ...StC.mT10,
    textAlign: "center",
  },
});
