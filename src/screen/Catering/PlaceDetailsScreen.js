import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform, LayoutAnimation, UIManager, RefreshControl, FlatList } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Animatable from 'react-native-animatable';
import BaseScreen from '../BaseScreen/BaseScreen';
import { ScreenName, isAndroid } from '../../helpers'
import DishCard from '../../components/Catering/DishCard';
import DishList from '../../components/Catering/DishList';
import MenuItemList from '../../components/MenuItem/MenuItemList'
import {
    IconAssets,
    TestAssets,
} from '../../assets';
import { BASE_COLOR, NAV_COLOR } from '../../styles';
import { PlaceNetwork } from '../../service/api'
import { Place, Category } from '../../model';
import { userFavoritePlaces } from '../../store/actions'
import { connect } from 'react-redux';
import { avgPriceTag, openDays } from '../../helpers/numberHelper';
import UrlOpen from '../../components/common/UrlOpen'
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { Badge } from 'react-native-elements'
import Moment from 'moment'
const HEADER_MIN_HEIGHT = 75 + getStatusBarHeight()
const HEADER_PADDING_TOP = isAndroid ? 25 : getStatusBarHeight() + 5;
let detectOnScrollChange = true;
class PlaceDetailsScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            statusBarHeight: 0,
            expanded: false,
            loading: true,
            refreshing: false,
            menuItems: [],
            sectionMeniItems: [],
            place: new Place({}),
            categoryList: [],
            selectedCategory: 0,
        }

        this.dayOfWeek = Moment().day()

        if (isAndroid) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {
        super.componentDidMount()

        const setDayOfWeek = this.props.navigation.getParam('dayOfWeek', null)
        const cathering = this.props.navigation.getParam('cathering', null)

        if (cathering != null) {
            this.dayOfWeek = Moment(cathering.selectedDate).day()
        }
        if (setDayOfWeek != null) {
            this.dayOfWeek = setDayOfWeek
        }

        this.apiCallHandler(this.props.navigation.state.params._id)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    apiCallHandler = async (placeId) => {
        await PlaceNetwork.fetchPlaceById(placeId).then(
            res => {
                this.setNewStateHandler({
                    place: res
                })
            },
            err => {
                this.showAlertMessage(err)
            }
        )
        PlaceNetwork.fetchMenuItems(placeId, this.dayOfWeek).then(
            res => {
                this.setNewStateHandler({
                    loading: false,
                    menuItems: res,
                    refreshing: false,
                    selectedCategory: 0,
                    sectionMeniItems: [],
                })
                this.setupSectionList()

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

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({ expanded: !this.state.expanded })
    }
    onPressShowPlaceOnMap = (place) => {
        UrlOpen.openUrlInBrowser(UrlOpen.generateUrlForGoogleMap(place.coordinate.latitude, place.coordinate.longitude))
    }
    badgeContent = () => {
        const { order } = this.props
        if (order.length > 0) {
            return <Badge
                // status="primary"
                value={order.length}
                textStyle={{ color: BASE_COLOR.white, fontSize: 11 }}
                badgeStyle={{ backgroundColor: BASE_COLOR.red, }}
                containerStyle={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: order.length > 99 ? 30 : undefined
                }}
            />
        } else {
            return <View />
        }
    }
    closeBtnContent = () => {
        return (
            <TouchableOpacity
                onPress={() => this.closeScreen()}>
                <View>
                    <Image
                        style={{
                            height: 25,
                            aspectRatio: 1
                        }}
                        resizeMode='contain'
                        source={IconAssets.backIcon} />

                </View>
            </TouchableOpacity>
        )
    }
    shopBtnContent = () => {
        return (
            <TouchableOpacity
                onPress={() => this.pushNewScreen(ScreenName.ShopScreen())}
                style={{}}>
                <View style={{ padding: 4 }}>
                    <Image
                        style={{
                            height: 25,
                            aspectRatio: 1
                        }}
                        resizeMode='contain'
                        source={TestAssets.shopBagIcon} />
                    {this.badgeContent()}
                </View>
            </TouchableOpacity>
        )
    }
    onPressItemCategoryList = (index) => {
        const { categoryList, selectedCategory } = this.state

        if (selectedCategory != index) {
            detectOnScrollChange = false
            setTimeout(() => {
                detectOnScrollChange = true
            }, 1000);
            this.setNewStateHandler({
                selectedCategory: index
            })
            this.refs.scrollView.scrollTo({
                x: 0,
                y: Number(categoryList[index].coordinate.startPosition),
                animated: false
            })
        }
    }
    categoryListContent = () => {
        //sectionMeniItems.push({ category, menuItems: [], hide: true })
        const { categoryList, selectedCategory } = this.state
        return (
            <View style={{
                backgroundColor: BASE_COLOR.lightGray,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
            }}>
                <FlatList
                    style={{
                        width: '100%',
                    }}
                    data={categoryList}
                    extraData={selectedCategory}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        const { category } = item
                        const isSelected = selectedCategory != null ? index == selectedCategory ? true : false : false
                        return (
                            <View style={{
                                marginHorizontal: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 8,
                            }}>
                                <TouchableOpacity
                                    onPress={() => this.onPressItemCategoryList(index)}>
                                    <View style={{
                                        height: '100%',
                                        borderRadius: 2,
                                        paddingHorizontal: 8,
                                        backgroundColor: isSelected ? BASE_COLOR.blue : BASE_COLOR.white,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                color: isSelected ? BASE_COLOR.white : BASE_COLOR.black,
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}
                                        >{category.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}

                />

            </View>
        )
    }
    handleScroll = (event) => {
        if (detectOnScrollChange) {
            const currentPosition = Number(event.nativeEvent.contentOffset.y).toFixed(4)

            const { categoryList } = this.state

            for (let index = 0; index < categoryList.length; index++) {
                const { coordinate } = categoryList[index];
                if (currentPosition >= coordinate.startPosition - 10 && currentPosition <= coordinate.endPosition - 10) {
                    this.setNewStateHandler({
                        selectedCategory: index
                    })
                    index = categoryList.length
                }
            }
        }
    }
    render() {
        const { place, menuItems, loading, refreshing } = this.state
        const { strings } = this.props
        const cathering = this.props.navigation.getParam('cathering', null)
        if (loading) {
            return (
                <View style={styles.mainContainer}>
                    {this.activityIndicatorContent(BASE_COLOR.blue)}
                </View>
            )
        }
        return (
            <View style={styles.mainContainer}>
                <View style={{
                    width: '100%',
                    paddingLeft: 16,
                    paddingRight: 16,
                    justifyContent: 'space-between',
                    position: 'absolute',
                    zIndex: 100,
                    flexDirection: 'row',
                    top: HEADER_PADDING_TOP,
                }}>
                    {this.closeBtnContent()}
                    {cathering != null && cathering.isFromCathering ? null :
                        this.shopBtnContent()
                    }
                </View>
                <HeaderImageScrollView
                    ref='scrollView'
                    onScroll={this.handleScroll}
                    maxHeight={180}
                    minHeight={HEADER_MIN_HEIGHT}
                    overlayColor='white'
                    maxOverlayOpacity={1}
                    minOverlayOpacity={0}
                    fadeOutForeground
                    renderHeader={() =>
                        <Image
                            source={{ uri: place.image.image169 }}
                            style={{
                                aspectRatio: 16 / 9,
                                width: '100%'
                            }} />
                    }
                    renderFixedForeground={() => (
                        <Animatable.View
                            style={styles.navTitleView}
                            ref={navTitleView => {
                                this.navTitleView = navTitleView;
                            }}
                        >
                            <Text style={styles.navTitle}>{place.name}</Text>
                            {this.categoryListContent()}
                        </Animatable.View>
                    )}

                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                            tintColor={BASE_COLOR.blue}
                            colors={[BASE_COLOR.blue]}
                        />}
                >
                    <TriggeringView
                        style={{ flexDirection: 'column', height: this.state.expanded ? 'auto' : 60, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', overflow: 'hidden' }}
                        onHide={() => this.navTitleView.fadeInUp(180)}
                        onDisplay={() => this.navTitleView.fadeOut(HEADER_MIN_HEIGHT)}
                    >
                        <View style={{ flexDirection: 'row', height: this.state.expanded ? 'auto' : 40 }}>
                            <View style={{ flex: 5.5, justifyContent: 'center' }}>
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

                            <View style={{ flex: 4.5, flexDirection: 'row', height: 40 }}>
                                <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{
                                            width: 23,
                                            height: 20,
                                        }}
                                        source={IconAssets.starIcon}
                                    />
                                    <Text style={{ color: '#646464', fontWeight: 'normal', fontSize: 12, marginLeft: 2 }}>{Number(place.avgRating).toFixed(1)}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => this.onPressFavoritePlaceHandler(place)}>
                                        <Image
                                            style={{
                                                width: 23,
                                                height: 23,
                                                tintColor: this.props.userFavoritePlacesIDs.includes(place._id) ? '#FF4233' : '#646464'
                                            }}
                                            source={
                                                this.props.userFavoritePlacesIDs.includes(place._id) ? IconAssets.heartFillIcon : IconAssets.heartIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => this.onPressShowPlaceOnMap(place)}>
                                        <Image
                                            style={{
                                                width: 23,
                                                height: 20,
                                                tintColor: '#646464'
                                            }}
                                            source={IconAssets.mapTabIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => this.onPressShowReviewHandler()}>
                                        <IconMaterial
                                            size={23}
                                            color={'#646464'}
                                            name={'comment-text-multiple'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{ height: 20, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 4 }} activeOpacity={0.5} onPress={this.changeLayout} >
                                <Text style={{ color: BASE_COLOR.gray }}>{this.state.expanded ? strings.seeLess : strings.seeMore}</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 3 }}></View>
                        </View>
                        <View style={{ height: this.state.expanded ? 'auto' : 0 }}>
                            <View style={{ flex: 2.5, overflow: 'hidden', height: 180 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 0.5 }}>
                                    <Text style={{ fontSize: 15, color: BASE_COLOR.darkGray }}>{avgPriceTag(place.avgPriceTag)}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                    <Image style={{ width: 24 }} resizeMode='contain' source={IconAssets.deliveryTimeIcon}></Image>
                                    <Text style={{ fontSize: 15, marginLeft: 8, color: BASE_COLOR.darkGray }}>{place.estimatedDeliveryTime ? place.estimatedDeliveryTime : 'any'} min.</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                    <Image style={{ width: 24 }} resizeMode='contain' source={IconAssets.minimumPriceIcon}></Image>
                                    <Text style={{ fontSize: 15, marginLeft: 8, color: BASE_COLOR.darkGray }}>{strings.minimum}: </Text>
                                    <Text style={{ fontSize: 15, color: BASE_COLOR.darkGray }}>180.00 RSD</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                    <Image style={{ width: 30 }} resizeMode='contain' source={IconAssets.cashIcon}></Image>
                                    {place.onlinePayment ? <Image style={{ width: 28, marginLeft: 8 }} resizeMode='contain' source={IconAssets.cardIcon}></Image> : null}
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                    <Text style={{ fontSize: 15, color: BASE_COLOR.darkGray }}>{strings.openToday}: </Text>
                                    <Text style={{ fontSize: 15, fontWeight: '600' }}>{place.openDays ? openDays(place.openDays) : "-"}</Text>
                                </View>
                            </View>
                            <View style={{ backgroundColor: BASE_COLOR.gray, height: 1, marginTop: 10, marginBottom: 10 }}></View>
                            <Text numberOfLines={0} ellipsizeMode='tail' style={{ marginBottom: 10 }}>{place.description}</Text>
                        </View>

                    </TriggeringView>
                    <View style={{ backgroundColor: '#E5E5E5', height: 3 }}></View>
                    <>
                        {this.menuItemsListFavoriteContent()}
                    </>
                    {this.sectionListContent(menuItems)}
                </HeaderImageScrollView>
            </View>
        )
    }


    onPressFavoritePlaceHandler = (place) => {
        // console.log("TRENUTNO STANJE PRE"+this.props.userFavoritePlaces)
        // console.log("TRENUTNO STANJE IDs PRE"+this.props.userFavoritePlacesIDs)
        this.props.userFavoritePlacesHandler(place)
    }


    onPressShowReviewHandler = () => {
        const { place } = this.state
        if (place._id != null) {
            this.pushNewScreen({
                routeName: ScreenName.ReviewListScreen(),
                params: {
                    place
                }
            })
        }

    }
    onPressSectionListHeader = (section) => {

        let { sectionMeniItems } = this.state

        for (let index = 0; index < sectionMeniItems.length; index++) {

            if (section == index) {
                sectionMeniItems[index].hide = !sectionMeniItems[index].hide
            } else {
                sectionMeniItems[index].hide = true
            }


        }


        this.setNewStateHandler({ sectionMeniItems })

    }
    setupSectionList = () => {
        const { menuItems, place, } = this.state
        let { categories } = place

        let sectionMeniItems = []
        let categoryList = []

        categories.forEach(category => {
            sectionMeniItems.push({ category, menuItems: [], hide: false, })
        });

        for (let i = 0; i < menuItems.length; i++) {

            menuItems[i].categories.forEach(category => {
                for (let j = 0; j < sectionMeniItems.length; j++) {

                    // if (j == 0) {
                    //     sectionMeniItems[j].hide = false
                    // }

                    if (category._id == sectionMeniItems[j].category._id) {
                        sectionMeniItems[j].menuItems.push(menuItems[i])
                    }

                }
            });
        }
        sectionMeniItems = sectionMeniItems.filter(item => {
            if (item.menuItems.length > 0) {
                categoryList.push({ category: item.category })
                return item
            }
        })


        this.setNewStateHandler({ sectionMeniItems, categoryList })
    }
    dishlistContent = (menuItems, hide) => {
        if (hide == false) {
            return (
                <DishList
                    data={menuItems}
                    clickOnDish={(menuItemId) => this.dishSelectHandler(menuItemId)} />
            )
        } else {
            const singleArray = [menuItems[0]]
            return (
                <DishList
                    data={singleArray}
                    clickOnDish={(menuItemId) => this.dishSelectHandler(menuItemId)} />
            )
        }

    }
    menuItemsListFavoriteContent = () => {

        const { menuItems } = this.state
        const { isLogin, userFavoriteMenuItems, strings } = this.props
        let menuItemsForPlaceAndDay = []

        userFavoriteMenuItems.map(favoriteItem => {
            menuItems.map(item => {
                if (favoriteItem._id === item._id) {
                    menuItemsForPlaceAndDay.push(favoriteItem)
                }
            })
        })

        if (menuItemsForPlaceAndDay.length > 0 && isLogin == true) {
            const title = String(this.props.strings.favoriteMeals).toUpperCase()
            return (
                <View style={{ marginTop: 16, marginBottom: 16 }}>
                    <MenuItemList
                        titleSection={`❤️ ${title}`}
                        arrayObject={menuItemsForPlaceAndDay}
                        onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.MenuItemDetailsScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id, cathering: this.props.navigation.state.params.cathering } })}
                        onPressSeeMore={() => console.log("see more")}
                    />
                </View>
            )
        }

    }
    sectionListContent = () => {

        let { sectionMeniItems } = this.state
        let returnSectionView = []
        sectionMeniItems.map((section, indexInArray) => {
            if (section.menuItems.length > 0) {
                const tintColor = section.hide ? BASE_COLOR.black : BASE_COLOR.blue
                returnSectionView.push(
                    <View key={indexInArray}
                        onLayout={(event) => {
                            let { x, y, width, height } = event.nativeEvent.layout;
                            const startPosition = Number(y).toFixed(4)
                            const endPosition = Number(y + height).toFixed(4)

                            let { categoryList } = this.state
                            if (categoryList.length > indexInArray) {
                                categoryList[indexInArray] = {
                                    coordinate: {
                                        startPosition, endPosition
                                    },
                                    category: section.category
                                }
                            } else {
                                categoryList.push({
                                    coordinate: {
                                        startPosition, endPosition
                                    },
                                    category: section.category
                                })
                            }
                            this.setNewStateHandler({ categoryList: [...categoryList] })
                        }}>
                        <TouchableOpacity
                            activeOpacity={1}>
                            {/* onPress={() => this.onPressSectionListHeader(indexInArray)}> */}
                            <View
                                style={{
                                    borderRadius: 8,
                                    borderColor: tintColor,
                                    // borderBottomWidth: 0.7,
                                    marginTop: 4,
                                    marginBottom: 4,
                                    marginLeft: 8,
                                    marginRight: 8,
                                    padding: 8,
                                    backgroundColor: BASE_COLOR.lightGray,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                    style={{ fontWeight: 'bold', fontSize: 16, color: tintColor }}>
                                    {section.category.name}</Text>

                                <Icon
                                    name={"ios-arrow-down"} //{!section.hide ? "md-arrow-dropdown-circle" : "md-arrow-dropright-circle"}
                                    size={25}
                                    color={tintColor} />
                            </View>
                        </TouchableOpacity>
                        {this.dishlistContent(section.menuItems, section.hide)}
                    </View>
                )
            }

        })
        return returnSectionView
    }
    dishSelectHandler(menuItemId) {
        this.pushNewScreen({ routeName: ScreenName.MenuItemDetailsScreen(), key: `${Math.random() * 10000}`, params: { _id: menuItemId, cathering: this.props.navigation.state.params.cathering } })
    }
    _onRefresh = () => {
        this.setNewStateHandler({ refreshing: true })
        this.apiCallHandler(this.props.navigation.state.params._id)
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    navTitleView: {
        height: HEADER_MIN_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: HEADER_PADDING_TOP,
        opacity: 0,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: '#000000',
        elevation: 4,
        backgroundColor: BASE_COLOR.white,
    },
    navTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        backgroundColor: 'transparent',
    },
});
const mapStateToProps = state => {
    return {
        order: state.order.order,
        isLogin: state.user.isLogin,
        userFavoritePlaces: state.user.userFavoritePlaces,
        userFavoritePlacesIDs: state.user.userFavoritePlacesIDs,
        userFavoriteMenuItems: state.user.userFavoriteMenuItems,
        strings: state.location.language.strings,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        userFavoritePlacesHandler: (place) => dispatch(userFavoritePlaces(place)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetailsScreen);
