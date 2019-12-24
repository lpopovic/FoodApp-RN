import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    Dimensions
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BackHeader'
import SegmentedControlTab from "react-native-segmented-control-tab";
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import {
    ScreenName,
    MESSAGE_EMPTY_ARRAY,
    abbrNum
} from '../../helpers'
import {
    STAR_COLOR,
    NAV_COLOR,
    BASE_COLOR,
    segmentedControlStyles
} from '../../styles'
import { Place } from '../../model';

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
            arrayReviews: ["", ""],
            place: new Place({}),
            selectedIndex: 0,
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        const { place } = this.props.navigation.state.params

        setTimeout(() => {
            this.setNewStateHandler({
                place,
                loading: false
            })
        }, 500);

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    handleOnTabPress = index => {
        this.setNewStateHandler({
            ...this.state,
            selectedIndex: index,
            loading: true
        });
        setTimeout(() => {
            this.setNewStateHandler({
                loading: false
            })
        }, 500);

        // this.searchApiHandler({ index })

    };
    _onRefresh = () => {
        this.setNewStateHandler({ refreshing: true, loading: true });

        setTimeout(() => {
            this.setNewStateHandler({
                refreshing: false,
                loading: false
            });
        }, 500);
        // this.apiCallHandler()
    }
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
                keyExtractor={(index) => `${index.toString()}`}
                renderItem={(info) => (
                    <ReviewItem
                        review={{
                            username: "testUsername",
                            createdate: '2019-10-18T11:41:38.676Z',
                            rating: 3.5,
                            text: "dosata asda da d ad as das das d asd",
                            priceTag: '$$$$$'
                        }}
                    />
                )}
                ItemSeparatorComponent={this.FlatListItemSeparator}

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
                                    {place.returnAvgPriceTag()}{"\n"}{place.avgRating}{"\n"}{abbrNum(Number(3821), 1)}
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


class ReviewItem extends Component {

    returnHoursOrDate = (createdate) => {
        var now = moment(new Date(), "MM-DD-YYYY HH:mm")
        var end = moment.utc(createdate).local().format("MM-DD-YYYY HH:mm")

        var duration = moment.duration(now.diff(end))
        if (duration.asHours().toFixed() < 2) {
            return duration.asMinutes().toFixed() + ' minutes ago'
        } else if (duration.asHours().toFixed() >= 2 && duration.asHours().toFixed() <= 24) {
            return duration.asHours().toFixed() + ' hours ago'
        } else {
            return end
        }
    }
    render() {
        const { username, createdate, rating, text, priceTag } = this.props.review
        return (
            <View style={{ margin: 12, flex: 10, flexDirection: 'row' }}>

                <View style={{ flexDirection: 'column', alignItems: 'stretch', flex: 10 }}>
                    <View style={{ flexDirection: 'row', flex: 6 }}>
                        <View style={{ flex: 6, flexDirection: 'column' }}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={{ fontWeight: 'bold', color: 'black', fontSize: 15 }}>
                                {username}
                            </Text>

                        </View>
                        <StarRating
                            style={{ flex: 4 }}
                            disabled={true}
                            maxStars={5}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            rating={Number(rating)}
                            starSize={15}
                            emptyStarColor={STAR_COLOR}
                            fullStarColor={STAR_COLOR}
                            containerStyle={styles.starContainerStyle}
                        />

                    </View>
                    <View style={{ flex: 10, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Text style={{ color: '#9B9B9B', alignSelf: 'center' }}>{this.returnHoursOrDate(createdate)}</Text>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: BASE_COLOR.white,
                                padding: 4,
                                backgroundColor: BASE_COLOR.blue,
                                width: 60,
                                textAlign: 'center'
                            }}>
                            {priceTag}</Text>
                    </View>
                    <View style={{ flex: 10, marginTop: 5, flexDirection: 'column' }}>

                        <Text style={{ color: 'black' }}>{text}</Text>
                    </View>

                </View>
            </View>
        )
    }
}
