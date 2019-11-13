import {
    UPDATE_CURRENT_CITY
} from '../actions/actionTypes';

const initialState = {
    city: {
        _id : null,
        name : null,
        coordinate : {
            latitude: null,
            longitude: null,
        }
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_CITY:
            return {
                ...state,
                city: {
                    ...state.city,
                    _id:action.payload._id,
                    name:action.payload.name,
                    coordinate:action.payload.coordinate,
                }
            }
        default:
            return state;
    }
}

export default reducer;