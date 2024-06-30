import React from "react";
import { View } from "react-native";
import { Colors, Font, StC } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import SearchInput from "react-native-search-filter";

const Search = ({ searchUpdated, placeholder }) => {
  return (
    <View style={styles.content}>
      <View style={styles.search}>
        <SearchInput
          onChangeText={(term) => {
            searchUpdated(term);
          }}
          placeholder={placeholder}
          placeholderTextColor={Colors.GRAY_LABEL}
          style={styles.input}
          clearIconViewStyles={StC.searchIconRemove}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = {
  content: {
    backgroundColor: Colors.WHITE,
  },
  search: {
    backgroundColor: Colors.BACKGROUND,
    marginHorizontal: RFValue(15),
    marginTop: RFValue(10),
    marginBottom: RFValue(8),
    borderRadius: RFValue(5),
  },
  input: {
    ...Font.BLACK,
    paddingHorizontal: RFValue(12),
  },
};
