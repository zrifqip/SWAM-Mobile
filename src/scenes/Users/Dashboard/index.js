import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  BaseContainer,
  CardWasteBank,
  CardTrasactionDashboard,
  MyView,
  CardBannerDashboard,
} from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { StC, Colors, Font } from "@styles";
import { Images, Icons } from "@assets";
import { useTranslation } from "@utils";
import { currencyFloat, arrSortDistance } from "@constants";
import { GetCoordinate, CurrentWaste } from "@actions";
import store from "@stores/store";
import wasteBanksUtils from "@utils/WasteBanksUtils";
import transactionsUtils from "@utils/TransactionsUtils";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import Geolocation from "@react-native-community/geolocation";

function UsersDashboard({ navigation, users, wasteBanks, transactions }) {
  let user = users.users;

  const { translations }                  = useTranslation()
  const [loadingWaste, setLoadingWaste]   = useState(false)
  const [loadingTrans, setLoadingTrans]   = useState(false)
  const [balance, setBalance]             = useState(user?.biodata?.balance);

  let history = []
  if(transactions){
    if(transactions?.transactions.length !=0){
      history = transactions.transactions
    }
  }

  useEffect(() => {
      const isFocused = navigation.isFocused();

      if (isFocused) {
          loadLocation()
          getTransaction()
          getWasteBanks()   
          setDisabled()
          setModal()      
        }

        const navFocusListener = navigation.addListener('didFocus', () => {
            setDisabled()
            setBalance(users?.biodata?.balance);
        });

        return () => {
            navFocusListener.remove();
        };
    }, [navigation, users?.biodata?.balance]);


  const getModal = async () => {
    if (!user?.biodata?.companyID) {
      Alert.alert(
        "Informasi",
        "Anda belum terdaftar menjadi Nasabah, silahkan pilih Bank Sampah terlebih dahulu",
        [
          {
            text: "Pilih Bank Sampah",
            onPress: () => navigation.navigate("UsersWasteBank"),
          },
        ],
        { cancelable: false },
      );
    }
  };

  const setDisabled = async () => {
    store.dispatch(CurrentWaste(user?.biodata?.companyID));
  };

  const getWasteBanks = async () => {
    setLoadingWaste(true);
    await wasteBanksUtils.getWasteBanks(10);
    setLoadingWaste(false);
  };

  const getTransaction = async () => {
    setLoadingTrans(true);
    await transactionsUtils.getTransactionsUsers();
    setLoadingTrans(false);
  };

  const getResultWasteBanks = async (id) => {
    await wasteBanksUtils.getWasteBanksDetails(id);
    navigation.navigate("UsersWasteBankDetail");
  };

  const getTransactionDetail = async (id) => {
    await transactionsUtils.getTransactionsUsersDetail(id);
    navigation.navigate("UsersTransactionDetails");
  };

  // LOCATION
  const loadLocation = async () => {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          callLocation();
        } else {
          alert("Aktifkan GPS");
        }
      } catch (err) {}
    }

    requestLocationPermission();
  };

  const callLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        let coordinate = {
          longitude: JSON.stringify(position.coords.longitude),
          latitude: JSON.stringify(position.coords.latitude),
        };

        storeCoordinate(coordinate);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000000, maximumAge: 1000 },
    );
    watchID = Geolocation.watchPosition((position) => {
      let coordinate = {
        longitude: JSON.stringify(position.coords.longitude),
        latitude: JSON.stringify(position.coords.latitude),
      };

      storeCoordinate(coordinate);
    });
  };

  const storeCoordinate = async (coordinate) => {
    return store.dispatch(GetCoordinate(coordinate));
  };

  let sortir = arrSortDistance(wasteBanks.list, users?.coordinate);

  return (
    <BaseContainer>
      <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY} />
      <ScrollView style={{ backgroundColor: "white" }}>
        <LinearGradient
          colors={[Colors.PRIMARY, Colors.PRIMARY]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}>
          <Image source={Images.swam_putih} style={styles.logo} />
          <Text
            style={styles.welcome}
            numberOfLines={
              2
            }>{`${translations["hello"]}, ${user?.biodata?.fullName}, ${translations["how.are.you"]}`}</Text>
          <View style={[StC.flexR, { alignItems: "center" }]}>
            <Image source={Icons.location} style={styles.iconPin} />
            <Text
              style={styles.address}
              numberOfLines={1}>{`${user?.biodata?.address?.street}`}</Text>
          </View>
        </LinearGradient>
        <View style={styles.cardSaldo}>
          <TouchableOpacity
            style={styles.itemSaldo}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("UsersWithdraw")}>
            <Text style={styles.saldo}>
              {currencyFloat(user?.biodata?.balance)}
            </Text>
            <Text style={styles.labelSaldo}>Saldo</Text>
          </TouchableOpacity>
          <View style={styles.itemSaldo}>
            <Image source={Images.logo_biru} style={styles.icon} />
            <Text style={styles.labelSaldo}>{translations["waste.bank"]}</Text>
          </View>
        </View>
        <MyView hide={users?.currentwaste}>
          <Text style={styles.waste}>{translations["waste.banks"]}</Text>
          {loadingWaste ? (
            <View style={styles.wastePlaceholder}>
              {[0, 1, 2].map((item, index) => (
                <ShimmerPlaceHolder
                  key={index}
                  LinearGradient={LinearGradient}
                  style={{
                    borderRadius: RFValue(10),
                    width: RFValue(170),
                    height: RFValue(135),
                    marginRight: RFValue(10),
                  }}
                />
              ))}
            </View>
          ) : (
            <FlatList
              data={sortir}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) =>
                index < 10 ? (
                  <CardWasteBank
                    item={item}
                    index={index}
                    onPress={() => getResultWasteBanks(item._id)}
                  />
                ) : null
              }
            />
          )}
        </MyView>
        <CardBannerDashboard />
        <MyView hide={history.length == 0} style={styles.cardLine}>
          <Text style={styles.waste}>{translations["transaction"]}</Text>
          {loadingTrans ? (
            <View style={styles.wastePlaceholder}>
              {[0, 1, 2].map((item, index) => (
                <ShimmerPlaceHolder
                  key={index}
                  LinearGradient={LinearGradient}
                  style={{
                    borderRadius: RFValue(10),
                    width: RFValue(190),
                    height: RFValue(80),
                    marginRight: RFValue(10),
                  }}
                />
              ))}
            </View>
          ) : (
            <FlatList
              data={history}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) =>
                index < 10 ? (
                  <CardTrasactionDashboard
                    item={item}
                    index={index}
                    onPress={() => getTransactionDetail(item._id)}
                  />
                ) : null
              }
            />
          )}
        </MyView>
      </ScrollView>
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { users, wasteBanks, transactions } = state;
  return { users, wasteBanks, transactions };
};

export default connect(mapStateToProps)(UsersDashboard);

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: RFValue(160),
    borderBottomLeftRadius: RFValue(20),
    borderBottomRightRadius: RFValue(20),
    paddingHorizontal: RFValue(20),
  },
  logo: {
    ...StC.mB20,
    width: RFValue(100),
    height: RFValue(30),
    marginTop: RFValue(20),
    resizeMode: "contain",
  },
  icon: {
    width: RFValue(30),
    height: RFValue(30),
  },
  iconPin: {
    marginRight: RFValue(10),
    width: RFValue(13),
    height: RFValue(13),
    resizeMode: "contain",
  },
  welcome: {
    ...Font.F12,
    ...Font.WHITE,
    ...Font.SemiBold,
    ...StC.mB5,
  },
  address: {
    ...Font.F12,
    ...Font.WHITE,
    ...Font.Regular,
  },
  cardSaldo: {
    ...StC.flexR,
    ...StC.mB10,
    marginTop: RFValue(-30),
    marginHorizontal: RFValue(15),
    borderRadius: RFValue(10),
    padding: RFValue(10),
    backgroundColor: Colors.WHITE,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowColor: Colors.BLACK,
    elevation: 1,
  },
  itemSaldo: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  saldo: {
    ...Font.F14,
    ...Font.BLACK,
    ...Font.SemiBold,
  },
  labelSaldo: {
    ...Font.F12,
    ...Font.GRAY_LABEL,
    ...StC.mT3,
    ...Font.Regular,
  },
  waste: {
    ...Font.F12,
    ...Font.BLACK,
    ...Font.SemiBold,
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(10),
  },
  wastePlaceholder: {
    ...StC.flexR,
    marginBottom: RFValue(5),
    paddingHorizontal: RFValue(15),
  },
  cardLine: {
    marginTop: RFValue(20),
    paddingBottom: RFValue(10),
    borderTopWidth: RFValue(8),
    borderColor: Colors.BACKGROUND,
  },
});
