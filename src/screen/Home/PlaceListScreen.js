import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    RefreshControl
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BackHeader'
import { NAV_COLOR, BASE_COLOR } from '../../styles'
import PlaceList from '../../components/Place/PlaceList'
class PlaceListScreen extends BaseScreen {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            loading: false
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        this.setNewStateHandler({ loading: true })

        setTimeout(() => {
            this.setNewStateHandler({ loading: false })
        }, 1000);
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    _onRefresh = () => {
        this.setNewStateHandler({ refreshing: true });
        clearTimeout(this.refreshTimeout)
        this.refreshTimeout = setTimeout(() => {
            this.setNewStateHandler({ refreshing: false });
        }, 1000);
    }
    mainContent = () => {
        const { refreshing } = this.state
        return (
            <PlaceList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._onRefresh}
                        tintColor={BASE_COLOR.blue}
                        colors={[BASE_COLOR.blue]}
                    />
                }
                arrayObject={["", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar"]}
                onPressItem={(item) => alert(item)} />
        )
    }
    render() {
        const mainDisplay = this.mainContent()
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    <Header
                        backgroundColor={NAV_COLOR.headerBackground}
                        tintColor={BASE_COLOR.darkGray}
                        showFilter
                    />
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
    }
});


export default PlaceListScreen;