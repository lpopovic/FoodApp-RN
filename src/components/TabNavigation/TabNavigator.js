import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeStack, MapStack, CateringStack, UserStack, SearchStack } from './StackNavigator';
import { IconAssets, TestAssets } from '../../assets'
import { TAB_COLOR, BASE_COLOR } from '../../styles'


const TabNavigatorScreen = (props) = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: () => { null },
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={IconAssets.homeTabIcon}
            resizeMode='contain'
            style={{ width: 34, height: 34, tintColor, marginBottom: tintColor === TAB_COLOR.activeTintColor ? 2 : 0 }}
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
            source={IconAssets.mapTabIcon}
            resizeMode='contain'
            style={{ width: 34, height: 34, tintColor, marginBottom: tintColor === TAB_COLOR.activeTintColor ? 2 : 0 }}
          >
          </Image>
        )
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarLabel: () => { null },
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={TestAssets.searchIcon}
            resizeMode='contain'
            style={{ width: 34, height: 34, tintColor, marginBottom: tintColor === TAB_COLOR.activeTintColor ? 2 : 0 }}
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
            source={IconAssets.ceteringTabIcon}
            resizeMode='contain'
            style={{
              width: 34,
              height: 34,
              tintColor: tintColor === TAB_COLOR.activeTintColor ? BASE_COLOR.orange : tintColor,
              marginBottom: tintColor === TAB_COLOR.activeTintColor ? 2 : 0
            }}
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
            source={IconAssets.userTabIcon}
            resizeMode='contain'
            style={{ width: 34, height: 34, tintColor, marginBottom: tintColor === TAB_COLOR.activeTintColor ? 2 : 0 }}
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