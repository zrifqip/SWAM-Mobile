import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { StC, Font, Colors } from "@styles";
import { RFValue } from 'react-native-responsive-fontsize';
import { arrDay } from '@constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CardScheduleResult({ 
    item, 
    onPress 
}) {
    return (
        <TouchableOpacity style={styles.cardMenu} activeOpacity={0.5} onPress={onPress}>
            <View style={styles.cardText}>
                <Text style={styles.textDay} numberOfLines={1}>{arrDay(item?.day)}</Text>
                <View style={StC.flexR}>
                    <Text style={styles.textTime}>{`${item?.startTime} - ${item?.endTime}`}</Text>
                </View>
            </View>
            <Icon as={<MaterialCommunityIcons name={'chevron-right'}/>} size={RFValue(6)} color={Colors.GRAY_SOFT} />
        </TouchableOpacity>
    )
}

export default CardScheduleResult;

const styles = ({
    cardMenu:{
        ... StC.flexR,
        backgroundColor: Colors.WHITE,
        borderBottomWidth: RFValue(2),
        borderColor: Colors.BACKGROUND,
        alignItems: 'center',
        paddingLeft: RFValue(15),
        paddingRight: RFValue(10),
        paddingVertical: RFValue(10)
    },
    cardText:{
        flex:1,
    },
    textDay:{
        ... Font.F12,
        ... Font.DARK,
    },
    textTime:{
        ... Font.F11,
        ... Font.GRAY_LABEL,
        ... StC.mT3
    }
})
