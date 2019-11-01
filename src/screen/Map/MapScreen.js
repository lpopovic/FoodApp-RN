import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScreenName } from '../../helpers'
import BaseScreen from "../BaseScreen/BaseScreen"
import { IndicatorViewPager, PagerTitleIndicator } from 'react-native-best-viewpager';
class MapScreen extends BaseScreen {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle('black')
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator
            titles={['Nearby', 'Delivery', 'Pick up']}
            style={{ backgroundColor: 'white', marginLeft: 0, marginRight: 0, height: 50 }}
            itemStyle={{ width: (Dimensions.get('window').width) / 3, borderBottomColor: "#E5E5E5", borderBottomWidth: 1 }}
            selectedItemStyle={{ width: (Dimensions.get('window').width) / 3 }}
            selectedItemTextStyle={{ color: '#646464', fontSize: 16, fontWeight: '500' }}
            selectedBorderStyle={{ backgroundColor: '#646464', height: 4.5 }}
            itemTextStyle={{ fontSize: 16, fontWeight: '500', color: '#A5A5A5' }}
        />;
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <IndicatorViewPager
                    style={{ flex: 1, paddingTop: 0, flexDirection: 'column-reverse' }}
                    indicator={this._renderTitleIndicator()}
                >
                    <View style={{ backgroundColor: 'cadetblue' }}>
                        <Text>page one</Text>
                    </View>
                    <View style={{ backgroundColor: 'cornflowerblue' }}>
                        <Text>page two</Text>
                    </View>
                    <View style={{ backgroundColor: '#1AA094' }}>
                        <Text>page three</Text>
                    </View>
                </IndicatorViewPager>

                {/* <Text onPress={() => this.pushNewScreen({ routeName: ScreenName.DetailScreen(), key: `${Math.random() * 10000}` })}>Map!</Text> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});


export default MapScreen;