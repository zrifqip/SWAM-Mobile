import React from "react";
import { View } from 'react-native';
import { Colors } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";

const CardSeparator = ({
    style
}) => { 
    return (
        <View style={[styles.card, style]}/>
    )
}

export default CardSeparator;

const styles = ({
    card:{
        width: '100%',
        height: RFValue(8),
        backgroundColor: Colors.BACKGROUND,
    }
})