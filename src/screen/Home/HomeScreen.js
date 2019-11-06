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

class HomeScreen extends BaseScreen {
    static navigationOptions = {
        header: null,

    };
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            refreshing: false,
            carosel: [
                {
                    image: "https://images.startups.co.uk/wp-content/uploads/2018/12/20162418/business-ideas-2019-plant-based-foods.jpg"
                },
                {
                    image: "http://www.colleges-fenway.org/wp-content/uploads/2018/09/food-festival-1.jpg"
                },
                {
                    image: "https://homepages.cae.wisc.edu/~ece533/images/cat.png"
                },
                {
                    image: "https://images.startups.co.uk/wp-content/uploads/2018/12/20162418/business-ideas-2019-plant-based-foods.jpg"
                },

            ]
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        this.setNewStateHandler({ loading: true })

        setTimeout(() => {
            this.setNewStateHandler({ loading: false })
        }, 1000);
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    placeListNewContent = () => (
        <PlaceSectionList
            titleSection="NOVO"
            arrayObject={["", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar"]}
            onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}` })}
            onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "NOVO" } })}
        />
    )
    placeListMostRatingContent = () => (
        <PlaceSectionList
            titleSection="NAJBOLJE OCENE"
            arrayObject={["", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar"]}
            onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}` })}
            onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "NAJBOLJE OCENE" } })}
        />
    )
    placeListRecommendedContent = () => (
        <PlaceSectionList
            titleSection="PREPORUČENO"
            arrayObject={["", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar"]}
            onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}` })}
            onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "PREPORUČENO" } })}
        />
    )
    placeListActionContent = () => (
        <PlaceSectionList
            titleSection={"AKCIJE"}
            arrayObject={["", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar"]}
            onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}` })}
            onPressSeeMore={() => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "AKCIJE" } })}
        />
    )
    categoryListContent = () => (
        <CategorySectionList
            arrayObject={["", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar", "", "asda", "lazar"]}
            onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceListScreen(), key: `${Math.random() * 10000}`, params: { title: "KATEGORIJA REST." } })}
            onPressSeeMore={() => this.pushNewScreen(ScreenName.CategoryScreen())}
        />
    )
    caroselContent = () => (
        <HomeCaroselComponent
            data={this.state.carosel}
            onPressItem={(index) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}` })}

        />
    )
    _onRefresh = () => {
        this.setNewStateHandler({ refreshing: true });
        clearTimeout(this.refreshTimeout)
        this.refreshTimeout = setTimeout(() => {
            this.setNewStateHandler({ refreshing: false });
        }, 1000);
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
