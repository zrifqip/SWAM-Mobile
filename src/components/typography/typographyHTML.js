import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import HTML from 'react-native-render-html';
import {SIZES, FONT_SIZES, LINE_HEIGHTS} from './fontSize';
import {Colors} from '../../styles';

export default function TypographyHTML({
  fontType = 'regular',
  fontSize = 's',
  color = Colors.BLACK,
  text = '',
  style = {},
  ...otherProps
}) {
  let idx =
    SIZES.indexOf(fontSize.toUpperCase()) !== -1
      ? SIZES.indexOf(fontSize.toUpperCase())
      : 1;

  const getTextHtml = () => {
    const pureText = [undefined, null].includes(text) ? '' : String(text);
    return Platform.OS === 'ios'
      ? pureText.replace(/<span>/g, '<b>').replace(/<\/span>/g, '</b>')
      : text;
  };

  const textStyle = {
    fontFamily: 'Lato-Regular',
    fontSize: FONT_SIZES[idx],
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',

    lineHeight: LINE_HEIGHTS[idx],
    color,
    ...style,
  };

  return (
    <HTML
      // ignoredStyles={['font-family', 'letter-spacing']}
      source={{html: getTextHtml()}}
      tagsStyles={{
        span: {
          fontFamily: 'Lato-Bold',
        },
      }}
      baseFontStyle={textStyle}
      defaultTextProps={{
        allowFontScaling: false,
      }}
    />
  );
}

const styles = StyleSheet.create({});
