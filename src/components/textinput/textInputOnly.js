import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import PropTypes from "prop-types";

const TextInputOnly = ({ mode, inputProps, iconProps, forwardRef }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  return mode === "password" ? (
    <View style={styles.container}>
      <TextInput
        ref={forwardRef}
        {...inputProps}
        autoCompleteType="password"
        secureTextEntry={!visiblePassword}
      />
      <IconButton
        {...iconProps}
        icon={!visiblePassword ? "eye-off" : "eye"}
        style={{
          ...iconProps.style,
          position: "absolute",
          right: 0,
          top: 3,
          zIndex: 2,
        }}
        onPress={() => setVisiblePassword(!visiblePassword)}
      />
    </View>
  ) : (
    <TextInput ref={forwardRef} {...inputProps} />
  );
};

TextInputOnly.propTypes = {
  forwardRef: PropTypes.any,
  mode: PropTypes.oneOf(["regular", "password"]).isRequired,
  inputProps: PropTypes.object,
  iconProps: PropTypes.object,
};

TextInputOnly.defaultProps = {
  mode: "regular",
};

export default TextInputOnly;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
