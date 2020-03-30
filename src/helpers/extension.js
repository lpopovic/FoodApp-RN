
import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android' ? true : false
export const isUndefined = (value) => {
    return typeof value === 'undefined' ? true : false
}
export const keyAdress = (cityId) => {
    return `cityId: ${cityId}`
}