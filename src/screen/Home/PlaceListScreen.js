import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    RefreshControl
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BackHeader'
import { NAV_COLOR, BASE_COLOR } from '../../styles'
import { ScreenName, MESSAGE_EMPTY_ARRAY } from '../../helpers'
import { PlaceList } from '../../components/Place/PlaceList'
import { PlaceNetwork, ParamsUrl } from '../../service/api'
import { connect } from 'react-redux';
class PlaceListScreen extends BaseScreen {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            loading: true,
            arrayPlaces: [],
            loadingMore: false
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
        const apiParams = this.props.navigation.getParam('apiParams', null)
        const {
            pickup,
            delivery,
            avgRating,
            avgPriceTag } = this.props.filter

        let params = []
        if (apiParams !== null) {
            params.push(apiParams)
        }
        // if(pickup == true) {
        //     params.push(ParamsUrl.pickup(pickup))
        // }
        // if(delivery == true) {
        //     params.push(ParamsUrl.delivery(delivery))
        // }
        params.push(ParamsUrl.avgPriceTag(avgPriceTag))
        params.push(ParamsUrl.avgRating(avgRating))


        PlaceNetwork.fetchPlaces(params).then(
            res => {
                if (res.length == 0) {
                    this.showAlertMessage(MESSAGE_EMPTY_ARRAY)
                }
                this.setNewStateHandler({
                    loading: false,
                    refreshing: false,
                    arrayPlaces: res,
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
    apiCallLoadMoreHandler = () => {
        // define api  func for more loading
        // const {loadingMore, arrayPlaces} = this.state
        // this.setNewStateHandler({
        //     loadingMore: false,
        //     arrayPlaces:  arrayPlaces.concat(res)
        // })

    }
    _onRefresh = () => {
        this.setNewStateHandler({ refreshing: true, loadingMore: false });
        this.apiCallHandler()
    }
    loadMoreComponents = () => {
        const { loadingMore, arrayPlaces } = this.state
        if (arrayPlaces.length > 0) {
            this.setNewStateHandler({
                loadingMore: true
            })

            this.apiCallLoadMoreHandler()
        }
    }
    mainContent = () => {
        const { refreshing, arrayPlaces, loadingMore } = this.state
        return (
            <PlaceList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._onRefresh}
                        tintColor={BASE_COLOR.blue}
                        colors={[BASE_COLOR.blue]}
                    />
                }
                arrayObject={arrayPlaces}
                onPressItem={(item) => this.pushNewScreen({
                    routeName: ScreenName.PlaceDetailScreen(),
                    key: `${Math.random() * 10000}${item._id}`
                    , params: {
                        _id: item._id
                    }
                })}
                loadMoreComponents={() => this.loadMoreComponents()}
                loadingMore={loadingMore}
            />
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
                        tintColor={BASE_COLOR.darkGray}
                        showFilter={this._filterData}
                    />
                    {mainDisplay}
                </View>
            </SafeAreaView>
        )
    }

    _filterData = () => {
        this.setNewStateHandler({ loading: true })
        setTimeout(() => {
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
    };
};

export default connect(mapStateToProps, null)(PlaceListScreen);
