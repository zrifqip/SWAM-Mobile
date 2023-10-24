import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { StC, Font, Colors } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function CardWasteBankProductCategory({ item, onPress, onPressEdit }) {
  return (
    <View style={styles.cardMenu}>
      {item.userID && (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.5}
          onPress={onPressEdit}>
          <Icon
            as={<MaterialCommunityIcons name={"pencil"} />}
            size={RFValue(3)}
            color={Colors.WHITE}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[StC.flexR, { flex: 1, alignItems: "center" }]}
        activeOpacity={0.5}
        onPress={onPress}>
        <View style={styles.cardText}>
          <Text style={styles.textDay} numberOfLines={1}>
            {item?.name}
          </Text>
          <View style={StC.flexR}>
            <Text style={styles.textTime} numberOfLines={2}>
              {item.desc ? item.desc : "-"}
            </Text>
          </View>
        </View>
        <Icon
          as={<MaterialCommunityIcons name={"chevron-right"} />}
          size={RFValue(6)}
          color={Colors.GRAY_SOFT}
        />
      </TouchableOpacity>
    </View>
  );
}

export default CardWasteBankProductCategory;

const styles = {
  cardMenu: {
    ...StC.flexR,
    backgroundColor: Colors.WHITE,
    borderBottomWidth: RFValue(2),
    borderColor: Colors.BACKGROUND,
    alignItems: "center",
    paddingLeft: RFValue(15),
    paddingRight: RFValue(10),
    height: RFValue(70),
  },
  cardText: {
    flex: 1,
  },
  textDay: {
    ...Font.F12,
    ...Font.DARK,
  },
  textTime: {
    ...Font.F11,
    ...Font.GRAY_LABEL,
    ...StC.mT3,
  },
  btn: {
    ...StC.centerPage,
    backgroundColor: Colors.SUCCESS,
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFValue(15),
    marginRight: RFValue(10),
  },
};
