import {
    TEMPLATE_ACTION_TYPE
} from '../actions/actionTypes';

const initialState = {
    template: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TEMPLATE_ACTION_TYPE:
            return {
                ...state,
                template: true
            }
        default:
            return state;
    }
}

export default reducer;