import {
    UPDATE_SEARCH_FILTER
} from '../actions/actionTypes';

const initialState = {
    filter: {
        pickup: false,
        delivery: false,
        avgRating: 1,
        avgPriceTag: 4,
        rangeValue: 10,
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_FILTER:
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
}

export default reducer;