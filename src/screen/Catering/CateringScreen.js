import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet 
} from 'react-native';
import {ScreenName } from '../../helpers'
import BaseScreen from "../BaseScreen/BaseScreen"
class CateringScreen extends BaseScreen {
    
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle('red')
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    render() {
        return (
            <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text onPress={() => this.pushNewScreen({ routeName: ScreenName.DetailScreen(), key: `${Math.random() * 10000}` })}>Catering Home!</Text>
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