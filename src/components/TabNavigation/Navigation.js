import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}

class MapScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Map!</Text>
            </View>
        );
    }
}

class CateringScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Catering!</Text>
            </View>
        );
    }
}

class UserScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>User!</Text>
            </View>
        );
    }
}

const TabNavigator = createBottomTabNavigator({
    Home: HomeScreen,
    Maps: MapScreen,
    Catering: CateringScreen,
    User: UserScreen,
});

export default createAppContainer(TabNavigator);