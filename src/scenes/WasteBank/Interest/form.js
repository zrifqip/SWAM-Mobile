import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  BaseContainer,
  AppBar,
  FormInputPicker,
  ButtonFlex,
  FormInputCurrency,
  ModalWasteSale,
  MyView,
  FormInput,
} from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { Icon } from "native-base";
import { StC, Colors, Font } from "@styles";
import { useTranslation } from "@utils";
import { numberFloat, currencyFloat, showToast } from "@constants";
import wasteBanksUtils from "@utils/WasteBanksUtils";
import sendNotifUtils from "@utils/SendNotifUtils";
import interestUtils from "@utils/InterestUtils";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

function WasteBankInterestForm({ navigation, wasteBanks, users }) {
  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const refModalWaste = useRef();
  const [photo, setPhoto] = useState("");
  const [interestRate, setInterestRate] = useState(0);
  const [total, setTotal] = useState(0);
  const [balance,setBalance] = useState(0);
  let itemsActive = wasteBanks.itemsActive;
  const fetchInterestRate = async () => {
    setLoading(true);
    const fetchedInterestRate = await simulateFetchInterestRate(); // This function should actually fetch from backend
    setInterestRate(fetchedInterestRate.toString());
    computeTotal(fetchedInterestRate);
    setLoading(false);
  };3
  useEffect(() => {    
    setBalance(users?.customers?.balance);
    computeTotalBalance();
  }, [interestRate,users?.customers]);
  const computeTotalBalance = () => {
    let userBalance = users?.customers?.balance;
    const interestAdded = Math.floor((userBalance * (interestRate / 100)));
    const totalBalance = userBalance + interestAdded;
    setTotal(totalBalance); 
  }
  const _handleSave = async () => {
    setLoading(true);

    let nasabah = users.customers;

    let arr = {
      customerID: nasabah?._id,
      interestRate: interestRate,
      Balance: balance,
    };

    const respons = await interestUtils.createInterest(
      arr
    );
    ;
    
    if (respons == 200) {
      setLoading(false);
      navigation.goBack()
    }
    setLoading(false);
  };
  return (
    
    <BaseContainer loading={loading}>
      <AppBar
        navigation={navigation}
        title={translations["create.transaction"]}
      />
      <ScrollView>
        <View style={styles.dropdown}>
          <FormInputPicker
            label={"Nasabah"}
            placeholder={"Pilih Nasabah"}
            value={users?.customers?.fullName}
            onPress={() => navigation.navigate("ResultsCustomers")}
            required
          />
          <FormInput
            label={"Bunga (%)"}
            placeholder={"0"}
            value={interestRate}
            suffix={" %"}
            keyboardType={"number-pad"}
            onChangeText={(val) => setInterestRate(val)}
            required
          />
          
          <View style={styles.cardPrice}>
            <Text style={styles.labelPrice}>Saldo Nasabah</Text>
            <Text style={styles.price}>{currencyFloat(balance)}</Text>
          </View>
          <View style={styles.cardPrice}>
          <Text style={styles.labelPrice}>Total Bunga</Text>
          <Text style={styles.price}>{currencyFloat(Math.floor(balance * (interestRate / 100)))}</Text>
          </View>
          <View style={styles.cardPrice}>
            <Text style={styles.labelPrice}>Total Saldo Nasabah</Text>
            <Text style={styles.price}>{currencyFloat(total)}</Text>
          </View>
        </View>
      </ScrollView>
      <ButtonFlex
        disabled={
          !(users?.customers?.fullName && users?.customers?.fullName != "") || 
          (interestRate == 0) 
        }
        title={translations["save"]}
        onPress={() => _handleSave()}
        form
      />
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { wasteBanks, users } = state;
  return { wasteBanks, users };
};

export default connect(mapStateToProps)(WasteBankInterestForm);

const styles = StyleSheet.create({
  dropdown: {
    ...StC.mB8,
    backgroundColor: Colors.WHITE,
    padding: RFValue(15),
  },
  cardType: {
    backgroundColor: Colors.GRAY_SOFT,
    paddingVertical: RFValue(5),
    paddingHorizontal: RFValue(10),
    marginRight: RFValue(10),
    borderRadius: RFValue(5),
  },
  labelType: {
    ...Font.F11,
  },
  cardItem: {
    ...StC.mB10,
    ...StC.flexR,
    borderWidth: RFValue(1),
    borderColor: Colors.GRAY_SOFT,
    paddingVertical: RFValue(10),
    paddingLeft: RFValue(15),
    borderRadius: RFValue(5),
    alignItems: "center",
  },
  txtItem: {
    ...Font.F13,
    ...Font.DARK,
    ...Font.Medium,
    ...StC.mB5,
  },
  txtWeight: {
    ...Font.F11,
    ...Font.DARK,
    ...Font.Regular,
    flex: 1,
  },
  btnRemove: {
    ...StC.centerPage,
    width: RFValue(40),
    height: RFValue(40),
  },
  subtotal: {
    ...Font.F11,
    ...Font.DARK,
    ...Font.Regular,
  },
  labelPrice: {
    ...Font.F13,
    ...Font.DARK,
    flex: 1,
  },
  price: {
    ...Font.F13,
    ...Font.PRIMARY,
    ...Font.Medium,
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
    cardPrice: {
    ...StC.flexR,
    ...StC.mB10,
  },
  optional: {
    ...Font.F10,
    ...Font.DARK,
    ...Font.Regular,
  },
});
