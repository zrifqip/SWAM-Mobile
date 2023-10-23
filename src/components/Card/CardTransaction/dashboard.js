import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StC, Font, Colors } from "@styles";
import { formatDateDay, arrStatus, currencyFloat } from "@constants";
import { RFValue } from 'react-native-responsive-fontsize';

function CardTrasactionDashboard({ 
    item,  
    onPress,
    index
}) {

    let status = arrStatus(item.status)

    return (
        <TouchableOpacity style={[styles.cardMenu, index == 0 && {marginLeft: RFValue(15)}]} activeOpacity={0.5} onPress={onPress}>
            <Text style={styles.item}>Berat Sampah : {item.totalWeight} kg</Text>
            <Text style={styles.item}>Total Transaksi : {currencyFloat(item?.totalPrice)}</Text>
            <View style={[StC.flexR, StC.mT10]}>
                <Text style={styles.date}>{formatDateDay(item.date)}</Text>   
                <Text style={[styles.status, {color: status.color}]}>{status.label}</Text>          
            </View>
        </TouchableOpacity>
    )
}

export default CardTrasactionDashboard;

const styles = ({
    cardMenu:{
        marginRight: RFValue(10),
        width: RFValue(190),
        height: RFValue(80),
        borderRadius: RFValue(10),
        marginBottom: RFValue(10),
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
    item:{
        ... Font.F12,
        ... Font.DARK,
        ... Font.Medium,
    },
    date:{
        ... Font.F10,
        ... Font.GRAY_LABEL,
        ... Font.Regular,
        flex: 1
    },
    status:{
        ... Font.F11,
        ... Font.Medium,
    },
})
