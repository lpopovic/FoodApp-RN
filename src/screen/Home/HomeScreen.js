import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SreenName } from '../../helpers'
class HomeScreen extends Component {

    render() {
        return (
            <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text onPress={() => this.props.navigation.navigate({ routeName: SreenName.DetailScreen(), key: `${Math.random() * 10000}` })}>Home!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});


export default HomeScreen;