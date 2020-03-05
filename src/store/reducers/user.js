import {
    UPDATE_USER_PROFILE_DATA,
    UPDATE_USER_JWT_DATA,
    USER_LOG_OUT,
    UPDATE_LIST_USER_ORDERS,
    UPDATE_LIST_USER_CATHERING_ORDERS,
    UPDATE_USER_FAVORITE_PLACES,
    USER_FAVORITE_PLACES,
    UPDATE_USER_FAVORITE_MENU_ITEMS,
    USER_FAVORITE_MENU_ITEMS
} from '../actions/actionTypes';
import { FavoriteNetwork } from '../../service/api'
import { PlaceFavorite, MenuItemFavoriteSmallObject } from '../../model'

const initialState = {
    JWT: null,
    isLogin: false,
    userOrders: [],
    userCatherings: [],
    userFavoritePlaces: [],
    userFavoritePlacesIDs: [],
    userFavoriteMenuItems: [],
    userFavoriteMenuItemsIDs: [],
    userInfo: {
        _id: 'Unknown id',
        username: 'Unknown username',
        name: 'Unknown name',
        lastName: 'Unknown last name',
        image: null,
        email: 'Unknown email',
        company: null,
        catheringOptions: null,
        catheringIsAvailable: null,
        address: [],
        phoneNumber: ''
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_PROFILE_DATA:
            return {
                ...state,
                userInfo: action.payload
            }
        case UPDATE_USER_JWT_DATA:
            return {
                ...state,
                JWT: action.payload,
                isLogin: true,
            }
        case USER_LOG_OUT:
            return {
                ...state,
                JWT: null,
                isLogin: false,
                userOrders: [],
                userCatherings: [],
                userInfo: initialState.userInfo,
            }
        case UPDATE_LIST_USER_ORDERS:
            return {
                ...state,
                userOrders: action.payload
            }

        case UPDATE_LIST_USER_CATHERING_ORDERS:
            return {
                ...state,
                userCatherings: action.payload
            }

        case UPDATE_USER_FAVORITE_PLACES:
            return {
                ...state,
                userFavoritePlaces: action.payload,
                userFavoritePlacesIDs: action.payload.map(item => { return item.place })
            }

        case USER_FAVORITE_PLACES:

            let userFavoritePlacesIDs = [...state.userFavoritePlacesIDs]
            if (state.isLogin === true) {
                if (userFavoritePlacesIDs.includes(action.payload._id)) {
                    userFavoritePlacesIDs = userFavoritePlacesIDs.filter(item => item !== action.payload._id)
                    FavoriteNetwork.fetchDeleteFavoritePlace(action.payload._id)
                    // console.log(state.userFavoritePlacesIDs)
                } else {
                    userFavoritePlacesIDs.push(String(action.payload._id))
                    FavoriteNetwork.fetchPostFavoritePlace(action.payload._id)
                    // console.log(state.userFavoritePlacesIDs)
                }
            } else {
                alert("Da biste favorizovali restoran morate biti ulogovani!")
            }
            return {
                ...state,
                userFavoritePlacesIDs: userFavoritePlacesIDs
            }


        case UPDATE_USER_FAVORITE_MENU_ITEMS:
            return {
                ...state,
                userFavoriteMenuItems: action.payload,
                userFavoriteMenuItemsIDs: action.payload.map(item => { return item.menuItem })
            }

        case USER_FAVORITE_MENU_ITEMS:

            let favoriteMenuItemsIDs = [...state.userFavoriteMenuItemsIDs]
            if (state.isLogin === true) {
                if (favoriteMenuItemsIDs.includes(action.payload._id)) {
                    favoriteMenuItemsIDs = favoriteMenuItemsIDs.filter(item => item != action.payload._id)
                    FavoriteNetwork.fetchDeleteFavoriteMenuItem(action.payload._id)
                    // console.log(state.favoriteMenuItemsIDs)
                } else {
                    favoriteMenuItemsIDs.push(String(action.payload._id))
                    FavoriteNetwork.fetchPostFavoriteMenuItem(action.payload._id)
                    // console.log(state.favoriteMenuItemsIDs)
                }
            } else {
                alert("Da biste favorizovali jelo morate biti ulogovani!")
            }
            return {
                ...state,
                userFavoriteMenuItemsIDs: favoriteMenuItemsIDs
            }

        default:
            return state;
    }
}

export default reducer;