import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeStack, MapStack, CateringStack, UserStack } from './StackNavigator';
import { homeTabIcon, mapTabIcon, ceteringTabIcon, userTabIcon } from '../../helpers'
import { TAB_COLOR } from '../../styles'


const TabNavigatorScreen = (props) = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: () => { null },
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={homeTabIcon}
            resizeMode='contain'
            style={{ width: 34, height: 34, tintColor }}
          >
          </Image>
        )
      }
    },
    Maps: {
      screen: MapStack,
      navigationOptions: {
        tabBarLabel: () => { null },
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={mapTabIcon}
            resizeMode='contain'
            style={{ width: 34, height: 34, tintColor }}
          >
          </Image>
        )
      }
    },
    Catering: {
      screen: CateringStack,
      navigationOptions: {
        tabBarLabel: () => { null },
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={ceteringTabIcon}
            resizeMode='contain'
            style={{ width: 34, height: 34, tintColor }}
          >
          </Image>
        )
      }
    },

    User: {
      screen: UserStack,
      navigationOptions: {
        tabBarLabel: () => { null },
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={userTabIcon}
            resizeMode='contain'
            style={{ width: 34, height: 34, tintColor }}
          >
          </Image>
        )
      }
    },

  }, {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: TAB_COLOR.activeTintColor,
    inactiveTintColor: TAB_COLOR.inactiveTintColor,
    style: {
      backgroundColor: TAB_COLOR.backgroundColor,
      borderTopColor: TAB_COLOR.borderTopColor,
    },
  }
}
);

export default TabNavigatorScreen;