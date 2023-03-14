import { Platform } from "react-native/types";

export function IsIOS() {
    return Platform.OS === "ios";
  }