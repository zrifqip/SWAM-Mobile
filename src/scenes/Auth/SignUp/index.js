import React, {useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Alert, Linking} from 'react-native';
import {Colors, StC, Font} from '@styles';
import {
  BaseContainer,
  TypographyText,
  ButtonFlex,
  AppBar,
  FormInput,
  FormInputSwitch,
  FormInputPicker,
  FormInputRadio,
  FormInputCheckbox,
} from '@components';
import {responsiveHeight, useTranslation} from '@utils';
import {phoneRegex, requireds, Notif} from '@constants';
import {Formik} from 'formik';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import authUtils from '@utils/AuthUtils';
import * as yup from 'yup';

const SignUp = ({navigation, users}) => {
  let address = users.address;

  const {translations} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isSwitch, setIsSwitch] = useState(false);
  const [sex, setSex] = useState(true);
  const [pickup, setPickup] = useState(true);
  const [delivery, setDelivery] = useState(false);

  const usersValidationSchema = yup.object().shape({
    fullName: yup.string().required(translations['fullname.required']),
    phoneNumber: yup
      .string()
      .min(10, ({min}) => `Nomor handphone minimal ${min} digit`)
      .max(13, ({max}) => `Nomor handphone maksimal ${max} digit`)
      .matches(phoneRegex(), translations['phoneNumber.invalid'])
      .required(translations['phoneNumber.required']),
    address: yup.string().required(translations['fill.address']),
  });

  const wastebankValidationSchema = yup.object().shape({
    companyName: yup.string().required(translations['companyName.required']),
    fullName: yup.string().required(translations['nameCEO.required']),
    phoneNumber: yup
      .string()
      .min(10, ({min}) => `Nomor handphone minimal ${min} digit`)
      .max(13, ({max}) => `Nomor handphone maksimal ${max} digit`)
      .matches(phoneRegex(), translations['phoneNumber.invalid'])
      .required(translations['phoneNumber.required']),
  });

  const actionNavigation = (uri) => {
    if (uri == 'SignIn') {
      navigation.navigate(uri);
    } else {
      Linking.openURL(uri);
    }
  };

  const handleSignUp = async (values) => {
    setLoading(true);

    if (isSwitch) {
      if (pickup || delivery) {
        if (address.street) {
          let service = ['pickup', 'self-delivery'];
          if (pickup && !delivery) {
            service = ['pickup'];
          } else if (!pickup && delivery) {
            service = ['self-delivery'];
          }

          let params = {
            phoneNumber: values.phoneNumber,
            companyType: 'pt',
            companyService: service,
            companyName: values.companyName,
            role: 'bank-sampah',
            nameCEO: values.fullName,
            address: address,
          };

          let signup = await authUtils.signUpWasteBank(params);
          if (signup == 200) {
            setModal();
          }
        } else {
          Notif('Perhatian', 'Alamat Wajib Diisi!');
        }
      } else {
        Notif(translations['service'], translations['service.required']);
      }
    } else {
      let params = {
        fullName: values.fullName,
        sex: sex ? 'Male' : 'Female',
        phoneNumber: values.phoneNumber,
        address: {
          country: 'Indonesia',
          region: {
            province: '',
            city: '',
          },
          district: '',
          street: values.address,
          postalCode: '',
        },
      };

      let signupUser = await authUtils.signUpUsers(params);

      if (signupUser == 200) {
        setModal();
      }
    }

    setLoading(false);
  };

  const setModal = async () => {
    Alert.alert(
      'Yeahh !!!',
      translations['notif.register.success'],
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SignIn'),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <BaseContainer loading={loading}>
      <AppBar navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.WHITE}}
      >
        <View style={styles.authCont}>
          <TypographyText
            text={translations['register']}
            fontType="bold"
            fontSize="L"
          />
          <TypographyText
            text={translations['sub.register']}
            style={{marginTop: responsiveHeight(8)}}
            fontSize="S"
            color={Colors.GRAY_DARK}
          />
          <FormInputSwitch
            label={['Nasabah', translations['waste.banks']]}
            isSwitch={isSwitch}
            onPress={() => {
              setIsSwitch(!isSwitch);
            }}
            style={[StC.mT30, StC.mB20]}
          />
          <Formik
            validationSchema={
              isSwitch ? wastebankValidationSchema : usersValidationSchema
            }
            isValidating={true}
            initialValues={{
              fullName: '',
              phoneNumber: '',
              address: '',
              companyName: '',
            }}
            onSubmit={(value) => handleSignUp(value)}
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
                {isSwitch && (
                  <FormInput
                    label={translations['organization.name']}
                    placeholder={translations['organization.name']}
                    value={values.companyName}
                    onChangeText={handleChange('companyName')}
                    onBlur={handleBlur('companyName')}
                    isError={errors.companyName && touched.companyName}
                    errorMessage={errors.companyName}
                    required
                  />
                )}
                <FormInput
                  label={
                    isSwitch
                      ? translations['ceo.name']
                      : translations['full.name']
                  }
                  placeholder={
                    isSwitch
                      ? translations['ceo.name']
                      : translations['full.name']
                  }
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  isError={errors.fullName && touched.fullName}
                  errorMessage={errors.fullName}
                  required
                />
                {!isSwitch ? (
                  <View>
                    <Text style={StC.title}>
                      {translations['sex']} {requireds('*')}
                    </Text>
                    <View style={StC.flexR}>
                      <FormInputRadio
                        onPress={() => setSex(!sex)}
                        checked={sex}
                        title={translations['male']}
                        style={{width: RFValue(90)}}
                      />
                      <FormInputRadio
                        onPress={() => setSex(!sex)}
                        checked={!sex}
                        title={translations['female']}
                        style={{width: RFValue(90)}}
                      />
                    </View>
                    <View style={StC.mB10} />
                  </View>
                ) : (
                  <View style={StC.mB10}>
                    <Text style={StC.title}>
                      {translations['service']} {requireds('*')}
                    </Text>
                    <FormInputCheckbox
                      onPress={() => setPickup(!pickup)}
                      checked={pickup}
                      title={translations['pick.up']}
                      style={{width: RFValue(90)}}
                    />
                    <FormInputCheckbox
                      onPress={() => setDelivery(!delivery)}
                      checked={delivery}
                      title={translations['self.delivery']}
                      style={{width: RFValue(90)}}
                    />
                  </View>
                )}
                <FormInput
                  label={translations['phone.number'] + ' (WhatsApp)'}
                  placeholder={translations['phone.number']}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  isError={errors.phoneNumber && touched.phoneNumber}
                  errorMessage={errors.phoneNumber}
                  keyboardType={'number-pad'}
                  required
                />
                {!isSwitch ? (
                  <FormInput
                    label={translations['address']}
                    placeholder={translations['address']}
                    value={values.address}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    isError={errors.address && touched.address}
                    errorMessage={errors.address}
                    required
                  />
                ) : (
                  <FormInputPicker
                    label={translations['address']}
                    placeholder={translations['address']}
                    value={address?.street}
                    onPress={() => navigation.navigate('ResultsAddress')}
                    required
                  />
                )}
                <ButtonFlex
                  title={translations['register']}
                  onPress={() => handleSubmit()}
                  style={{marginTop: RFValue(20)}}
                  flex
                />
                <Text style={styles.labelSignIn}>
                  Saya setuju dengan{' '}
                  <Text
                    style={[Font.SemiBold, Font.PRIMARY]}
                    onPress={actionNavigation.bind(
                      this,
                      'https://api.apps4swam.com/term',
                    )}
                  >
                    Syarat dan Ketentuan
                  </Text>{' '}
                  serta{' '}
                  <Text
                    style={[Font.SemiBold, Font.PRIMARY]}
                    onPress={actionNavigation.bind(
                      this,
                      'https://api.apps4swam.com/privacy-policy',
                    )}
                  >
                    Kebijakan Privasi
                  </Text>{' '}
                  yang ditetapkan
                </Text>
                <Text style={[styles.labelSignIn, StC.mB50]}>
                  {translations['dont.have.acc']}?{' '}
                  <Text
                    style={[Font.SemiBold, Font.PRIMARY]}
                    onPress={actionNavigation.bind(this, 'SignIn')}
                  >
                    {translations['login']}
                  </Text>
                </Text>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </BaseContainer>
  );
};

const mapStateToProps = function (state) {
  const {users} = state;
  return {users};
};

export default connect(mapStateToProps)(SignUp);

const styles = StyleSheet.create({
  authCont: {
    paddingHorizontal: RFValue(15),
  },
  labelSignIn: {
    ...Font.F12,
    ...Font.Regular,
    ...Font.BLACK,
    ...StC.mT10,
    textAlign: 'center',
  },
});
