import React, {useState, useEffect, useRef} from 'react';
import {useWindowDimensions, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {BaseContainer, AppBar, ButtonFab, ModalWithdraw} from '@components';
import {Colors} from '@styles';
import {useTranslation} from '@utils';
import withdrawUtils from '@utils/WithdrawUtils';
import Running from './tabs/running';
import History from './tabs/history';

function UsersWithdraw({navigation}) {
  const {translations} = useTranslation();
  const layout = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const refModalWithdraw = useRef();
  const [routes] = useState([
    {key: 'first', title: translations['running']},
    {key: 'second', title: translations['history']},
  ]);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    setLoading(true);
    await withdrawUtils.getUsersWithdraw();
    setLoading(false);
  };

  const getTransactionDetail = async (id) => {
    alert(id);
    // setLoading(true)

    // await transactionsUtils.getTransactionsWasteBanksDetail(id)
    // navigation.navigate('WasteBankTransactionDetails')

    // setLoading(false)
  };

  const RunningRoute = () => (
    <Running
      navigation={navigation}
      onPress={(id) => getTransactionDetail(id)}
      _onRefresh={() => getTransaction()}
    />
  );

  const HistoryRoute = () => (
    <History
      navigation={navigation}
      onPress={(id) => getTransactionDetail(id)}
      _onRefresh={() => getTransaction()}
    />
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: Colors.PRIMARY}}
      style={styles.tabBar}
      renderLabel={({route}) => {
        return <Text style={{color: Colors.GRAY_LABEL}}>{route.title}</Text>;
      }}
    />
  );

  return (
    <BaseContainer loading={loading}>
      <AppBar navigation={navigation} title={translations['withdraw']} />
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          first: RunningRoute,
          second: HistoryRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
      <ButtonFab
        label={translations['withdraw']}
        onPress={() => refModalWithdraw.current.open()}
      />
      <ModalWithdraw
        open={refModalWithdraw}
        onPress={() => refModalWithdraw.current.close()}
      />
    </BaseContainer>
  );
}

export default UsersWithdraw;

const styles = StyleSheet.create({
  tabBar: {
    elevation: 1,
    backgroundColor: Colors.WHITE,
  },
});
