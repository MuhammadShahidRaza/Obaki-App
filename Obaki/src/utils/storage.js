import AsyncStorage from "@react-native-async-storage/async-storage";

export async function GetItemFromStorage(key = '') {
    return await AsyncStorage.getItem(key);
}

export async function SaveItemToStorage(key = '', value = '') {
    await AsyncStorage.setItem(key, value);
}