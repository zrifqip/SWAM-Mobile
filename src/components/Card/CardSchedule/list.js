import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Icon } from "native-base";
import { StC, Font, Colors } from "@styles";
import { connect } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import { arrDay } from "@constants";
import { MyView } from "@components";
import { useTranslation } from "@utils";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function CardScheduleList({ wasteBanks }) {
  let details = wasteBanks.details;
  const { translations } = useTranslation();

  let schedule = [];

  if (details?.schedule) {
    if (details?.schedule.length != 0) {
      schedule = details.schedule;
    }
  }

  return (
    <MyView style={styles.cardContent} hide={schedule.length == 0}>
      <Text style={styles.txtTitle}>{translations["schedule"]}</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View style={styles.content}>
          {schedule.map((item) => (
            <View style={styles.cardItem}>
              <View style={styles.icon}>
                <Icon
                  as={MaterialCommunityIcons}
                  name={"timetable"}
                  color={Colors.PRIMARY}
                  size={RFValue(4)}
                />
              </View>
              <Text style={styles.day}>
                {arrDay(item.day)} ({item.startTime} - {item.endTime})
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </MyView>
  );
}

const mapStateToProps = function (state) {
  const { wasteBanks } = state;
  return { wasteBanks };
};

export default connect(mapStateToProps)(CardScheduleList);

const styles = {
  cardContent: {
    backgroundColor: Colors.WHITE,
    paddingTop: RFValue(10),
    paddingBottom: RFValue(15),
    marginBottom: RFValue(10),
  },
  content: {
    ...StC.flexR,
    paddingLeft: RFValue(15),
  },
  cardItem: {
    ...StC.flexR,
    backgroundColor: Colors.PRIMARY,
    padding: RFValue(3),
    paddingRight: RFValue(15),
    marginRight: RFValue(10),
    borderRadius: RFValue(20),
    alignItems: "center",
  },
  icon: {
    ...StC.centerPage,
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFValue(15),
    marginRight: RFValue(5),
    backgroundColor: Colors.WHITE,
  },
  txtTitle: {
    ...Font.F13,
    ...Font.DARK,
    ...Font.SemiBold,
    ...StC.mB10,
    marginLeft: RFValue(15),
  },
  day: {
    ...Font.F11,
    ...Font.WHITE,
  },
};
