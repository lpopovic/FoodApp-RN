import {
    UPDATE_USER_FAVORITE_PLACES,
    USER_FAVORITE_PLACES
} from "./actionTypes";

export const updateUserFavoritePlaces= (favoritePLaces) => {
    return {
        type: UPDATE_USER_FAVORITE_PLACES,
        payload: favoritePLaces
    }
}

export const userFavoritePlaces = (place) => {
    return {
        type: USER_FAVORITE_PLACES,
        payload: place
    }
}