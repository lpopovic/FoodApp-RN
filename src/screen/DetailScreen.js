import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseScreen from './BaseScreen/BaseScreen'
class DetailScreen extends BaseScreen {

    render() {
        return (
            <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>Detail!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});


export default DetailScreen;