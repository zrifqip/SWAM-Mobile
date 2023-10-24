import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StC, Font, Colors } from "@styles";
import { formatDateTime, currencyFloat } from "@constants";
import { RFValue } from "react-native-responsive-fontsize";

function CardWithdrawWasteBank({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.cardMenu}
      activeOpacity={0.5}
      onPress={onPress}>
      <View style={StC.flexR}>
        <Text style={styles.textName} numberOfLines={1}>
          {item.customer?.fullName}
        </Text>
        <Text
          style={[
            styles.textType,
            {
              backgroundColor:
                item.status == "pending" ? Colors.THIRD : Colors.SECONDARY,
            },
          ]}
          numberOfLines={1}>
          {item.status}
        </Text>
      </View>
      <View style={[StC.flexR, StC.mT10, { alignItems: "flex-end" }]}>
        <Text style={styles.status}>{currencyFloat(item.nominal)}</Text>
        <Text style={styles.textDate}>{formatDateTime(item.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CardWithdrawWasteBank;

const styles = {
  cardMenu: {
    marginHorizontal: RFValue(15),
    borderRadius: RFValue(10),
    marginBottom: RFValue(10),
    padding: RFValue(10),
    backgroundColor: Colors.WHITE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowColor: Colors.BLACK,
    elevation: 1,
  },
  textName: {
    ...Font.F12,
    ...Font.DARK,
    ...Font.Medium,
    flex: 1,
  },
  textType: {
    ...Font.F10,
    ...Font.DARK,
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(1),
  },
  status: {
    ...Font.F13,
    ...Font.Regular,
    ...Font.PRIMARY,
    flex: 1,
  },
  textDate: {
    ...Font.F10,
    ...Font.GRAY_LABEL,
    ...Font.Medium,
  },
};
