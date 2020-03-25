import {
    UPDATE_CURRENT_CITY,
    UPDATE_LANGUAGE,
} from '../actions/actionTypes';
import { LANGUAGE_KEY, setLanguage } from '../../helpers';

const initialState = {
    city: {
        _id: null,
        name: null,
        coordinate: {
            latitude: null,
            longitude: null,
        }
    },
    language: {
        name: LANGUAGE_KEY.SRB,
        strings: setLanguage(LANGUAGE_KEY.SRB)
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_CITY:
            return {
                ...state,
                city: {
                    ...state.city,
                    _id: action.payload._id,
                    name: action.payload.name,
                    coordinate: action.payload.coordinate,
                }
            }

        case UPDATE_LANGUAGE:
            return {
                ...state,
                language: {
                    name: action.payload,
                    strings: setLanguage(action.payload)
                }
            }
        default:
            return state;
    }
}

export default reducer;