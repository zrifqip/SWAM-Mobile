import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {StC, Font, Colors} from '@styles';
import {RFValue} from 'react-native-responsive-fontsize';
import {arrDay} from '@constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CardWasteBankScheduleList({item, onPress}) {
  return (
    <TouchableOpacity
      style={styles.cardMenu}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <View style={styles.cardIcon}>
        <Icon
          as={MaterialCommunityIcons}
          name={'timetable'}
          color={Colors.GRAY_LABEL}
          size={RFValue(8)}
        />
      </View>
      <View style={styles.cardText}>
        <Text style={styles.textCompany} numberOfLines={1}>
          {arrDay(item?.day)}
        </Text>
        <Text style={styles.distance}>
          {item.startTime} - {item.endTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default CardWasteBankScheduleList;

const styles = {
  cardMenu: {
    ...StC.flexR,
    marginHorizontal: RFValue(15),
    borderRadius: RFValue(10),
    height: RFValue(60),
    marginBottom: RFValue(10),
    backgroundColor: Colors.WHITE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowColor: Colors.BLACK,
    elevation: 1,
    alignItems: 'center',
  },
  cardText: {},
  textCompany: {
    ...Font.F14,
    ...Font.DARK,
  },
  distance: {
    ...Font.F11,
    ...Font.GRAY_LABEL,
    ...StC.mT5,
  },
  cardIcon: {
    ...StC.centerPage,
    width: RFValue(60),
    height: RFValue(60),
  },
};
