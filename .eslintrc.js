module.exports = {
  root: true,
  extends: ["@react-native-community", "prettier"],
  plugins: ["import"],
  rules: {
    eqeqeq: 0,
    "dot-notation": 0,
    "react-hooks/exhaustive-deps": 1,
    "react-native/no-inline-styles": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        alias: {
          "@root": "./src",
          "@actions": "./src/actions",
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@helper": "./src/helper",
          "@navigations": "./src/navigations",
          "@reducers": "./src/reducers",
          "@scenes": "./src/scenes",
          "@stores": "./src/stores",
          "@styles": "./src/styles",
          "@utils": "./src/utils",
        },
      },
    },
  },
};
