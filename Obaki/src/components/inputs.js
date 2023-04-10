import React from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";
import { Color } from "../utils/color";
import { IsIOS } from "../utils/helper";

const { scale } = Dimensions.get("screen");

export function Input({ containerStyle, inputStyle, ...inputProps }) {
  const container = { ...styles.container, ...containerStyle };
  const input = { ...styles.input, ...inputStyle };
  return (
    <View style={container}>
      <TextInput style={input} {...inputProps}  placeholderTextColor={Color.GREY}  />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignSelf: "center",
    // borderRadius: 100,
    width: "100%",
    elevation:1,
    backgroundColor:Color.WHITE,
    paddingHorizontal: 15,
    paddingVertical: IsIOS() ? scale * 5 : scale * 2,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#F2F2F2",
  },
  input: {
    color: "black",
    backgroundColor:Color.WHITE
  },
});
