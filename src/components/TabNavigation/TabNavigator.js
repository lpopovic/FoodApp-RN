import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeStack, MapStack, CateringStack, UserStack } from './StackNavigator';
import { TAB_COLOR } from '../../styles'


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

  }, {
  tabBarOptions: {
    showLabel: true,
    activeTintColor: TAB_COLOR.activeTintColor,
    inactiveTintColor: TAB_COLOR.inactiveTintColor,
    style: {
      backgroundColor: TAB_COLOR.backgroundColor,
      borderTopColor: TAB_COLOR.borderTopColor,
    },
  }
}
);

export default createAppContainer(TabNavigatorScreen);