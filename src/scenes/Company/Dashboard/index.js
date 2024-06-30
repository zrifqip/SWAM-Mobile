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
} from "react-native";
import {
  BaseContainer,
  CardWasteBank,
  CardBannerDashboard,
  MyView,
  ButtonChats,
  FilterDate,
} from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon, HStack, Center } from "native-base";
import { connect } from "react-redux";
import { StC, Colors, Font } from "@styles";
import { Images, Icons } from "@assets";
import { useTranslation } from "@utils";
import { arrSortDistance, numberFloat } from "@constants";
import { GetCoordinate, GetWasteBanksDetails } from "@actions";
import store from "@stores/store";
import wasteBanksUtils from "@utils/WasteBanksUtils";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import Geolocation from "@react-native-community/geolocation";
import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";

function CompanyDashboard({ navigation, users, wasteBanks }) {
  let user = users.users;
  const { translations } = useTranslation();
  const [loadingWaste, setLoadingWaste] = useState(false);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    loadLocation();
    getWasteBanks();
    getDashboard(date);
  }, []);

  const getWasteBanks = async () => {
    setLoadingWaste(true);
    const amount = await wasteBanksUtils.getWasteBanksCompany(10);
    setAmount(amount);
    setLoadingWaste(false);
  };

  const getDashboard = async (val) => {
    setDate(val);
    await wasteBanksUtils.getCompanyDashboard(
      `year=${moment(val).format("YYYY")}&month=${moment(val).format("M")}`,
    );
  };

  const getResultWasteBanks = async (item) => {
    store.dispatch(GetWasteBanksDetails(item));
    navigation.navigate("CompanyWasteBankDetail");
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
            }>{`${translations["hello"]}, ${user?.organization?.companyName}, ${translations["how.are.you"]}`}</Text>
          <View style={[StC.flexR, { alignItems: "center" }]}>
            <Image source={Icons.location} style={styles.iconPin} />
            <Text
              style={styles.address}
              numberOfLines={
                1
              }>{`${user?.organization?.address?.street}`}</Text>
          </View>
        </LinearGradient>
        <View style={styles.cardSaldo}>
          <View style={styles.itemSaldo}>
            <Text style={styles.saldo}>{numberFloat(amount)}</Text>
            <Text style={styles.labelSaldo}>{translations["waste.bank"]}</Text>
          </View>
          <View style={styles.itemSaldo}>
            <Image source={Images.logo_biru} style={styles.icon} />
            <Text style={styles.labelSaldo}>SWAM</Text>
          </View>
        </View>
        <View style={styles.summary}>
          <HStack mb={RFValue(3)}>
            <Text style={styles.titleSummary}>Ringkasan</Text>
            <FilterDate date={date} setDate={(val) => getDashboard(val)} />
          </HStack>
          {wasteBanks.dashboard.map((item, index) => (
            <HStack>
              <Icon
                as={Entypo}
                name={"dot-single"}
                size={RFValue(5)}
                color={Colors.GRAY_LABEL}
              />
              <Text style={styles.itemSummary}>{item.companyName}</Text>
              <Text style={styles.labelSaldo}>{item.total_weight} kg</Text>
            </HStack>
          ))}
          {wasteBanks.dashboard.length == 0 && (
            <Center>
              <Text style={[styles.labelSaldo, StC.mB5]}>
                Tidak ada ringkasan
              </Text>
            </Center>
          )}
        </View>
        <MyView>
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
                    height: RFValue(150),
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
              renderItem={({ item, index }) =>
                index < 10 ? (
                  <CardWasteBank
                    item={item}
                    index={index}
                    onPress={() => getResultWasteBanks(item)}
                  />
                ) : null
              }
            />
          )}
        </MyView>
        <CardBannerDashboard />
      </ScrollView>
      <ButtonChats
        navigation={navigation}
        onPress={() => navigation.navigate("Chats")}
      />
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { users, wasteBanks } = state;
  return { users, wasteBanks };
};

export default connect(mapStateToProps)(CompanyDashboard);

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
  summary: {
    marginTop: RFValue(20),
    marginBottom: RFValue(10),
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
  titleSummary: {
    ...Font.F12,
    ...Font.BLACK,
    ...Font.SemiBold,
    flex: 1,
  },
  itemSummary: {
    flex: 1,
    ...Font.F12,
    ...Font.BLACK,
    ...Font.Medium,
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
