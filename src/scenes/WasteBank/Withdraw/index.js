import React, { useState, useEffect, useRef } from 'react';
import { useWindowDimensions, Text, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { BaseContainer, AppBar, ModalWithdrawDetail } from "@components";
import { Colors } from "@styles";
import { useTranslation } from "@utils";
import withdrawUtils from '@utils/WithdrawUtils';
import Running from './tabs/running';
import History from './tabs/history';

function WasteBankWithdraw ({ navigation }) {

    const { translations }                  = useTranslation();
    const layout                            = useWindowDimensions();
    const [loading, setLoading]             = useState(false)
    const [index, setIndex]                 = useState(0);
    const [item, setItem]                   = useState([]);
    const refModalWithdraw                  = useRef();
    const [routes] = useState([
        { key: "first", title: translations["running"]},
        { key: "second", title: translations["history"]},
    ]);
 
    useEffect(() => {
        getTransaction()
    }, []);

    const getTransaction = async () => {
        setLoading(true)
        await withdrawUtils.getWasteBanksWithdraw()
        setLoading(false)
    }

    const getTransactionDetail = async (val) => {
        setItem(val)
        refModalWithdraw.current.open()
    }

    const RunningRoute = () => (
        <Running navigation={navigation} onPress={(val)=> getTransactionDetail(val)} _onRefresh={()=> getTransaction()}/>
    );

    const HistoryRoute = () => (
        <History navigation={navigation} onPress={(val)=> getTransactionDetail(val)} _onRefresh={()=> getTransaction()}/>
    );
 
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{backgroundColor: Colors.PRIMARY}}
            style={styles.tabBar}
            renderLabel={({ route }) => {
                return <Text style={{color: Colors.GRAY_LABEL}}>{route.title}</Text>;
            }}
        />
    );
 
    return (
        <BaseContainer loading={loading}>
            <AppBar navigation={navigation} title={translations['withdraw']}/>
            <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap({
                    first: RunningRoute,
                    second: HistoryRoute,
                })}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
            <ModalWithdrawDetail
                open={refModalWithdraw}
                item={item}
                onPress={()=> refModalWithdraw.current.close()}
            />
        </BaseContainer>
    );
}
 
export default WasteBankWithdraw;

const styles = StyleSheet.create({
    tabBar:{
        elevation: 1, 
        backgroundColor: Colors.WHITE
    },
})