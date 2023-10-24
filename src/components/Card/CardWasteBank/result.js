import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import { StC, Font, Colors } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import { serviceWasteBank, numberFloat } from "@constants";
import { MyView } from "@components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function CardWasteBankResult({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.cardMenu}
      activeOpacity={0.5}
      onPress={onPress}>
      <View style={styles.cardText}>
        <Text style={styles.textCompany} numberOfLines={1}>
          {item?.companyName}
        </Text>
        <View style={StC.flexR}>
          <View style={{ flex: 1 }}>
            <View style={[StC.flexR, StC.mT10]}>
              {serviceWasteBank(item?.companyService).map((service) => (
                <Text
                  style={[
                    styles.textServices,
                    { backgroundColor: service.color },
                  ]}>
                  {service.name}
                </Text>
              ))}
            </View>
            <Text style={styles.km}>
              {numberFloat(item.distance.toFixed(2))} km
            </Text>
          </View>
          <MyView
            style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
            hide={parseFloat(item.distance) < 5}>
            <Text style={styles.distance}>Jarak terlalu jauh</Text>
          </MyView>
        </View>
      </View>
      <Icon
        as={<MaterialCommunityIcons name={"chevron-right"} />}
        size={RFValue(6)}
        color={Colors.GRAY_SOFT}
      />
    </TouchableOpacity>
  );
}

export default CardWasteBankResult;

const styles = {
  cardMenu: {
    ...StC.flexR,
    backgroundColor: Colors.WHITE,
    borderBottomWidth: RFValue(2),
    borderColor: Colors.BACKGROUND,
    alignItems: "center",
    paddingLeft: RFValue(15),
    paddingRight: RFValue(10),
    paddingVertical: RFValue(10),
  },
  cardText: {
    flex: 1,
  },
  textCompany: {
    ...Font.F11,
    ...Font.DARK,
  },
  image: {
    width: RFValue(100),
    height: RFValue(70),
    borderRadius: 10,
  },
  textServices: {
    ...Font.F10,
    ...Font.DARK,
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(2),
    marginRight: RFValue(5),
  },
  distance: {
    ...Font.F10,
    ...Font.DARK,
    ...Font.WHITE,
    backgroundColor: Colors.DANGER,
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(2),
  },
  km: {
    ...Font.F10,
    ...Font.GRAY_LABEL,
    ...StC.mT3,
  },
};
