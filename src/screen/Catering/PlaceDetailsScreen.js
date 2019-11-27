import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform, LayoutAnimation, UIManager } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Animatable from 'react-native-animatable';
import BaseScreen from '../BaseScreen/BaseScreen';
import { ScreenName } from '../../helpers'
import DishCard from '../../components/Catering/DishCard';
import DishList from '../../components/Catering/DishList';
import {
    IconAssets,
    TestAssets,
} from '../../assets';
import { BASE_COLOR } from '../../styles';
import { PlaceNetwork } from '../../service/api'
import { Place } from '../../model';
import { avgPriceTag, openDays } from '../../helpers/numberHelper';

class PlaceDetailsScreen extends BaseScreen {


    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            statusBarHeight: 0,
            expanded: false,
            loading: false,
            menuItems: [],
            place: new Place({})
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {
        super.componentDidMount()
        // this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        this.apiCallHandler(this.props.navigation.state.params._id)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    apiCallHandler = (placeId) => {
        PlaceNetwork.fetchPlaceById(placeId).then(
            res => {
                this.setNewStateHandler({
                    loading: false,
                    place: res
                })
                // if(this.state.place.openDays.some(item => item.day === Moment().day())){
                //     alert("PONEDELJAK")
                // }
                // console.log(res)
                // console.log(this.state.place.image.image169)
            },
            err => {
                this.showAlertMessage(err)
                this.setNewStateHandler({
                    loading: false,
                })
            }
        )
        PlaceNetwork.fetchMenuItems(placeId).then(
            res => {
                this.setNewStateHandler({
                    loading: false,
                    menuItems: res
                })
                // console.log(this.props.navigation.state.params._id)
                // console.log(res)
            },
            err => {
                this.showAlertMessage(err)
                this.setNewStateHandler({
                    loading: false,
                })
            }
        )
    }

    changeLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        const { place, menuItems } = this.state
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity
                    onPress={() => this.closeScreen()}
                    style={{ position: 'absolute', zIndex: 100, top: Platform.OS == "ios" ? getStatusBarHeight() + 5 : 25, left: 10 }}>
                    <View>
                        <Image
                            style={{}}
                            source={IconAssets.backIcon}>
                        </Image>
                    </View>
                </TouchableOpacity>
                <HeaderImageScrollView
                    maxHeight={180}
                    minHeight={(40 + getStatusBarHeight())}
                    overlayColor='white'
                    maxOverlayOpacity={1}
                    minOverlayOpacity={0}
                    fadeOutForeground
                    // headerContainerStyle={{color: 'red'}}
                    // headerContainerStyle={{ width: '100%', height: Dimensions.get('screen').width * 16/9}}
                    // headerImage={require("./images/star-full.png")}
                    renderHeader={() => <Image source={{ uri: place.image.image169 }} style={{ height: Dimensions.get('screen').width * 9 / 16, width: Dimensions.get('window').width }} />}

                    // renderForeground={() => (
                    //     <View style={{ height: 150, justifyContent: "center", alignItems: "center" }} >
                    //         <TouchableOpacity onPress={() => console.log("tap!!")}>
                    //             <Text style={{ backgroundColor: "transparent" }}>Tap Me!</Text>
                    //         </TouchableOpacity>
                    //     </View>
                    // )}
                    renderFixedForeground={() => (
                        <Animatable.View
                            style={styles.navTitleView}
                            ref={navTitleView => {
                                this.navTitleView = navTitleView;
                            }}
                        >
                            <Text style={styles.navTitle}>{place.name}</Text>
                        </Animatable.View>
                    )}
                >
                    {/* <View style={{ height: 1000 }}> */}
                    <TriggeringView
                        style={{ flexDirection: 'column', height: this.state.expanded ? 300 : 60, paddingLeft: 15, paddingRight: 15, justifyContent: 'center', overflow: 'hidden' }}
                        onHide={() => this.navTitleView.fadeInUp(180)}
                        onDisplay={() => this.navTitleView.fadeOut((40 + getStatusBarHeight()))}
                    >
                        <View style={{ flexDirection: 'row', height: 40 }}>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ flex: 7, fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>{place.name}</Text>
                            <View style={{ flex: 4.5, flexDirection: 'row' }}>
                                <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{
                                            width: 17,
                                            height: 16,
                                        }}
                                        source={IconAssets.starIcon}
                                    />
                                    <Text style={{ color: '#646464', fontWeight: '400', fontSize: 11, marginLeft: 2 }}>{place.avgRating}</Text>
                                </View>
                                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity>
                                        <Image
                                            style={{
                                                width: 23,
                                                height: 20,
                                                tintColor: '#646464'
                                            }}
                                            source={IconAssets.heartIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity>
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
                            </View>
                        </View>

                        <View style={{ height: 20, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 4 }} activeOpacity={0.5} onPress={this.changeLayout} >
                                <Text style={{ color: BASE_COLOR.gray }}>{this.state.expanded ? "Show less" : "Show more"}</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 3 }}></View>
                        </View>
                        <View style={{ height: this.state.expanded ? 240 : 0 }}>
                            <View style={{ flex: 2.5, overflow: 'hidden' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 0.5 }}>
                                    <Text style={{ fontSize: 15, color: BASE_COLOR.darkGray }}>{avgPriceTag(place.avgPriceTag)}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                    <Image style={{ width: 24 }} resizeMode='contain' source={IconAssets.deliveryTimeIcon}></Image>
                                    <Text style={{ fontSize: 15, marginLeft: 8, color: BASE_COLOR.darkGray }}>45 min</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                    <Image style={{ width: 24 }} resizeMode='contain' source={IconAssets.minimumPriceIcon}></Image>
                                    <Text style={{ fontSize: 15, marginLeft: 8, color: BASE_COLOR.darkGray }}>Minimum: </Text>
                                    <Text style={{ fontSize: 15, color: BASE_COLOR.darkGray }}>180.00 RSD</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                    <Image style={{ width: 30 }} resizeMode='contain' source={IconAssets.cashIcon}></Image>
                                    {place.onlinePayment ? <Image style={{ width: 28, marginLeft: 8 }} resizeMode='contain' source={IconAssets.cardIcon}></Image> : null}
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.5 }}>
                                    <Text style={{ fontSize: 15, color: BASE_COLOR.darkGray }}>Open today: </Text>
                                    <Text style={{ fontSize: 15, fontWeight: '600' }}>{place.openDays? openDays(place.openDays): "-"}</Text>
                                </View>
                            </View>
                            <View style={{ backgroundColor: BASE_COLOR.gray, height: 1, marginTop: 10, marginBottom: 10 }}></View>
                            <Text numberOfLines={4} ellipsizeMode='tail' style={{ marginBottom: 10 }}>{place.description}</Text>
                        </View>

                    </TriggeringView>
                    <View style={{ backgroundColor: '#E5E5E5', height: 3 }}></View>
                    <DishList data={menuItems} clickOnDish={(menuItemId)=> this.dishSelectHandler(menuItemId)}/>
                    <Image source={{ uri: place.image169 }} />

                    {/* </View> */}
                </HeaderImageScrollView>
            </View>
        )
    }

    dishSelectHandler(menuItemId) {
        this.pushNewScreen({ routeName: ScreenName.MenuItemDetailsScreen(), key: `${Math.random() * 10000}`, params: { _id: menuItemId } })
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    navTitleView: {
        height: 40 + getStatusBarHeight(),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS == "ios" ? getStatusBarHeight() : 16,
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
        backgroundColor: 'white',
    },
    navTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        backgroundColor: 'transparent',
    },
});


export default PlaceDetailsScreen;