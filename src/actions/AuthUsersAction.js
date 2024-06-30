import * as ACTION_TYPES from "@constants/ActionTypes";

export const SignIn = (signIn) => ({
  type: ACTION_TYPES.SIGN_IN,
  token: signIn,
});
export const SignInFail = (signInFail) => ({
  type: ACTION_TYPES.SIGN_IN_FAIL,
  token: signInFail,
});
export const VerifyOTP = (verifyOTP) => ({
  type: ACTION_TYPES.VERIFY_OTP,
  token: verifyOTP,
});
export const SignOut = (signOut) => ({
  type: ACTION_TYPES.SIGN_OUT,
  signOut: signOut,
});
