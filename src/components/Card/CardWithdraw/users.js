import React from "react";
import { View, Text } from "react-native";
import { StC, Font, Colors } from "@styles";
import { formatDateTime, currencyFloat } from "@constants";
import { RFValue } from "react-native-responsive-fontsize";

function CardWithdrawUsers({ item,onpress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardMenu}>
      <View style={{ flex: 1 }}>
        <Text style={styles.textDate} numberOfLines={1}>
          {formatDateTime(item.createdAt)}
        </Text>
        <Text style={styles.status}>{currencyFloat(item.nominal)}</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={[
            styles.textType,
            {
              backgroundColor:
                item.status == "pending"
                  ? Colors.THIRD
                  : item.status == "accept"
                  ? Colors.SECONDARY
                  : Colors.DANGER,
            },
          ]}
          numberOfLines={1}>
          {item.status}
        </Text>
        <Text style={styles.method}>
          {item.method == "cash" ? "Cash" : "Transfer"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default CardWithdrawUsers;

const styles = {
  cardMenu: {
    ...StC.flexR,
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
  textDate: {
    ...Font.F11,
    ...Font.DARK,
    ...Font.Medium,
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
    ...StC.mT10,
  },
  method: {
    ...Font.F11,
    ...Font.GRAY,
    ...Font.Medium,
    ...StC.mT10,
  },
};
