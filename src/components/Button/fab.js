import React from "react";
import { Text, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';
import { Font, StC, Colors, Shadow } from '@styles';
import LinearGradient from "react-native-linear-gradient";
import Entypo from 'react-native-vector-icons/Entypo';

const ButtonFab = ({
    hide,
    onPress,
    label,
    tab
}) => (
    !hide &&
        <TouchableWithoutFeedback activeOpacity={0.8} onPress={onPress}>
            <LinearGradient colors={[Colors.PRIMARY, Colors.PRIMARY]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={[styles.cardFab, {bottom: tab ? RFValue(70) : RFValue(20)}]}>
                <Icon as={Entypo} name={'plus'} color={Colors.WHITE} size={RFValue(3)}/>
                <Text style={styles.label}>{label}</Text>
            </LinearGradient>
        </TouchableWithoutFeedback>
)

export default ButtonFab;

const styles = ({
    cardFab:{
        ... StC.flexR,
        ... Shadow.NORMAL,
        position: 'absolute',
        right: RFValue(15),
        borderRadius: RFValue(20),
        paddingVertical: RFValue(10),
        paddingHorizontal: RFValue(25),
        alignItems: 'center'
    },
    label:{
        ... Font.F11,
        ... Font.InterSemiBold,
        ... Font.WHITE,
        marginLeft: RFValue(5),
    }
})