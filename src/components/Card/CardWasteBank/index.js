import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StC, Font, Colors } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import { numberFloat } from "@constants";
import { base_uri } from "@constants/BASE_URL";

function CardWasteBank({ item, index, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.cardMenu, index == 0 && { marginLeft: RFValue(15) }]}
      activeOpacity={0.5}
      onPress={onPress}>
      <Image
        source={{
          uri:
            item?.image?.length > 0
              ? base_uri + item?.image[0].original?.path
              : "https://www.haliburtonforest.com/wp-content/uploads/2017/08/placeholder-square.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.cardText}>
        <Text style={styles.textCompany} numberOfLines={1}>
          {item?.companyName}
        </Text>
        <Text style={styles.distance}>
          {numberFloat(item.distance.toFixed(2))} km
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default CardWasteBank;

const styles = {
  cardMenu: {
    marginRight: RFValue(10),
    borderRadius: RFValue(10),
    width: RFValue(170),
    height: RFValue(135),
    marginBottom: RFValue(5),
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
  cardText: {
    padding: RFValue(8),
  },
  textCompany: {
    ...Font.F11,
    ...Font.DARK,
    ...Font.SemiBold,
  },
  image: {
    width: "100%",
    height: RFValue(80),
    borderRadius: 10,
  },
  textServices: {
    ...Font.F10,
    ...Font.DARK,
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(1),
    marginRight: RFValue(8),
  },
  distance: {
    ...Font.F10,
    ...Font.GRAY_LABEL,
    ...Font.Regular,
    ...StC.mT10,
  },
};
