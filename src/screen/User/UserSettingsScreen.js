import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BtnHeader'
import {
    NAV_COLOR,
    BASE_COLOR,
} from '../../styles'


class UserSettingsScreen extends BaseScreen {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        setTimeout(() => {
            this.setNewStateHandler({
                loading: false
            })
        }, 500);

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    onSaveBtnPress = () => {

    }

    mainContent = () => {
        return (
            <ScrollView
                bounces={false}>

            </ScrollView>
        )
    }
    render() {
        const { loading } = this.state
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.mainContent()
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    <Header
                        tintColor={BASE_COLOR.darkGray}
                        title={'Back'}
                        btnTitle={'Save'}
                        btnPress={() => this.onSaveBtnPress()}
                        backgroundColor={NAV_COLOR.headerBackground} />
                    {mainDisplay}
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
    },
});


export default UserSettingsScreen;