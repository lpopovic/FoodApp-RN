import {
    UPDATE_CURRENT_CITY
} from "./actionTypes";
import {
    updateHederLocationForAxios
}from '../../helpers'

export const locationUpdateCity = (city) => {
    return {
        type: UPDATE_CURRENT_CITY,
        payload: city
    };
};

export const setLocationCity = (city) =>{
    updateHederLocationForAxios(city)
    return dispatch => {
        dispatch(locationUpdateCity(city))
        
    }
}

