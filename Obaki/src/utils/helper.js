import {  Platform } from "react-native";

export function IsIOS() {
    return Platform.OS === "ios";
  }

  export const isEmpty = (value) => {
    return value.trim() === '';
  };

  export const isEmptyArray = (value) => {
    return value.length === 0;
  };
  
  export const isEmail = (value) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 

    console.log("agfsghadghf dghs dfghfsd ghfsd ghsdf ghsd ,,,,,,,,,,,,,,,,,,,,,,,,,,," + emailRegex.test(value))
    return emailRegex.test(value);
  };


 