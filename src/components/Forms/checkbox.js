import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon, Text } from "native-base";
import { StC, Font, Colors } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const FormInputCheckbox = (props) => (
  <TouchableOpacity onPress={props.onPress} style={[styles.card, props.style]}>
    <Icon
      as={MaterialCommunityIcons}
      name={props.checked ? "checkbox-marked" : "checkbox-blank-outline"}
      color={props.checked ? Colors.PRIMARY : Colors.GRAY}
      size={RFValue(5)}
      style={{ height: RFValue(20), width: RFValue(20) }}
    />
    <Text
      style={[
        styles.label,
        props.bold && styles.labelBold,
        { marginLeft: RFValue(5) },
      ]}>
      {props.title}
    </Text>
  </TouchableOpacity>
);

export default FormInputCheckbox;

const styles = {
  checked: {
    ...Font.F15,
    ...Font.GRAY_SOFT,
  },
  label: {
    ...Font.F11,
    ...Font.Medium,
    ...Font.BLACK_SOFT,
    flex: 1,
  },
  labelBold: {
    ...Font.SemiBold,
  },
  card: {
    ...StC.flexR,
    height: RFValue(25),
  },
};
