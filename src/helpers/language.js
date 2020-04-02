import { statusOrderValue } from './extension';

export const LANGUAGE_KEY = {
    EN: 'en',
    SRB: 'srb'
}

export const setLanguage = language => {
    let strings = {};
    switch (language) {
        case LANGUAGE_KEY.EN:
            strings = Object.assign(strings, require('../helpers/strings/en.json'));
            break;
        case LANGUAGE_KEY.SRB:
            strings = Object.assign(strings, require('../helpers/strings/srb.json'));
            break;
        default: return;
    }
    return strings;
};
export const removeAccents = (str) => {
    var accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽžČčĆć';
    var accentsOut = "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZzCcCc";
    str = str.split('');
    var strLen = str.length;
    var i, x;
    for (i = 0; i < strLen; i++) {
        if ((x = accents.indexOf(str[i])) != -1) {
            str[i] = accentsOut[x];
        }
    }
    return str.join('');
}

export const generateTextStatus = (status, strings) => {


    switch (status) {
        case statusOrderValue.acceptedAfterOrdered:
            return strings.acceptedAfterOrdered
            break;

        case statusOrderValue.acceptedOrderByUserAfterModified:
            return strings.acceptedOrderByUserAfterModified
            break;

        case statusOrderValue.canceledBeforeAccepted:
            return strings.canceledBeforeAccepted
            break;

        case statusOrderValue.delivered:
            return strings.delivered
            break;

        case statusOrderValue.deliveredAndUserReviewed:
            return strings.deliveredAndUserReviewed
            break;

        case statusOrderValue.deniedAfterOrdered:
            return strings.deniedAfterOrdered
            break;

        case statusOrderValue.deniedOrderByUserAfterModified:
            return strings.deniedOrderByUserAfterModified
            break;

        case statusOrderValue.modifiedOrderByPlaceAdmin:
            return strings.modifiedOrderByPlaceAdmin
            break;

        case statusOrderValue.ordered:
            return strings.ordered
            break;

        case statusOrderValue.pickedUp:
            return strings.pickedUp
            break;

        default:
            return text = 'unknown'
            break;
    }
}