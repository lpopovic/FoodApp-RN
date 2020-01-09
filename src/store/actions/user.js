import {
    UPDATE_USER_PROFILE_DATA,
    UPDATE_USER_JWT_DATA,
    USER_LOG_OUT,

} from "./actionTypes";
import {
    uiStartLoading,
    uiStopLoading,
    updateListUserOrders,
} from './index'

import {
    updateHeaderJWTForAxios,
    saveStorageData,
    STORAGE_KEY,
} from '../../helpers'

import { UserNetwork, OrderNetwork } from '../../service/api'

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
        }, 200);



    }

}
