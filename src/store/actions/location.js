import {
    UPDATE_CURRENT_CITY,
    UPDATE_LANGUAGE,
} from "./actionTypes";
import {
    updateHederLocationForAxios,
    saveStorageData,
    STORAGE_KEY,
    updateHeaderForLanguage
} from '../../helpers'

export const locationUpdateCity = (city) => {
    return {
        type: UPDATE_CURRENT_CITY,
        payload: city
    };
};

export const setLocationCity = (city) => {
    updateHederLocationForAxios(city)
    return dispatch => {
        dispatch(locationUpdateCity(city))

    }
}

export const setLanguage = (language) => {
    updateHeaderForLanguage(language)
    return {
        type: UPDATE_LANGUAGE,
        payload: language
    }
}
export const saveLanguageSetup = (language) => {
    saveStorageData(language, STORAGE_KEY.LANGUAGE_APP)

    return dispatch => {
        dispatch(setLanguage(language))

    }
}
