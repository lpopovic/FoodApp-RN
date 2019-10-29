import { 
    UPDATE_CURRENT_CITY 
} from "./actionTypes";

export const locationUpdateCity = (city) => {
    return {
        type: UPDATE_CURRENT_CITY,
        payload: city
    };
};

