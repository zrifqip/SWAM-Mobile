import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, RefreshControl } from 'react-native';
import { BaseContainer, CardCustomers, Search, EmptyData, AppBar } from '@components';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from "react-redux";
import { useTranslation } from "@utils";
import { createFilter } from 'react-native-search-filter';
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import withdrawUtils from '@utils/WithdrawUtils';
const KEYS_TO_FILTERS = ['fullName', 'address.street'];

function WasteBankCustomers({ navigation, withdraw }) {
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

    const filteredData = withdraw.customers.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

    return (
        <BaseContainer>
            <AppBar navigation={navigation} title={translations['customers']}/>
            <Search
                placeholder={translations["search.customers"]}
                search={searchContent}
                searchContent={(res) => {setSearchContent(res), setSearchTerm('')}}
                searchUpdated={(res) => setSearchTerm(res)}
                searchTerm={searchTerm}
            />
            <ScrollView>
                <View style={{marginTop: RFValue(10)}}/>
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
                            <CardCustomers item={item} customers/>
                        )}
                        ListEmptyComponent={
                            <EmptyData message={translations["empty.customers"]}/>
                        }  
                        refreshControl={
                            <RefreshControl onRefresh={()=> getWasteBanksCustomers()}/>
                        }
                    />
                )}
            </ScrollView>
        </BaseContainer>
    )
}

const mapStateToProps = function (state) {
    const { users, withdraw } = state;
    return { users, withdraw }
}
  
export default connect(mapStateToProps)(WasteBankCustomers);

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