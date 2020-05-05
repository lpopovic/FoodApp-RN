import React from 'react';
import {
    View,
    ScrollView,
    RefreshControl,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { ScreenName } from '../../helpers'
import BaseScreen from "../BaseScreen/BaseScreen"
import Header from '../../components/common/BaseHeader'
import { fetchUserProfile, fetchUserFavorites } from '../../store/actions'
import { connect } from 'react-redux';
import { NAV_COLOR, BASE_COLOR } from '../../styles';
import { CategorySectionList } from '../../components/Category/CategoryList'
import { PlaceSectionList } from '../../components/Place/PlaceList'
import MenuItemList from '../../components/MenuItem/MenuItemList'
import HomeCaroselComponent from '../../components/Home/HomeCaroselComponent';
import { PlaceNetwork, CategoryNetwork, ParamsUrl, UserNetwork, BannerNetwork } from '../../service/api'
import { MenuItem } from '../../model';
import UrlOpen from '../../components/common/UrlOpen';

class HomeScreen extends BaseScreen {
    static navigationOptions = {
        header: null,

    };
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            refreshing: false,
            categories: [],
            newPlaces: [],
            actionPlaces: [],
            mostRatingPlaces: [],
            recommendedPlaces: [],
            pickupPlaces: [],
            deliveryPlaces: [],
            heroBanners: [],
        }

    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        this.apiCallHandler()
        this.companyRequestApiCheck()
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }


    companyRequestApiCheck = () => {
        if (this.props.isLogin && this.props.userInfo.company === null) {
            UserNetwork.fetchUserGetCompanyReguests()
                .then(
                    res => {
                        onPressOkStatus = () => {
                            UserNetwork.fetchUserPutCompanyReguestsResponse(res._id, "true").then(
                                res => {
                                    this.props.fetchUserProfileHandler()
                                },
                                err => {

                                }
                            )
                        }
                        onPressCancelStatus = () => {
                            UserNetwork.fetchUserPutCompanyReguestsResponse(res._id, "false")
                        }
                        this.showDialogMessage(res.text, onPressOkStatus, onPressCancelStatus)
                    },
                    err => {

                    }
                )
        }
    }

    apiCallHandler = () => {

        const {
            pickup,
            delivery,
            avgRating,
            avgPriceTag } = this.props.filter

        let params = []
        params.push(ParamsUrl.avgPriceTag(avgPriceTag))
        params.push(ParamsUrl.avgRating(avgRating))

        this.props.fetchUserFavoriteHandler()

        PlaceNetwork.fetchPlaces(params).then(
            res => {
                this.setNewStateHandler({
                    loading: false,
                    refreshing: false,
                    newPlaces: res,
                    actionPlaces: res,
                    recommendedPlaces: res,
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
        let ratingParams = params
        ratingParams.push('sort=-avgRating')
        // Rating section
        PlaceNetwork.fetchPlacesBySort(ratingParams).then(
            res => {
                this.setNewStateHandler({
                    mostRatingPlaces: res,
                })
            },
            err => {

                this.setNewStateHandler({
                    mostRatingPlaces: []
                })
            }
        )
        let deliveryParams = params
        deliveryParams.push(ParamsUrl.delivery(true))
        // Delivery section
        PlaceNetwork.fetchPlacesBySort(deliveryParams).then(
            res => {
                this.setNewStateHandler({
                    deliveryPlaces: res,
                })
            },
            err => {

                this.setNewStateHandler({
                    deliveryPlaces: []
                })
            }
        )
        let pickupParams = params
        pickupParams.push(ParamsUrl.pickup(true))
        // Pickup section
        PlaceNetwork.fetchPlacesBySort(pickupParams).then(
            res => {
                this.setNewStateHandler({
                    pickupPlaces: res,
                })
            },
            err => {

                this.setNewStateHandler({
                    pickupPlaces: []
                })
            }
        )

        CategoryNetwork.fetchCategories().then(
            res => {
                this.setNewStateHandler({
                    categories: res,
                })
            },
            err => {
                this.setNewStateHandler({
                    categories: []
                })
            }
        )
        BannerNetwork.fetchHeroBanners().then(
            res => {
                this.setNewStateHandler({
                    heroBanners: res,
                })
            },
            err => {
                this.setNewStateHandler({
                    heroBanners: [],
                })
            }
        )
    }

    placeListNewContent = () => {
        const { newPlaces } = this.state
        const title = String(this.props.strings.new).toUpperCase()
        const seeMore = String(this.props.strings.seeMore).toLowerCase()
        if (newPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection={title}
                    titleSeeMore={seeMore}
                    arrayObject={newPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title } })}
                />
            )
        }

    }
    placeListMostRatingContent = () => {
        const { mostRatingPlaces } = this.state
        const title = String(this.props.strings.bestEvaluations).toUpperCase()
        const seeMore = String(this.props.strings.seeMore).toLowerCase()
        if (mostRatingPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection={title}
                    titleSeeMore={seeMore}
                    arrayObject={mostRatingPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({
                        routeName: ScreenName.PlaceListScreen(),
                        key: `${Math.random() * 10000}`,
                        params: {
                            title,
                            apiParams: 'sort=-avgRating'
                        }
                    })}
                />
            )
        }
    }
    placeListRecommendedContent = () => {
        const { recommendedPlaces } = this.state
        const title = String(this.props.strings.recommended).toUpperCase()
        const seeMore = String(this.props.strings.seeMore).toLowerCase()
        if (recommendedPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection={title}
                    titleSeeMore={seeMore}
                    arrayObject={recommendedPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title } })}
                />
            )
        }
    }
    placeListActionContent = () => {
        const { actionPlaces } = this.state
        const title = String(this.props.strings.actions).toUpperCase()
        const seeMore = String(this.props.strings.seeMore).toLowerCase()
        if (actionPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection={title}
                    titleSeeMore={seeMore}
                    arrayObject={actionPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title } })}
                />
            )
        }

    }
    placeListDeliveryContent = () => {
        const { deliveryPlaces } = this.state
        const title = String(this.props.strings.delivery).toUpperCase()
        const seeMore = String(this.props.strings.seeMore).toLowerCase()
        if (deliveryPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection={title}
                    titleSeeMore={seeMore}
                    arrayObject={deliveryPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({
                        routeName: ScreenName.PlaceListScreen(),
                        key: `${Math.random() * 10000}`,
                        params: {
                            title,
                            apiParams: ParamsUrl.delivery(true)
                        }
                    })}
                />
            )
        }

    }

    placeListPickupContent = () => {
        const { pickupPlaces } = this.state
        const title = String(this.props.strings.pickup).toUpperCase()
        const seeMore = String(this.props.strings.seeMore).toLowerCase()
        if (pickupPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection={title}
                    titleSeeMore={seeMore}
                    arrayObject={pickupPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({
                        routeName: ScreenName.PlaceListScreen(),
                        key: `${Math.random() * 10000}`,
                        params: {
                            title: title,
                            apiParams: ParamsUrl.pickup(true)
                        }
                    })}
                />
            )
        }

    }
    placeListFavoriteContent = () => {
        const { userFavoritePlaces } = this.props
        const { isLogin } = this.props
        const title = String(this.props.strings.favoriteRestaurants).toUpperCase()
        if (userFavoritePlaces.length > 0 && isLogin == true) {
            return (
                <PlaceSectionList
                    isFavoritePlace={true}
                    hideSeeMore={true}
                    titleSection={`${title} ❤️`}
                    arrayObject={userFavoritePlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    // onPressSeeMore={() => this.pushNewScreen({
                    //     routeName: ScreenName.PlaceListScreen(),
                    //     key: `${Math.random() * 10000}`,
                    //     params: {
                    //         title: "OMILJENI",
                    //     }
                    // })}
                    onPressSeeMore={() => { }}
                />
            )
        }

    }
    menuItemsListFavoriteContent = () => {
        const { userFavoriteMenuItems } = this.props
        const { isLogin } = this.props
        const title = String(this.props.strings.favoriteMeals).toUpperCase()

        if (userFavoriteMenuItems.length > 0 && isLogin == true) {
            return (
                <MenuItemList
                    titleSection={`${title} ❤️`}
                    arrayObject={userFavoriteMenuItems}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.MenuItemDetailsScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => console.log("see more")}
                />
            )
        }

    }
    categoryListContent = () => {
        const { categories } = this.state
        const title = String(this.props.strings.categories).toUpperCase()
        const seeMore = String(this.props.strings.seeMore).toLowerCase()
        if (categories.length > 0) {
            return (
                <CategorySectionList
                    titleSection={title}
                    titleSeeMore={seeMore}
                    arrayObject={categories}
                    onPressItem={(item) => this.pushNewScreen({
                        routeName: ScreenName.PlaceListScreen(),
                        key: `${Math.random() * 10000}`,
                        params: { title: item.name.toUpperCase(), apiParams: ParamsUrl.category(item._id) }
                    })}
                    onPressSeeMore={() => this.pushNewScreen(ScreenName.CategoryScreen())}
                />
            )
        }
    }

    caroselContent = () => {
        const { heroBanners } = this.state
        if (heroBanners.length > 0) {
            return (
                <HomeCaroselComponent
                    data={heroBanners}
                    onPressPlace={(place) => this.pushNewScreen({
                        routeName: ScreenName.PlaceDetailScreen(),
                        key: `${Math.random() * 10000}${place}`,
                        params: {
                            _id: place
                        }
                    })}
                    onPressMenuItem={(menuItem) => this.pushNewScreen({
                        routeName: ScreenName.MenuItemDetailsScreen(),
                        key: `${Math.random() * 10000}`,
                        params: {
                            _id: menuItem,
                        }
                    })
                    }
                    onPressCustom={(url) => UrlOpen.openUrlInBrowser(url)}
                />
            )
        }
    }
    _onRefresh = () => {
        this.setNewStateHandler({ refreshing: true });
        this.apiCallHandler()
    }
    mainContent = () => {
        const { refreshing } = this.state
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._onRefresh}
                        tintColor={BASE_COLOR.blue}
                        colors={[BASE_COLOR.blue]}
                    />
                }
                style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ marginTop: 8 }}>
                        {this.caroselContent()}
                    </View>
                    <View style={{ marginTop: 8 }}>
                        {this.placeListRecommendedContent()}
                    </View>
                    <View style={{ marginTop: 8 }}>
                        {this.categoryListContent()}
                    </View>
                    <View >
                        {this.placeListNewContent()}
                    </View>
                    <View style={{ marginTop: 8 }}>
                        {this.placeListMostRatingContent()}
                    </View>
                    <View style={{ marginTop: 8 }}>
                        {this.placeListActionContent()}
                    </View>
                    <View style={{ marginTop: 8 }}>
                        {this.placeListDeliveryContent()}
                    </View>
                    <View style={{ marginTop: 8 }}>
                        {this.placeListPickupContent()}
                    </View>
                    <View style={{ marginTop: 8 }}>
                        {this.placeListFavoriteContent()}
                    </View>
                    <View style={{ marginTop: 8, marginBottom: 8 }}>
                        {this.menuItemsListFavoriteContent()}
                    </View>
                </View>
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
                        backgroundColor={NAV_COLOR.headerBackground}
                        showFilter={this._filterData}
                    />
                    {mainDisplay}
                </View>
            </SafeAreaView>
        )
    }

    _filterData = () => {
        setTimeout(() => {
            this.setNewStateHandler({
                loading: true
            })
            this.apiCallHandler()
        }, 100);
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

const mapStateToProps = state => {
    return {
        filter: state.filter.filter,
        isLogin: state.user.isLogin,
        userInfo: state.user.userInfo,
        userFavoritePlaces: state.user.userFavoritePlaces,
        userFavoriteMenuItems: state.user.userFavoriteMenuItems,
        strings: state.location.language.strings,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserProfileHandler: () => dispatch(fetchUserProfile()),
        fetchUserFavoriteHandler: () => dispatch(fetchUserFavorites())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
