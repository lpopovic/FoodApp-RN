import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

// HOME TAB
import HomeScreen from '../../screen/Home/HomeScreen'
import CategoryScreen from '../../screen/Home/CategoryScreen'
import PlaceListScreen from '../../screen/Home/PlaceListScreen'
import FilterScreen from '../../screen/Home/FilterScreen'
import ShopScreen from '../../screen/Home/ShopScreen'
import MenuItemDetailsScreen from '../../screen/Home/MenuItemDetailsScreen'
import ReviewListScreen from '../../screen/Catering/ReviewListScreen'

// MAP TAB
import MapScreen from '../../screen/Map/MapScreen'

// SEARCH TAB

import SearchScreen from '../../screen/Search/SearchScreen'

// CATERING TAB
import CateringScreen from '../../screen/Catering/CateringScreen'
import PlaceDetailScreen from '../../screen/Catering/PlaceDetailsScreen'
import ContactFormScreen from '../../screen/Catering/ContactFormScreen'

// USER TAB
import UserScreen from '../../screen/User/UserScreen'
import UserSettingsScreen from '../../screen/User/UserSettingsScreen'
import ReviewScreen from '../../screen/User/ReviewScreen'
import OrderDetailScreen from '../../screen/User/OrderDetailScreen'

//TEST

import DetailScreen from '../../screen/DetailScreen'
import { ScreenName } from '../../helpers';

const HomeStack = createStackNavigator({
    cateringapp_Home: HomeScreen,
    cateringapp_Category: CategoryScreen,
    cateringapp_PlaceList: PlaceListScreen,
    cateringapp_PlaceDetail: PlaceDetailScreen,
    cateringapp_Filter: FilterScreen,
    cateringapp_Shop: ShopScreen,
    cateringapp_MenuItemDetails: MenuItemDetailsScreen,
    cateringapp_ReviewList: ReviewListScreen,

    cateringapp_Detail: DetailScreen,
})

const MapStack = createStackNavigator({
    cateringapp_Map: MapScreen,
    cateringapp_Detail: DetailScreen,
    cateringapp_Filter: FilterScreen,
    cateringapp_Shop: ShopScreen,
    cateringapp_PlaceDetail: PlaceDetailScreen,
    cateringapp_MenuItemDetails: MenuItemDetailsScreen,
    cateringapp_ReviewList: ReviewListScreen,


})
const SearchStack = createStackNavigator({
    cateringapp_Search: SearchScreen,
    cateringapp_Filter: FilterScreen,
    cateringapp_Shop: ShopScreen,
    cateringapp_PlaceDetail: PlaceDetailScreen,
    cateringapp_MenuItemDetails: MenuItemDetailsScreen,
    cateringapp_ReviewList: ReviewListScreen,


})
const CateringStack = createStackNavigator({
    cateringapp_Catering: CateringScreen,
    cateringapp_PlaceDetail: PlaceDetailScreen,
    cateringapp_ContactForm: ContactFormScreen,
    cateringapp_ReviewList: ReviewListScreen,
    cateringapp_MenuItemDetails: MenuItemDetailsScreen,

    cateringapp_Detail: DetailScreen,

})
const UserStack = createStackNavigator({
    cateringapp_User: UserScreen,
    cateringapp_Review: ReviewScreen,
    cateringapp_Detail: DetailScreen,
    cateringapp_Filter: FilterScreen,
    cateringapp_Shop: ShopScreen,
    cateringapp_OrderDetail: OrderDetailScreen,
    cateringapp_ReviewList: ReviewListScreen,
    cateringapp_UserSettings: UserSettingsScreen,
    cateringapp_PlaceDetail: PlaceDetailScreen,
    cateringapp_MenuItemDetails: MenuItemDetailsScreen,

})


HomeStack.navigationOptions = ({ navigation }) => {
    const { routes } = navigation.state

    let tabBarVisible = null;

    switch (routes[routes.length - 1].routeName) {
        case ScreenName.FilterScreen():
        case ScreenName.MenuItemDetailsScreen():
        case ScreenName.ShopScreen():
        case ScreenName.ReviewListScreen():
            tabBarVisible = false;
            break
        default:
            tabBarVisible = true;
            break
    }
    return {
        tabBarVisible,
    }
};

MapStack.navigationOptions = ({ navigation }) => {
    const { routes } = navigation.state

    let tabBarVisible = null;

    switch (routes[routes.length - 1].routeName) {
        case ScreenName.FilterScreen():
        case ScreenName.MenuItemDetailsScreen():
        case ScreenName.ShopScreen():
        case ScreenName.ReviewListScreen():
            tabBarVisible = false;
            break
        default:
            tabBarVisible = true;
            break
    }
    return {
        tabBarVisible,
    }
};

CateringStack.navigationOptions = ({ navigation }) => {
    const { routes } = navigation.state

    let tabBarVisible = null;

    switch (routes[routes.length - 1].routeName) {
        case ScreenName.FilterScreen():
        case ScreenName.ShopScreen():
        case ScreenName.ReviewListScreen():
        case ScreenName.ContactFormScreen():
            tabBarVisible = false;
            break
        default:
            tabBarVisible = true;
            break
    }
    return {
        tabBarVisible,
    }
};
SearchStack.navigationOptions = ({ navigation }) => {
    const { routes } = navigation.state

    let tabBarVisible = null;

    switch (routes[routes.length - 1].routeName) {
        case ScreenName.FilterScreen():
        case ScreenName.MenuItemDetailsScreen():
        case ScreenName.ShopScreen():
        case ScreenName.ReviewListScreen():
            tabBarVisible = false;
            break
        default:
            tabBarVisible = true;
            break
    }
    return {
        tabBarVisible,
    }
};

UserStack.navigationOptions = ({ navigation }) => {
    const { routes } = navigation.state

    let tabBarVisible = null;

    switch (routes[routes.length - 1].routeName) {
        case ScreenName.FilterScreen():
        case ScreenName.ShopScreen():
        case ScreenName.ReviewScreen():
        case ScreenName.OrderDetailScreen():
        case ScreenName.ReviewListScreen():
        case ScreenName.UserSettingsScreen():
        case ScreenName.MenuItemDetailsScreen():
            tabBarVisible = false;
            break
        default:
            tabBarVisible = true;
            break
    }
    return {
        tabBarVisible,
    }
};
export { HomeStack, MapStack, CateringStack, UserStack, SearchStack };