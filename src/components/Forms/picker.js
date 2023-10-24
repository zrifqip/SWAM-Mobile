import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Icon} from 'native-base';
import {StC, Font, Colors} from '@styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {requireds} from '@constants';
import {MyView} from '@components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FormInputPicker = ({
  hide,
  label,
  required,
  disabled,
  onPress,
  value,
  placeholder,
  isError,
  errorMessage,
  disabledIcon,
}) => (
  <MyView style={[{flex: 1}, StC.mB10]} hide={hide}>
    {label ? (
      <Text style={StC.title}>
        {label} {requireds(required)}
      </Text>
    ) : null}
    <TouchableOpacity
      onPress={disabled ? null : onPress}
      activeOpacity={0.5}
      style={styles.border}
    >
      <Text style={styles.text} numberOfLines={1}>
        {value ? value : placeholder}
      </Text>
      {!disabledIcon ? (
        <Icon
          as={
            <MaterialCommunityIcons
              name={disabled ? 'lock' : 'chevron-right'}
            />
          }
          size={RFValue(disabled ? 5 : 7)}
          color={Colors.GRAY_SOFT}
        />
      ) : null}
    </TouchableOpacity>
    {isError ? (
      <Text text={errorMessage} fontSize="XS" style={styles.errorText} />
    ) : null}
  </MyView>
);

export default FormInputPicker;

const styles = {
  text: {
    ...Font.Regular,
    ...Font.F12,
    ...Font.BLACK_SOFT,
    flex: 1,
  },
  icon: {
    ...Font.F9,
    ...Font.GRAY,
    paddingTop: RFValue(2),
    width: RFValue(12),
  },
  error: {
    borderColor: Colors.RED_SOFT,
  },
  iconQuest: {
    ...Font.RED_SOFT,
    ...Font.F14,
    marginRight: RFValue(5),
  },
  border: {
    ...StC.flexR,
    borderWidth: RFValue(1),
    borderColor: Colors.GRAY_SOFT,
    borderRadius: RFValue(5),
    height: RFValue(40),
    alignItems: 'center',
    paddingLeft: RFValue(15),
    paddingRight: RFValue(5),
  },
};
