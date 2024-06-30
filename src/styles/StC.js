import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors, Font, Shadow } from "@styles";

const StC = StyleSheet.create({
  w04: { width: "4%" },
  w05: { width: "5%" },
  w06: { width: "6%" },
  w07: { width: "7%" },
  w10: { width: "10%" },
  w15: { width: "15%" },
  w20: { width: "20%" },
  w25: { width: "25%" },
  w30: { width: "30%" },
  w35: { width: "35%" },
  w40: { width: "40%" },
  w45: { width: "45%" },
  w48: { width: "48%" },
  w50: { width: "50%" },
  w55: { width: "55%" },
  w60: { width: "60%" },
  w65: { width: "65%" },
  w70: { width: "70%" },
  w75: { width: "75%" },
  w80: { width: "80%" },
  w85: { width: "85%" },
  w90: { width: "90%" },
  w95: { width: "95%" },
  w100: { width: "100%" },
  h03: { height: "3%" },
  h04: { height: "4%" },
  h05: { height: "5%" },
  h06: { height: "6%" },
  h07: { height: "7%" },
  h08: { height: "8%" },
  h10: { height: "10%" },
  h15: { height: "15%" },
  h20: { height: "20%" },
  h25: { height: "25%" },
  h30: { height: "30%" },
  h35: { height: "35%" },
  h40: { height: "40%" },
  h43: { height: "43%" },
  h45: { height: "45%" },
  h50: { height: "50%" },
  h55: { height: "55%" },
  h60: { height: "60%" },
  h65: { height: "65%" },
  h70: { height: "70%" },
  h75: { height: "75%" },
  h80: { height: "80%" },
  h85: { height: "85%" },
  h90: { height: "90%" },
  h100: { height: "100%" },

  mH05: {
    marginHorizontal: RFValue(5),
  },
  mH10: {
    marginHorizontal: RFValue(10),
  },
  mH15: {
    marginHorizontal: RFValue(15),
  },
  mH25: {
    marginHorizontal: RFValue(25),
  },
  mH30: {
    marginHorizontal: RFValue(30),
  },

  mV10: {
    marginVertical: RFValue(10),
  },
  mV15: {
    marginVertical: RFValue(15),
  },
  mV20: {
    marginVertical: RFValue(20),
  },

  wh15: { width: RFValue(15), height: RFValue(15) },
  wh20: { width: RFValue(20), height: RFValue(20) },
  wh25: { width: RFValue(25), height: RFValue(25) },
  wh30: { width: RFValue(30), height: RFValue(30) },
  wh35: { width: RFValue(35), height: RFValue(35) },
  wh40: { width: RFValue(40), height: RFValue(40) },
  wh50: { width: RFValue(50), height: RFValue(50) },
  wh60: { width: RFValue(60), height: RFValue(60) },
  wh90: { width: RFValue(90), height: RFValue(90) },
  wh150: { width: RFValue(150), height: RFValue(150) },

  bgPrimary: {
    backgroundColor: Colors.PRIMARY,
  },

  bgPrimarySoft: {
    backgroundColor: Colors.PRIMARY_SOFT,
  },

  bgWhite: {
    backgroundColor: Colors.WHITE,
  },

  bgBackground: {
    backgroundColor: Colors.BACKGROUND,
  },

  mT3: {
    marginTop: RFValue(3),
  },
  mT5: {
    marginTop: RFValue(5),
  },
  mT7: {
    marginTop: RFValue(7),
  },
  mT10: {
    marginTop: RFValue(10),
  },
  mT15: {
    marginTop: RFValue(15),
  },
  mT20: {
    marginTop: RFValue(20),
  },
  mT25: {
    marginTop: RFValue(25),
  },
  mT30: {
    marginTop: RFValue(30),
  },
  mT40: {
    marginTop: RFValue(40),
  },
  mT50: {
    marginTop: RFValue(50),
  },
  mB2: {
    marginBottom: RFValue(2),
  },
  mB3: {
    marginBottom: RFValue(3),
  },
  mB5: {
    marginBottom: RFValue(5),
  },
  mB8: {
    marginBottom: RFValue(8),
  },
  mB10: {
    marginBottom: RFValue(10),
  },
  mB15: {
    marginBottom: RFValue(15),
  },
  mB20: {
    marginBottom: RFValue(20),
  },
  mB25: {
    marginBottom: RFValue(25),
  },
  mB30: {
    marginBottom: RFValue(30),
  },
  mB40: {
    marginBottom: RFValue(40),
  },
  mB50: {
    marginBottom: RFValue(50),
  },
  mB80: {
    marginBottom: RFValue(80),
  },

  wh100: { width: "100%", height: "100%" },

  flexR: { flexDirection: "row" },
  flexC: { flex: 1, flexDirection: "column" },

  centerPage: {
    justifyContent: "center",
    alignItems: "center",
  },

  pH05: {
    paddingHorizontal: RFValue(5),
  },
  pH10: {
    paddingHorizontal: RFValue(10),
  },
  pH15: {
    paddingHorizontal: RFValue(15),
  },
  pH20: {
    paddingHorizontal: RFValue(20),
  },
  pV2: {
    paddingVertical: RFValue(2),
  },
  pV6: {
    paddingVertical: RFValue(6),
  },
  pV10: {
    paddingVertical: RFValue(10),
  },
  pV15: {
    paddingVertical: RFValue(15),
  },
  pV20: {
    paddingVertical: RFValue(20),
  },
  pV10_pH10: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(10),
  },
  pV15_pH10: {
    paddingVertical: RFValue(15),
    paddingHorizontal: RFValue(10),
  },

  title: {
    ...Font.Medium,
    ...Font.F13,
    ...Font.DARK,
    marginBottom: RFValue(4),
  },

  titleForm: {
    ...Font.Medium,
    ...Font.F13,
    ...Font.DARK,
    marginBottom: RFValue(4),
  },
});

export default StC;
