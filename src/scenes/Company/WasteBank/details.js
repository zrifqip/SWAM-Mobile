import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList} from 'react-native';
import {
  BaseContainer,
  AppBar,
  CardWasteBankProductList,
  FilterCategory,
  ButtonChats,
} from '@components';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {Icon, HStack} from 'native-base';
import {StC, Colors, Font} from '@styles';
import {useTranslation} from '@utils';
import {arrTypeCompany} from '@constants';
import wasteBanksUtils from '@utils/WasteBanksUtils';
import chatsUtils from '@utils/ChatsUtils';
import Entypo from 'react-native-vector-icons/Entypo';

function CompanyWasteBankDetail({navigation, wasteBanks}) {
  const {translations} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState('Semua');
  let details = wasteBanks.details;

  useEffect(() => {
    getWasteBanks();
    getStock();
  }, []);

  const getWasteBanks = async () => {
    setLoading(true);
    await wasteBanksUtils.getWasteBanksCompanyItems(details._id);
    setLoading(false);
  };

  const getStock = async () => {
    setLoading(true);
    await wasteBanksUtils.getStock(details._id);
    setLoading(false);
  };

  let arr = [
    {
      name: translations['organization.name'],
      value: details.companyName,
    },
    {
      name: translations['ceo.name'],
      value: details.nameCEO,
    },
    {
      name: translations['address'],
      value: details.address?.street,
    },
    {
      name: translations['type'] + ' ' + translations['waste.bank'],
      value: arrTypeCompany(details.companyType),
    },
  ];

  const addChats = async () => {
    setLoading(true);
    const response = await chatsUtils.chatsCompanyStart(details.accountID);

    if (response == 200) {
      navigation.navigate('ChatsRoom');
    }

    setLoading(false);
  };

  const product = wasteBanks?.items.filter((x) => x.isSell);
  const filter =
    selectCategory == 'Semua'
      ? product
      : product.filter((x) => x.category._id == selectCategory);

  return (
    <BaseContainer>
      <AppBar
        navigation={navigation}
        title={'Detail ' + translations['waste.banks']}
      />
      <ScrollView>
        <View style={styles.card}>
          <FlatList
            data={arr}
            renderItem={({item}) => (
              <View style={styles.flex}>
                <Text style={styles.txtName}>{item.name}</Text>
                <Text style={styles.txtValue}>{item.value}</Text>
              </View>
            )}
          />
        </View>
        <Text style={[styles.txtTitle, StC.mB5, {marginLeft: RFValue(15)}]}>
          Stok
        </Text>
        <View style={styles.summary}>
          {wasteBanks.stock.length != 0 &&
            wasteBanks.stock.map((item, index) => (
              <HStack>
                <Icon
                  as={Entypo}
                  name={'dot-single'}
                  size={RFValue(5)}
                  color={Colors.GRAY_LABEL}
                />
                <Text style={styles.itemSummary}>{item.item_name}</Text>
                <Text style={styles.labelSaldo}>{item.total_weight} kg</Text>
              </HStack>
            ))}
        </View>
        <Text style={[styles.txtTitle, StC.mB5, {marginLeft: RFValue(15)}]}>
          {translations['product']}
        </Text>
        <FilterCategory
          selected={selectCategory}
          onPress={(key) => setSelectCategory(key)}
        />
        <FlatList
          data={filter}
          renderItem={({item}) => <CardWasteBankProductList item={item} />}
        />
      </ScrollView>
      <ButtonChats navigation={navigation} onPress={() => addChats()} />
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const {wasteBanks} = state;
  return {wasteBanks};
};

export default connect(mapStateToProps)(CompanyWasteBankDetail);

const styles = StyleSheet.create({
  card: {
    ...StC.mB8,
    paddingHorizontal: RFValue(15),
    paddingTop: RFValue(15),
    paddingBottom: RFValue(10),
    backgroundColor: Colors.WHITE,
  },
  txtTitle: {
    ...Font.F13,
    ...Font.DARK,
    ...Font.SemiBold,
  },
  flex: {
    ...StC.flexR,
    paddingVertical: RFValue(5),
  },
  txtName: {
    ...Font.F12,
    ...Font.BLACK,
    ...Font.Medium,
    flex: 1,
  },
  txtValue: {
    ...Font.F12,
    ...Font.GRAY_LABEL,
    ...Font.Regular,
  },
  separator: {
    ...StC.mB10,
    borderBottomWidth: RFValue(1),
    borderBottomColor: Colors.GRAY_LIGHT,
    paddingBottom: RFValue(10),
  },
  summary: {
    marginBottom: RFValue(15),
    marginHorizontal: RFValue(15),
    borderRadius: RFValue(10),
    padding: RFValue(10),
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
  itemSummary: {
    flex: 1,
    ...Font.F12,
    ...Font.BLACK,
    ...Font.Medium,
  },
  labelSaldo: {
    ...Font.F12,
    ...Font.GRAY_LABEL,
    ...StC.mT3,
    ...Font.Regular,
  },
});
