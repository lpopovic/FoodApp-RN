import axios from '../service/axios'
import {
    saveStorageData,
    STORAGE_KEY,
} from '../helpers'
export const updateHederLocationForAxios = (city) => {
    // axios.defaults.headers.common['stateID'] = String(coordinate.stateID);
    axios.defaults.headers.common['cityID'] = String(city._id);
   
}

export const updateHeaderJWTForAxios = (token) => {
    axios.defaults.headers.common['Authorization'] = String(token);
    saveStorageData(token, STORAGE_KEY.JWT_APP_USER)
}
