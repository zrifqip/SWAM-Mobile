import React, { useRef } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Linking,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  BaseContainer,
  ModalMinWithdrawl,
  ModalBankTransfer,
} from "@components";
import { Avatar, Icon } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { StC, Colors, Font } from "@styles";
import { Images, Icons } from "@assets";
import { base_uri } from "@constants/BASE_URL";
import { useTranslation } from "@utils";
import { GetUsersDetail } from "@actions";
import { currencyFloat } from "@constants";
import store from "@stores/store";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MMKVStorage from "react-native-mmkv-storage";

function Account({ navigation, users }) {
  const { translations } = useTranslation();
  let user = users.users;
  let role = user.role;
  let biodata,
    organization,
    photo = "";
  const refModalMinWithdrawl = useRef();
  const refModalBankTransfer = useRef();

  if (user.biodata) {
    biodata = user.biodata;

    if (biodata.photo.length != 0) {
      photo = biodata.photo[0].thumb.path;
    }
  }

  if (user.organization) {
    organization = user.organization;

    if (organization.image.length != 0) {
      photo = organization.image[0].thumb.path;
    }
  }

  const navigationMenu = async (menu) => {
    if (menu.type == "uri") {
      Linking.openURL(menu.action);
    } else if (menu.name == "logout") {
      confirmationLogout();
    } else if (menu.type == "modal") {
      if (menu.action == "minwithdrawl") {
        refModalMinWithdrawl.current.open();
      } else if (menu.action == "bankTransfer") {
        refModalBankTransfer.current.open();
      }
    } else {
      navigation.navigate(menu.action);
    }
  };

  const confirmationLogout = () => {
    Alert.alert(
      translations["logout.title"],
      translations["logout.title"],
      [
        {
          text: translations["confirmation.no"],
        },
        {
          text: translations["confirmation.yes"],
          onPress: () => logout(),
        },
      ],
      { cancelable: false },
    );
  };

  const logout = async () => {
    navigation.navigate("OnBoarding");
    store.dispatch({ type: "SIGN_OUT" });
    store.dispatch(GetUsersDetail(""));

    let storage = new MMKVStorage.Loader().initialize();
    storage.setItem("token", "");
  };

  const menu = [
    {
      menu: translations["account.and.security"],
      submenu: [
        {
          icon: MaterialCommunityIcons,
          name: "account-edit",
          menu: translations["edit.profile"],
          action:
            role == "user"
              ? "UsersProfile"
              : role == "bank-sampah"
              ? "WasteBankProfile"
              : "CompanyProfile",
        },
        {
          icon: MaterialCommunityIcons,
          name: "wallet",
          menu: translations["min.withdraw"],
          value:
            role == "bank-sampah"
              ? currencyFloat(organization.minimumWithdrawal)
              : "",
          type: "modal",
          action: "minwithdrawl",
          disabled: role != "bank-sampah",
        },
        {
          icon: MaterialCommunityIcons,
          name: "wallet",
          menu: "Bank Transfer",
          value:
            role == "user"
              ? user?.biodata?.bankAccount
                ? user?.biodata?.bankAccount?.accountName
                : ""
              : "",
          type: "modal",
          action: "bankTransfer",
          disabled: role != "user",
        },
        {
          icon: MaterialCommunityIcons,
          name: "account-group",
          menu: "Nasabah",
          action: "WasteBankCustomers",
          disabled: role != "bank-sampah",
        },
        {
          icon: MaterialCommunityIcons,
          name: "account-cash",
          menu: translations["withdraw"],
          action: role == "user" ? "UsersWithdraw" : "WasteBankWithdraw",
          disabled: role != "bank-sampah" && role != "user",
        },
        {
          icon: MaterialCommunityIcons,
          name: "sack-percent",
          menu: translations["interest"],
          action: "WasteBankInterestForm",
          disabled: role != "bank-sampah",
        },
      ],
    },
    {
      menu: translations["general"],
      submenu: [
        {
          icon: MaterialIcons,
          name: "phone-iphone",
          menu: translations["call"],
          type: "uri",
          action: "https://wa.me/6282329083354",
        },
        {
          icon: MaterialCommunityIcons,
          name: "shield-alert",
          menu: translations["terms.condition"],
          type: "uri",
          action: "https://riset.its.ac.id/apps4swam/term",
        },
        {
          icon: MaterialCommunityIcons,
          name: "lock",
          menu: "Kebijakan Privasi",
          type: "uri",
          action: "https://riset.its.ac.id/apps4swam/privacy-policy",
        },
        {
          icon: MaterialCommunityIcons,
          name: "help-circle",
          menu: translations["help"],
          type: "uri",
          action: "https://wa.me/6282329083354",
        },
      ],
    },
    {
      submenu: [
        {
          icon: MaterialCommunityIcons,
          name: "logout",
          menu: translations["logout"],
        },
      ],
      type: "logout",
    },
  ];

  return (
    <BaseContainer>
      <ScrollView>
        <View style={styles.header}>
          <Avatar
            square
            size="lg"
            source={photo ? { uri: base_uri + photo } : Images.profile}
          />
          <View style={styles.contentHeader}>
            {role == "bank-sampah" ? (
              <Text style={[styles.name, { color: Colors.PRIMARY }]}>
                Bank Sampah
              </Text>
            ) : null}
            <Text style={styles.waste}>
              {role == "user"
                ? user?.biodata?.fullName
                : role == "bank-sampah" || role == "pengepul"
                ? user?.organization?.companyName
                : null}
            </Text>
            <Text style={styles.street}>
              {role == "user"
                ? biodata?.address?.street
                : user?.organization?.address?.street}
            </Text>
          </View>
        </View>
        <FlatList
          data={menu}
          renderItem={({ item }) => (
            <View
              style={[
                styles.cardMenu,
                { paddingTop: RFValue(item.type == "logout" ? 0 : 10) },
              ]}>
              {item.type != "logout" ? (
                <Text style={styles.name}>{item.menu}</Text>
              ) : null}
              {item.submenu
                .filter((x) => !x.disabled)
                .map((submenu) => (
                  <TouchableOpacity
                    style={styles.submenu}
                    onPress={() => navigationMenu(submenu)}>
                    <View style={styles.icon}>
                      <Icon
                        as={submenu.icon}
                        name={submenu.name}
                        size={RFValue(5)}
                        color={[
                          item.type == "logout" ? Colors.PRIMARY : Colors.BLACK,
                        ]}
                      />
                    </View>
                    <Text style={styles.labelSubmeny}>{submenu.menu}</Text>
                    <Text style={styles.street}>{submenu?.value}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        />
      </ScrollView>
      <ModalMinWithdrawl
        open={refModalMinWithdrawl}
        onPress={() => refModalMinWithdrawl.current.close()}
      />
      <ModalBankTransfer
        open={refModalBankTransfer}
        onPress={() => refModalBankTransfer.current.close()}
      />
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(Account);

const styles = StyleSheet.create({
  header: {
    ...StC.flexR,
    ...StC.mB8,
    padding: RFValue(15),
    paddingTop: RFValue(20),
    backgroundColor: Colors.WHITE,
  },
  contentHeader: {
    flex: 1,
    paddingLeft: RFValue(10),
  },
  photo: {
    width: RFValue(70),
    height: RFValue(70),
  },
  waste: {
    ...Font.F13,
    ...Font.BLACK,
    ...Font.SemiBold,
    ...StC.mB3,
  },
  name: {
    ...Font.F12,
    ...Font.BLACK,
    ...Font.Bold,
  },
  street: {
    ...Font.F11,
    ...Font.GRAY_LABEL,
    ...Font.Medium,
  },
  cardMenu: {
    ...StC.mB8,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: RFValue(10),
  },
  submenu: {
    ...StC.flexR,
    paddingVertical: RFValue(12),
    borderBottomWidth: RFValue(1),
    borderColor: Colors.LINE,
    alignItems: "center",
  },
  icon: {
    width: RFValue(30),
  },
  labelSubmeny: {
    ...Font.F12,
    ...Font.BLACK,
    ...Font.Medium,
    flex: 1,
  },
});
