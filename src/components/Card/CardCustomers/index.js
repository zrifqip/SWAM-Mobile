import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { StC, Font, Colors } from "@styles";
import { RFValue } from 'react-native-responsive-fontsize';
import { currencyFloat } from '@constants';
import { base_uri } from "@constants/BASE_URL";
import { useTranslation } from "@utils";

function CardCustomers({ 
    item, 
    onPress,
    customers = false
}) {

    const { translations }  = useTranslation();

    return (
        <TouchableOpacity style={styles.cardMenu} activeOpacity={0.5} onPress={onPress}>
            <Image
                source={{
                uri:
                    item?.photo?.length > 0
                    ? base_uri + item?.photo[0]?.original?.path
                    : "https://www.haliburtonforest.com/wp-content/uploads/2017/08/placeholder-square.jpg",
                }}
                style={styles.image}
            />
            <View style={styles.cardText}>
                <Text style={styles.textCompany} numberOfLines={1}>{item.fullName}</Text>
                <Text style={styles.textStreet}>{item.address?.street}</Text>
                {customers ? <Text style={styles.price}>{translations["balance"]}: {currencyFloat(item.balance)}</Text> : null}
            </View>
        </TouchableOpacity>
    )
}

export default CardCustomers;

const styles = ({
    cardMenu:{
        ... StC.flexR,
        marginHorizontal: RFValue(15),
        borderRadius: RFValue(10),
        height: RFValue(75),
        marginBottom: RFValue(10),
        backgroundColor: Colors.WHITE,
        shadowOffset: {
            width: 0,
            height: 0,
          },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowColor: Colors.BLACK,
        elevation: 1,
    },
    cardText:{
        padding: RFValue(8),
        flex: 1
    },
    textCompany:{
        ... Font.F12,
        ... Font.DARK,
        ... Font.SemiBold,
    },
    image:{
        width: RFValue(90),
        height: RFValue(75),
        borderRadius: 10,
    },
    textStreet:{
        ... Font.F10,
        ... Font.GRAY_LABEL,
        ... StC.mT5,
        ... Font.Regular,
    },
    price:{
        ... Font.F11,
        ... Font.PRIMARY,
        ... Font.Medium,
        ... StC.mT5,
        textAlign: 'right',
    },
})
