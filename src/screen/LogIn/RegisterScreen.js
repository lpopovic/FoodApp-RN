import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import { BASE_COLOR } from '../../styles';

class RegisterScreen extends BaseScreen {

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
            <View style={styles.mainContainer}>
                <Text>RegisterScreen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: BASE_COLOR.blue
    }
});


export default RegisterScreen;