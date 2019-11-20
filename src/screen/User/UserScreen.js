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
import { NAV_COLOR, BASE_COLOR } from '../../styles';
import { connect } from 'react-redux';
import { updateUserProfile } from '../../store/actions'
import { UserNetwork } from '../../service/api'
import { TestAssets, IconAssets } from '../../assets'


class UserScreen extends BaseScreen {
    static navigationOptions = {
        header: null,

    };
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)

    }
    componentWillUnmount() {
        super.componentWillUnmount()
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
    }

    _onRefresh = () => {
        this.setNewStateHandler({ refreshing: true });
        this.apiCallHandler()
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
                <View style={{ flex: 3 }}>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{type}:</Text>
                </View>
                <View style={{ marginRight: 8, flex: 7 }}>
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
        return (
            <View style={[styles.baseContainer, { flexDirection: 'column' }]}>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{type}:</Text>
                </View>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black, fontWeight: 'normal' }]}>ORDER FLAT LIST</Text>
                </View>
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

    render() {
        const { loading } = this.props
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.mainContent()
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
        loading: state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUserProfileHandler: (user) => dispatch(updateUserProfile(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
