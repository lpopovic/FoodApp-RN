import {
    ADD_ORDERED_MENU_ITEM,
    REMOVE_ORDERED_MENU_ITEM,
    EMPTY_CURRENT_ORDER,
} from '../actions/actionTypes';

const initialState = {
    order: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDERED_MENU_ITEM:

            return {
                ...state,
                order: JSON.parse(JSON.stringify(action.payload))
            }

        case REMOVE_ORDERED_MENU_ITEM:
            const oldOrder = [...state.order]
            const orderNew = oldOrder.filter(item => item._id != action.payload._id)
            return {
                ...state,
                order: orderNew
            }
        case EMPTY_CURRENT_ORDER:
            return {
                ...state,
                order: []
            }
        default:
            return state;
    }
}

export default reducer;
