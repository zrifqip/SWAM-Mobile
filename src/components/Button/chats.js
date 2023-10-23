import React from "react";
import { Text, TouchableOpacity, Image } from 'react-native';
import { Icons } from "@assets";
import { RFValue } from 'react-native-responsive-fontsize';
import { Font } from '@styles';

const ButtonChats = ({
    hide,
    onPress
}) => (
    !hide &&
    <TouchableOpacity style={styles.btnChat} activeOpacity={0.5} onPress={onPress}>
        <Image source={Icons.chat} style={styles.iconChat}/>
        <Text style={styles.count}></Text>
    </TouchableOpacity>
)

export default ButtonChats;

const styles = ({
    btnChat:{
        width: RFValue(50),
        height: RFValue(50),
        position: 'absolute',
        bottom: RFValue(10),
        right: RFValue(10),
    },
    iconChat:{
        width: '100%',
        height:'100%'
    },
    count:{
        ... Font.F12,
        ... Font.PRIMARY,
        ... Font.SemiBold,
        position: 'absolute',
        left: RFValue(18),
        top: RFValue(12)
    }
})