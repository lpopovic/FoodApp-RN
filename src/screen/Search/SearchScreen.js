import React from 'react';
import {
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
    Keyboard,
} from 'react-native';
import { ScreenName } from '../../helpers'
import { NAV_COLOR, BASE_COLOR, segmentedControlStyles } from '../../styles'
import BaseScreen from "../BaseScreen/BaseScreen"
import Header from '../../components/common/SearchHeader'
import SegmentedControlTab from "react-native-segmented-control-tab";
import SafeAreaView from 'react-native-safe-area-view';
import { PlaceList } from '../../components/Place/PlaceList'
import { PlaceNetwork, ParamsUrl } from '../../service/api'
import { TestAssets } from '../../assets'
import { connect } from 'react-redux';

class SearchScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        const { strings } = props
        this.typeOfSortRestMap = [strings.nearMe, strings.pickup, strings.delivery]
        this.state = {
            selectedIndex: 0,
            loading: false,
            searchPlaces: [],
            searchText: '',
            showNoResult: false,
            showError: false,
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    handleOnTabPress = index => {
        this.setNewStateHandler({
            ...this.state,
            selectedIndex: index
        });

        this.searchApiHandler({ index })

    };

    searchApiHandler = ({ text, index }) => {
        const { strings } = this.props
        const {
            pickup,
            delivery,
            avgRating,
            avgPriceTag } = this.props.filter
        const selectedIndex = index != null ? index : this.state.selectedIndex
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
            })
            search = ParamsUrl.search(text)
        } else {
            search = this.state.searchText !== '' ? ParamsUrl.search(this.state.searchText) : null
        }
        if (search !== null) {
            params.push(search)

            PlaceNetwork.fetchPlaces(params)
                .then(
                    res => {
                        this.setNewStateHandler({
                            loading: false,
                            searchPlaces: res,
                            showNoResult: res.length > 0 ? false : true,
                            showError: false,
                        })
                        if (res.length == 0) {
                            this.showAlertMessage(strings.thereIsNoNearbyPlaces)
                        }
                    },
                    err => {
                        this.showAlertMessage(err)
                        this.setNewStateHandler({
                            loading: false,
                            searchPlaces: [],
                            showError: true,
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
    placesContent = () => {
        const { searchPlaces } = this.state
        return (
            <PlaceList
                arrayObject={searchPlaces}
                onPressItem={(item) => this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}${item._id}`, params: { _id: item._id } })} />
        )
    }
    showNoResultContent = () => (
        <View style={styles.centarContainer}>
            <Image source={TestAssets.noResultFountImage} resizeMode='contain' style={{ height: 200, aspectRatio: 16 / 9 }} />
        </View>
    )
    showErrorContent = () => (
        <View style={styles.centarContainer}>
            <Image source={TestAssets.httpErrorImage} resizeMode='contain' style={{ height: 200, aspectRatio: 1.4, }} />
            <TouchableOpacity onPress={() => this.searchApiHandler({})}>
                <View style={{ height: 40, width: 200, backgroundColor: BASE_COLOR.blue, justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                    <Text style={{ color: BASE_COLOR.white, fontSize: 15, fontWeight: 'bold' }}>Pokusaj ponovo</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
    render() {

        const { loading, showNoResult, showError } = this.state

        let mainDisplay = null

        if (loading) {
            mainDisplay = this.activityIndicatorContent(BASE_COLOR.blue)
        } else if (showError) {
            mainDisplay = this.showErrorContent()
        } else if (showNoResult) {
            mainDisplay = this.showNoResultContent()
        } else {
            mainDisplay = this.placesContent()
        }

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
                        {mainDisplay}

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
    centarContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }

});


const mapStateToProps = state => {
    return {
        city: state.location.city,
        filter: state.filter.filter,
        strings: state.location.language.strings,
    };
};

export default connect(mapStateToProps, null)(SearchScreen);
