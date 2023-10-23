import { StyleSheet } from "react-native";
import { Colors } from "@styles";
import { RFValue } from 'react-native-responsive-fontsize';

export default StyleSheet.create({

    Bold:{
        fontFamily:'Poppins-Bold'
    },
    BoldItalic:{
        fontFamily:'Poppins-BoldItalic'
    },
    ExtraLight:{
        fontFamily:'Poppins-ExtraLight'
    },
    Light:{
        fontFamily:'Poppins-Light.ttf'
    },
    Medium:{
        fontFamily:'Poppins-Medium'
    },
    Regular:{
        fontFamily:'Poppins-Regular'
    },
    SemiBold:{
        fontFamily:'Poppins-SemiBold'
    },

    F7:{
        fontSize: RFValue(7),
    },
    F8:{
        fontSize: RFValue(8),
    },
    F9:{
        fontSize: RFValue(9),
    },
    F10:{
        fontSize: RFValue(10),
    },
    F11:{
        fontSize: RFValue(11),
    },
    F12:{
        fontSize: RFValue(12),
    },
    F13:{
        fontSize: RFValue(13),
    },
    F14:{
        fontSize: RFValue(14),
    },
    F15:{
        fontSize: RFValue(15),
    },
    F16:{
        fontSize: RFValue(16),
    },
    F17:{
        fontSize: RFValue(17),
    },
    F18:{
        fontSize: RFValue(18),
    },
    F19:{
        fontSize: RFValue(19),
    },
    F20:{
        fontSize: RFValue(20),
    },
    F25:{
        fontSize: RFValue(25),
    },
    F30:{
        fontSize: RFValue(30),
    },
    F35:{
        fontSize: RFValue(35),
    },
    F40:{
        fontSize: RFValue(40),
    },
    F50:{
        fontSize: RFValue(50),
    },

    WHITE:{
        color: Colors.WHITE
    },
    WHITE_DARK:{
        color: Colors.WHITE_DARK
    },
    PRIMARY:{
        color: Colors.PRIMARY
    },
    PRIMARY_SOFT:{
        color: Colors.PRIMARY_SOFT
    },
    SECONDARY:{
        color: Colors.SECONDARY
    },
    BLACK:{
        color: Colors.BLACK
    },
    BLACK_SOFT:{
        color: Colors.BLACK_SOFT
    },
    GRAY_LABEL:{
        color: Colors.GRAY_LABEL
    },
    GRAY_SOFT:{
        color: Colors.GRAY_SOFT
    },
    GRAY_LIGHT:{
        color: Colors.GRAY_LIGHT
    },
    DARK:{
        color: Colors.DARK
    },
    DANGER:{
        color: Colors.DANGER
    },
    SUCCESS:{
        color: Colors.SUCCESS
    },
    WARNING:{
        color: Colors.WARNING
    },

    titleCenter:{
        fontSize: RFValue(15),
        fontFamily:'Poppins-Medium',
        color: Colors.BLACK,
        textAlign:'center'
    },
    descCenter:{
        fontSize: RFValue(11),
        fontFamily:'Poppins-Regular',
        color: Colors.BLACK,
        textAlign:'center'
    },
    titleMenu:{
        fontSize: RFValue(12),
        fontFamily:'Poppins-Medium',
        color: Colors.DARK,
        marginHorizontal: RFValue(15),
        marginBottom: RFValue(10),
    },
    subTitle:{
        fontSize: RFValue(11),
        fontFamily:'Poppins-Regular',
        color: Colors.BLACK_SOFT,
        marginHorizontal: RFValue(15),
        marginBottom: RFValue(10),
        marginTop: RFValue(-5),
        flex: 1
    },

    required:{
        fontSize: RFValue(12),
        color: Colors.DANGER,
    },
})
