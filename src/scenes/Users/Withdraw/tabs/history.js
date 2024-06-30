import React, { useState } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import { CardWithdrawUsers, Search, EmptyData } from "@components";
import { connect } from "react-redux";
import { useTranslation } from "@utils";
import { createFilter } from "react-native-search-filter";
import { RFValue } from "react-native-responsive-fontsize";
const KEYS_TO_FILTERS = ["nominal", "status", "createdAt"];

function History({ withdraw, _onRefresh }) {
  const { translations } = useTranslation();
  const [searchContent, setSearchContent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const arr = withdraw.withdraw.filter(
    (x) => x.status == "accept" || x.status == "reject",
  );

  const filteredData = arr.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  return (
    <>
      <Search
        placeholder={translations["search.withdraw"]}
        search={searchContent}
        searchContent={(res) => {
          setSearchContent(res), setSearchTerm("");
        }}
        searchUpdated={(res) => setSearchTerm(res)}
        searchTerm={searchTerm}
      />
      <View style={{ marginBottom: RFValue(10) }} />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <CardWithdrawUsers item={item} />}
        ListEmptyComponent={
          <EmptyData message={translations["empty.withdraw"]} />
        }
        refreshControl={<RefreshControl onRefresh={_onRefresh} />}
      />
    </>
  );
}

const mapStateToProps = function (state) {
  const { withdraw } = state;
  return { withdraw };
};

export default connect(mapStateToProps)(History);
