import React, { useEffect } from "react";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import { Colors, StC } from "@styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Images } from "@assets";
import { BaseContainer, TypographyText, ButtonFlex } from "@components";
import { useTranslation } from "@utils";
import { RFValue } from "react-native-responsive-fontsize";
import { showToast } from "@constants";
import { SignIn } from "@actions";
import { GetUsersDetail } from "@actions";
import store from "@stores/store";
import usersUtils from "@utils/UsersUtils";
import MMKVStorage from "react-native-mmkv-storage";
import AsyncStorage from "@react-native-community/async-storage";
import { getVersion } from 'react-native-device-info';
const OnBoarding = ({ navigation }) => {
  const APP_VERSION_KEY = 'app_version';
  const checkCurrentToken = async () => {
    const storage = new MMKVStorage.Loader().initialize();
    const currentAppVersion = getVersion();
    try {
      const storedAppVersion = await AsyncStorage.getItem(APP_VERSION_KEY);
      const session = storage.getItem("token");

      if (storedAppVersion != currentAppVersion) {
        // App version has changed, clear storage and log out
        await AsyncStorage.setItem(APP_VERSION_KEY, currentAppVersion);
        store.dispatch({ type: "SIGN_OUT" });
        return;
      }
      if (JSON.stringify(session).length > 100) {
        store.dispatch(SignIn(session));
        const value = await AsyncStorage.getItem("role");
        let res;

        if (value == "user") {
          res = await usersUtils.usersDetail();
        } else {
          res = await usersUtils.companyDetail();
        }

        if (res === "error") {
          throw new Error("Terjadi kesalahan, Silahkan Login ulang");
        }
      }
    } catch (error) {
      showToast("testing");
      navigation.navigate("OnBoarding");
      store.dispatch({ type: "SIGN_OUT" });
      store.dispatch(GetUsersDetail(""));
      storage.removeItem("token");
    }
  };
  

  useEffect(() => {
    checkCurrentToken();
  }, []);

  const { translations } = useTranslation();

  const handlePress = (uri) => {
    navigation.navigate(uri);
  };

  return (
    <BaseContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: Colors.WHITE }}>
        <View style={styles.imgCont}>
          <Image
            source={Images.swam_biru}
            style={{
              width: wp("40%"),
              height: hp("3.8%"),
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={styles.authCont}>
          <TypographyText
            text={`${translations["welcome"]} Apps4SWaM`}
            fontSize="M"
            fontType="bold"
          />
          <TypographyText
            text={translations["sub.welcome"]}
            style={{ marginVertical: RFValue(10) }}
            fontSize="XS"
            color={Colors.GRAY_DARK}
          />
          <ButtonFlex
            style={StC.mT10}
            title={translations["login"]}
            onPress={async () => await handlePress("SignIn")}
          />
          <ButtonFlex
            outline
            style={{ marginTop: RFValue(5) }}
            title={translations["register"]}
            onPress={async () => await handlePress("SignUp")}
          />
        </View>
      </ScrollView>
    </BaseContainer>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  authCont: {
    paddingHorizontal: wp(5),
    marginTop: wp(40),
  },
  imgCont: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: wp(40),
  },
});
