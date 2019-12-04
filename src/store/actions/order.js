import { ADD_ORDERED_MENU_ITEM, REMOVE_ORDERED_MENU_ITEM, EMPTY_CURRENT_ORDER } from "./actionTypes";

export const addOrderMenuItem = (orderMenuItem) => {
    return {
        type: ADD_ORDERED_MENU_ITEM,
        payload: orderMenuItem
    };
};

export const removeOrderMenuItem = (orderMenuItem) => {
    return {
        type: REMOVE_ORDERED_MENU_ITEM,
        payload: orderMenuItem
    };
};

export const emptyOrder = ()=>{
    return {
        type:EMPTY_CURRENT_ORDER
    }
}
