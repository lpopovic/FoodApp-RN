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