import React from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Color } from "../utils/color";

const { fontScale, scale } = Dimensions.get("screen");

export function Button({ containerStyle, titleStyle, onPress, title }) {
  const buttonStyle = { ...styles.button, ...containerStyle };
  const textStyle = { ...styles.titleStyle, ...titleStyle };

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

export function PressableText({ onPress, title, textStyle, _containerStyle }) {
  const containerStyle = { ...styles.pressableContainer, ..._containerStyle };
  const style = { ...styles.pressableTitle, ...textStyle };
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    fontFamily:"Raleway"
  },
  button: {
    backgroundColor: Color.BLACK,
    height: "8%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  pressableContainer: {
    alignSelf: "center",
  },
  textStyle: {
    marginLeft: 25,
    fontSize: 20,
    fontWeight: "500",
    color: "#3d3d3d",
    textAlign: "center",
  },
  pressableTitle: {
    color: "#da377f",
    fontSize: fontScale * 14,
    textAlign: "center",
    fontFamily:"Raleway"
  },
  iconstyle: { color: "#da377f" },
});
