import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StC, Font, Colors } from "@styles";
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from "react-redux";
import wasteBanksUtils from '@utils/WasteBanksUtils';

function FilterCategory({ 
    selected, 
    onPress,
    wasteBanks,
    data
}) {

    let category = [{_id: 'Semua', name : 'Semua'}]

    if(data){
        category = [...category, ...data]
    } else {
        if(wasteBanks?.productcategory){
            let cat = wasteBanks?.productcategory
            category = [...category, ...cat]
        }
    }

    useEffect(() => {
        getProductCategory()
    }, [])
    
    const getProductCategory = async () => {
        await wasteBanksUtils.getWasteBanksProductCategory()
    }

    return (
        <View style={{paddingBottom: RFValue(5)}}>
            <ScrollView horizontal style={{ paddingLeft: RFValue(15)}} showsHorizontalScrollIndicator={false}>
                {category.map((item, index) => (
                    <TouchableOpacity
                        onPress={() => onPress(item._id)}
                        style={[styles.filter, {backgroundColor: selected == item._id ? Colors.PRIMARY : Colors.GRAY_SOFT}, category.length == index + 1 && {marginRight: RFValue(30)}]}
                    >
                        <Text style={[styles.labelFilter, {color: selected == item._id ? Colors.WHITE : Colors.BLACK}]}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const mapStateToProps = function (state) {
    const { wasteBanks } = state;
    return { wasteBanks }
}
  
export default connect(mapStateToProps)(FilterCategory);

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
