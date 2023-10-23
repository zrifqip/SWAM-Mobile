import React from "react";
import { Text } from "react-native";
import { Icon, Input } from "native-base";
import { Colors, Font, StC } from "@styles";
import { RFValue } from 'react-native-responsive-fontsize';
import { MyView, TypographyText } from "@components";
import { requireds } from "@constants";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FormInput = ({
    hide,
    label,
    value,
    onChangeText,
    onBlur,
    placeholder,
    secureTextEntry,
    editable,
    keyboardType,
    password,
    setShow,
    isError,
    errorMessage,
    required
}) => {

    return (
        <MyView style={styles.cardInput} hide={hide}>
            {label ? <Text style={StC.title}>{label} {requireds(required)}</Text> : null }
            <Input 
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                placeholder={placeholder}
                style={[styles.input, editable == false && {backgroundColor: Colors.GRAY_SOFT}]}
                secureTextEntry={secureTextEntry}
                editable={editable}
                keyboardType={keyboardType}
                InputRightElement={password && <Icon as={<MaterialCommunityIcons name={secureTextEntry ? "eye" : "eye-off"}/>} size={RFValue(5)} style={{marginRight: RFValue(10)}} color={Colors.GRAY} onPress={setShow}/>}
            />
            {isError ? <TypographyText text={errorMessage} fontSize="XS" style={styles.errorText}/> : null}
        </MyView>
    )
}

export default FormInput;

const styles = ({
    cardInput:{
        flex: 1,
        marginBottom: RFValue(10),
    },
    input:{
        ... Font.Regular,
        ... Font.F12,
        ... Font.BLACK,
    },
    errorText:{
        ... Font.DANGER,
        ... StC.mT3,
    },
})
