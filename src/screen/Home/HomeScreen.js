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
import { fetchUserProfile } from '../../store/actions'
import { connect } from 'react-redux';
import { NAV_COLOR, BASE_COLOR } from '../../styles';
import { CategorySectionList } from '../../components/Category/CategoryList'
import { PlaceSectionList } from '../../components/Place/PlaceList'
import MenuItemList from '../../components/MenuItem/MenuItemList'
import HomeCaroselComponent from '../../components/Home/HomeCaroselComponent';
import { PlaceNetwork, CategoryNetwork, ParamsUrl, UserNetwork } from '../../service/api'
import testMenuItems from '../../static/menuItems.json'
import { MenuItem } from '../../model';
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
            caroselPlaces: [],
            newPlaces: [],
            actionPlaces: [],
            mostRatingPlaces: [],
            recommendedPlaces: [],
            pickupPlaces: [],
            deliveryPlaces: [],
            favoritePlaces: [],
            favoriteMenuItems: [],


        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        this.apiCallHandler()
        this.companyRequestApiCheck()
        const favoriteMenuItems = MenuItem.createArrayMenuItems(testMenuItems)
        this.setNewStateHandler({

            favoriteMenuItems
        })
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
                            UserNetwork.fetchUserPutCompanyReguestsResponse(res._id, true).then(
                                res => {
                                    this.props.fetchUserProfileHandler()
                                },
                                err => {

                                }
                            )
                        }
                        onPressCancelStatus = () => {
                            UserNetwork.fetchUserPutCompanyReguestsResponse(res._id, false)
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

        PlaceNetwork.fetchPlaces(params).then(
            res => {
                this.setNewStateHandler({
                    loading: false,
                    refreshing: false,
                    caroselPlaces: res.slice(0, 3),
                    newPlaces: res,
                    actionPlaces: res,
                    recommendedPlaces: res,
                    favoritePlaces: res,
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
    }

    placeListNewContent = () => {
        const { newPlaces } = this.state
        if (newPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection="NOVO"
                    arrayObject={newPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "NOVO" } })}
                />
            )
        }

    }
    placeListMostRatingContent = () => {
        const { mostRatingPlaces } = this.state
        if (mostRatingPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection="NAJBOLJE OCENE"
                    arrayObject={mostRatingPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({
                        routeName: ScreenName.PlaceListScreen(),
                        key: `${Math.random() * 10000}`,
                        params: {
                            title: "NAJBOLJE OCENE",
                            apiParams: 'sort=-avgRating'
                        }
                    })}
                />
            )
        }
    }
    placeListRecommendedContent = () => {
        const { recommendedPlaces } = this.state

        if (recommendedPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection="PREPORUČENO"
                    arrayObject={recommendedPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "PREPORUČENO" } })}
                />
            )
        }
    }
    placeListActionContent = () => {
        const { actionPlaces } = this.state

        if (actionPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection={"AKCIJE"}
                    arrayObject={actionPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "AKCIJE" } })}
                />
            )
        }

    }
    placeListDeliveryContent = () => {
        const { deliveryPlaces } = this.state

        if (deliveryPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection={"DOSTAVA"}
                    arrayObject={deliveryPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({
                        routeName: ScreenName.PlaceListScreen(),
                        key: `${Math.random() * 10000}`,
                        params: {
                            title: "DOSTAVA",
                            apiParams: ParamsUrl.delivery(true)
                        }
                    })}
                />
            )
        }

    }

    placeListPickupContent = () => {
        const { pickupPlaces } = this.state

        if (pickupPlaces.length > 0) {
            return (
                <PlaceSectionList
                    titleSection={"PREUZMITE"}
                    arrayObject={pickupPlaces}
                    onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
                    onPressSeeMore={() => this.pushNewScreen({
                        routeName: ScreenName.PlaceListScreen(),
                        key: `${Math.random() * 10000}`,
                        params: {
                            title: "PREUZMITE",
                            apiParams: ParamsUrl.pickup(true)
                        }
                    })}
                />
            )
        }

    }
    placeListFavoriteContent = () => {
        const { favoritePlaces } = this.state
        const { isLogin } = this.props


        if (favoritePlaces.length > 0 && isLogin == true) {
            return (
                <PlaceSectionList
                    titleSection={"❤️ OMILJENI RESTORANI"}
                    arrayObject={favoritePlaces}
                    onPressItem={(item) => console.log(item._id)}// this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })}
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
        const { favoriteMenuItems } = this.state
        const { isLogin } = this.props


        if (favoriteMenuItems.length > 0 && isLogin == true) {
            return (
                <MenuItemList
                    titleSection={"❤️ OMILJENA JELA"}
                    arrayObject={favoriteMenuItems}
                    onPressItem={(item) => console.log(item._id)}
                    onPressSeeMore={() => console.log("see more")}
                />
            )
        }

    }
    categoryListContent = () => {
        const { categories } = this.state
        return (
            <CategorySectionList
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

    caroselContent = () => {
        const { caroselPlaces } = this.state
        return (
            <HomeCaroselComponent
                data={caroselPlaces}
                onPressItem={(place) => this.pushNewScreen({
                    routeName: ScreenName.PlaceDetailScreen(),
                    key: `${Math.random() * 10000}${place._id}`,
                    params: {
                        _id: place._id
                    }
                })}

            />
        )
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
                    <View>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {

        fetchUserProfileHandler: () => dispatch(fetchUserProfile()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
