import React from 'react';
import {
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Keyboard,
    Dimensions,
} from 'react-native';
import { ScreenName, isAndroid } from '../../helpers'
import { NAV_COLOR, BASE_COLOR, segmentedControlStyles } from '../../styles'
import BaseScreen from "../BaseScreen/BaseScreen"
import Header from '../../components/common/SearchHeader'
import SegmentedControlTab from "react-native-segmented-control-tab";
import SafeAreaView from 'react-native-safe-area-view';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
const zoom = 10
const zoomMarker = 13
const distanceDelta = Math.exp(Math.log(360) - (zoom * Math.LN2));
const distanceDeltaMarker = Math.exp(Math.log(360) - (zoomMarker * Math.LN2));
class MapScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.typeOfSortRestMap = ["Near me", "Pickup", "Delivery"]
        this.state = {
            selectedSegmentedIndex: 0,
            mapPlaces: [],
            userMarker: {
                latitude: this.props.city.coordinate.latitude,
                longitude: this.props.city.coordinate.longitude,
            },
            region: {
                latitude: this.props.city.coordinate.latitude,
                longitude: this.props.city.coordinate.longitude,
                latitudeDelta: distanceDelta,
                longitudeDelta:
                    Dimensions.get('window').width /
                    Dimensions.get('window').height *
                    distanceDelta
            },
            loading: false,
            currentSlideIndex: 0,
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    handleOnTabPress = index => {
        this.setNewStateHandler({
            ...this.state,
            selectedSegmentedIndex: index
        });
        this.showAlertMessage(this.typeOfSortRestMap[index])
    };
    mapContent = () => {
        const { region, userMarker } = this.state
        return (
            <MapView
                ref={map => this.map = map}
                style={styles.map}
                initialRegion={region}>
                <MapView.Marker
                    draggable
                    onDragEnd={(event) => this.setNewStateHandler({
                        userMarker: event.nativeEvent.coordinate
                    })}
                    coordinate={userMarker}
                    title={"MOJA LOKACIJA"}
                    description={`${Math.round(userMarker.latitude * 100)/100}°N, ${Math.round(userMarker.longitude * 100)/100}°E`}
                    pinColor={BASE_COLOR.red}
                />
            </MapView>
        )
    }
    render() {
        return (

            <SafeAreaView style={styles.safeAreaHeader}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View style={styles.mainContainer}>
                        <Header
                            backgroundColor={NAV_COLOR.headerBackground}
                            borderBottomColor='transparent'
                            searchTextChange={(text) => this.showAlertMessage(text)}
                        />
                        <View style={styles.segmentedControlContainer}>
                            <SegmentedControlTab
                                values={this.typeOfSortRestMap}
                                selectedIndex={this.state.selectedSegmentedIndex}
                                onTabPress={this.handleOnTabPress}
                                borderRadius={8}
                                tabsContainerStyle={segmentedControlStyles.container}
                                tabStyle={segmentedControlStyles.commonStyle}
                                activeTabStyle={{ ...segmentedControlStyles.commonStyle, ...segmentedControlStyles.activeStyle }}
                                tabTextStyle={segmentedControlStyles.text}
                                activeTabTextStyle={segmentedControlStyles.text}
                            />
                        </View>
                        {this.mapContent()}
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView >


        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: BASE_COLOR.white
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
        backgroundColor: NAV_COLOR.headerBackground,
        borderBottomColor: NAV_COLOR.borderBottomColor,
        borderBottomWidth: 0.7
    },
    map: {
        flex: 1,
    },
});
const mapStateToProps = state => {
    return {
        city: state.location.city,
    };
};

export default connect(mapStateToProps, null)(MapScreen);
