import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Font, StC } from "@styles";
import { FormInputCurrency, FormInputRadio } from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { showToast, currencyFloat, requireds } from "@constants";
import { ButtonFlex } from "@components";
import { useTranslation } from "@utils";
import RBSheet from "react-native-raw-bottom-sheet";
import withdrawUtils from "@utils/WithdrawUtils";
import sendNotifUtils from "@utils/SendNotifUtils";

function ModalWithdraw({ open, onPress, users }) {
  let user = users.users;
  let bank = user.biodata?.bankAccount;
  let min = 0;
  let balance = user?.biodata?.balance;
  const { translations } = useTranslation();
  const [amount, setAmount] = useState(
    user.role == "bank-sampah" ? user.organization.minimumWithdrawal : "",
  );
  const [isTransfer, setIsTransfer] = useState(false);

  if (user?.biodata?.company) {
    min = user?.biodata?.company?.minimumWithdrawal;
  }

  const saveItems = async () => {
    if (amount < min) {
      showToast(translations["min.withdraw"] + " " + currencyFloat(min));
    } else if (amount > balance) {
      showToast(translations["max.withdraw"] + " " + currencyFloat(balance));
    } else {
      let params = {
        nominal: amount,
        method: isTransfer ? "transfer" : "cash",
      };

      let respons = await withdrawUtils.createUsersWithdraw(params);
      if (respons == 200) {
        sendNotif();
        showToast(translations["save.success"]);
        setAmount(0);
        setTimeout(() => {
          onPress();
        }, 1000);
      }
    }
  };

  const sendNotif = async () => {
    let message =
      "*## NEW WITHDRAW ##*" +
      "\n\n" +
      "Hai *" +
      user.biodata.company.companyName +
      "*," +
      "\n\n" +
      "Berikut invoice untuk pengajuan withdraw" +
      "\n\n" +
      "Nama Nasabah : " +
      user.biodata.fullName +
      "\n" +
      "Alamat : " +
      user.biodata.address.street +
      "\n" +
      "Nominal : *" +
      currencyFloat(amount) +
      "*\n\n" +
      "Silahkan membuka aplikasi untuk melihat detail transaksi" +
      "\n\n" +
      "Terima Kasih";

    let send = {
      message: message,
      phoneNumber: users.users.biodata.company.phoneNumber,
    };

    await sendNotifUtils.sendNotifUser(send);
  };

  return (
    <RBSheet
      ref={open}
      height={RFValue(280)}
      openDuration={250}
      customStyles={{
        container: {
          ...StC.centerPage,
        },
      }}>
      <View style={styles.modal}>
        <Text style={styles.balance}>
          {translations["balance"]}: {currencyFloat(balance)}
        </Text>
        <Text style={styles.service}>
          Nominal {translations["withdraw"]} {requireds("*")}
        </Text>
        <View style={{ height: RFValue(52) }}>
          <FormInputCurrency
            placeholder={"0"}
            value={amount}
            prefix={"Rp "}
            onChangeText={(val) => setAmount(val)}
            keyboardType={"number-pad"}
            required
            precision={0}
          />
        </View>
        <Text style={styles.min}>
          * Minimum {translations["withdraw"]} :{" "}
          {currencyFloat(user?.biodata?.company?.minimumWithdrawal)}
        </Text>
        <View style={StC.mT10}>
          <Text style={StC.title}>Metode Penarikan {requireds("*")}</Text>
          <View style={StC.flexR}>
            <FormInputRadio
              onPress={() => setIsTransfer(!isTransfer)}
              checked={!isTransfer}
              title={"Cash"}
              style={{ width: RFValue(90) }}
            />
            <FormInputRadio
              onPress={() => setIsTransfer(!isTransfer)}
              checked={isTransfer}
              title={"Transfer"}
              style={{ width: RFValue(90) }}
            />
          </View>
          <View style={StC.mB10} />
        </View>
        {isTransfer && (
          <View>
            {bank ? (
              <Text style={styles.bank}>
                {bank.name} - {bank.accountName} ({bank.accountNumber})
              </Text>
            ) : (
              <Text style={[styles.bank, Font.DANGER]}>
                Atur Bank Transfer terlebih dahulu
              </Text>
            )}
          </View>
        )}
        <ButtonFlex
          title={translations["send"]}
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

export default connect(mapStateToProps)(ModalWithdraw);

const styles = StyleSheet.create({
  modal: {
    ...StC.wh100,
    padding: RFValue(15),
  },
  service: {
    ...Font.F13,
    ...Font.DARK,
    ...Font.Medium,
    ...StC.mB5,
  },
  bank: {
    ...Font.F12,
    ...Font.DARK,
  },
  balance: {
    ...Font.F15,
    ...Font.PRIMARY,
    ...Font.SemiBold,
    ...StC.mB5,
  },
  min: {
    ...Font.F10,
    ...Font.DANGER,
    ...Font.Medium,
    marginTop: RFValue(-7),
  },
});
