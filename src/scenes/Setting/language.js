import React from "react";
import {
  Alert,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BaseContainer, AppBar } from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors, Font } from "@styles";
import { Icons } from "@assets";
import { useTranslation } from "@utils";
import Flag from "react-native-flags";

function SettingLanguage({ navigation }) {
  const { translations, appLanguage, setAppLanguage } = useTranslation();

  const setModal = async (lang) => {
    Alert.alert(
      translations["confirm.title"],
      translations["confirm.changeLanguage"],
      [
        {
          text: translations["dialog.cancel"],
        },
        {
          text: translations["dialog.ok"],
          onPress: () => setAppLanguage(lang),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <BaseContainer>
      <AppBar navigation={navigation} title={translations["change.language"]} />
      <ScrollView>
        <Text style={styles.desc}>{translations["language.desc"]}</Text>
        {translations.getAvailableLanguages().map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => item !== appLanguage && setModal(item)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Flag code={`${item === "id" ? "ID" : "GB"}`} size={32} />
              <Text style={styles.language}>
                {item === "id" ? "Bahasa Indonesia" : "English"}
              </Text>
            </View>
            {item === appLanguage && (
              <Image source={Icons.check} style={{ width: 20, height: 16 }} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </BaseContainer>
  );
}

export default SettingLanguage;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: RFValue(20),
    backgroundColor: Colors.WHITE,
    borderBottomWidth: RFValue(1),
    borderBottomColor: Colors.GRAY_LIGHT,
  },
  desc: {
    ...Font.F11,
    ...Font.Regular,
    ...Font.DARK,
    backgroundColor: Colors.WHITE,
    padding: RFValue(15),
  },
  language: {
    ...Font.F12,
    ...Font.Regular,
    ...Font.DARK,
    marginLeft: RFValue(10),
  },
});
