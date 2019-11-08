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
import { ScreenName } from '../../helpers'
import { PlaceList } from '../../components/Place/PlaceList'
import { PlaceNetwork } from '../../service/api'
class PlaceListScreen extends BaseScreen {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            loading: true,
            arrayPlaces: [],
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)

        this.apiCallHandler()
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }

    apiCallHandler = () => {
        PlaceNetwork.fetchTest().then(
            res => {
                this.setNewStateHandler({
                    loading: false,
                    refreshing: false,
                    arrayPlaces: res,
                })
            },
            err => {
                this.showAlertMessage(err)
                this.setNewStateHandler({
                    loading: false,
                    refreshing: false,
                })
            }
        )
    }
    _onRefresh = () => {
        this.setNewStateHandler({ refreshing: true });
        this.apiCallHandler()
    }
    mainContent = () => {
        const { refreshing, arrayPlaces } = this.state
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
                arrayObject={arrayPlaces}
                onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}` })} />
        )
    }
    render() {
        const { loading } = this.state
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.mainContent()
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