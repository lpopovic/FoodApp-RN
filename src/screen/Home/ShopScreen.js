import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '../../components/common/BackHeader'
import { connect } from 'react-redux';
import { NAV_COLOR, BASE_COLOR } from '../../styles'
import { FlatList } from 'react-native-gesture-handler';
import ShopCard from '../../components/Home/ShopCard';
import { OrderNetwork } from '../../service/api';
import { removeOrderMenuItem, emptyOrder } from '../../store/actions'
import Icon from 'react-native-vector-icons/Ionicons';
import { ScreenName } from '../../helpers'
const PAY_BUTTON_KEY = {
    cacheSelected: "cache",
    onlineSelected: "on-line",

}
const DELIVERY_BUTTON_KEY = {
    pickup: 'pickup',
    delivery: 'delivery'

}
class ShoopScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            cacheSelected: true,
            onlineSelected: false,
            wayOfDelivery: DELIVERY_BUTTON_KEY.pickup,
            specialInstructions: '',
            userInfo: {
                name: '',
                adress: '',
                numberMob: '',
            }
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    textInputNoteContent = () => (
        <TextInput
            style={styles.textInputNoteStyle}
            value={this.state.specialInstructions}
            multiline={true}
            placeholder={'Napomena'}
            onChangeText={(text) => this.updateTextReview(text)}
            returnKeyType='done'
            ref={(input) => this.textReview = input}
            scrollEnabled={true}
        />
    )
    updateTextReview(text) {
        this.setNewStateHandler({
            specialInstructions: text
        });
    }

    subAllOrder = (order) => {
        var orderTotalPrice = 0

        order.map(
            orderItem => {
                orderTotalPrice += orderItem.menuItemTotalPrice
            }
        )
        return orderTotalPrice

    }
    emptyContent = () => {
        return (
            <View style={styles.mainContainer}>
                <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={200} name="logo-dropbox" color={BASE_COLOR.blue} />
                    <Text
                        style={{ alignItems: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: 24, }}>
                        Korpa je prazna.
                    </Text>
                </View>
            </View>
        )
    }
    mainContent = () => {

        const { userInfo } = this.state

        return (
            <View style={styles.mainContainer}>
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={{ flex: 1 }}
                    scrollEnabled={false}
                    bounces={false}
                    keyboardShouldPersistTaps='handled'
                    enableOnAndroid={true} >
                    <ScrollView>
                        <Text style={{ alignItems: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: 24, marginTop: 20, marginBottom: 20 }}>Korpa</Text>
                        <FlatList
                            style={{ marginBottom: 30 }}
                            scrollEnabled={false}
                            data={this.props.order}
                            keyExtractor={(index) => `${index.toString()}`}
                            renderItem={(info) => (
                                <ShopCard
                                    data={info.item}
                                    onPressRemove={() => this.onPressRemoveHandler(info.item)}
                                />
                            )}
                        />

                        <View style={{ height: 1, backgroundColor: BASE_COLOR.lightGray, margin: 10, marginTop: 0 }}></View>
                        <View style={{ margin: 30 }}>
                            <Text style={{ fontWeight: '400', fontSize: 18 }}>Način preuzimanja</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <TouchableOpacity onPress={() => this.wayOfDeliveryHandler(DELIVERY_BUTTON_KEY.pickup)}>
                                    <View style={this.buttonStyle(DELIVERY_BUTTON_KEY.pickup)}>
                                        <Text style={{ color: this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.pickup ? BASE_COLOR.blue : BASE_COLOR.darkGray, fontWeight: this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.pickup ? 'bold' : '400' }}>POKUPI</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.wayOfDeliveryHandler(DELIVERY_BUTTON_KEY.delivery)}>
                                    <View style={this.buttonStyle(DELIVERY_BUTTON_KEY.delivery)}>
                                        <Text style={{ color: this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.delivery ? BASE_COLOR.blue : BASE_COLOR.darkGray, fontWeight: this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.delivery ? 'bold' : '400' }}>DOSTAVA</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: BASE_COLOR.lightGray, margin: 10 }}></View>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styles.containerSubAllStyle}>
                                <Text style={styles.textSubAllStyle}>Ukupno</Text>
                                <Text style={styles.textSubAllStyle}>{this.props.order.length > 0 ? `${this.subAllOrder(this.props.order)}.00` : ""}</Text>
                            </View>
                            {
                                this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.delivery ?
                                    <View style={styles.containerSubAllStyle}>
                                        <Text style={styles.textSubAllStyle}>Dostava</Text>
                                        <Text style={styles.textSubAllStyle}>+{Number(this.props.orderForPlace.deliveryPrice).toFixed(2)}</Text>
                                    </View>
                                    :
                                    <View />
                            }
                            <View style={{ height: 3, backgroundColor: BASE_COLOR.blue, margin: 10, marginTop: 10 }}></View>
                            <View style={[styles.containerSubAllStyle, { marginTop: 5 }]}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 20, color: BASE_COLOR.blue }}>Sve ukupno</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginRight: 20, color: BASE_COLOR.blue }}>{this.subAllOrder(this.props.order) + this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.delivery ? this.props.orderForPlace.deliveryPrice : 0}.00</Text>
                            </View>

                        </View>


                        <View style={{ height: 1, backgroundColor: BASE_COLOR.lightGray, margin: 10 }}></View>
                        <View style={{ margin: 30 }}>
                            <Text style={{ fontWeight: '400', fontSize: 18 }}>Plaćanje</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <TouchableOpacity onPress={() => this.payButttonHandler(PAY_BUTTON_KEY.cacheSelected)}>
                                    <View style={this.buttonStyle(PAY_BUTTON_KEY.cacheSelected)}>
                                        <Text style={{ color: this.state.cacheSelected ? BASE_COLOR.blue : BASE_COLOR.darkGray, fontWeight: this.state.cacheSelected ? 'bold' : '400' }}>KEŠ</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.payButttonHandler(PAY_BUTTON_KEY.onlineSelected)}>
                                    <View style={this.buttonStyle(PAY_BUTTON_KEY.onlineSelected)}>
                                        <Text style={{ color: this.state.onlineSelected ? BASE_COLOR.blue : BASE_COLOR.darkGray, fontWeight: this.state.onlineSelected ? 'bold' : '400' }}>ON-LINE</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: BASE_COLOR.lightGray, margin: 10 }}></View>
                        {this.props.isLogin ?
                            <>
                                <View style={{ margin: 40 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ alignItems: 'flex-start', flex: 8, fontWeight: '400', fontSize: 18 }}>Lični podaci:</Text>
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <View style={{ marginTop: 0, marginBottom: 8 }}>
                                            <View style={{ padding: 8, borderRadius: 8, borderWidth: 1, borderColor: BASE_COLOR.blue }}>
                                                <TextInput
                                                    value={userInfo.name}
                                                    onChangeText={(text) => this.setNewStateHandler({
                                                        ...this.state,
                                                        userInfo: {
                                                            ...this.state.userInfo,
                                                            name: text,
                                                        }
                                                    })}
                                                    placeholder={'Ime i Prezime'}
                                                    returnKeyType='next'
                                                    onSubmitEditing={() => this.address.focus()}
                                                    style={[styles.textStyle,]} />
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 8, marginBottom: 8 }}>
                                            <View style={{ padding: 8, borderRadius: 8, borderWidth: 1, borderColor: BASE_COLOR.blue, }}>
                                                <TextInput
                                                    value={userInfo.adress}
                                                    onChangeText={(text) => this.setNewStateHandler({
                                                        ...this.state,
                                                        userInfo: {
                                                            ...this.state.userInfo,
                                                            adress: text,
                                                        }
                                                    })}
                                                    placeholder={'Adresa'}
                                                    returnKeyType='next'
                                                    ref={(input) => this.address = input}
                                                    onSubmitEditing={() => this.phone.focus()}
                                                    style={[styles.textStyle]} />
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 8, marginBottom: 8 }}>
                                            <View style={{ padding: 8, borderRadius: 8, borderWidth: 1, borderColor: BASE_COLOR.blue }}>
                                                <TextInput
                                                    value={userInfo.numberMob}
                                                    onChangeText={(text) => this.setNewStateHandler({
                                                        ...this.state,
                                                        userInfo: {
                                                            ...this.state.userInfo,
                                                            numberMob: text,
                                                        }
                                                    })}
                                                    placeholder={'Broj telefona'}
                                                    returnKeyType='next'
                                                    ref={(input) => this.phone = input}
                                                    onSubmitEditing={() => this.textReview.focus()}
                                                    style={[styles.textStyle]} />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.textInputNoteContainer}>
                                    {this.textInputNoteContent()}
                                </View>
                            </>
                            :
                            <View />
                        }
                        {this.props.isLogin ?
                            < View style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                                <TouchableOpacity onPress={() => this.onPressOrderHandler(this.props.order)}>
                                    <View style={{ backgroundColor: BASE_COLOR.blue, width: 280, height: 65, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                        <Text style={{ color: BASE_COLOR.white, fontWeight: 'bold', fontSize: 22 }}>Naruči</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            < View style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                                <TouchableOpacity onPress={() => this.onPressLogInHandler()}>
                                    <View style={{ backgroundColor: BASE_COLOR.blue, width: 280, height: 65, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                        <Text style={{ color: BASE_COLOR.white, fontWeight: 'bold', fontSize: 22 }}>Prijavi se</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{ height: 40 }} />
                    </ScrollView>
                </KeyboardAwareScrollView>
            </View >
        )
    }
    onPressLogInHandler = () => {
        this.pushNewScreen({
            routeName: ScreenName.LoginScreen(),
            key: `${Math.random() * 10000}`,
            params: { showBackButton: true }
        })
    }
    onPressRemoveHandler(orderdMenuItem) {
        this.props.removeOrderMenuItemHandler(orderdMenuItem)
    }

    onPressOrderHandler(order) {

        const { cacheSelected, wayOfDelivery, specialInstructions, userInfo } = this.state
        const { orderForPlace } = this.props
        const placeId = orderForPlace._id
        const orderType = wayOfDelivery
        const methodOfPayment = cacheSelected ? 'cash' : 'online'

        const { name, adress, numberMob } = userInfo
        if (name.trim() != '' && adress.trim() != '' && numberMob.trim() != '') {
            OrderNetwork.fetchOrder(order, placeId, orderType, methodOfPayment, specialInstructions, adress, numberMob)
                .then(
                    res => {
                        this.showAlertMessage("USPESNO NARUCENO")
                        this.setNewStateHandler({ loading: false })
                        this.closeScreen()
                        this.props.emptyOrderHandler()
                    },
                    err => {
                        this.setNewStateHandler({ loading: false })
                        this.showAlertMessage(String(err))
                    })
        } else {
            this.showAlertMessage("Molimo vas popunite polje sa vasim podacima. \nHvala.")
        }



    }

    buttonStyle = (type) => {
        if (type === PAY_BUTTON_KEY.cacheSelected) {
            return {
                borderWidth: this.state.cacheSelected ? 5 : 1,
                borderColor: this.state.cacheSelected ? BASE_COLOR.blue : BASE_COLOR.gray,
                width: (Dimensions.get('screen').width - 100) / 2,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
            }
        } else if (type === PAY_BUTTON_KEY.onlineSelected) {
            return {
                borderWidth: this.state.onlineSelected ? 5 : 1,
                borderColor: this.state.onlineSelected ? BASE_COLOR.blue : BASE_COLOR.gray,
                width: (Dimensions.get('screen').width - 100) / 2,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
            }
        } else if (type == DELIVERY_BUTTON_KEY.pickup) {
            return {
                borderWidth: type == this.state.wayOfDelivery ? 5 : 1,
                borderColor: type == this.state.wayOfDelivery ? BASE_COLOR.blue : BASE_COLOR.gray,
                width: (Dimensions.get('screen').width - 100) / 2,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
            }
        } else if (type == DELIVERY_BUTTON_KEY.delivery) {
            return {
                borderWidth: type == this.state.wayOfDelivery ? 5 : 1,
                borderColor: type == this.state.wayOfDelivery ? BASE_COLOR.blue : BASE_COLOR.gray,
                width: (Dimensions.get('screen').width - 100) / 2,
                height: 55,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
            }
        }
    }
    wayOfDeliveryHandler(type) {
        if (type != this.state.wayOfDelivery) {
            this.setNewStateHandler({
                wayOfDelivery: type
            })

        }
    }
    payButttonHandler(type) {
        if ((type === PAY_BUTTON_KEY.cacheSelected && this.state.cacheSelected) || (type === PAY_BUTTON_KEY.onlineSelected && this.state.onlineSelected)) {
            null
        } else {
            this.setState({ cacheSelected: !this.state.cacheSelected })
            this.setState({ onlineSelected: !this.state.onlineSelected })
        }
    }

    render() {
        const { loading } = this.state
        let mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.props.order.length > 0 ? this.mainContent() : this.emptyContent()
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    <Header
                        tintColor={BASE_COLOR.darkGray}
                        backgroundColor={NAV_COLOR.headerBackground} />
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
    },
    textStyle: {
        fontWeight: '400',
        fontSize: 18,
        color: BASE_COLOR.darkGray,
        // paddingTop: 5
    },
    buttonTextStyle: {
        color: BASE_COLOR.gray,
    },
    textInputNoteStyle: {
        fontSize: 15,
        padding: 4,
        margin: 16,
        marginTop: 8,
        textAlignVertical: "top"
    },
    textInputNoteContainer: {
        margin: 20,
        borderRadius: 1,
        borderWidth: 2,
        borderColor: BASE_COLOR.lightGray,
        height: 150,
    },
    containerSubAllStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    textSubAllStyle: {
        fontWeight: '500',
        fontSize: 15,
        marginLeft: 20,
        marginRight: 20,
        color: BASE_COLOR.darkGray,
    }
});

const mapStateToProps = state => {
    return {
        order: state.order.order,
        orderForPlace: state.order.orderForPlace,
        userInfo: state.user.userInfo,
        isLogin: state.user.isLogin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeOrderMenuItemHandler: (orderdMenuItem) => dispatch(removeOrderMenuItem(orderdMenuItem)),
        emptyOrderHandler: () => dispatch(emptyOrder())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoopScreen);