import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Colors, Font, StC, Shadow } from "@styles";
import { RFValue } from 'react-native-responsive-fontsize';
import { MyView } from "@components";

const FormInputSwitch = ({ label, onPress, hide, loading, isSwitch, style }) => (
    <MyView hide={hide} style={[styles.card, style]}>
        <TouchableOpacity activeOpacity={0.5} style={[styles.flex, isSwitch ? styles.active : styles.inactive]} disabled={loading} onPress={()=>onPress()}>
            <Text style={[styles.label, isSwitch ? Font.BLACK : Font.WHITE]}>{label[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={[styles.flex, !isSwitch ? styles.active : styles.inactive]} disabled={loading} onPress={()=>onPress()}>
            <Text style={[styles.label, !isSwitch ?  Font.BLACK : Font.WHITE]}>{label[1]}</Text>
        </TouchableOpacity>
    </MyView>
)

export default FormInputSwitch;

const styles = ({
    card:{
        ... StC.flexR,
        ... Shadow.Normal,
        ... StC.mB5,
        height: RFValue(25),
    },
    flex:{
        ... StC.flexR,
        ... StC.centerPage,
        paddingHorizontal: RFValue(15),
        borderRadius: RFValue(5),
        marginRight: RFValue(10),
        borderWidth: RFValue(1)
    },
    active:{
        backgroundColor: Colors.GRAY_SOFT, 
        borderColor: Colors.GRAY_SOFT
    },
    inactive:{
        backgroundColor: Colors.PRIMARY, 
        borderColor: Colors.PRIMARY
    },
    label:{
        ... Font.Regular, 
        ... Font.F11,
    }
})
