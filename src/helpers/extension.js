
import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android' ? true : false
export const isUndefined = (value) => {
    return typeof value === 'undefined' ? true : false
}
export const keyAdress = (cityId) => {
    return `cityId: ${cityId}`
}
export const subTotalPrice = (menuItem, selectedOptions, quantity, menuItemType) => {
    var totalPrice = 0
    if (menuItem.hasSubtypes) {
        totalPrice += menuItemType.nominalPrice
    } else {
        totalPrice += menuItem.nominalPrice //* quantity
    }

    selectedOptions.map(item => {
        item.options.map(option => {
            totalPrice += option.amount
            return totalPrice
        })
    })
    return totalPrice * quantity
}