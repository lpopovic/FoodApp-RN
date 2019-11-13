import React from 'react';
import {
    View,
    Image,
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
import { PlaceNetwork, ParamsUrl, } from '../../service/api'
import { TestAssets } from '../../assets'
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
        this.keyMarkerUser = "#keyMarkerUser"
        this.typeOfSortRestMap = ["Near me", "Pickup", "Delivery"]
        this.state = {
            selectedSegmentedIndex: 0,
            mapPlaces: [],
            loading: false,
            error: false,
            searchText: '',
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

        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        this.initApiHandler()

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    handleOnTabPress = index => {
        this.setNewStateHandler({
            ...this.state,
            selectedSegmentedIndex: index
        });
        this.searchApiHandler({ index })

    };
    initApiHandler = () => {
        this.setNewStateHandler({
            loading: true
        })
        PlaceNetwork.fetchPlaces().then(
            res => {
                this.setNewStateHandler({
                    loading: false,
                    mapPlaces: res,
                    error: false,
                })
            },
            err => {
                this.showAlertMessage(err)
                this.setNewStateHandler({
                    loading: false,
                    error: true,
                    mapPlaces: [],


                })
            }
        )
    }

    searchApiHandler = ({ text, index }) => {
        const selectedIndex = index != null ? index : this.state.selectedSegmentedIndex
        let sort = null
        let search = null
        let params = []
        switch (selectedIndex) {
            case 1:
                sort = ParamsUrl.pickup(true)
                break
            case 2:
                sort = ParamsUrl.delivery(true)
                break
            default:

                break
        }
        if (sort !== null) {
            params.push(sort)
        }
        if (text) {
            this.setNewStateHandler({
                searchText: text,
                loading: true,
            })
            search = ParamsUrl.search(text)
        } else {
            search = this.state.searchText !== '' ? ParamsUrl.search(this.state.searchText) : ''
        }
        if (search !== null) {
            params.push(search)

            PlaceNetwork.fetchPlaces(params).then(
                res => {
                    this.setNewStateHandler({
                        loading: false,
                        mapPlaces: res,
                        error: res.length > 0 ? false : true,
                    })
                },
                err => {
                    this.showAlertMessage(err)
                    this.setNewStateHandler({
                        loading: false,
                        mapPlaces: [],
                        error: true,

                    })
                }
            )
        } else {
            this.showAlertMessage("Insert key word for search.")
        }
    }

    clearTextHandler = () => {
        this.setNewStateHandler({ searchText: '' })
    }
    onSubmitEditingHandler = (text) => {
        const { loading } = this.state
        if (loading == true) {
            this.searchApiHandler({ text })
        }
    }
    setUserMarkerContent = () => {
        const { userMarker } = this.state
        return (
            <MapView.Marker
                draggable
                key={this.keyMarkerUser}
                onDragEnd={(event) => this.setNewStateHandler({
                    userMarker: event.nativeEvent.coordinate
                })}
                coordinate={userMarker}
                title={"MOJA LOKACIJA"}
                description={`${Math.round(userMarker.latitude * 100) / 100}°N, ${Math.round(userMarker.longitude * 100) / 100}°E`}
                pinColor={BASE_COLOR.red} >
                <View style={[styles.markerWrap, { backgroundColor: BASE_COLOR.red, padding: 5, height: 40, width: 40, borderRadius: 20, borderWidth: 4, borderColor: BASE_COLOR.blue }]}>

                    <Image source={TestAssets.userMarkerIcon} style={{ height: 20, width: 20, tintColor: BASE_COLOR.white }} resizeMode="contain" />

                </View>
            </MapView.Marker>
        )

    }
    mapContent = () => {
        const { region, mapPlaces } = this.state
        return (
            <MapView
                ref={map => this.map = map}
                onTouchStart={() => Keyboard.dismiss()}
                style={styles.map}
                initialRegion={region}>
                {mapPlaces.map((place, index) => {

                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={place.coordinate}
                            title={place.name}
                            description={`${Math.round(place.coordinate.latitude * 100) / 100}°N, ${Math.round(place.coordinate.longitude * 100) / 100}°E`}
                            pinColor={BASE_COLOR.green}
                        />

                    )

                })}
                {this.setUserMarkerContent()}
            </MapView>
        )
    }
    render() {
        const { loading } = this.state
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.mapContent()

        return (

            <SafeAreaView style={styles.safeAreaHeader}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View style={styles.mainContainer}>
                        <Header
                            backgroundColor={NAV_COLOR.headerBackground}
                            borderBottomColor='transparent'
                            searchTextChange={(text) => this.searchApiHandler({ text })}
                            clearText={() => this.clearTextHandler()}
                            onSubmitEditing={(text) => this.onSubmitEditingHandler(text)}
                            showFilter = {this._filterData}
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
                        {mainDisplay}
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView >


        )
    }

    _filterData = () => {
        setTimeout(() => {
            alert("FILTER DATA FUNC CALL")
        }, 100);
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
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
});
const mapStateToProps = state => {
    return {
        city: state.location.city,
    };
};

export default connect(mapStateToProps, null)(MapScreen);
