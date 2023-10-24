import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {StC, Font, Colors} from '@styles';
import {arrStatus, formatDateTime, currencyFloat} from '@constants';
import {RFValue} from 'react-native-responsive-fontsize';

function CardTrasactionWasteBank({item, onPress}) {
  let status = arrStatus(item.status);

  return (
    <View style={styles.cardMenu}>
      <View style={{flex: 1}}>
        <Text style={styles.name}>{item?.customer?.fullName}</Text>
        <Text style={styles.item}>Berat Sampah : {item.totalWeight} kg</Text>
        <Text style={styles.item}>
          Total Transaksi : {currencyFloat(item?.totalPrice)}
        </Text>
        <Text style={[styles.status, {color: status.color}]}>
          {status.label}
        </Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.date} numberOfLines={1}>
          {formatDateTime(item.date)}
        </Text>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.5}
          onPress={onPress}
        >
          <Text style={styles.textBtn}>Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CardTrasactionWasteBank;

const styles = {
  cardMenu: {
    ...StC.flexR,
    marginHorizontal: RFValue(15),
    borderRadius: RFValue(10),
    marginBottom: RFValue(1),
    marginTop: RFValue(10),
    padding: RFValue(10),
    backgroundColor: Colors.WHITE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowColor: Colors.BLACK,
    elevation: 1,
  },
  name: {
    ...Font.F13,
    ...Font.DARK,
    ...Font.SemiBold,
    ...StC.mB5,
  },
  item: {
    ...Font.F12,
    ...Font.DARK,
    ...Font.Medium,
  },
  date: {
    ...Font.F10,
    ...Font.GRAY_LABEL,
    ...Font.Regular,
  },
  status: {
    ...Font.F11,
    ...Font.Medium,
    ...Font.GRAY_LIGHT,
    ...StC.mT10,
  },
  btn: {
    ...StC.mT15,
    paddingVertical: RFValue(4),
    paddingHorizontal: RFValue(15),
    borderRadius: RFValue(5),
    backgroundColor: Colors.PRIMARY,
  },
  textBtn: {
    ...Font.F12,
    ...Font.WHITE,
    ...Font.Medium,
  },
};
