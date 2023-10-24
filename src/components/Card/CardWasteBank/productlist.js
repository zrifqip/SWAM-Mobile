import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StC, Font, Colors } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import { currencyFloat, numberFloat } from "@constants";
import { MyView } from "@components";
import { base_uri } from "@constants/BASE_URL";

function CardWasteBankProductList({ item, onPress, type, all }) {
  return (
    <TouchableOpacity
      style={[styles.cardMenu, { height: RFValue(all ? 95 : 80) }]}
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
        <View style={[StC.flexR, StC.mT5]}>
          <Text style={styles.textServices}>{item?.category?.name}</Text>
        </View>
        <View style={styles.cardPrice}>
          {all ? (
            <View style={{ flex: 1 }}>
              <Text style={styles.price}>
                Harga Beli: {currencyFloat(item.purchasePrice)}
              </Text>
              <Text style={styles.price}>
                Harga Jual:{" "}
                {item.sellingPrice ? currencyFloat(item.sellingPrice) : "-"}
              </Text>
            </View>
          ) : (
            <Text style={[styles.price, { flex: 1 }]}>
              {type == "user" ? "" : currencyFloat(item.sellingPrice)}
            </Text>
          )}
          {type != "user" ? (
            <Text style={styles.distance}>{numberFloat(item.weight)} kg</Text>
          ) : null}
        </View>
        <MyView style={styles.info} hide={!item.isSell || type == "user"} />
      </View>
    </TouchableOpacity>
  );
}

export default CardWasteBankProductList;

const styles = {
  cardMenu: {
    ...StC.flexR,
    marginHorizontal: RFValue(15),
    borderRadius: RFValue(10),
    marginBottom: RFValue(10),
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
    flex: 1,
  },
  textCompany: {
    ...Font.F12,
    ...Font.DARK,
    ...Font.SemiBold,
  },
  image: {
    width: RFValue(90),
    height: "100%",
    borderRadius: 10,
  },
  textServices: {
    ...Font.F10,
    ...Font.DARK,
    ...Font.Regular,
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(1),
    marginRight: RFValue(8),
    backgroundColor: Colors.THIRD,
  },
  price: {
    ...Font.F11,
    ...Font.GRAY_LABEL,
    ...Font.Medium,
  },
  distance: {
    ...Font.F10,
    ...Font.GRAY_LABEL,
    ...Font.Regular,
  },
  cardPrice: {
    ...StC.flexR,
    ...StC.mT5,
    alignItems: "flex-end",
  },
  info: {
    width: RFValue(10),
    height: RFValue(5),
    backgroundColor: Colors.PRIMARY,
    position: "absolute",
    top: RFValue(5),
    right: RFValue(5),
    borderRadius: RFValue(5),
  },
};
