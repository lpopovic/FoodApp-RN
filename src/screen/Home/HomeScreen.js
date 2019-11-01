import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenName } from '../../helpers'
import BaseScreen from "../BaseScreen/BaseScreen"
import Header from '../../components/common/BaseHeader'
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { NAV_COLOR, BASE_COLOR } from '../../styles';
class HomeScreen extends BaseScreen {
    static navigationOptions = {
        header: null,
        // headerVisible: false,
        // headerBackTitle: "Photo",
    };
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    render() {
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    <Header backgroundColor={NAV_COLOR.headerBackground} />

                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safeAreaHeader: {
        backgroundColor: NAV_COLOR.headerBackground,
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: BASE_COLOR.white
    }
});

export default connect(null, null)(HomeScreen);
