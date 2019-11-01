import React from 'react';
import { Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeStack, MapStack, CateringStack, UserStack } from './StackNavigator';
import { homeTabIcon, mapTabIcon, ceteringTabIcon, userTabIcon } from '../../helpers'


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

  },
  {
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#399BF1',
      // inactiveTintColor: 'red',
      // style: {
      //   backgroundColor: 'white',
      // }
    }
  }


);

export default createAppContainer(TabNavigatorScreen);