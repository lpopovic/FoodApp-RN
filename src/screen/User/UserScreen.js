import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SreenName } from '../../helpers'
import BaseScreen from "../BaseScreen/BaseScreen"
class UserScreen extends BaseScreen {
    
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle('green')
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    render() {
        return (
            <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text onPress={() => this.pushNewScreen({ routeName: SreenName.DetailScreen(), key: `${Math.random() * 10000}` })}>User!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});


export default UserScreen;