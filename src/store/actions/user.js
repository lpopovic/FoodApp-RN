import {
    UPDATE_USER_PROFILE_DATA,
    UPDATE_USER_JWT_DATA,
    USER_LOG_OUT,

} from "./actionTypes";
import {
    uiStartLoading,
    uiStopLoading,
    updateListUserOrders,
    updateListUserCatheringsOrders,
    updateUserFavoritePlaces
} from './index'

import {
    updateHeaderJWTForAxios,
    saveStorageData,
    STORAGE_KEY,
} from '../../helpers'

import { UserNetwork, OrderNetwork, FavoriteNetwork } from '../../service/api'

export const updateUserProfile = (userProfile) => {
    saveStorageData(userProfile, STORAGE_KEY.USER_APP_DATA)
    return {
        type: UPDATE_USER_PROFILE_DATA,
        payload: userProfile
    };
};

export const userLogOut = () => {

    const data = null
    updateHeaderJWTForAxios(data)
    saveStorageData(data, STORAGE_KEY.USER_APP_DATA)
    return {
        type: USER_LOG_OUT
    }
}

export const updateUserJWT = (token) => {
    updateHeaderJWTForAxios(token)
    return {
        type: UPDATE_USER_JWT_DATA,
        payload: token
    };
};


export const fetchUserListOrders = () => {
    return dispatch => {


        OrderNetwork.fetchGetAllOrders().then(
            result => {
                result = result.reverse()
                dispatch(updateListUserOrders(result))
            },
            error => {

            }
        )

        OrderNetwork.fetchGetAllCatheringOrders().then(
            result => {
                result = result.reverse()
                dispatch(updateListUserCatheringsOrders(result))
            },
            error => {
                alert(error)
            }
        )
    }
}

export const fetchUserFavorites = () => {
    return dispatch => {

        FavoriteNetwork.fetchGetAllFavoritedPlaces(false).then(
            result => {
                result = result.reverse()
                dispatch(updateUserFavoritePlaces(result))
                console.log("FETCH NA USER PROFILE:"+result)
            },
            error => {

            }
        )
    }
}



export const fetchUserProfile = () => {

    return dispatch => {
        dispatch(uiStartLoading())
        setTimeout(() => {
            UserNetwork.fetchUserInfo()
                .then(
                    result => {
                        dispatch(uiStopLoading())
                        dispatch(updateUserProfile(result))

                    },
                    err => {
                        dispatch(uiStopLoading())
                        alert(err)
                    }
                )
            dispatch(fetchUserListOrders())
            dispatch(fetchUserFavorites())
        }, 200);
    }
}



