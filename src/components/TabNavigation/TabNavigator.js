import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeStack, MapStack, CateringStack, UserStack } from './StackNavigator';


const TabNavigatorScreen = (props) = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Maps: {
      screen: MapStack,

    },
    Catering: {
      screen: CateringStack

    },

    User: {
      screen: UserStack,
    },

  },
);

export default createAppContainer(TabNavigatorScreen);