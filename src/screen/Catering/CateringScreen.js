import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class CateringScreen extends Component {

    render() {
        return (
            <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text onPress={() => this.props.navigation.navigate({ routeName: 'Detail', key: `${Math.random() * 10000}` })}>Catering Home!</Text>
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