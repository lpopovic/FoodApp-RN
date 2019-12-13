import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Image,
    ScrollView,
    SectionList,
    RefreshControl,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { ScreenName } from '../../helpers'
import Header from '../../components/common/UserHeader'
import BaseScreen from "../BaseScreen/BaseScreen"
import { HistoryOrderList } from '../../components/HistoryOrder'
import { NAV_COLOR, BASE_COLOR } from '../../styles';
import { connect } from 'react-redux';
import { updateUserProfile } from '../../store/actions'
import { UserNetwork, OrderNetwork } from '../../service/api'
import { TestAssets, } from '../../assets'


class UserScreen extends BaseScreen {
    static navigationOptions = {
        header: null,

    };
    constructor(props) {
        super(props)
        this.state = {
            allOrders: [],
            refreshing: false,
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)

        if (this.props.isLogin) {
            this.getAllOrders()
        }


    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }

    getAllOrders = () => {
        OrderNetwork.fetchGetAllOrders()
            .then(
                res => {
                    this.setNewStateHandler({
                        allOrders: res.reverse()
                    })
                },
                err => {
                    this.showAlertMessage(err)
                }
            )
    }

    apiCallHandler = () => {

        UserNetwork.fetchUserInfo()
            .then(
                result => {
                    this.props.updateUserProfileHandler(result)
                    this.setNewStateHandler({ refreshing: false });
                },
                err => {
                    this.showAlertMessage(err)
                    this.setNewStateHandler({ refreshing: false });
                }
            )

        this.getAllOrders()
    }

    _onRefresh = () => {
        this.setNewStateHandler({ refreshing: true });
        this.apiCallHandler()
    }
    pressReviewOrderHandler = (order) => {
        this.pushNewScreen(ScreenName.ReviewScreen())
    }

    userImageContent = () => {
        return (
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <View style={styles.userImage}>
                    <Image source={TestAssets.KFC_logo} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                </View>
            </View>
        )
    }
    infoContent = (type, text) => {
        return (
            <View style={styles.baseContainer}>
                <View style={{ flex: 4 }}>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{type}:</Text>
                </View>
                <View style={{ flex: 6 }}>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={6}
                        style={[styles.baseText, { color: BASE_COLOR.black, fontWeight: 'normal' }]}>{text}</Text>
                </View>
            </View>
        )
    }
    recentOrdersContent = () => {
        const type = "RECENT ORDERS"
        const { allOrders } = this.state
        return (
            <View style={[styles.baseContainer, { flexDirection: 'column' }]}>
                <View style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{type}:</Text>
                </View>
                <HistoryOrderList
                    arrayObject={allOrders}
                    PressDetailOrder={(order) => alert(order)}
                    PressOrderAgain={(order) => alert(order)}
                    PressReview={(order) => this.pressReviewOrderHandler(order)}
                />
            </View>
        )
    }
    mainContent = () => {
        const { refreshing } = this.state
        const {
            email,
            username,
            _id } = this.props.userInfo
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
                <View style={styles.scrollViewContainer}>
                    {this.userImageContent()}
                    {this.infoContent("USERNAME", username)}
                    {this.infoContent("EMAIL", email)}
                    {this.infoContent("USER ID", _id)}
                    {this.infoContent("ADRESS", "Petra Lekovica 30v, Kraljevo")}
                    {this.recentOrdersContent()}
                </View>
            </ScrollView>
        )
    }
    onPressLogInHandler = ()=>{
        this.pushNewScreen(ScreenName.LoginScreen())
    }
    loginContent = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        width: '80%',
                        color: BASE_COLOR.black,
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        margin: 0,
                    }}>KLOPAJ</Text>
                    <Text style={{
                        width: 300,
                        color: BASE_COLOR.black,
                        fontSize: 14,
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        margin: 16,
                    }}>Da bi ste koristili korisnikicki tab, molimo vas da se prijavite.</Text>
                </View>
                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.onPressLogInHandler()}>
                        <View style={{
                            alignContent: 'center',
                            justifyContent: 'center',
                            height: 40,
                            width: 200,
                            borderRadius: 8,
                            backgroundColor: BASE_COLOR.blue,
                        }}>
                            <Text style={{
                                width: '100%',
                                color: BASE_COLOR.white,
                                fontSize: 17,
                                fontWeight: 'bold',
                                textAlignVertical: 'center',
                                textAlign: 'center',
                            }}>PRIJAVITE SE</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
    render() {
        const { loading, isLogin } = this.props
        const mainDisplay = isLogin ? loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.mainContent() : this.loginContent()
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
            alert("FILTER DATA FUNC CALL")
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
    },
    scrollViewContainer: {
        flex: 1,
        padding: 16,
        paddingTop: 8,
    },
    baseContainer: {
        flex: 10,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: BASE_COLOR.gray,
        borderBottomWidth: 1,
        paddingBottom: 8,
        minHeight: 35,
    },
    baseText: {
        width: '100%',
        color: BASE_COLOR.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    userImage: {
        height: 150,
        aspectRatio: 1,
        borderColor: BASE_COLOR.blue,
        borderRadius: 75,
        borderWidth: 2,
        backgroundColor: BASE_COLOR.blue,
        overflow: 'hidden'
    },

});
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        loading: state.ui.isLoading,
        isLogin: state.user.isLogin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUserProfileHandler: (user) => dispatch(updateUserProfile(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
