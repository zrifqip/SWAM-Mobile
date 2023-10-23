import React from "react";
import { Text, View } from "react-native";
import { Colors, Font, StC } from "@styles";
import { RFValue } from 'react-native-responsive-fontsize';
import { MyView, TypographyText } from "@components";
import { requireds } from "@constants";
import CurrencyInput from 'react-native-currency-input';

const FormInputCurrency = ({
    hide,
    label,
    value,
    onChangeText,
    placeholder,
    isError,
    errorMessage,
    required,
    prefix,
    suffix,
    delimiter,
    separator,
    precision,
    onBlur
}) => {

    return (
        <MyView hide={hide} style={{flex:1}}>
            {label ? <Text style={StC.title}>{label} {requireds(required)}</Text> : null }
            <View style={styles.cardInput} >
                <CurrencyInput
                    value={value}
                    onChangeValue={onChangeText}
                    onBlur={onBlur}
                    prefix={prefix}
                    suffix={suffix}
                    delimiter={delimiter}
                    separator={separator}
                    precision={precision}
                    style={styles.currencyInput}
                    keyboardType="number-pad"
                    placeholder={placeholder ? placeholder : precision == 2 ? '0,0' : '0'}
                    ditabled={false}
                    minValue={0}
                    maxLength={17}
                />
            </View>
            {isError ? <TypographyText text={errorMessage} fontSize="XS" style={styles.errorText}/> : null}
        </MyView>
    )
}

export default FormInputCurrency;

const styles = ({
    cardInput:{
        flex: 1,
        marginBottom: RFValue(10),
        borderWidth: RFValue(1),
        borderColor: Colors.GRAY_SOFT,
        borderRadius: RFValue(4),
        paddingHorizontal: RFValue(10),
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
    currencyInput:{
        ... Font.BLACK
    }
})
