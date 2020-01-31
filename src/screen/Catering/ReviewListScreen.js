import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BackHeader'
import SegmentedControlTab from "react-native-segmented-control-tab";
import ReviewItem from '../../components/Review/ReviewItem'
import {
    MESSAGE_EMPTY_ARRAY,
    abbrNum
} from '../../helpers'
import {
    NAV_COLOR,
    BASE_COLOR,
    segmentedControlStyles
} from '../../styles'
import { Place } from '../../model';
import { ReviewNetwork, ParamsUrl } from '../../service/api';

const widthScreen = Dimensions.get('screen').width - 32
class ReviewListScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.typeOfSortRestMap = ["New", "Rating", "Price Tag"]

        this.state = {
            refreshing: false,
            loading: true,
            arrayReviews: [],
            place: new Place({}),
            selectedIndex: 0,
            loadingMore: true,
            endPagination: false,
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        const { place } = this.props.navigation.state.params
        this.setNewStateHandler({
            place,
        })
        this.apiCallHandler(place._id, this.getSortValue(this.state.selectedIndex))

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }

    apiCallHandler = (placeId, params) => {
        ReviewNetwork.fetchGetReviewsFromPlace(placeId, params)
            .then(
                result => {
                    let endPagination = false
                    if (result.length == 0) {
                        this.showAlertMessage('Trenutno nema komentara.')
                        endPagination = true
                    }

                    this.setNewStateHandler({
                        arrayReviews: result,
                        loading: false,
                        refreshing: false,
                        loadingMore: false,
                        endPagination,
                    })
                },
                error => {
                    this.showAlertMessage(error)
                    this.setNewStateHandler({
                        arrayReviews: [],
                        loading: false,
                        refreshing: false,
                        loadingMore: false
                    })
                }
            )
    }
    apiCallLoadMoreHandler = (placeId, params) => {

        ReviewNetwork.fetchGetReviewsFromPlace(placeId, params)
            .then(
                result => {
                    this.setNewStateHandler({
                        arrayReviews: this.state.arrayReviews.concat(result),
                        // loading: false,
                        // refreshing: false,
                        loadingMore: false,
                        endPagination: result.length == 0 ? true : false
                    })
                },
                error => {
                    // this.showAlertMessage(error)
                    this.setNewStateHandler({
                        // arrayReviews: [],
                        // loading: false,
                        // refreshing: false,
                        loadingMore: false
                    })
                }
            )
    }
    getSortValue = (index) => {
        switch (index) {
            case 0:
                // 'NEW'
                return ParamsUrl.sort(ReviewNetwork.KEY_PARAM_SORT.NEW)
                break;
            case 1:
                // 'RATING'
                return ParamsUrl.sort(ReviewNetwork.KEY_PARAM_SORT.RATING)
                break;
            case 2:
                // 'PRICE TAG'
                return ParamsUrl.sort(ReviewNetwork.KEY_PARAM_SORT.PRICE_TAG)
                break;
            default:
                return null
                break;
        }
    }
    handleOnTabPress = index => {
        this.setNewStateHandler({
            selectedIndex: index,
            loading: true
        });
        this.apiCallHandler(this.state.place._id, this.getSortValue(index))
    };
    _onRefresh = () => {
        const { place, selectedIndex } = this.state
        this.setNewStateHandler({
            refreshing: true,
            loading: true,
            loadingMore: false,
        });
        this.apiCallHandler(place._id, this.getSortValue(selectedIndex))
    }
    loadMoreComponents = () => {
        const { arrayReviews, place, selectedIndex, endPagination } = this.state
        if (arrayReviews.length > 19 && endPagination == false) {
            this.setNewStateHandler({
                loadingMore: true
            })

            this.apiCallLoadMoreHandler(place._id, `${this.getSortValue(selectedIndex)}&${ParamsUrl.offset(arrayReviews.length)}`)
        }
    }
    renderFooter = () => {
        if (!this.state.loadingMore) return null;
        return (
            <ActivityIndicator
                size={"large"}
                color={BASE_COLOR.blue}
            />
        );
    };
    handleLoadMore = () => {
        if (!this.state.loadingMore) {
            this.loadMoreComponents()
        }
    };
    reviewContent = () => {
        const { refreshing, arrayReviews } = this.state
        return (
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._onRefresh}
                        tintColor={BASE_COLOR.blue}
                        colors={[BASE_COLOR.blue]}
                    />
                }
                style={{ backgroundColor: 'transparent' }}
                data={arrayReviews}
                keyExtractor={(item, index) => `${index.toString()}`}
                renderItem={(info) => (
                    <ReviewItem
                        review={info.item} />
                )}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                onEndReachedThreshold={0.4}
                onEndReached={() => this.handleLoadMore()}
                ListFooterComponent={this.renderFooter.bind(this)}

            />
        )
    }
    mainContent = () => {
        const { place } = this.state
        return (
            <View style={styles.mainContainer}>
                <View style={styles.infoContainer}>
                    <View style={{ width: widthScreen * 0.5 }}>
                        <Text
                            numberOfLines={3}
                            ellipsizeMode='tail'
                            style={{
                                fontWeight: 'bold',
                                fontSize: 20,
                            }}>
                            {place.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'column', width: widthScreen * 0.5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View>
                                <Text
                                    style={{ fontWeight: 'bold' }}
                                    numberOfLines={3}
                                    ellipsizeMode='tail'>
                                    Price:{"\n"}Rating:{"\n"}Reviews:
                                </Text>
                            </View>
                            <View style={{ marginLeft: 4 }}>
                                <Text
                                    style={{ textAlign: 'center', fontWeight: 'bold' }}
                                    numberOfLines={3}
                                    ellipsizeMode='tail'>
                                    {place.returnAvgPriceTag()}{"\n"}{Number(place.avgRating).toFixed(1)}{"\n"}{abbrNum(Number(place.numberOfReviews), 1)}
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
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
                {this.reviewContent()}
            </View>
        )
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.7,
                    width: "100%",
                    paddingLeft: 16,
                    paddingRight: 16,
                }}
            >
                <View style={{
                    backgroundColor: BASE_COLOR.blue,
                    height: 0.7,
                }} />
            </View>
        );
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
                        borderBottomColor={loading ? NAV_COLOR.borderBottomColor : 'transparent'}
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
        backgroundColor: BASE_COLOR.white,
        flex: 1,
    },
    infoContainer: {
        padding: 16,
        paddingBottom: 8,
        paddingTop: 0,
        flexDirection: 'row',
        backgroundColor: NAV_COLOR.headerBackground
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
});


export default ReviewListScreen;


