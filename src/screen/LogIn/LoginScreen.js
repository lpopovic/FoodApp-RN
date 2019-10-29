import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import SafeAreaView from 'react-native-safe-area-view';
import { SreenName } from '../../helpers'
import { BASE_COLOR } from '../../styles';

class LoginScreen extends BaseScreen {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(BASE_COLOR.blue)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    render() {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <Text onPress={() => this.resetNavigationStack(SreenName.TabNavigatorScreen())}>LoginScreen</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: BASE_COLOR.blue
    }
});


export default LoginScreen;