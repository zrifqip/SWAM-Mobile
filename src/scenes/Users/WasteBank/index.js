import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {BaseContainer, CardWasteBankList, Search, EmptyData} from '@components';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {useTranslation} from '@utils';
import {createFilter} from 'react-native-search-filter';
import {arrSortDistance} from '@constants';
import LinearGradient from 'react-native-linear-gradient';
import wasteBanksUtils from '@utils/WasteBanksUtils';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import SubDetails from './subdetails';
const KEYS_TO_FILTERS = [
  'companyName',
  'nameCEO',
  'phoneNumber',
  'address.country',
  'address.district',
  'address.street',
];

function UsersWasteBank({navigation, wasteBanks, users}) {
  const {translations} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loadingWaste, setLoadingWaste] = useState(false);
  const [searchContent, setSearchContent] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  let user = users.users;

  useEffect(() => {
    getWasteBanks();
  }, []);

  const getWasteBanks = async () => {
    if (users?.currentwaste) {
      getResultWasteBanks(user?.biodata?.companyID);
    } else {
      setLoadingWaste(true);
      await wasteBanksUtils.getWasteBanks(1000);
      setLoadingWaste(false);
    }
  };

  const getResultWasteBanks = async (id, type) => {
    setLoading(true);
    await wasteBanksUtils.getWasteBanksDetails(id);
    setLoading(false);

    if (type == 'navigate') {
      navigation.navigate('UsersWasteBankDetail');
    }
  };

  let sortir = arrSortDistance(wasteBanks.list, users?.coordinate);

  const filteredData = sortir.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  return (
    <BaseContainer loading={loading}>
      {users?.currentwaste ? (
        <SubDetails loading={loading} />
      ) : (
        <>
          <Search
            placeholder={translations['search.wastebank']}
            search={searchContent}
            searchContent={(res) => {
              setSearchContent(res), setSearchTerm('');
            }}
            searchUpdated={(res) => setSearchTerm(res)}
            searchTerm={searchTerm}
          />
          <View style={{marginTop: RFValue(10)}} />
          {loadingWaste ? (
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
              renderItem={({item}) => (
                <CardWasteBankList
                  item={item}
                  onPress={() => getResultWasteBanks(item._id, 'navigate')}
                />
              )}
              ListEmptyComponent={
                <EmptyData message={translations['empty.wastebank']} />
              }
            />
          )}
        </>
      )}
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const {users, wasteBanks} = state;
  return {users, wasteBanks};
};

export default connect(mapStateToProps)(UsersWasteBank);

const styles = StyleSheet.create({
  wastePlaceholder: {
    marginBottom: RFValue(5),
    paddingHorizontal: RFValue(15),
  },
  placeholder: {
    borderRadius: RFValue(10),
    width: '100%',
    height: RFValue(70),
    marginBottom: RFValue(10),
  },
});
