import React, { useState, useEffect } from "react";
import { PermissionsAndroid, FlatList, RefreshControl } from "react-native";
import {
  BaseContainer,
  ButtonFab,
  CardTrasactionWasteBank,
  Search,
  EmptyData,
} from "@components";
import { useTranslation } from "@utils";
import { writeFile } from "react-native-fs";
import { showToast } from "@constants";
import { connect } from "react-redux";
import { createFilter } from "react-native-search-filter";
import transactionsUtils from "@utils/TransactionsUtils";
import XLSX from "xlsx";
import moment from "moment";
const KEYS_TO_FILTERS = [
  "status",
  "totalWeight",
  "totalPrice",
  "customer.fullName",
  "date",
];

function WasteBankTransaction({ navigation, transactions }) {
  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [searchContent, setSearchContent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    setLoading(true);
    await transactionsUtils.getTransactionsWasteBanks();
    setLoading(false);
  };

  const getTransactionDetail = async (id) => {
    setLoading(true);

    await transactionsUtils.getTransactionsWasteBanksDetail(id);
    navigation.navigate("WasteBankTransactionDetails");

    setLoading(false);
  };

  const exportDataToExcel = async () => {
    let trans = transactions.transactions;

    let arr = [];

    for (let i = 0; i < trans.length; i++) {
      let temp = {
        Nasabah: trans[i]?.customer?.fullName,
        Waktu: trans[i]?.date,
        Delivery: trans[i]?.deliveryType,
        "Total Price": trans[i]?.totalPrice,
        "Total Weight": trans[i]?.totalWeight,
        Status: trans[i]?.status,
      };

      arr.push(temp);
    }

    var ws = XLSX.utils.json_to_sheet(arr);

    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Prova");

    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

    var RNFS = require("react-native-fs");
    var file =
      RNFS.DownloadDirectoryPath +
      "/" +
      moment().format("DDMMYY-kkmmss-") +
      "Transaction.xlsx";

    writeFile(file, wbout, "ascii")
      .then((r) => {
        showToast("Laporan berhasil di download, Cek folder Downloads Anda");
      })
      .catch((e) => {
        showToast("Laporan gagal di download : " + e.toString());
      });
  };

  const handleClick = async () => {
    try {
      let isPermittedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (!isPermittedExternalStorage) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage permission needed",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          exportDataToExcel();
          return;
        }
      }

      exportDataToExcel();
    } catch (e) {
      console.log("Error while checking permission");
      console.log(e);
      return;
    }
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
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardTrasactionWasteBank
            item={item}
            onPress={() => getTransactionDetail(item._id)}
          />
        )}
        ListEmptyComponent={
          <EmptyData message={translations["empty.transaction"]} />
        }
        refreshControl={<RefreshControl onRefresh={getTransaction} />}
      />
      {transactions.transactions.length != 0 ? (
        <ButtonFab label={"Download"} onPress={() => handleClick()} />
      ) : null}
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { transactions } = state;
  return { transactions };
};

export default connect(mapStateToProps)(WasteBankTransaction);
