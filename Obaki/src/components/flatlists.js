import React from "react";
import { FlatList } from "react-native";
export function FlatlistComponent({ ...rest }) {
  return (
    <FlatList 
    {...rest} />
  );
}
