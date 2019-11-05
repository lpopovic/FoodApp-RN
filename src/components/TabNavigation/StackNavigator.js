import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

// HOME TAB
import HomeScreen from '../../screen/Home/HomeScreen'
import CategoryScreen from '../../screen/Home/CategoryScreen'
import PlaceListScreen from '../../screen/Home/PlaceListScreen'
// MAP TAB
import MapScreen from '../../screen/Map/MapScreen'

// CATERING TAB
import CateringScreen from '../../screen/Catering/CateringScreen'
import PlaceDetailScreen from '../../screen/Catering/PlaceDetailsScreen'

// USER TAB
import UserScreen from '../../screen/User/UserScreen'

//TEST

import DetailScreen from '../../screen/DetailScreen'

const HomeStack = createStackNavigator({
    cateringapp_Home: HomeScreen,
    cateringapp_Category: CategoryScreen,
    cateringapp_PlaceList: PlaceListScreen,
    cateringapp_Detail: DetailScreen,

})

const MapStack = createStackNavigator({
    cateringapp_Map: MapScreen,
    cateringapp_Detail: DetailScreen,

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


export { HomeStack, MapStack, CateringStack, UserStack };