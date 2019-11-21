import {
    UPDATE_SEARCH_FILTER
} from "./actionTypes";
import {
    saveStorageData,
    STORAGE_KEY
} from '../../helpers'

export const updateSearchFilter = (filter) => {
    saveStorageData(filter, STORAGE_KEY.SEARCH_FILTER)
    return {
        type: UPDATE_SEARCH_FILTER,
        payload: filter
    };
};