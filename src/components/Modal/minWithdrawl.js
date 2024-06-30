import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Font, StC } from "@styles";
import { FormInputCurrency } from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { showToast } from "@constants";
import { ButtonFlex } from "@components";
import { useTranslation } from "@utils";
import RBSheet from "react-native-raw-bottom-sheet";
import usersUtils from "@utils/UsersUtils";

function ModalMinWithdrawl({ open, onPress, users }) {
  const { translations } = useTranslation();
  let user = users.users;
  const [amount, setAmount] = useState(
    user.role == "bank-sampah" ? user.organization.minimumWithdrawal : "",
  );

  const saveItems = async () => {
    let params = {
      minimumWithdrawal: amount,
    };

    let respons = await usersUtils.companyUpdate(params);
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
      height={RFValue(200)}
      openDuration={250}
      customStyles={{
        container: {
          ...StC.centerPage,
        },
      }}>
      <View style={styles.modal}>
        <Text style={styles.service}>{translations["min.withdraw"]}</Text>
        <FormInputCurrency
          placeholder={"0"}
          value={amount}
          prefix={"Rp "}
          onChangeText={(val) => setAmount(val)}
          keyboardType={"number-pad"}
          required
          precision={0}
        />
        <ButtonFlex
          title={translations["save"]}
          onPress={() => saveItems()}
          style={StC.mT30}
          disabled={amount == ""}
        />
      </View>
    </RBSheet>
  );
}

const mapStateToProps = function (state) {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(ModalMinWithdrawl);

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
});
