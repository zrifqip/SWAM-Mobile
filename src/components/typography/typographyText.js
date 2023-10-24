import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {FONT_SIZES, SIZES, LINE_HEIGHTS} from './fontSize';
import {Colors} from '@styles';
import PropTypes from 'prop-types';

export default function TypographyText({
  fontType = 'regular',
  fontSize = 'XM',
  color = Colors.BLACK,
  text = '',
  style = {},
  ...otherProps
}) {
  let idx =
    SIZES.indexOf(fontSize.toUpperCase()) !== -1
      ? SIZES.indexOf(fontSize.toUpperCase())
      : 1;

  return (
    <Text
      {...otherProps}
      style={{
        color,
        fontSize: FONT_SIZES[idx],
        // fontFamily: fontType == "regular" ? "Lato-Regular" : "Lato-Bold",
        fontWeight: fontType == 'regular' ? 'normal' : '500',
        lineHeight: LINE_HEIGHTS[idx],
        ...style,
      }}
    >
      {text}
    </Text>
  );
}

TypographyText.propTypes = {
  fontType: PropTypes.string,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
};

TypographyText.defaultProps = {
  fontType: 'regular',
  fontSize: 'XM',
  color: Colors.BLACK,
};

const styles = StyleSheet.create({});
