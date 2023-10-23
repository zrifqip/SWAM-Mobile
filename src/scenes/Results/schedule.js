import React, { useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { BaseContainer, CardScheduleResult, Search, EmptyData, AppBar } from '@components';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from "react-redux";
import { useTranslation } from "@utils";
import { createFilter } from 'react-native-search-filter';
import { GetWasteBanksDetails } from "@actions";
import store from "@stores/store";
const KEYS_TO_FILTERS = ['day', 'startTime', 'endTime'];

function ResultsSchedule({ navigation, wasteBanks }) {
    const { translations }                  = useTranslation();
    const [searchContent, setSearchContent] = useState(false)
    const [searchTerm, setSearchTerm]       = useState('')

    const setSchedule = async (item) => {
        let details     = wasteBanks.details

        details.scheduleActive  = item
        store.dispatch(GetWasteBanksDetails(details))
        navigation.goBack()
    }

    const filteredData = wasteBanks?.details?.schedule.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

    return (
        <BaseContainer>
            <AppBar navigation={navigation} title={translations["schedule"]}/>
            <Search
                placeholder={translations["search.schedule"]}
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
                        <CardScheduleResult item={item} onPress={()=> setSchedule(item)}/>
                    )}
                    ListEmptyComponent={
                        <EmptyData message={translations["empty.schedule"]}/>
                    }  
                />
            </ScrollView>
        </BaseContainer>
    )
}

const mapStateToProps = function (state) {
    const { wasteBanks } = state;
    return { wasteBanks }
}
  
export default connect(mapStateToProps)(ResultsSchedule);