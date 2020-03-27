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