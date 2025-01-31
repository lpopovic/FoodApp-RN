import React from 'react';
import {
    View,
    SafeAreaView,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    StyleSheet,
    Keyboard,
    Dimensions,
} from 'react-native';
import {
    ScreenName,
    isAndroid,
} from '../../helpers'
import { NAV_COLOR, BASE_COLOR, segmentedControlStyles } from '../../styles'
import BaseScreen from "../BaseScreen/BaseScreen"
import Header from '../../components/common/SearchHeader'
import SegmentedControlTab from "react-native-segmented-control-tab";
import Carousel from 'react-native-snap-carousel';
import { PlaceNetwork, ParamsUrl, } from '../../service/api'
import { TestAssets, IconAssets } from '../../assets'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import UrlOpen from '../../components/common/UrlOpen';

// default params for mapView
const zoom = 10
const zoomMarker = 13
const distanceDelta = Math.exp(Math.log(360) - (zoom * Math.LN2));


const latitudeDeltaMarker = Math.exp(Math.log(360) - (zoomMarker * Math.LN2));
const longitudeDeltaMarker = Dimensions.get('window').width / Dimensions.get('window').height * latitudeDeltaMarker
// end mapView
// default params for carosel card
const width = Dimensions.get("window").width;
const CARD_WIDTH = width - 50;
const CARD_HEIGHT = CARD_WIDTH / 3;
// end carosel
class MapScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.keyMarkerUser = "#keyMarkerUser"
        const { strings } = props
        this.typeOfSortRestMap = [strings.nearMe, strings.pickup, strings.delivery]
        this.state = {
            currentSlideIndex: 0,
            selectedSegmentedIndex: 0,
            mapPlaces: [],
            loading: false,
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
    getInitRegionForCoordinates(points) {
        // points should be an array of { latitude: X, longitude: Y }
        let minX, maxX, minY, maxY;

        // init first point
        ((point) => {
            minX = point.coordinate.latitude;
            maxX = point.coordinate.latitude;
            minY = point.coordinate.longitude;
            maxY = point.coordinate.longitude;
        })(points[0]);

        // calculate rect
        points.map((point) => {
            minX = Math.min(minX, point.coordinate.latitude);
            maxX = Math.max(maxX, point.coordinate.latitude);
            minY = Math.min(minY, point.coordinate.longitude);
            maxY = Math.max(maxY, point.coordinate.longitude);
        });

        const midX = (minX + maxX) / 2;
        const midY = (minY + maxY) / 2;
        const deltaX = (maxX - minX) + 0.01;
        const deltaY = (maxY - minY) + 0.01;

        return {
            latitude: midX,
            longitude: midY,
            latitudeDelta: deltaX,
            longitudeDelta: deltaY
        };
    }
    handleOnTabPress = index => {
        this.setNewStateHandler({
            selectedSegmentedIndex: index
        });
        this.searchApiHandler({ index })

    };
    initApiHandler = () => {
        this.setNewStateHandler({
            loading: true
        })
        const { strings } = this.props
        const {
            pickup,
            delivery,
            avgRating,
            avgPriceTag } = this.props.filter

        let params = []

        params.push(ParamsUrl.avgPriceTag(avgPriceTag))
        params.push(ParamsUrl.avgRating(avgRating))

        PlaceNetwork.fetchPlaces(params).then(
            res => {

                this.setNewStateHandler({
                    loading: false,
                    mapPlaces: res,
                    region: res.length > 0 ? this.getInitRegionForCoordinates(res) : this.state.region
                })
                if (res.length == 0) {
                    this.showAlertMessage(strings.thereIsNoNearbyPlaces)
                } else {
                    // this.setNewRegion(0)
                }
            },
            err => {
                this.showAlertMessage(err)
                this.setNewStateHandler({
                    loading: false,
                    mapPlaces: [],


                })
            }
        )
    }

    searchApiHandler = ({ text, index }) => {
        const { strings } = this.props
        const {
            pickup,
            delivery,
            avgRating,
            avgPriceTag } = this.props.filter

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

        params.push(ParamsUrl.avgPriceTag(avgPriceTag))
        params.push(ParamsUrl.avgRating(avgRating))

        if (sort !== null) {
            params.push(sort)
        }
        if (text) {
            this.setNewStateHandler({
                searchText: text,
                loading: true,
                currentSlideIndex: 0,
            })
            search = ParamsUrl.search(text)
        } else {
            search = this.state.searchText !== '' ? ParamsUrl.search(this.state.searchText) : ''
        }
        if (search !== '') {
            params.push(search)

            PlaceNetwork.fetchPlaces(params).then(
                res => {
                    this.setNewStateHandler({
                        loading: false,
                        mapPlaces: res,
                        region: res.length > 0 ? this.getInitRegionForCoordinates(res) : this.state.region
                    })

                    if (res.length == 0) {
                        this.showAlertMessage(strings.thereIsNoNearbyPlaces)
                    } else {
                        // this.setNewRegion(0)
                    }
                },
                err => {
                    this.showAlertMessage(err)
                    this.setNewStateHandler({
                        loading: false,
                        mapPlaces: [],
                    })
                }
            )
        } else {
            this.showAlertMessage(strings.insertKeyWordForSearch)
        }
    }

    clearTextHandler = () => {
        this.setNewStateHandler({ searchText: '' })
    }
    onSubmitEditingHandler = (text) => {
        const { loading } = this.state
        if (loading == false) {
            this.searchApiHandler({ text })
        }
    }
    placeSelectHandler = (place) => {

        this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${place._id}`, params: { _id: place._id } })
    }

    setNewRegion = (index) => {

        clearTimeout(this.regionTimeout);
        this.regionTimeout = setTimeout(() => {

            const { mapPlaces } = this.state

            if (mapPlaces.length > 0) {
                const coordinate = mapPlaces[index].coordinate;
                this.map.animateToRegion(
                    {
                        ...coordinate,
                        latitudeDelta: latitudeDeltaMarker,
                        longitudeDelta: longitudeDeltaMarker,
                    },
                    350
                );

            }



        }, 0);
    }
    deliveryContent = (delivery, timeDelivery) => {
        if (delivery) {
            return (

                <View style={stylesCard.itemOtherContainer}>
                    <Icon name="ios-bicycle" size={16} color={BASE_COLOR.black} />
                    <Text
                        style={[stylesCard.baseText, { marginLeft: 4 }]}>
                        {timeDelivery} min.
                        </Text>
                </View>
            )
        } else {
            return null
        }
    }
    _renderItem = ({ item, index }) => {
        const image = item.image.image11t
        const title = item.name
        const rating = item.getAvgRating()
        const delivery = item.delivery || false
        const timeDelivery = item.estimatedDeliveryTime
        const priceTag = item.returnAvgPriceTag()




        return (
            <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => this.placeSelectHandler(item)}>
                <View style={this.cardStyle(index)}>
                    <Image
                        source={{ uri: image }}
                        style={stylesCard.cardImage}
                        resizeMode='contain'
                    />
                    <View style={stylesCard.textContent}>
                        <View style={stylesCard.titleContainer}>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={stylesCard.cardtitle}>
                                {title}
                            </Text>
                        </View>

                        <View style={stylesCard.descriptionContainer}>
                            <Text
                                numberOfLines={3}
                                ellipsizeMode='tail'
                                style={stylesCard.cardDescription}>
                                {item.description}
                            </Text>
                        </View>
                        <View style={stylesCard.otherContainer}>
                            <View style={stylesCard.itemOtherContainer}>
                                <Text
                                    style={[stylesCard.baseText]}>
                                    {priceTag}
                                </Text>
                            </View>
                            <View style={stylesCard.spaceView} />
                            <View>
                                {this.deliveryContent(delivery, timeDelivery)}
                            </View>
                            <View style={stylesCard.spaceView} />
                            <View style={stylesCard.itemOtherContainer}>
                                <Image
                                    style={[stylesCard.otherImage]}
                                    source={IconAssets.starIcon}
                                    resizeMode='contain' />
                                <Text
                                    style={[stylesCard.baseText]}>
                                    {rating}
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableOpacity >
        )
    }

    cardStyle = function (index) {
        const { currentSlideIndex } = this.state;
        return {
            flex: 3,
            flexDirection: 'row',
            height: CARD_HEIGHT,
            width: (Dimensions.get('window').width) * 0.72, //CARD_WIDTH,
            backgroundColor: BASE_COLOR.white,
            borderRadius: 5,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: currentSlideIndex === index ? 6 : 2,
            shadowColor: currentSlideIndex === index ? BASE_COLOR.blue : '#000',
            shadowOpacity: currentSlideIndex === index ? 0.9 : 0.2,
            elevation: 5,
            borderWidth: currentSlideIndex === index ? 1 : 0,
            borderColor: currentSlideIndex === index ? BASE_COLOR.blue : BASE_COLOR.lightGray,
        }
    }
    scrollViewContent = () => {

        return (
            <View style={styles.carouselContainer}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.mapPlaces}
                    renderItem={this._renderItem}
                    sliderWidth={(Dimensions.get('window').width)}
                    itemWidth={(Dimensions.get('window').width) * 0.72} //{CARD_WIDTH}
                    itemHeight={CARD_HEIGHT}
                    sliderHeight={CARD_HEIGHT}  //120
                    activeSlideAlignment="start"
                    inactiveSlideOpacity={0.9}
                    paddingLeft={12}


                    onSnapToItem={(index) => {
                        this.setNewStateHandler({ currentSlideIndex: index })
                        this.setNewRegion(index)
                    }}

                    animationOptions={{
                        friction: 0,
                        tension: 0,
                        isInteraction: false,
                        useNativeDriver: true,

                    }}

                />
            </View>
        );
    }
    setUserMarkerContent = () => {
        const { userMarker } = this.state
        const { strings } = this.props
        return (
            <MapView.Marker
                // draggable
                key={this.keyMarkerUser}
                onDragEnd={(event) => this.setNewStateHandler({
                    userMarker: event.nativeEvent.coordinate
                })}
                coordinate={userMarker}
                title={strings.myLocation}
                description={`${Math.round(userMarker.latitude * 100) / 100}°N, ${Math.round(userMarker.longitude * 100) / 100}°E`}
                pinColor={BASE_COLOR.red} >
                <View style={[styles.markerWrap, { backgroundColor: BASE_COLOR.red, padding: 5, height: 40, width: 40, borderRadius: 20, borderWidth: 4, borderColor: BASE_COLOR.blue }]}>

                    <Image source={TestAssets.userMarkerIcon} style={{ height: 20, width: 20, tintColor: BASE_COLOR.white }} resizeMode="contain" />

                </View>
            </MapView.Marker>
        )

    }
    onPressMarkerHandler = (index) => {
        const { currentSlideIndex } = this.state
        if (index != currentSlideIndex) {
            this.setNewStateHandler({
                currentSlideIndex: index,
            })
            this._carousel.snapToItem(index, true, true)
        }

    }
    mapContent = () => {
        const { region, mapPlaces, currentSlideIndex } = this.state
        return (
            <MapView
                ref={map => this.map = map}
                onTouchStart={() => Keyboard.dismiss()}
                style={styles.map}
                initialRegion={region}>
                {mapPlaces.map((place, index) => {

                    return (
                        <MapView.Marker
                            key={isAndroid ? `${index}${Math.random()}${this.state.currentSlideIndex}` : index}
                            coordinate={place.coordinate}
                            title={place.name}
                            description={`${Math.round(place.coordinate.latitude * 100) / 100}°N, ${Math.round(place.coordinate.longitude * 100) / 100}°E`}
                            pinColor={currentSlideIndex == index ? BASE_COLOR.green : BASE_COLOR.red}
                            onPress={() => this.onPressMarkerHandler(index)}
                        // onCalloutPress={() => UrlOpen.openUrlInBrowser(UrlOpen.generateUrlForGoogleMap(place.coordinate.latitude, place.coordinate.longitude))}

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
        const caroselDisplay = loading ? null : this.scrollViewContent()
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
                            showFilter={this._filterData}
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
                                tabTextStyle={segmentedControlStyles.commonText}
                                activeTabTextStyle={segmentedControlStyles.activeText}
                            />
                        </View>
                        {mainDisplay}
                        {caroselDisplay}
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView >


        )
    }

    _filterData = () => {
        setTimeout(() => {
            this.searchApiHandler({})
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
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        flex: 3,
        flexDirection: 'row',
        height: CARD_HEIGHT,
        width: (Dimensions.get('window').width) * 0.72, //CARD_WIDTH,
        backgroundColor: BASE_COLOR.white,

        borderRadius: 5,
        borderColor: BASE_COLOR.lightGray,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        elevation: 5,
    },
    carouselContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 30
    },


});

const stylesCard = StyleSheet.create({
    cardImage: {
        flex: 1,
        aspectRatio: 1,
        margin: 10,
        height: CARD_HEIGHT - 10,
        alignSelf: "center",
        borderRadius: 4,
        overflow: "hidden",
        resizeMode: 'cover',

    },
    textContent: {
        flex: 2,
        margin: 8,
        marginLeft: 0
    },
    cardtitle: {
        fontSize: 14,
        fontWeight: "bold",
    },
    otherImage: {
        height: 12,
        width: 12,
        marginRight: 4
    },
    baseText: {
        color: BASE_COLOR.darkGray,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 10,
    },
    cardDescription: {
        fontSize: 12,
        color: BASE_COLOR.gray,
    },
    otherContainer: {
        flex: 0.5,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'red'
    },
    spaceView: {
        marginLeft: 4,
        marginRight: 4,
        width: 4,
        aspectRatio: 1,
        backgroundColor: BASE_COLOR.darkGray,
        borderRadius: 2
    },
    itemOtherContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionContainer: {
        flex: 1.5,
    },
    titleContainer: {
        flex: 1,
    },
});

const mapStateToProps = state => {
    return {
        city: state.location.city,
        strings: state.location.language.strings,
        filter: state.filter.filter,
    };
};

export default connect(mapStateToProps, null)(MapScreen);
