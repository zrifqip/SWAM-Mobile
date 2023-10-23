import React, { useEffect, useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { BaseContainer, CardCustomers, Search, EmptyData, AppBar } from '@components';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from "react-redux";
import { useTranslation } from "@utils";
import { createFilter } from 'react-native-search-filter';
import { ResultCustomers } from "@actions";
import store from "@stores/store";
import withdrawUtils from '@utils/WithdrawUtils';
const KEYS_TO_FILTERS = ['fullName', 'address.street'];

function ResultsCustomers({ navigation, withdraw }) {
    const { translations }                  = useTranslation();
    const [loading, setLoading]             = useState(false)
    const [searchContent, setSearchContent] = useState(false)
    const [searchTerm, setSearchTerm]       = useState('')

    useEffect(() => {
        getWasteBanksCustomers()
    }, [])

    const getWasteBanksCustomers = async () => {
        setLoading(true)
        await withdrawUtils.getWasteBanksCustomers(1000)
        setLoading(false)
    }

    const getResult = async (item) => {

        setLoading(true)

        store.dispatch(ResultCustomers(item))

        setLoading(false)
        navigation.goBack()
    }

    const filteredData = withdraw.customers.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

    return (
        <BaseContainer loading={loading}>
            <AppBar navigation={navigation} title={translations['customers']}/>
            <Search
                placeholder={translations["search.customers"]}
                search={searchContent}
                searchContent={(res) => {setSearchContent(res), setSearchTerm('')}}
                searchUpdated={(res) => setSearchTerm(res)}
                searchTerm={searchTerm}
            />
            <ScrollView>
                <View style={{marginTop: RFValue(4)}}/>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <CardCustomers item={item} onPress={()=> getResult(item)}/>
                    )}
                    ListEmptyComponent={
                        <EmptyData message={translations["empty.wastebank"]}/>
                    }  
                />
            </ScrollView>
        </BaseContainer>
    )
}

const mapStateToProps = function (state) {
    const { withdraw } = state;
    return { withdraw }
}
  
export default connect(mapStateToProps)(ResultsCustomers);