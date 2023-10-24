import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList} from 'react-native';
import {
  BaseContainer,
  AppBar,
  CardWasteBankProductList,
  ButtonFlex,
  FilterCategory,
} from '@components';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {StC, Colors, Font} from '@styles';
import {CurrentWaste} from '@actions';
import {useTranslation} from '@utils';
import {arrTypeCompany, filterCategory, showToast} from '@constants';
import store from '@stores/store';
import usersUtils from '@utils/UsersUtils';

function UsersWasteBankDetail({navigation, wasteBanks}) {
  const {translations} = useTranslation();
  const [selectCategory, setSelectCategory] = useState('Semua');
  const [loading, setLoading] = useState(false);
  let details = wasteBanks.details;

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

  const chooseWasteBank = async () => {
    setLoading(true);

    let params = {
      companyID: details._id,
    };

    let respons = await usersUtils.usersUpdate(params);

    if (respons == 200) {
      showToast(translations['save.success']);

      setTimeout(() => {
        store.dispatch(CurrentWaste(true));
        navigation.goBack();
      }, 1000);
    }

    setLoading(false);
  };

  const filter =
    selectCategory == 'Semua'
      ? wasteBanks?.items
      : wasteBanks?.items.filter((x) => x.category._id == selectCategory);

  return (
    <BaseContainer loading={loading}>
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
          {translations['product']}
        </Text>
        <FilterCategory
          selected={selectCategory}
          data={filterCategory(wasteBanks?.items)}
          onPress={(key) => setSelectCategory(key)}
        />
        <FlatList
          data={filter}
          renderItem={({item}) => (
            <CardWasteBankProductList item={item} type={'user'} />
          )}
        />
      </ScrollView>
      <ButtonFlex
        title={'Pilih Bank Sampah ini'}
        onPress={() => chooseWasteBank()}
        style={{
          marginHorizontal: RFValue(15),
          marginBottom: RFValue(0),
          backgroundColor: Colors.BACKGROUND,
        }}
      />
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const {wasteBanks} = state;
  return {wasteBanks};
};

export default connect(mapStateToProps)(UsersWasteBankDetail);

const styles = StyleSheet.create({
  card: {
    ...StC.mB8,
    paddingHorizontal: RFValue(15),
    paddingTop: RFValue(5),
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
});
