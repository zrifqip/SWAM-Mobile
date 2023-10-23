import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text } from 'react-native';
import { BaseContainer, CardWasteBankList, Search, EmptyData } from '@components';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from "react-redux";
import { useTranslation } from "@utils";
import { createFilter } from 'react-native-search-filter';
import { arrSortDistance } from '@constants';
import { GetWasteBanksDetails } from '@actions';
import store from "@stores/store";
import LinearGradient from "react-native-linear-gradient";
import wasteBanksUtils from '@utils/WasteBanksUtils';
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
const KEYS_TO_FILTERS = ['companyName', 'nameCEO', 'phoneNumber', 'address.country', 'address.district', 'address.street'];

function CompanyWasteBank({ navigation, wasteBanks, users }) {
    const { translations }                  = useTranslation();
    const [loading, setLoading]             = useState(false)
    const [searchContent, setSearchContent] = useState(false)
    const [searchTerm, setSearchTerm]       = useState('')

    useEffect(() => {
        getWasteBanks()
    }, [])

    const getWasteBanks = async () => {
        setLoading(true)
        await wasteBanksUtils.getWasteBanks(1000)
        setLoading(false)
    }

    const getResultWasteBanks = async (item) => {
        store.dispatch(GetWasteBanksDetails(item))
        navigation.navigate('CompanyWasteBankDetail')
    }

    let sortir = arrSortDistance(wasteBanks.list, users?.coordinate)

    const filteredData = sortir.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

    return (
        <BaseContainer loading={loading}>
            <Search
                placeholder={translations["search.wastebank"]}
                search={searchContent}
                searchContent={(res) => {setSearchContent(res), setSearchTerm('')}}
                searchUpdated={(res) => setSearchTerm(res)}
                searchTerm={searchTerm}
            />
            <ScrollView>
                <View style={{marginTop: RFValue(10)}}/>
                {loading ? (
                    <View style={styles.wastePlaceholder}>
                        {[0, 1, 2].map((index) => (
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
                            <CardWasteBankList item={item} onPress={()=> getResultWasteBanks(item)}/>
                        )}
                        ListEmptyComponent={
                            <EmptyData message={translations["empty.wastebank"]}/>
                        }  
                    />
                )}
            </ScrollView>
        </BaseContainer>
    )
}

const mapStateToProps = function (state) {
    const { users, wasteBanks } = state;
    return { users, wasteBanks }
}
  
export default connect(mapStateToProps)(CompanyWasteBank);

const styles = StyleSheet.create({
    wastePlaceholder:{
        marginBottom: RFValue(5), 
        paddingHorizontal: RFValue(15)
    },
    placeholder:{
        borderRadius: RFValue(10),
        width: '100%',
        height: RFValue(70),
        marginBottom: RFValue(10),
    }
})