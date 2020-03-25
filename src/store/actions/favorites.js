import {
    UPDATE_USER_FAVORITE_PLACES,
    USER_FAVORITE_PLACES,
    UPDATE_USER_FAVORITE_MENU_ITEMS,
    USER_FAVORITE_MENU_ITEMS
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

export const updateUserFavoriteMenuItems = (favoriteMenuItems) => {
    return {
        type: UPDATE_USER_FAVORITE_MENU_ITEMS,
        payload: favoriteMenuItems
    }
}

export const userFavoriteMenuItems = (menuItem) => {
    return {
        type: USER_FAVORITE_MENU_ITEMS,
        payload: menuItem
    }
}
