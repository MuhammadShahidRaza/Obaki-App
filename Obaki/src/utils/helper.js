import { Platform } from "react-native";

export function IsIOS() {
    return Platform.OS === "ios";
  }