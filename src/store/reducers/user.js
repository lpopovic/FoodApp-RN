import {
    UPDATE_USER_PROFILE_DATA,
    UPDATE_USER_JWT_DATA,
    USER_LOG_OUT,
} from '../actions/actionTypes';

const initialState = {
    JWT: null,
    isLogin: false,
    userInfo: {
        _id: 'Unknown id',
        username: 'Unknown username',
        image: null,
        email: 'Unknown email',
        company: null,
        catheringOptions: null,
        catheringIsAvailable: null,
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
            }
        default:
            return state;
    }
}

export default reducer;