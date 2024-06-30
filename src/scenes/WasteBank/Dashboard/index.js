import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  BaseContainer,
  CardWasteBankProduct,
  MyView,
  CardTrasactionDashboardWasteBank,
  CardBannerDashboard,
  FilterDate,
} from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { Icon, HStack, Center } from "native-base";
import { connect } from "react-redux";
import { StC, Colors, Font } from "@styles";
import { Images, Icons } from "@assets";
import { useTranslation } from "@utils";
import { currencyFloat, numberFloat } from "@constants";
import LinearGradient from "react-native-linear-gradient";
import wasteBanksUtils from "@utils/WasteBanksUtils";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import transactionsUtils from "@utils/TransactionsUtils";
import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


function WasteBankDashboard({ navigation, users, wasteBanks, transactions}) {
  const { translations } = useTranslation();
  let user = users.users;
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTransactionsSummary, setLoadingTransactionsSummary] = useState(false);
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [date, setDate] = useState(new Date());

  // useEffect(() => {
  //   getWasteBanksProduct();
  //   getWasteBanksTransaction();
  //   getSummary(date);
  // }, []);

  useEffect(() => {
    getWasteBanksProduct();
    getWasteBanksTransaction();
    getSummary(date);
    getTransactionsSummary(date);
  }, []);


  const getWasteBanksProduct = async () => {
    setLoadingProduct(true);
    await wasteBanksUtils.getWasteBanksProduct();
    setLoadingProduct(false);
  };

  const getWasteBanksTransaction = async () => {
    setLoadingTransaction(true);
    await transactionsUtils.getTransactionsWasteBanks();
    setLoadingTransaction(false);
  };

  const getSummary = async (val) => {
    setDate(val);
    setLoadingSummary(true);
    await wasteBanksUtils.getSummary(
      `year=${moment(val).format("YYYY")}&month=${moment(val).format("M")}`,
    );
    setLoadingSummary(false);
  };

  const getTransactionsSummary = async (val) => {
    setDate(val);
    setLoadingTransactionsSummary(true);
    await transactionsUtils.getTransactionsSummary(
      `year=${moment(val).format("YYYY")}&month=${moment(val).format("M")}`,
    );
    setLoadingTransactionsSummary(false);
  };

  const getDetailProduct = async (id) => {
    await wasteBanksUtils.getWasteBanksProductDetail(id);
    navigation.navigate("WasteBankProductForm");
  };
  
  const getTransactionDetail = async (id) => {
    await transactionsUtils.getTransactionsWasteBanksDetail(id);
    navigation.navigate("WasteBankTransactionDetails");
  };


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
          <Text style={styles.welcome}>Bank Sampah</Text>
          <Text
            style={styles.nameBank}
            numberOfLines={2}>{`${user?.organization?.companyName}`}</Text>
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
            <Text style={styles.saldo}>
              {numberFloat(transactions?.transactions?.length)}
            </Text>
            <Text style={styles.labelSaldo}>{translations["transaction"]}</Text>
          </View>
          <View style={styles.itemSaldo}>
            <Text style={styles.saldo}>
              {numberFloat(wasteBanks?.product?.length)}
            </Text>
            <Text style={styles.labelSaldo}>{translations["product"]}</Text>
          </View>
        </View>
        <View style={styles.summary}>
          <HStack mb={RFValue(3)}>
            <Text style={styles.titleSummary}>Ringkasan</Text>
            <FilterDate date={date} setDate={(val) => {
                getSummary(val);
                getTransactionsSummary(val);
              }}  />
          </HStack>

          <Text style={styles.itemSummary}>Total Transaksi Bulan Ini: {currencyFloat(transactions.summary.reduce((acc, item) => acc + item.totalSum, 0))}</Text>
          
          {transactions.summary.length > 0 ? (
            
            <Center>
              <LineChart
                data={{
                  labels: transactions.summary.map(item => item.day), // Extracting "day" from each item
                  datasets: [
                    {
                      data: transactions.summary.map(item => item.totalSum), // Extracting "totalPrice" from each item
                    },
                  ],
                }}
                width={Dimensions.get("window").width-RFValue(60)} // from react-native
                height={210}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={2} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 0,
                }}
                fromZero="true"
              />
              <Text style={{ marginBottom: 20 }}>Tanggal</Text>
            </Center>
            
          ) : (
            <Text>No data available</Text>
          )}

          {wasteBanks.summary.map((item, index) => (
            <HStack>
              <Icon
                as={Entypo}
                name={"dot-single"}
                size={RFValue(5)}
                color={Colors.GRAY_LABEL}
              />
              <Text style={styles.itemSummary}>{item.item_name}</Text>
              <Text style={styles.labelSaldo}>{item.total_weight} kg</Text>
            </HStack>
          ))}
          {wasteBanks.summary.length == 0 && (
            <Center>
              <Text style={[styles.labelSaldo, StC.mB5]}>
                Tidak ada ringkasan
              </Text>
            </Center>
          )}
        </View>

        <MyView hide={wasteBanks.product?.length == 0}>
          <Text style={styles.waste}>{translations["product"]}</Text>
          {loadingProduct ? (
            <View style={styles.wastePlaceholder}>
              {[0, 1, 2].map((item, index) => (
                <ShimmerPlaceHolder
                  key={index}
                  LinearGradient={LinearGradient}
                  style={{
                    borderRadius: RFValue(10),
                    width: RFValue(150),
                    height: RFValue(130),
                    marginRight: RFValue(10),
                  }}
                />
              ))}
            </View>
          ) : (
            <FlatList
              data={wasteBanks.product}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <CardWasteBankProduct
                  item={item}
                  index={index}
                  onPress={() => getDetailProduct(item._id)}
                />
              )}
            />
          )}
        </MyView>
        <CardBannerDashboard />
        <MyView
          hide={transactions.transactions.length == 0}
          style={styles.cardLine}>
          <Text style={styles.waste}>{translations["transaction"]}</Text>
          {loadingTransaction ? (
            <View style={styles.wastePlaceholder}>
              {[0, 1, 2].map((item, index) => (
                <ShimmerPlaceHolder
                  key={index}
                  LinearGradient={LinearGradient}
                  style={{
                    borderRadius: RFValue(10),
                    width: RFValue(200),
                    height: RFValue(100),
                    marginRight: RFValue(10),
                  }}
                />
              ))}
            </View>
          ) : (
            <FlatList
              data={transactions.transactions}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) =>
                index < 10 ? (
                  <CardTrasactionDashboardWasteBank
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
      <TouchableOpacity
        style={styles.btnChat}
        activeOpacity={0.5}
        onPress={() => navigation.navigate("Chats")}>
        <Image source={Icons.chat} style={styles.iconChat} />
        <Text style={styles.count}></Text>
      </TouchableOpacity>
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { users, wasteBanks, transactions } = state;
  return { users, wasteBanks, transactions };
};

export default connect(mapStateToProps)(WasteBankDashboard);

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#fffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // White color
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // White color
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "3",
    strokeWidth: "2",
    stroke: "#0000ff" // Adjust as needed
  }
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: RFValue(175),
    borderBottomLeftRadius: RFValue(20),
    borderBottomRightRadius: RFValue(20),
    paddingHorizontal: RFValue(20),
  },
  logo: {
    ...StC.mB10,
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
  nameBank: {
    ...Font.F13,
    ...Font.WHITE,
    ...StC.mB5,
    ...Font.SemiBold,
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
    ...Font.F13,
    ...Font.BLACK,
    ...Font.SemiBold,
    marginHorizontal: RFValue(15),
    marginVertical: RFValue(10),
  },
  cardBanner: {
    ...StC.flexR,
    paddingLeft: RFValue(15),
    marginTop: RFValue(20),
  },
  banner: {
    width: RFValue(250),
    height: RFValue(90),
    marginRight: RFValue(0),
    borderRadius: RFValue(10),
  },
  wastePlaceholder: {
    ...StC.flexR,
    marginBottom: RFValue(5),
    paddingHorizontal: RFValue(15),
  },
  cardLine: {
    paddingBottom: RFValue(10),
    borderBottomWidth: RFValue(8),
    borderColor: Colors.BACKGROUND,
  },
  btnChat: {
    width: RFValue(50),
    height: RFValue(50),
    position: "absolute",
    bottom: RFValue(10),
    right: RFValue(10),
  },
  iconChat: {
    width: "100%",
    height: "100%",
  },
  count: {
    ...Font.F12,
    ...Font.PRIMARY,
    ...Font.SemiBold,
    position: "absolute",
    left: RFValue(18),
    top: RFValue(12),
  },
});
