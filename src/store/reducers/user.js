import {
    UPDATE_USER_PROFILE_DATA,
    UPDATE_USER_JWT_DATA,
} from '../actions/actionTypes';

const initialState = {
    JWT: null,
    userInfo: null,
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
                JWT: action.payload
            }
        default:
            return state;
    }
}

export default reducer;