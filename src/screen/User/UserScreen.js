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
import { ScreenName, keyAdress } from '../../helpers'
import Header from '../../components/common/UserHeader'
import SegmentedControlTab from "react-native-segmented-control-tab";
import BaseScreen from "../BaseScreen/BaseScreen"
import { HistoryOrderList } from '../../components/HistoryOrder'
import {
    NAV_COLOR,
    BASE_COLOR,
    segmentedControlStyles
} from '../../styles';
import { connect } from 'react-redux';
import { updateUserProfile, fetchUserListOrders, fetchUserProfile } from '../../store/actions'
import { UserNetwork, OrderNetwork } from '../../service/api'
import { TestAssets, } from '../../assets'


class UserScreen extends BaseScreen {
    static navigationOptions = {
        header: null,

    };
    constructor(props) {
        super(props)
        this.typeOfSortOrder = ["Porudžbine", "Ketering"]
        this.state = {
            refreshing: false,
            selectedIndex: 0,
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
            selectedIndex: index,
        });
    };

    companyRequestApiCheck = () => {
        UserNetwork.fetchUserGetCompanyReguests()
            .then(
                res => {
                    onPressOkStatus = () => {
                        UserNetwork.fetchUserPutCompanyReguestsResponse(res._id, "true").then(
                            res => {
                                this.props.fetchUserProfileHandler()
                            },
                            err => {

                            }
                        )
                    }
                    onPressCancelStatus = () => {
                        UserNetwork.fetchUserPutCompanyReguestsResponse(res._id, "false")
                    }
                    this.showDialogMessage(res.text, onPressOkStatus, onPressCancelStatus)
                },
                err => {

                }
            )
    }
    apiCallHandler = () => {

        UserNetwork.fetchUserInfo()
            .then(
                result => {
                    this.props.updateUserProfileHandler(result)
                    this.setNewStateHandler({ refreshing: false });
                    if (this.props.isLogin == true && result.company === null) {
                        this.companyRequestApiCheck()
                    }


                },
                err => {
                    this.showAlertMessage(err)
                    this.setNewStateHandler({ refreshing: false });
                }
            )

        this.props.fetchUserListOrdersHandler()

    }

    _onRefresh = () => {
        this.setNewStateHandler({ refreshing: true });
        this.apiCallHandler()
    }
    pressReviewOrderHandler = (order) => {

        this.pushNewScreen({ routeName: ScreenName.ReviewScreen(), key: `${Math.random() * 10000}`, params: { order } })
    }
    pressOrderDetailHandler = (order) => {

        this.pushNewScreen({ routeName: ScreenName.OrderDetailScreen(), key: `${Math.random() * 10000}`, params: { order } })
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
        const type = "Recent"
        const { selectedIndex } = this.state
        const { userOrders, userCatherings, userInfo } = this.props
        if (userInfo.catheringIsAvailable == true) {
            return (
                <View style={[styles.baseContainer, { flexDirection: 'column' }]}>
                    <View style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
                        <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{type}:</Text>
                    </View>
                    <View style={styles.segmentedControlContainer}>
                        <SegmentedControlTab
                            values={this.typeOfSortOrder}
                            selectedIndex={userInfo.catheringIsAvailable == true ? this.state.selectedIndex : 0}
                            onTabPress={this.handleOnTabPress}
                            borderRadius={8}
                            tabsContainerStyle={segmentedControlStyles.container}
                            tabStyle={segmentedControlStyles.commonStyle}
                            activeTabStyle={{ ...segmentedControlStyles.commonStyle, ...segmentedControlStyles.activeStyle }}
                            tabTextStyle={segmentedControlStyles.text}
                            activeTabTextStyle={segmentedControlStyles.text}
                        />
                    </View>

                    <HistoryOrderList
                        arrayObject={selectedIndex == 0 ? userOrders : userCatherings}
                        isCatheringOrder={selectedIndex == 0 ? false : true}
                        PressDetailOrder={(order) => this.pressOrderDetailHandler(order)}
                        PressOrderAgain={(order) => alert(order)}
                        PressReview={(order) => this.pressReviewOrderHandler(order)}
                    />
                </View>
            )
        } else {
            return (
                <View style={[styles.baseContainer, { flexDirection: 'column' }]}>
                    <View style={{ alignSelf: 'flex-start', marginBottom: 8 }}>
                        <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{type}:</Text>
                    </View>
                    <HistoryOrderList
                        arrayObject={userOrders}
                        isCatheringOrder={false}
                        PressDetailOrder={(order) => this.pressOrderDetailHandler(order)}
                        PressOrderAgain={(order) => alert(order)}
                        PressReview={(order) => this.pressReviewOrderHandler(order)}
                    />
                </View>
            )
        }

    }
    mainContent = () => {
        const { refreshing } = this.state
        const {
            email,
            username,
            _id,
            address,
            phoneNumber,
            name,
            lastName
        } = this.props.userInfo
        let lastUseAddress = address.filter(
            (data) => {
                if (data.includes(keyAdress(this.props.city._id))) {
                    return data
                }

            }
        ).slice(-1)[0]
        lastUseAddress = lastUseAddress ? lastUseAddress.replace(keyAdress(this.props.city._id), '') : "Nedostupna"
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
                    {this.infoContent("Username", username)}
                    {this.infoContent("First name", name)}
                    {this.infoContent("Last name", lastName)}
                    {this.infoContent("Email", email)}
                    {this.infoContent("Phone number", phoneNumber.trim() != '' ? phoneNumber : "Nedostupna")}
                    {this.infoContent("Adress", lastUseAddress)}
                    {this.recentOrdersContent()}
                </View>
            </ScrollView>
        )
    }
    onPressLogInHandler = () => {
        this.pushNewScreen({
            routeName: ScreenName.LoginScreen(),
            key: `${Math.random() * 10000}`,
            params: { showBackButton: true }
        })
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
        // alignItems: 'center',
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
    segmentedControlContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 8,
        //  backgroundColor: NAV_COLOR.headerBackground,
        // borderBottomColor: NAV_COLOR.borderBottomColor,
        // borderBottomWidth: 0.7
    },

});
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        loading: state.ui.isLoading,
        isLogin: state.user.isLogin,
        userOrders: state.user.userOrders,
        userCatherings: state.user.userCatherings,
        city: state.location.city,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserListOrdersHandler: () => dispatch(fetchUserListOrders()),
        updateUserProfileHandler: (user) => dispatch(updateUserProfile(user)),
        fetchUserProfileHandler: () => dispatch(fetchUserProfile()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
