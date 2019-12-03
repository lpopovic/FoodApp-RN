import {
    ADD_ORDERED_MENU_ITEM,
    REMOVE_ORDERED_MENU_ITEM
} from '../actions/actionTypes';

const initialState = {
    order: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDERED_MENU_ITEM:
            const newOrder = [...state.order]
            newOrder.push(action.payload)
            return {
                ...state,
                order: newOrder
            }

        case REMOVE_ORDERED_MENU_ITEM:
            const oldOrder = [...state.order]
            const orderNew = oldOrder.filter(item => item._id != action.payload._id)
            return {
                ...state,
                order: orderNew
            }
        default:
            return state;
    }
}

export default reducer;
