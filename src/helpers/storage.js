import AsyncStorage from '@react-native-community/async-storage';

export const FIRST_TIME_START_APP = 'FIRST_TIME_START_APP'

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