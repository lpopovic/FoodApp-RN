import {
    UPDATE_USER_PROFILE_DATA,
    UPDATE_USER_JWT_DATA
} from "./actionTypes";
import {
    uiStartLoading,
    uiStopLoading
} from './index'

import {
    updateHeaderJWTForAxios
} from '../../helpers'

import { UserNetwork } from '../../service/api'

export const updateUserProfile = (userProfile) => {
    return {
        type: UPDATE_USER_PROFILE_DATA,
        payload: userProfile
    };
};
export const updateUserJWT = (token) => {
    updateHeaderJWTForAxios(token)
    return {
        type: UPDATE_USER_JWT_DATA,
        payload: token
    };
};

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
        }, 200);



    }

}
