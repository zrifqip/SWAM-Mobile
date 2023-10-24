import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Text } from "react-native";
import { Avatar } from "react-native-paper";
import { Colors } from "../../styles";
import TypographyText from "../typography/typographyText";
import { responsiveHeight } from "../../utils";

const AvatarIcon = ({
  onPress,
  text,
  textColor,
  bgColor,
  size,
  useText = true,
}) => {
  const getInitials = (text) => {
    const initial = text?.split(" ");
    if (initial?.length === 1) {
      return initial?.[0]?.[0];
    } else {
      return initial?.[0]?.[0] + initial?.[1]?.[0];
    }
  };

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={onPress}
      style={{
        flexDirection: "column",
        textAlign: "center",
        marginRight: 10,
      }}>
      <>
        <Avatar.Text
          size={size}
          labelStyle={{ fontSize: 24, marginTop: responsiveHeight(-3) }}
          label={getInitials(text)}
          style={{ backgroundColor: bgColor }}
          color={textColor}
        />
        {useText && (
          <TypographyText
            text={text}
            numberOfLines={1}
            style={{ textAlign: "center", width: 50, marginTop: 5 }}
            fontSize="S"
          />
        )}
      </>
    </TouchableHighlight>
  );
};

export default AvatarIcon;
