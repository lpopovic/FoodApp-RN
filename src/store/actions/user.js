import {
    UPDATE_USER_PROFILE_DATA,
    UPDATE_USER_JWT_DATA,
    USER_LOG_OUT,
    USER_UPDATE_REVIEWS,
} from "./actionTypes";
import {
    uiStartLoading,
    uiStopLoading,
    updateListUserOrders,
    updateListUserCatheringsOrders,
    updateUserFavoritePlaces,
    updateUserFavoriteMenuItems
} from './index'

import {
    updateHeaderJWTForAxios,
    saveStorageData,
    STORAGE_KEY,
} from '../../helpers'

import { UserNetwork, OrderNetwork, FavoriteNetwork, ReviewNetwork } from '../../service/api'

export const updateUserProfile = (userProfile) => {
    saveStorageData(userProfile, STORAGE_KEY.USER_APP_DATA)
    return {
        type: UPDATE_USER_PROFILE_DATA,
        payload: userProfile
    };
};

export const updateUserReviews = (reviews) => {
    return {
        type: USER_UPDATE_REVIEWS,
        payload: reviews
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

        ReviewNetwork.fetchGetAllReviews().then(
            res => {
                dispatch(updateUserReviews(res))
            }, err => {

            }
        )
    }
}

export const fetchUserFavorites = () => {
    return dispatch => {

        FavoriteNetwork.fetchGetAllFavoritedPlaces(true).then(
            result => {
                result = result.reverse()
                dispatch(updateUserFavoritePlaces(result))
            },
            error => {

            }
        )

        FavoriteNetwork.fetchGetAllFavoritedMenuItems(true).then(
            result => {
                result = result.reverse()
                dispatch(updateUserFavoriteMenuItems(result))
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
                        alert(err.message)
                        if (err.logOut) {
                            dispatch(userLogOut())
                        }
                    }
                )
            dispatch(fetchUserListOrders())
            dispatch(fetchUserFavorites())
        }, 200);
    }
}



