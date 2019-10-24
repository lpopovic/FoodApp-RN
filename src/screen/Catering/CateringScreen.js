import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SreenName } from '../../helpers'
import BaseScreen from "../BaseScreen/BaseScreen"
class CateringScreen extends BaseScreen {

    render() {
        return (
            <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text onPress={() => this.props.navigation.navigate({ routeName: SreenName.DetailScreen(), key: `${Math.random() * 10000}` })}>Catering Home!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});


export default CateringScreen;