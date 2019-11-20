import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    ScrollView,
    RefreshControl,
    Text,
    StyleSheet
} from 'react-native';
import { ScreenName } from '../../helpers'
import Header from '../../components/common/BaseHeader'
import BaseScreen from "../BaseScreen/BaseScreen"
import { NAV_COLOR, BASE_COLOR } from '../../styles';
import { connect } from 'react-redux';
import { updateUserProfile } from '../../store/actions'
import { UserNetwork } from '../../service/api'
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
                <View style={{ flex: 1 }}>
                    <Text>{email}</Text>
                    <Text>{username}</Text>
                    <Text>{_id}</Text>
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
    }
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
