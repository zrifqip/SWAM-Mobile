import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {StC, Font, Colors} from '@styles';

export default StyleSheet.create({
  cover: {
    ...StC.wh100,
  },
  cardForm: {
    marginTop: RFValue(220),
    marginHorizontal: RFValue(20),
    borderRadius: RFValue(10),
  },
  labelSignIn: {
    ...Font.F11,
    ...Font.Regular,
    ...Font.BLACK,
    ...StC.mT10,
  },
  labelForgot: {
    ...StC.mB15,
    ...Font.F11,
    ...Font.Medium,
    ...Font.PRIMARY,
    textAlign: 'right',
  },
});
