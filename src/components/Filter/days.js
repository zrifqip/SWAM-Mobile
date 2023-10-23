import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StC, Font, Colors } from "@styles";
import { RFValue } from 'react-native-responsive-fontsize';
import { arrDayAll } from '@constants';

function FilterDays({ 
    selected, 
    onPress 
}) {

    return (
        <View style={{paddingBottom: RFValue(5)}}>
            <ScrollView horizontal style={{ paddingLeft: RFValue(15)}} showsHorizontalScrollIndicator={false}>
                {arrDayAll().map((item, index) => (
                    <TouchableOpacity
                        onPress={() => onPress(item.key)}
                        style={[styles.filter, {backgroundColor: selected == item.key ? Colors.PRIMARY : Colors.GRAY_SOFT}, index == 7 && {marginRight: RFValue(30)}]}
                    >
                        <Text style={[styles.labelFilter, {color: selected == item.key ? Colors.WHITE : Colors.BLACK}]}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default FilterDays;

const styles = ({
    filter:{
        ... StC.centerPage,
        paddingVertical: RFValue(5),
        paddingHorizontal: RFValue(15),
        borderRadius: RFValue(20),
        marginRight: RFValue(10),
        marginVertical: RFValue(10),
        height: RFValue(30)
    },
    labelFilter:{
        ... Font.F11,
        ... Font.Regular
    }
})
