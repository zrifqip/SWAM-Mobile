import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  BaseContainer,
  CardWasteBankProductList,
  FilterCategory,
} from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { StC, Colors, Font } from "@styles";
import { useTranslation } from "@utils";
import { arrTypeCompany, filterCategory } from "@constants";

function SubDetails({ wasteBanks, loading }) {
  const { translations } = useTranslation();
  const [selectCategory, setSelectCategory] = useState("Semua");
  let details = wasteBanks.details;

  let arr = [
    {
      name: translations["organization.name"],
      value: details?.companyName,
    },
    {
      name: translations["ceo.name"],
      value: details?.nameCEO,
    },
    {
      name: translations["address"],
      value: details?.address?.street,
    },
    {
      name: translations["type"] + " " + translations["waste.bank"],
      value: details?.companyType ? arrTypeCompany(details?.companyType) : "",
    },
  ];

  const filter =
    selectCategory == "Semua"
      ? wasteBanks?.items
      : wasteBanks?.items.filter((x) => x.category._id == selectCategory);

  return (
    <BaseContainer>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : (
        <ScrollView>
          <View style={styles.card}>
            <View style={styles.separator}>
              <Text style={styles.txtTitle}>
                {"Detail " + translations["waste.bank"]}
              </Text>
            </View>
            <FlatList
              data={arr}
              renderItem={({ item }) => (
                <View style={styles.flex}>
                  <Text style={styles.txtName}>{item.name}</Text>
                  <Text style={styles.txtValue}>{item.value}</Text>
                </View>
              )}
            />
          </View>
          <Text style={[styles.txtTitle, StC.mB5, { marginLeft: RFValue(15) }]}>
            {translations["product"]}
          </Text>
          <FilterCategory
            selected={selectCategory}
            data={filterCategory(wasteBanks?.items)}
            onPress={(key) => setSelectCategory(key)}
          />
          <FlatList
            data={filter}
            renderItem={({ item }) => (
              <CardWasteBankProductList item={item} type={"user"} />
            )}
          />
        </ScrollView>
      )}
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { wasteBanks } = state;
  return { wasteBanks };
};

export default connect(mapStateToProps)(SubDetails);

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
});
