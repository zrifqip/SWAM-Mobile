import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { useTheme } from "react-native-paper";
import PropTypes from "prop-types";

import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import TypographyText from "../typography/typographyText";
import { Colors } from "../../styles";

const Avatar = ({
  style,
  labelStyle,
  avatarURI,
  avatar,
  username,
  size,
  initialLength,
}) => {
  const theme = useTheme();
  const getInitials = (name) =>
    name &&
    name
      .replace(/[^A-Za-z0-9À-ÿ ]/gi, "")
      .replace(/ +/gi, " ")
      .split(/ /)
      .reduce((acc, item) => acc + item[0], "")
      .concat(name.substr(1))
      .concat(name)
      .substr(0, initialLength)
      .toUpperCase();

  const sizeStyle = {
    width: size === "small" ? wp(9.2) : size === "large" ? wp(31.6) : wp(10.2),
    height: size === "small" ? wp(9.2) : size === "large" ? wp(31.6) : wp(10.2),
  };
  const imageSize = {
    width: size === "small" ? 9.2 : size === "large" ? 31.6 : 10.2,
  };

  return avatarURI || avatar ? (
    <Image
      source={{ uri: avatarURI }}
      style={{
        ...style,
        width: wp(imageSize.width),
        height: wp(imageSize.width),
      }}
    />
  ) : (
    <View style={{ ...styles.container, ...sizeStyle, ...style }}>
      <TypographyText
        text={getInitials(username)}
        fontSize={size === "small" ? "M" : size === "large" ? "XL" : "XM"}
        fontType="bold"
        style={{
          ...labelStyle,
        }}
        color={Colors.WHITE}
      />
    </View>
  );
};

Avatar.propTypes = {
  style: PropTypes.object,
  labelStyle: PropTypes.object,
  avatarURI: PropTypes.string,
  avatar: PropTypes.any,
  username: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "regular", "large"]),
  initialLength: PropTypes.number.isRequired,
};

Avatar.defaultProps = {
  size: "regular",
  initialLength: 2,
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 100,
  },
});
