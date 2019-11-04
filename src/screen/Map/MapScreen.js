import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScreenName } from '../../helpers'
import { NAV_COLOR, BASE_COLOR, segmentedControlStyles } from '../../styles'
import BaseScreen from "../BaseScreen/BaseScreen"
import Header from '../../components/common/BaseHeader'
import SegmentedControlTab from "react-native-segmented-control-tab";
import SafeAreaView from 'react-native-safe-area-view';
class MapScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
        // headerVisible: false,
        // headerBackTitle: "Photo",
    };

    constructor(props) {
        super(props)
        this.typeOfSortRestMap = ["Near me", "Pickup", "Delivery"]
        this.state = {
            selectedIndex: 0
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground,true)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    handleOnTabPress = index => {
        this.setNewStateHandler({
            ...this.state,
            selectedIndex: index
        });
        this.showAlertMessage(this.typeOfSortRestMap[index])
    };
    render() {
        return (

            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    <Header backgroundColor={NAV_COLOR.headerBackground} />
                    <View style={styles.segmentedControlContainer}>
                        <SegmentedControlTab
                            values={this.typeOfSortRestMap}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.handleOnTabPress}
                            borderRadius={8}
                            tabsContainerStyle={segmentedControlStyles.container}
                            tabStyle={segmentedControlStyles.commonStyle}
                            activeTabStyle={{ ...segmentedControlStyles.commonStyle, ...segmentedControlStyles.activeStyle }}
                            tabTextStyle={segmentedControlStyles.text}
                            activeTabTextStyle={segmentedControlStyles.text}
                        />
                    </View>

                </View>
            </SafeAreaView >


        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: BASE_COLOR.red
    },
    safeAreaHeader: {
        backgroundColor: NAV_COLOR.headerBackground,
        flex: 1,
    },
    segmentedControlContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: NAV_COLOR.headerBackground
    },

});


export default MapScreen;