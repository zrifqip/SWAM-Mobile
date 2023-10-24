import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Center} from 'native-base';
import {Font, StC, Colors} from '@styles';
import {Icons} from '@assets';
import {RFValue} from 'react-native-responsive-fontsize';

const EmptyData = ({message, small, list, onPress, buttonText}) => {
  return (
    <Center
      style={{
        paddingTop: RFValue(list ? 50 : 200),
        paddingBottom: RFValue(list ? 80 : 0),
      }}
    >
      <Image
        source={Icons.emptyList}
        style={[small ? styles.small : styles.medium, {resizeMode: 'contain'}]}
      />
      <Text style={styles.txtMessage}>{message}</Text>
      {onPress && (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.5}
          onPress={onPress}
        >
          <Text style={styles.textBtn}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </Center>
  );
};

export default EmptyData;

const styles = StyleSheet.create({
  txtMessage: {
    ...Font.F12,
    ...Font.Regular,
    ...Font.DARK,
    ...StC.mT5,
  },
  small: {
    width: RFValue(40),
    height: RFValue(40),
  },
  medium: {
    width: RFValue(70),
    height: RFValue(70),
  },
  textBtn: {
    ...Font.PRIMARY,
    ...Font.Regular,
    ...Font.F11,
  },
  btn: {
    ...StC.mT10,
    borderWidth: RFValue(1),
    borderColor: Colors.PRIMARY,
    borderRadius: RFValue(3),
    paddingVertical: RFValue(3),
    paddingHorizontal: RFValue(7),
  },
});
