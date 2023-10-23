import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { BaseContainer, CardWasteBankProductList, Search, EmptyData, ButtonFab, FilterCategory } from '@components';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from "react-redux";
import { useTranslation } from "@utils";
import { createFilter } from 'react-native-search-filter';
import { GetWasteBanksProductDetail } from "@actions";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import wasteBanksUtils from '@utils/WasteBanksUtils';
import store from "@stores/store";
const KEYS_TO_FILTERS = ['category.name', 'category.type', 'sellingPrice', 'purchasePrice', 'weight'];

function WasteBankProduct({ navigation, wasteBanks }) {
    const { translations }                      = useTranslation();
    const [loading, setLoading]                 = useState(false)
    const [searchContent, setSearchContent]     = useState(false)
    const [searchTerm, setSearchTerm]           = useState('')
    const [selectCategory, setSelectCategory]   = useState('Semua')

    useEffect(() => {
        getWasteBanksProduct()
    }, [])

    const getWasteBanksProduct = async () => {
        setLoading(true)
        await wasteBanksUtils.getWasteBanksProduct()
        setLoading(false)
    }

    const getDetailProduct = async (id) => {
        if(id){
            await wasteBanksUtils.getWasteBanksProductDetail(id)
        } else {
            store.dispatch(GetWasteBanksProductDetail(null))
        }
        navigation.navigate("WasteBankProductForm")
    }

    const filter = selectCategory == 'Semua' ? wasteBanks.product :  wasteBanks.product.filter(x => x.category._id == selectCategory)
    const filteredData = filter.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

    return (
        <BaseContainer>
            <Search
                placeholder={translations["search.product"]}
                search={searchContent}
                searchContent={(res) => {setSearchContent(res), setSearchTerm('')}}
                searchUpdated={(res) => setSearchTerm(res)}
                searchTerm={searchTerm}
            />
            <FilterCategory selected={selectCategory} onPress={(key)=> setSelectCategory(key)}/>
            {loading ? (
                <View style={styles.wastePlaceholder}>
                    {[0, 1, 2].map((item, index) => (
                        <ShimmerPlaceHolder
                            key={index}
                            LinearGradient={LinearGradient}
                            style={styles.placeholder}
                        />
                    ))}
                </View>
            ) : (
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <CardWasteBankProductList item={item} onPress={()=> getDetailProduct(item._id)} all/>
                    )}
                    ListEmptyComponent={
                        <EmptyData message={translations["empty.product"]}/>
                    }  
                />
            )}
            <ButtonFab label={translations["add"]} onPress={()=> getDetailProduct()}/>
        </BaseContainer>
    )
}

const mapStateToProps = function (state) {
    const { users, wasteBanks } = state;
    return { users, wasteBanks }
}
  
export default connect(mapStateToProps)(WasteBankProduct);

const styles = StyleSheet.create({
    wastePlaceholder:{
        marginBottom: RFValue(5), 
        paddingHorizontal: RFValue(15)
    },
    placeholder:{
        borderRadius: RFValue(10),
        width: '100%',
        height: RFValue(90),
        marginBottom: RFValue(10),
    }
})