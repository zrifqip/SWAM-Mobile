import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { BaseContainer, AppBar, MyView, ModalPreview } from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { StC, Colors, Font, Shadow } from "@styles";
import { useTranslation } from "@utils";
import { base_uri } from "@constants/BASE_URL";
import {
  currencyFloat,
  formatDateTime,
  numberFloat,
  arrStatus,
} from "@constants";

function WasteBankTransactionDetails({ navigation, transactions }) {
  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  let details = transactions.details;

  let image = "";

  if (details.images?.length > 0) {
    image = details.images[0].original.path;
  }

  let status = arrStatus(details.status);
  let arr = [
    {
      name: translations["transaction"],
      type: "detail",
      submenu: [
        {
          name: "Status",
          value: status.label,
          color: status.color,
        },
        {
          name: translations["created"],
          value: formatDateTime(details.date),
        },
      ],
    },
    {
      name: translations["order.detail"],
      type: "detail",
      submenu: [
        {
          name: translations["name"],
          value: details.customer?.fullName,
        },
        {
          name: translations["address"],
          value: details.customer?.address?.street,
        },
      ],
    },
    {
      name: translations["waste.list"],
      type: "item",
      submenu: details.detail,
    },
  ];

  return (
    <BaseContainer loading={loading}>
      <AppBar
        navigation={navigation}
        title={"Detail " + translations["transaction"]}
      />
      <ScrollView>
        <FlatList
          data={arr}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.separator}>
                <Text style={styles.txtTitle}>{item.name}</Text>
              </View>
              {item.submenu.map((res) => (
                <View style={styles.flex}>
                  {item.type == "detail" ? (
                    <>
                      <Text style={styles.txtName}>{res.name}</Text>
                      <Text
                        style={[
                          styles.txtValue,
                          res.color && { color: res.color },
                        ]}>
                        {res.value}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.txtName}>
                        {res?.name} {numberFloat(res?.weight)} kg
                      </Text>
                      <Text style={styles.txtValue}>
                        {currencyFloat(res.totalPrice)}
                      </Text>
                    </>
                  )}
                </View>
              ))}
              <MyView style={styles.flex} hide={item.type != "item"}>
                <Text style={styles.txtName}>Total</Text>
                <Text style={styles.txtValue}>
                  {currencyFloat(details.totalPrice)}
                </Text>
              </MyView>
            </View>
          )}
        />
        <View style={styles.card}>
          <Text style={styles.txtTitle}>{translations["photo"]}</Text>
          {image ? (
            <TouchableOpacity
              style={styles.cardImage}
              activeOpacity={0.5}
              onPress={() => setIsVisible(true)}>
              <Image source={{ uri: base_uri + image }} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <Text>-</Text>
          )}
        </View>
      </ScrollView>
      <ModalPreview
        isVisible={isVisible}
        image={base_uri + image}
        onPress={() => setIsVisible(false)}
      />
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { transactions } = state;
  return { transactions };
};

export default connect(mapStateToProps)(WasteBankTransactionDetails);

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
    paddingVertical: RFValue(1),
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
  cardImage: {
    ...StC.centerPage,
    width: "100%",
    height: RFValue(150),
    borderWidth: RFValue(1),
    borderRadius: RFValue(5),
    borderColor: Colors.GRAY_SOFT,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: RFValue(5),
  },
  btn: {
    ...Shadow.Normal,
    ...StC.centerPage,
    ...StC.flexR,
    flex: 1,
    paddingHorizontal: RFValue(15),
    borderWidth: RFValue(1),
    borderRadius: RFValue(5),
    marginVertical: RFValue(10),
    marginHorizontal: RFValue(10),
    marginBottom: RFValue(15),
    height: RFValue(40),
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  btnReject: {
    backgroundColor: Colors.DANGER,
    borderColor: Colors.DANGER,
  },
  btnApproved: {
    backgroundColor: Colors.SUCCESS,
    borderColor: Colors.SUCCESS,
  },
  label: {
    ...Font.Regular,
    ...Font.F12,
    ...Font.WHITE,
    textAlign: "center",
  },
});
