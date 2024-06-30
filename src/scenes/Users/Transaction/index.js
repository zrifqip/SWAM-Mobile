import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import {
  BaseContainer,
  CardTrasactionUsers,
  Search,
  EmptyData,
} from "@components";
import { connect } from "react-redux";
import { useTranslation } from "@utils";
import { createFilter } from "react-native-search-filter";
import transactionsUtils from "@utils/TransactionsUtils";
const KEYS_TO_FILTERS = ["status", "totalWeight", "totalPrice", "date"];

function UsersTransaction({ navigation, transactions }) {
  const { translations }                  = useTranslation();
  const [searchContent, setSearchContent] = useState(false);
  const [searchTerm, setSearchTerm]       = useState("");
  const [loading, setLoading]             = useState(false);
  const [refreshing, setRefreshing]       = useState(false);

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    try {
      setRefreshing(true);
      setLoading(true);
      await transactionsUtils.getTransactionsUsers();
    }
    catch (error) {
      console.error('Error fetching transactions:', error);
    } 
    finally {
      setLoading(false);
      setRefreshing(false);
    }

  };

  const getTransactionDetail = async (id) => {
    setLoading(true);

    await transactionsUtils.getTransactionsUsersDetail(id);
    navigation.navigate("UsersTransactionDetails");

    setLoading(false);
  };

  const arr = transactions.transactions;

  const filteredData = arr.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  return (
    <BaseContainer loading={loading}>
      <Search
        placeholder={translations["search.transaction"]}
        search={searchContent}
        searchContent={(res) => {
          setSearchContent(res), setSearchTerm("");
        }}
        searchUpdated={(res) => setSearchTerm(res)}
        searchTerm={searchTerm}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <CardTrasactionUsers
            item={item}
            onPress={() => getTransactionDetail(item._id)}
          />
        )}
        ListEmptyComponent={
          <EmptyData message={translations["empty.transaction"]} />
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getTransaction}/>
        }
      />
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { transactions } = state;
  return { transactions };
};

export default connect(mapStateToProps)(UsersTransaction);
