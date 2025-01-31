import axios from '../service/axios'
import {
    saveStorageData,
    STORAGE_KEY,
} from '../helpers'
export const updateHederLocationForAxios = (city) => {
    axios.defaults.headers.common['x-city'] = String(city._id);
    saveStorageData(city, STORAGE_KEY.USER_LAST_LOCATION)

}

export const updateHeaderJWTForAxios = (token) => {
    axios.defaults.headers.common['Authorization'] = String(token);
    saveStorageData(token, STORAGE_KEY.JWT_APP_USER)
}
export const updateHeaderForLanguage = (language) => {
    axios.defaults.headers.common['x-intl'] = String(language);
}