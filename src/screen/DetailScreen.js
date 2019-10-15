import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class DetailScreen extends Component {

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