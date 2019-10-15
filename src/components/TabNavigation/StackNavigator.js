import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

// HOME TAB
import HomeScreen from '../../screen/Home/HomeScreen'

// MAP TAB
import MapScreen from '../../screen/Map/MapScreen'

// CATERING TAB
import CateringScreen from '../../screen/Catering/CateringScreen'

// USER TAB
import UserScreen from '../../screen/User/UserScreen'

//TEST

import DetailScreen from '../../screen/DetailScreen'

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Detail: DetailScreen,

})

const MapStack = createStackNavigator({
    Map: MapScreen,
    Detail: DetailScreen,

})

const CateringStack = createStackNavigator({
    Catering: CateringScreen,
    Detail: DetailScreen,

})
const UserStack = createStackNavigator({
    User: UserScreen,
    Detail: DetailScreen,


})


export { HomeStack, MapStack, CateringStack, UserStack };