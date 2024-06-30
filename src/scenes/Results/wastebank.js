import React, { useEffect, useState } from "react";
import { View, ScrollView, FlatList } from "react-native";
import {
  BaseContainer,
  CardWasteBankResult,
  Search,
  EmptyData,
  AppBar,
} from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { useTranslation } from "@utils";
import { arrSortDistance } from "@constants";
import { createFilter } from "react-native-search-filter";
import wasteBanksUtils from "@utils/WasteBanksUtils";
import usersUtils from "@utils/UsersUtils";
const KEYS_TO_FILTERS = [
  "companyName",
  "nameCEO",
  "phoneNumber",
  "address.country",
  "address.district",
  "address.street",
];

function ResultsWasteBank({ navigation, wasteBanks, users }) {
  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [searchContent, setSearchContent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getWasteBanks();
  }, []);

  const getWasteBanks = async () => {
    setLoading(true);
    await wasteBanksUtils.getWasteBanks(1000);
    setLoading(false);
  };

  const getResultWasteBanks = async (item) => {
    setLoading(true);
    await wasteBanksUtils.getWasteBanksDetails(item._id);

    handleUpdate(item._id);
    setLoading(false);
    navigation.goBack();
  };

  const handleUpdate = async (id) => {
    let params = {
      companyID: id,
    };

    await usersUtils.usersUpdate(params);
  };

  let sortir = arrSortDistance(wasteBanks.list, users?.coordinate);

  const filteredData = sortir.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  return (
    <BaseContainer loading={loading}>
      <AppBar navigation={navigation} title={translations["waste.bank"]} />
      <Search
        placeholder={translations["search.wastebank"]}
        search={searchContent}
        searchContent={(res) => {
          setSearchContent(res), setSearchTerm("");
        }}
        searchUpdated={(res) => setSearchTerm(res)}
        searchTerm={searchTerm}
      />
      <ScrollView>
        <View style={{ marginTop: RFValue(4) }} />
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <CardWasteBankResult
              item={item}
              onPress={() => getResultWasteBanks(item)}
            />
          )}
          ListEmptyComponent={
            <EmptyData message={translations["empty.wastebank"]} />
          }
        />
      </ScrollView>
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { wasteBanks, users } = state;
  return { wasteBanks, users };
};

export default connect(mapStateToProps)(ResultsWasteBank);
