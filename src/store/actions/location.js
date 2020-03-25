import {
    UPDATE_CURRENT_CITY,
    UPDATE_LANGUAGE,
} from "./actionTypes";
import {
    updateHederLocationForAxios
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
    return {
        type: UPDATE_LANGUAGE,
        payload: language
    }
}

