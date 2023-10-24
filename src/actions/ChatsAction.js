import * as ACTION_TYPES from "@constants/ActionTypes";

export const Chats = (chats) => ({ type: ACTION_TYPES.CHATS, chats: chats });
export const ChatsDetail = (detail) => ({
  type: ACTION_TYPES.CHATS_DETAIL,
  detail: detail,
});
