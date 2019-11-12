import React from 'react';
import {
    View,
    ScrollView,
    RefreshControl,
    StyleSheet
} from 'react-native';
import { ScreenName } from '../../helpers'
import BaseScreen from "../BaseScreen/BaseScreen"
import Header from '../../components/common/BaseHeader'
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { NAV_COLOR, BASE_COLOR } from '../../styles';
import { CategorySectionList } from '../../components/Category/CategoryList'
import { PlaceSectionList } from '../../components/Place/PlaceList'
import HomeCaroselComponent from '../../components/Home/HomeCaroselComponent';
import { PlaceNetwork } from '../../service/api'

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


        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        this.apiCallHandler()
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }

    apiCallHandler = () => {
        PlaceNetwork.fetchTest().then(
            res => {
                this.setNewStateHandler({
                    loading: false,
                    refreshing: false,
                    caroselPlaces: res,
                    newPlaces: res,
                    actionPlaces: res,
                    mostRatingPlaces: res,
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
    }

    placeListNewContent = () => {
        const { newPlaces } = this.state
        return (
            <PlaceSectionList
                titleSection="NOVO"
                arrayObject={newPlaces}
                onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}` })}
                onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "NOVO" } })}
            />
        )
    }
    placeListMostRatingContent = () => {
        const { mostRatingPlaces } = this.state
        return (
            <PlaceSectionList
                titleSection="NAJBOLJE OCENE"
                arrayObject={mostRatingPlaces}
                onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}` })}
                onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "NAJBOLJE OCENE" } })}
            />
        )
    }
    placeListRecommendedContent = () => {
        const { recommendedPlaces } = this.state
        return (
            <PlaceSectionList
                titleSection="PREPORUČENO"
                arrayObject={recommendedPlaces}
                onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}` })}
                onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "PREPORUČENO" } })}
            />
        )
    }
    placeListActionContent = () => {
        const { actionPlaces } = this.state
        return (
            <PlaceSectionList
                titleSection={"AKCIJE"}
                arrayObject={actionPlaces}
                onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}` })}
                onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "AKCIJE" } })}
            />
        )
    }
    placeListDeliveryContent = () => {
        const { actionPlaces } = this.state
        return (
            <PlaceSectionList
                titleSection={"DOSTAVA"}
                arrayObject={actionPlaces}
                onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}` })}
                onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "AKCIJE" } })}
            />
        )
    }
    categoryListContent = () => {
        return (
            <CategorySectionList
                arrayObject={["", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar"]}
                onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "KATEGORIJA REST." } })}
                onPressSeeMore={() => this.pushNewScreen(ScreenName.CategoryScreen())}
            />
        )
    }

    caroselContent = () => {
        const { caroselPlaces } = this.state
        return (
            <HomeCaroselComponent
                data={caroselPlaces}
                onPressItem={(index) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${caroselPlaces[index]._id}` })}

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
                    <Header backgroundColor={NAV_COLOR.headerBackground} />
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
        flex: 1,
        backgroundColor: BASE_COLOR.white
    }
});

export default connect(null, null)(HomeScreen);
