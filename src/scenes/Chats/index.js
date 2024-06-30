import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, RefreshControl } from "react-native";
import {
  BaseContainer,
  EmptyData,
  CardChats,
  AppBar,
  ButtonFab,
} from "@components";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { StC, Colors, Font } from "@styles";
import chatsUtils from "@utils/ChatsUtils";

function Chats({ navigation, chats }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getChats();
  }, []);

  const getChats = async () => {
    setLoading(true);
    await chatsUtils.chatsCompany();
    setLoading(false);
  };

  const getChatsRoom = async (item) => {
    await chatsUtils.chatsCompanyDetail(item._id);
    navigation.navigate("ChatsRoom");
  };

  return (
    <BaseContainer loading={loading}>
      <AppBar navigation={navigation} title={"Pesan"} />
      <FlatList
        data={chats.chats}
        renderItem={({ item }) => (
          <CardChats item={item} onPress={() => getChatsRoom(item)} />
        )}
        ListEmptyComponent={<EmptyData message={"Belum ada pesan!"} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => getChats()} />
        }
      />
      {/* <ButtonFab label={'Pesan'} onPress={()=> navigation.navigate('ChatsRoom')}/> */}
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { chats } = state;
  return { chats };
};

export default connect(mapStateToProps)(Chats);

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
  name: {
    ...Font.F14,
    ...Font.BLACK,
    ...Font.SemiBold,
  },
  street: {
    ...Font.F12,
    ...Font.GRAY_LIGHT,
    ...Font.SemiBold,
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
    borderColor: Colors.GRAY_LIGHT,
    alignItems: "center",
  },
  icon: {
    width: RFValue(30),
  },
  labelSubmeny: {
    ...Font.F12,
    ...Font.GRAY_LIGHT,
    ...Font.SemiBold,
    flex: 1,
  },
});
