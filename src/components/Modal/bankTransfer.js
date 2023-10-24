import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Font, StC, Colors } from "@styles";
import { FormInput } from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { showToast, requireds } from "@constants";
import { ButtonFlex } from "@components";
import { useTranslation } from "@utils";
import { arrBank } from "./arrBank";
import { Picker } from "@react-native-community/picker";
import RBSheet from "react-native-raw-bottom-sheet";
import usersUtils from "@utils/UsersUtils";

function ModalBankTransfer({ open, onPress, users }) {
  let bank = users.users.biodata?.bankAccount;
  const { translations } = useTranslation();
  const [name, setName] = useState(bank ? bank.name : "");
  const [accountNumber, setAccountNumber] = useState(
    bank ? JSON.stringify(bank.accountNumber) : "",
  );
  const [accountName, setAccountName] = useState(bank ? bank.accountName : "");

  const saveItems = async () => {
    let params = {
      bankAccount: {
        name: name,
        accountNumber: accountNumber,
        accountName: accountName,
      },
    };

    let respons = await usersUtils.usersUpdate(params);
    if (respons == 200) {
      showToast(translations["save.success"]);

      setTimeout(() => {
        onPress();
      }, 1000);
    }
  };

  return (
    <RBSheet
      ref={open}
      height={RFValue(380)}
      openDuration={250}
      customStyles={{
        container: {
          ...StC.centerPage,
        },
      }}>
      <View style={styles.modal}>
        <Text style={styles.service}>Bank Transfer</Text>
        <Text style={StC.title}>Nama Bank {requireds("*")}</Text>
        <View style={styles.border}>
          <Picker
            selectedValue={name}
            onValueChange={(itemValue, itemIndex) => setName(itemValue)}>
            {arrBank().map((item) => (
              <Picker.Item label={item.name} value={item.name} />
            ))}
          </Picker>
        </View>
        <View style={StC.mB10} />
        <FormInput
          label={"Nama Akun"}
          placeholder={"Nama Akun"}
          value={accountName}
          onChangeText={(val) => setAccountName(val)}
          required
        />
        <FormInput
          label={"Nomor Rekening"}
          placeholder={"Nomor Rekening"}
          value={accountNumber}
          onChangeText={(val) => setAccountNumber(val)}
          required
          keyboardType={"number-pad"}
        />
        <ButtonFlex
          title={translations["save"]}
          onPress={() => saveItems()}
          style={StC.mT30}
          disabled={name == "" || accountName == "" || accountNumber == ""}
        />
      </View>
    </RBSheet>
  );
}

const mapStateToProps = function (state) {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(ModalBankTransfer);

const styles = StyleSheet.create({
  modal: {
    ...StC.wh100,
    padding: RFValue(15),
  },
  service: {
    ...Font.F15,
    ...Font.DARK,
    ...Font.Medium,
    ...StC.mB15,
  },
  labelCheckbox: {
    ...Font.F13,
    ...Font.DARK,
  },
  price: {
    ...Font.F13,
    ...Font.PRIMARY,
    ...Font.Medium,
  },
  border: {
    borderWidth: RFValue(1),
    borderRadius: RFValue(3),
    height: RFValue(40),
    borderColor: Colors.GRAY_SOFT,
  },
});
