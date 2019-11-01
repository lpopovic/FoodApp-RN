import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Animatable from 'react-native-animatable';
import BaseScreen from '../BaseScreen/BaseScreen';
import DishCard from '../../components/Catering/DishCard';
import DishList from '../../components/Catering/DishList';
import {
    IconAssets,
    TestAssets,
} from '../../assets';

class PlaceDetailsScreen extends BaseScreen {


    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.setState = {
            statusBarHeight: 0,
        }
    }

    render() {

        const data = [
            {
                _id: "5da869da91408d5e6002577f",
                description: "Bruskete (bruschette) su italijansko predjelo, idealni za lagani obrok ili užinu, a na žurkama će biti omiljeni sendiviči. Ovi ukusni zalogajčići su hranjivi i ne previše kalorični, a nekoliko brusketa će zasititi u potpunosti i okorele gurmane i „mesojede“.",
                name: "Brusketi",
                link: "https://api.ketering.rtech.rs/uploads/bf7966d5-c162-e61b-d79c-3d35ac11339c-169.png?caption=Brusketi",
            },
            {
                _id: "5da9a5d74157831bf8c616ef",
                description: "Salata, pomfrit, hleb, juneće meso",
                name: "Ćevapi",
                link: "https://api.ketering.rtech.rs/uploads/6bfe163b-8e8f-ed77-bcdf-f8a5106e9d20-169.png?caption=Cevapi",
            },
            {
                _id: "5da9a6024157831bf8c616f0",
                description: "Juneće meso, salata, hleb, pomfrit",
                name: "Pljeskavica",
                link: "https://api.ketering.rtech.rs/uploads/b462bad1-d85d-e381-c624-811a833bd12c-169.png?caption=Pljeskavica",
            },
        ];

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
                    renderHeader={() => <Image source={TestAssets.KFC_logo} style={{ height: Dimensions.get('screen').width * 9 / 16, width: Dimensions.get('window').width }} />}

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
                            <Text style={styles.navTitle}>KFC</Text>
                        </Animatable.View>
                    )}
                >
                    {/* <View style={{ height: 1000 }}> */}
                    <TriggeringView
                        style={{ flexDirection: 'row', height: 60, paddingLeft: 15, paddingRight: 15 }}
                        onHide={() => this.navTitleView.fadeInUp(180)}
                        onDisplay={() => this.navTitleView.fadeOut((40 + getStatusBarHeight()))}
                    >
                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ flex: 7, fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}>KFC</Text>
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                            <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 17,
                                        height: 16,
                                    }}
                                    source={IconAssets.starIcon}
                                />
                                <Text style={{ color: '#646464', fontWeight: '400', fontSize: 11, marginLeft: 2 }}>8.9</Text>
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
                        </View>
                    </TriggeringView>
                    <View style={{ backgroundColor: '#E5E5E5', height: 3 }}></View>
                    <DishList data={data}/>

                    {/* </View> */}
                </HeaderImageScrollView>
            </View>
        )
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