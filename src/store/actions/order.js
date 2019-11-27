import { ADD_ORDERED_MENU_ITEM, REMOVE_ORDERED_MENU_ITEM } from "./actionTypes";

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
