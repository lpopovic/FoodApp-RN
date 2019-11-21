import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

// HOME TAB
import HomeScreen from '../../screen/Home/HomeScreen'
import CategoryScreen from '../../screen/Home/CategoryScreen'
import PlaceListScreen from '../../screen/Home/PlaceListScreen'
import FilterScreen from '../../screen/Home/FilterScreen'
import ShopScreen from '../../screen/Home/ShopScreen'
import MenuItemDetailsScreen from '../../screen/Home/MenuItemDetailsScreen'
// MAP TAB
import MapScreen from '../../screen/Map/MapScreen'

// SEARCH TAB

import SearchScreen from '../../screen/Search/SearchScreen'

// CATERING TAB
import CateringScreen from '../../screen/Catering/CateringScreen'
import PlaceDetailScreen from '../../screen/Catering/PlaceDetailsScreen'

// USER TAB
import UserScreen from '../../screen/User/UserScreen'

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

    cateringapp_Detail: DetailScreen,
})

const MapStack = createStackNavigator({
    cateringapp_Map: MapScreen,
    cateringapp_Detail: DetailScreen,
    cateringapp_Filter: FilterScreen,
    cateringapp_Shop: ShopScreen,

})
const SearchStack = createStackNavigator({
    cateringapp_Search: SearchScreen,
    cateringapp_Filter: FilterScreen,
    cateringapp_Shop: ShopScreen,

})
const CateringStack = createStackNavigator({
    cateringapp_Catering: CateringScreen,
    cateringapp_Detail: DetailScreen,
    cateringapp_PlaceDetail: PlaceDetailScreen,

})
const UserStack = createStackNavigator({
    cateringapp_User: UserScreen,
    cateringapp_Detail: DetailScreen,


})


HomeStack.navigationOptions = ({ navigation }) => {
    const { routes } = navigation.state

    let tabBarVisible = null;

    switch (routes[routes.length - 1].routeName) {
        case ScreenName.FilterScreen():
        case ScreenName.ShopScreen():
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
        case ScreenName.ShopScreen():
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
        case ScreenName.ShopScreen():
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