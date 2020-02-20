import {
    UPDATE_USER_PROFILE_DATA,
    UPDATE_USER_JWT_DATA,
    USER_LOG_OUT,
    UPDATE_LIST_USER_ORDERS,
    UPDATE_LIST_USER_CATHERING_ORDERS,
    UPDATE_USER_FAVORITE_PLACES,
    USER_FAVORITE_PLACES
} from '../actions/actionTypes';
import { FavoriteNetwork } from '../../service/api'
import { PlaceFavorite } from '../../model'

const initialState = {
    JWT: null,
    isLogin: false,
    userOrders: [],
    userCatherings: [],
    userFavoritePlaces: [],
    userFavoritePlacesIDs: [],
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
                userFavoritePlacesIDs: action.payload.map(item => {return item.place})
            }

        case USER_FAVORITE_PLACES:
            
            let favoritePlaces = state.userFavoritePlaces
            let userFavoritePlacesIDs = [...state.userFavoritePlacesIDs]

            if (state.isLogin === true) {
                let current = favoritePlaces.filter(item => item.place === action.payload._id)
                if (userFavoritePlacesIDs.includes(action.payload._id)) {
                    // alert("DELETE")
                    favoritePlaces = favoritePlaces.filter(item => item._id !== current[0]._id)
                    userFavoritePlacesIDs = userFavoritePlacesIDs.filter(item => item != action.payload._id)
                    console.log(state.userFavoritePlacesIDs)

                    FavoriteNetwork.fetchDeleteFavoritePlace(current[0]._id).then(
                        res => {
                            // favoritePlaces = favoritePlaces.filter(item => item._id != current[0]._id)
                            console.log(state.userFavoritePlaces)
                        }, err => {
                            this.showAlertMessage(err)
                        }
                    )
                } else {
                    // alert("FAVORITE")
                    userFavoritePlacesIDs.push(String(action.payload._id))
                    console.log(state.userFavoritePlacesIDs)

                    FavoriteNetwork.fetchPostFavoritePlace(action.payload._id).then(
                        res => {
                            var temp = { _id: res._id, place: res.place }
                            favoritePlaces.push(new PlaceFavorite(temp))
                            console.log(state.userFavoritePlaces)
                        },
                        err => {
                            this.showAlertMessage(err)
                        }
                    )
                }
            } else {
                alert("Da biste favorizovali restoran morate biti ulogovani!")
            }
            return {
                ...state,
                userFavoritePlaces: favoritePlaces,
                userFavoritePlacesIDs: userFavoritePlacesIDs
            }

        default:
            return state;
    }
}

export default reducer;