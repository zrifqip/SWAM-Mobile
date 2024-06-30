import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StC, Font, Colors } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import { formatDateChats } from "@constants";
import { connect } from "react-redux";
import { base_uri } from "@constants/BASE_URL";

function CardChats({ item, onPress, users }) {
  let respon = item.from;

  if (users.users._id == item.from?._id) {
    respon = item.to;
  }

  let image = "https://ponpesjihadulummah.com/api/image/get/alumni/";
  if (respon.image.length != 0) {
    image = base_uri + respon.image[0].thumb.path;
  }

  return (
    <TouchableOpacity
      style={styles.cardMenu}
      activeOpacity={0.5}
      onPress={onPress}>
      <View style={styles.profile}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.textDay} numberOfLines={1}>
          {respon.name}
        </Text>
        <View style={[StC.flexR, StC.mT5, { alignItems: "flex-end" }]}>
          <Text style={styles.textMessage} numberOfLines={1}>
            {item.lastMsg?.msg}
          </Text>
          <Text style={styles.textTime}>
            {formatDateChats(item.lastMsg?.datetime)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const mapStateToProps = function (state) {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(CardChats);

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
  textDay: {
    ...Font.F12,
    ...Font.DARK,
  },
  textMessage: {
    flex: 1,
    ...Font.F11,
    ...Font.GRAY_LABEL,
  },
  textTime: {
    ...Font.F9,
    ...Font.GRAY_LABEL,
  },
  profile: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(30),
    borderWidth: RFValue(1),
    marginRight: RFValue(10),
    borderColor: Colors.GRAY_SOFT,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: RFValue(30),
  },
};
