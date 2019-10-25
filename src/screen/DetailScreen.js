import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseScreen from './BaseScreen/BaseScreen'
class DetailScreen extends BaseScreen {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle('orange')

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    render() {
        return (

            <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.color }]}>
                <Text onPress = {()=>this.closeScreen()}>Detail!</Text>
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