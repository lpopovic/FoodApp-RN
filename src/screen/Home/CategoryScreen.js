import React, { Component } from 'react';
import {
    View,
    RefreshControl,
    StyleSheet
} from 'react-native';
import { CategoryList } from '../../components/Category/CategoryList'
import SafeAreaView from 'react-native-safe-area-view';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BackHeader'
import { NAV_COLOR, BASE_COLOR } from '../../styles'
import { ScreenName } from '../../helpers'
import { CategoryNetwork, ParamsUrl } from '../../service/api'
class CategoryScreen extends BaseScreen {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            loading: true,
            categories: [],
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
        CategoryNetwork.fetchCategories().then(
            res => {
                this.setNewStateHandler({
                    loading: false,
                    refreshing: false,
                    categories: res,
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

    _onRefresh = () => {
        this.setNewStateHandler({ refreshing: true });
        this.apiCallHandler()
    }
    mainContent = () => {
        const { refreshing, categories } = this.state
        return (
            <CategoryList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this._onRefresh}
                        tintColor={BASE_COLOR.blue}
                        colors={[BASE_COLOR.blue]}
                    />
                }
                arrayObject={categories}
                onPressItem={(item) => this.pushNewScreen({
                    routeName: ScreenName.PlaceListScreen(),
                    key: `${Math.random() * 10000}`,
                    params: { title: item.name.toUpperCase(), apiParams: ParamsUrl.category(item._id) }
                })} />
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
                        tintColor={BASE_COLOR.darkGray} />
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


export default CategoryScreen;