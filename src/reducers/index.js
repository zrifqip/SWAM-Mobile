import { combineReducers } from "redux";
import MMKVStorage from "react-native-mmkv-storage";
import auth from "./authReducer";
import chats from "./chatsReducer";
import transactions from "./transactionsReducer";
import users from "./usersReducer";
import wasteBanks from "./wastebanksReducer";
import withdraw from "./withdrawReducer";

const appReducer = combineReducers({
  auth,
  chats,
  transactions,
  users,
  wasteBanks,
  withdraw,
});

export const LogOut = () => ({ type: "SIGN_OUT" });

const rootReducer = (state, action) => {
  if (action.type === "SIGN_OUT") {
    const storage = new MMKVStorage.Loader().initialize();
    storage.clearStore();
  }
  return appReducer(state, action);
};

export default rootReducer;
