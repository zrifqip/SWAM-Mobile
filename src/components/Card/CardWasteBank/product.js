import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StC, Font, Colors } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import { currencyFloat, numberFloat } from "@constants";
import { base_uri } from "@constants/BASE_URL";

function CardWasteBankProduct({ item, index, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.cardMenu, index == 0 && { marginLeft: RFValue(15) }]}
      activeOpacity={0.5}
      onPress={onPress}>
      <Image
        source={{
          uri:
            item?.images?.length > 0
              ? base_uri + item?.images[0]?.original?.path
              : "https://www.haliburtonforest.com/wp-content/uploads/2017/08/placeholder-square.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.cardText}>
        <Text style={styles.textCompany} numberOfLines={1}>
          {item?.name}
        </Text>
        <View style={styles.cardPrice}>
          <Text style={styles.price}>{currencyFloat(item?.sellingPrice)}</Text>
          <Text style={styles.distance}>{numberFloat(item.weight)} kg</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CardWasteBankProduct;

const styles = {
  cardMenu: {
    marginRight: RFValue(10),
    borderRadius: RFValue(10),
    width: RFValue(150),
    height: RFValue(130),
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
    ...Font.F12,
    ...Font.DARK,
    ...Font.SemiBold,
  },
  image: {
    width: "100%",
    height: RFValue(70),
    borderRadius: 10,
  },
  price: {
    ...Font.F12,
    ...Font.DARK,
    ...Font.Medium,
    flex: 1,
  },
  distance: {
    ...Font.F10,
    ...Font.GRAY_LABEL,
    ...Font.Regular,
  },
  cardPrice: {
    ...StC.flexR,
    ...StC.mT10,
    alignItems: "flex-end",
  },
};
