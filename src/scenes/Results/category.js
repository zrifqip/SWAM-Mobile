import React, { useState, useEffect, useRef } from "react";
import { View, FlatList } from "react-native";
import {
  BaseContainer,
  CardWasteBankProductCategory,
  Search,
  EmptyData,
  AppBar,
  ButtonFab,
  ModalCategory,
} from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { useTranslation } from "@utils";
import { createFilter } from "react-native-search-filter";
import { SelectedCategory } from "@actions";
import wasteBanksUtils from "@utils/WasteBanksUtils";
import store from "@stores/store";
const KEYS_TO_FILTERS = ["name", "desc", "type"];

function ResultsCategory({ navigation, wasteBanks }) {
  const { translations } = useTranslation();
  const [searchContent, setSearchContent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const refModalCategory = useRef();

  let category = [];
  if (wasteBanks?.productcategory) {
    category = wasteBanks?.productcategory;
  }

  useEffect(() => {
    getProductCategory();
  }, []);

  const getProductCategory = async () => {
    await wasteBanksUtils.getWasteBanksProductCategory();
  };

  const setCategory = async (item) => {
    store.dispatch(SelectedCategory(item));
    navigation.goBack();
  };

  const detailCategory = async (item) => {
    setName("");
    setDesc("");
    setId("");

    if (item) {
      setName(item.name);
      setDesc(item.desc);
      setId(item._id);
    }
    refModalCategory.current.open();
  };

  const filteredData = category.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS),
  );

  return (
    <BaseContainer>
      <AppBar navigation={navigation} title={translations["category"]} />
      <Search
        placeholder={translations["search.category"]}
        search={searchContent}
        searchContent={(res) => {
          setSearchContent(res), setSearchTerm("");
        }}
        searchUpdated={(res) => setSearchTerm(res)}
        searchTerm={searchTerm}
      />
      <View style={{ marginTop: RFValue(4) }} />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <CardWasteBankProductCategory
            item={item}
            onPress={() => setCategory(item)}
            onPressEdit={() => detailCategory(item)}
          />
        )}
        ListEmptyComponent={
          <EmptyData message={translations["empty.category"]} />
        }
      />
      <ButtonFab
        label={translations["add"]}
        onPress={() => detailCategory(null)}
      />
      <ModalCategory
        open={refModalCategory}
        name={name}
        desc={desc}
        id={id}
        setName={(val) => setName(val)}
        setDesc={(val) => setDesc(val)}
        onPress={() => refModalCategory.current.close()}
      />
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { wasteBanks } = state;
  return { wasteBanks };
};

export default connect(mapStateToProps)(ResultsCategory);
