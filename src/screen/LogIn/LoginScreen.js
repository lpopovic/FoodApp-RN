import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import SafeAreaView from 'react-native-safe-area-view';

class LoginScreen extends BaseScreen {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        super.componentDidMount()
        this.setStatusBarStyle('blue')
    }
    componentWillUnmount(){
        super.componentWillUnmount()
    }
    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <Text>LoginScreen</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'blue'
    }
});


export default LoginScreen;