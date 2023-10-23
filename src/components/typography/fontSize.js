import { normalize } from "@utils";

export const SIZES = ["XS", "S", "M", "XM", "L", "XL", "BTN LINK", "OPT BTN", "BTN DESC", "DOT", "MF"];
export const FONT_SIZES = [
  normalize(9), // XS
  normalize(11), // S
  normalize(13), // M
  normalize(16), // XM
  normalize(19), // L
  normalize(22), // XL
  normalize(13), // Btn Link
  normalize(13), // Opt Btn
  normalize(11), // Btn Desc
  normalize(28), // dot =>otp
  normalize(13), // MF
];
export const LINE_HEIGHTS = [
  normalize(13), // XS
  normalize(16), // S
  normalize(20), // M
  normalize(23), // XM,
  normalize(28), // L
  normalize(34), // XL
  normalize(19), // Btn Link
  normalize(19), // Opt Btn
  normalize(16), // Btn Desc
  normalize(31), //
  normalize(13 + 4), // M
];

export const SIZE_KEY = {
  XXS: {
    fontSize: normalize(8.9),
    lineHeight: normalize(13),
  },
  XS: {
    fontSize: normalize(9),
    lineHeight: normalize(13),
  },
  S: {
    fontSize: normalize(11),
    lineHeight: normalize(16),
  },
  M: {
    fontSize: normalize(13),
    lineHeight: normalize(20),
  },
  XM: {
    fontSize: normalize(16),
    lineHeight: normalize(23),
  },
  L: {
    fontSize: normalize(16),
    lineHeight: normalize(23),
  },
  XL: {
    fontSize: normalize(22),
    lineHeight: normalize(34),
  },
  BTN_LINK: {
    fontSize: normalize(13),
    lineHeight: normalize(19),
  },
  OPT_BTN: {
    fontSize: normalize(13),
    lineHeight: normalize(19),
  },
  BTN_DESC: {
    fontSize: normalize(11),
    lineHeight: normalize(16),
  },
  dot: {
    fontSize: normalize(28),
    lineHeight: normalize(31),
  },
};
