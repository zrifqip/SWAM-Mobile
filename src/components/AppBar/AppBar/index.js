import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Icon } from "native-base";
import { Colors, StC, Font } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import Feather from "react-native-vector-icons/Feather";

const AppBar = ({ onBackCustom, navigation, title }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={
          onBackCustom == null ? () => navigation.goBack() : onBackCustom
        }>
        <Icon
          as={Feather}
          name={"chevron-left"}
          color={Colors.BLACK}
          size={RFValue(5)}
        />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

export default AppBar;

const styles = {
  header: {
    ...StC.flexR,
    backgroundColor: Colors.WHITE,
    height: RFValue(50),
    borderBottomWidth: 1,
    borderBottomColor: Colors.WHITE,
    alignItems: "center",
  },
  btnBack: {
    ...StC.centerPage,
    width: RFValue(40),
    marginRight: RFValue(10),
  },
  title: {
    ...Font.F13,
    ...Font.SemiBold,
    ...Font.DARK,
  },
};
