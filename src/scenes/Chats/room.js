import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { BaseContainer, AppBar } from "@components";
import { Icon } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import { StC, Colors, Font } from "@styles";
import { formatDateChatsDetail } from "@constants";
import socketIOClient from "socket.io-client";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import chatsUtils from "@utils/ChatsUtils";

function ChatsRoom({ navigation, chats, users }) {
  let socket = socketIOClient("https://api.apps4swam.com/chat", {
    auth: {
      token: "nT4GOTvQ7GhFHuQjzTGw",
    },
    transports: ["websocket"],
    forceNew: true,
    upgrade: false,
  });

  socket.connect();
  socket.on("connect", () => "");
  socket.on("disconnect", () => "");

  let detail = chats.detail;
  const [loading, setLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState();
  const [contentHeight, setContentHeight] = useState();
  const [scrollViewHeight, setScrollViewHeight] = useState();
  const [flatlist, setFlatlist] = useState();

  useEffect(() => {
    _onNewMsg();
  }, []);

  const _onNewMsg = async () => {
    // socket.on(detail._id, (data) => {
    //     alert(JSON.stringify(data))
    //     // setText(data)
    // });
    // socket.on(detail._id, (message) => {
    //     setChatMessage
    // this.setState(prevState => ({
    //     messages: [...prevState.messages, message]
    // }));
    // _scrollToBottom(70);
    // }, () => {});
  };

  const _sendMessage = async () => {
    let notEmpty = chatMessage.trim().length > 0;

    if (notEmpty) {
      socket.emit(
        detail._id,
        {
          userID: users.users._id,
          msg: chatMessage,
        },
        (response) => {},
      );

      // _onNewMsg()
      chatsUtils.chatsCompanyDetail(detail._id);
      _scrollToBottom(50);
      setChatMessage("");
    }
  };

  const _scrollToBottom = async (offset) => {
    const scrollHeight = contentHeight - scrollViewHeight + offset;
    if (scrollHeight > 0) {
      flatlist.scrollToOffset({ offset: scrollHeight, animated: true });
    }
  };

  const goBack = async () => {
    await chatsUtils.chatsCompany();
    navigation.goBack();
  };

  let userID = users.users._id;
  let name = detail.from?.name;

  if (userID == detail.from?._id) {
    name = detail.to?.name;
  }

  return (
    <BaseContainer>
      <AppBar onBackCustom={() => goBack()} title={name} />
      <View style={{ flex: 1, backgroundColor: "#eee4dc" }}>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={(flatlist) => setFlatlist(flatlist)}
            data={detail.chats}
            keyExtractor={(item, index) => `${index}`}
            onContentSizeChange={(w, h) => setContentHeight(h)}
            onLayout={(ev) => setScrollViewHeight(ev.nativeEvent.layout.height)}
            renderItem={({ item }) => {
              const cellStyle = {
                container: {
                  justifyContent: "center",
                  alignItems: userID == item.userID ? "flex-end" : "flex-start",
                },
                textContainer: {
                  maxWidth: "70%",
                  marginHorizontal: RFValue(10),
                  marginVertical: RFValue(4),
                  paddingHorizontal: RFValue(10),
                  paddingVertical: RFValue(5),
                  backgroundColor:
                    userID == item.userID ? "#dbf5b4" : "#bfbfbf",
                  borderRadius: RFValue(8),
                },
              };
              return (
                <View style={cellStyle.container}>
                  <View style={cellStyle.textContainer}>
                    <Text style={styles.message}>{item.msg}</Text>
                    <Text style={styles.time}>
                      {formatDateChatsDetail(item.datetime)}
                    </Text>
                  </View>
                </View>
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => _onNewMsg()}
              />
            }
          />
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.cardInput}>
            <TextInput
              value={chatMessage}
              onChangeText={(val) => setChatMessage(val)}
              underlineColorAndroid="transparent"
              placeholder={"Ketik pesan disini ..."}
              variant="unstyled"
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => _sendMessage()}>
            <Icon
              as={<FontAwesome name={"send"} />}
              size={RFValue(5)}
              color={Colors.WHITE}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BaseContainer>
  );
}

const mapStateToProps = function (state) {
  const { chats, users } = state;
  return { chats, users };
};

export default connect(mapStateToProps)(ChatsRoom);

const styles = StyleSheet.create({
  cardFooter: {
    ...StC.flexR,
    alignItems: "center",
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(10),
  },
  cardInput: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: RFValue(30),
    marginRight: RFValue(10),
    height: RFValue(45),
    paddingHorizontal: RFValue(10),
    justifyContent: "center",
  },
  btn: {
    ...StC.centerPage,
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
    backgroundColor: Colors.PRIMARY,
  },
  input: {
    ...Font.Regular,
    ...Font.F12,
    ...Font.BLACK,
  },
  cardMessage: {
    marginVertical: RFValue(5),
    marginHorizontal: RFValue(10),
  },
  bubble: {
    borderRadius: RFValue(5),
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(5),
  },
  message: {
    ...Font.F12,
    ...Font.Regular,
    color: "#0d0d0d",
  },
  time: {
    ...Font.F10,
    ...Font.Regular,
    color: "#999999",
    textAlign: "right",
  },
});
