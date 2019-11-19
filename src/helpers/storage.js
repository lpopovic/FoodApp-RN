import AsyncStorage from '@react-native-community/async-storage';

export const STORAGE_KEY = {
    FIRST_TIME_START_APP: 'FIRST_TIME_START_APP',
    JWT_APP_USER: 'JWT_APP_USER',
    USER_APP_DATA: 'USER_APP_DATA',
    USER_LAST_LOCATION: 'USER_LAST_LOCATION',
    SEARCH_FILTER:'SEARCH_FILTER',
}

export const saveStorageData = async (object, key) => {

    try {
        await AsyncStorage.setItem(key, JSON.stringify(object))
    } catch (e) {
        console.log(e, 'AsyncStorage save data error')
    }


}
export const getStorageData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)

        if (value !== null) {
            const item = JSON.parse(value);
            return item;
        } else {
            return null
        }
    } catch (e) {

        console.log(e, 'AsyncStorage get data error')
        return null
    }
}