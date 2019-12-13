import {
    ADD_ORDERED_MENU_ITEM,
    REMOVE_ORDERED_MENU_ITEM,
    EMPTY_CURRENT_ORDER,
} from '../actions/actionTypes';

const initialState = {
    order: [],
    orderForPlace: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDERED_MENU_ITEM:

            return {
                ...state,
                order: JSON.parse(JSON.stringify(action.payload)),
                orderForPlace: action.payload[0].menuItem.place,
            }

        case REMOVE_ORDERED_MENU_ITEM:

            const oldOrder = [...state.order]
            const orderNew = oldOrder.filter(item => item._id != action.payload._id)

            return {
                ...state,
                order: orderNew,
                orderForPlace: orderNew.length == 0 ? null : state.orderForPlace,
            }
        case EMPTY_CURRENT_ORDER:

            return {
                ...state,
                order: [],
                orderForPlace: null
            }
        default:
            return state;
    }
}

export default reducer;
