import React from "react";
import { View, ScrollView, Image } from "react-native";
import { StC } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import { Images } from "@assets";

function CardBannerDashboard({}) {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <View style={styles.cardBanner}>
        {[Images.background2, Images.background3].map((item, index) => (
          <Image key={index} source={item} style={[styles.banner]} />
        ))}
      </View>
    </ScrollView>
  );
}

export default CardBannerDashboard;

const styles = {
  cardBanner: {
    ...StC.flexR,
    paddingLeft: RFValue(15),
    marginTop: RFValue(20),
  },
  banner: {
    width: RFValue(250),
    height: RFValue(90),
    marginRight: RFValue(15),
    borderRadius: RFValue(10),
  },
};
