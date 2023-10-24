import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Font, StC, Shadow, Colors } from "@styles";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { showToast, currencyFloat } from "@constants";
import { useTranslation } from "@utils";
import RBSheet from "react-native-raw-bottom-sheet";
import withdrawUtils from "@utils/WithdrawUtils";
import sendNotifUtils from "@utils/SendNotifUtils";

function ModalWithdrawDetail({ open, item, onPress, users }) {
  const { translations } = useTranslation();
  const [loading, setLoading] = useState(false);
  let customer = item.customer;
  let bank = customer?.bankAccount;

  const confirmationAccept = (type) => {
    Alert.alert(
      translations["confirmation"],
      type == "reject"
        ? translations["confirm.reject"]
        : translations["confirmation.approved"],
      [
        {
          text: translations["confirmation.no"],
        },
        {
          text: translations["confirmation.yes"],
          onPress: () => accept(type),
        },
      ],
      { cancelable: false },
    );
  };

  const accept = async (type) => {
    let params = {
      _id: item._id,
      params: {
        status: type,
      },
    };

    setLoading(true);
    let respons = await withdrawUtils.acceptWasteBanksWithdraw(params);

    if (respons == 200) {
      sendNotif(type);
      showToast(translations["status.update"]);
      onPress();
    } else {
      showToast(translations["please.try.again"]);
    }

    setLoading(false);
  };

  const sendNotif = async (type) => {
    let message =
      "Hai *" +
      customer.fullName +
      "*," +
      "\n\n" +
      "Pengajuan withdraw kamu sebesar *" +
      currencyFloat(item.nominal) +
      "* ditolak oleh *" +
      users.users.organization.companyName +
      "*," +
      "\n\n" +
      "Silahkan coba kembali atau menghubungi bank sampah yang bersangkutan" +
      "\n\n" +
      "Terima Kasih";

    if (type == "accept") {
      message =
        "Hai *" +
        customer.fullName +
        "*," +
        "\n\n" +
        "Pengajuan withdraw kamu sebesar *" +
        currencyFloat(item.nominal) +
        "* disetujui oleh *" +
        users.users.organization.companyName +
        "*," +
        "\n\n" +
        "Silahkan hubungi bank sampah untuk lebih lanjut" +
        "\n\n" +
        "Terima Kasih";
    }

    let send = {
      message: message,
      phoneNumber: customer.account.phoneNumber,
    };

    await sendNotifUtils.sendNotifCompany(send);
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
      {customer ? (
        <View style={styles.modal}>
          <Text style={styles.name}>{customer.fullName}</Text>
          <Text style={styles.balance}>
            {translations["balance"]}: {currencyFloat(customer.balance)}
          </Text>
          <Text style={styles.nominal}>
            Nominal {translations["withdraw"]}: {currencyFloat(item.nominal)}
          </Text>
          <Text style={styles.nominal}>
            {item.method == "cash" ? "Cash" : "Transfer"}
          </Text>
          {item.method == "transfer" && (
            <Text style={styles.nominal}>
              {bank.name} - {bank.accountName} ({bank.accountNumber})
            </Text>
          )}
          <View
            style={[StC.flexR, StC.mT15, { marginHorizontal: RFValue(-10) }]}>
            {item.status == "pending" && (
              <>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => confirmationAccept("reject")}
                  style={[styles.btn, styles.btnReject]}>
                  <Text style={styles.label}>{translations["reject"]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => confirmationAccept("accept")}
                  style={[styles.btn, styles.btnApproved]}>
                  <Text style={styles.label}>{translations["approved"]}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      ) : null}
    </RBSheet>
  );
}

const mapStateToProps = function (state) {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(ModalWithdrawDetail);

const styles = StyleSheet.create({
  modal: {
    ...StC.wh100,
    padding: RFValue(15),
  },
  balance: {
    ...Font.F15,
    ...Font.PRIMARY,
    ...Font.SemiBold,
    ...StC.mB5,
  },
  name: {
    ...Font.F13,
    ...Font.DARK,
    ...Font.SemiBold,
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
  nominal: {
    ...Font.F13,
    ...Font.BLACK,
    ...Font.SemiBold,
    ...StC.mT5,
  },
});
