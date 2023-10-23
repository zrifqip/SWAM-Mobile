import React from "react";
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { StC, Colors, Font } from "@styles";
import { Icon } from "native-base";
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const IconCamera = () => {
    return <Icon as={<MaterialCommunityIcons name={'account'}/>} size={RFValue(8)} color={Colors.GRAY}/>
}

const FormInputPhoto = (props) => (
    <View style={[StC.flexR, {flex:1}]}>
        <View style={styles.cardImage}>
            {props.fileUri == '' ?
                IconCamera()
            : 
                <Image style={[StC.wh100, {borderRadius: RFValue(7)}]} source={{uri : props.fileUri}} />
            } 
        </View>
        <View style={styles.cardLabel}>
            <Text style={StC.titleForm}>{props.label}</Text>
            <TouchableOpacity style={styles.btnUpload} activeOpacity={0.6} onPress={props.onPress}>
                <Text style={styles.labelUpload}>UPLOAD PHOTO</Text>
            </TouchableOpacity>
        </View>
    </View>
)

export default FormInputPhoto


const styles = ({
    cardImage :{
        ... StC.centerPage,
        width: RFValue(70),
        height: RFValue(70),
        borderRadius: RFValue(7),
        backgroundColor: Colors.GRAY_SOFT,
        marginBottom: RFValue(10),
        marginRight: RFValue(15),
    },
    cardLabel:{
        paddingTop: RFValue(2),
        alignItems: 'flex-start',
    },
    note:{
        ... Font.F9,
        ... Font.GRAY_LIGHT,
        marginTop: RFValue(4),
        
    },
    btnUpload:{
        marginTop: RFValue(7),
        borderWidth:1,
        paddingHorizontal: RFValue(10) ,
        paddingVertical: RFValue(6),
        borderRadius: RFValue(5),
        borderColor: Colors.GRAY_SOFT,
    },
    labelUpload:{
        ... Font.PRIMARY,
        ... Font.F9,
        ... Font.InterSemiBold,
    },
    iconCamera:{
        ... Font.GRAY_LIGHT,
        ... Font.F25
    }
})
