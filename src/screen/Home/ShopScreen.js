import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    UIManager,
    LayoutAnimation
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import BaseScreen from '../BaseScreen/BaseScreen';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '../../components/common/BackHeader'
import { connect } from 'react-redux';
import { NAV_COLOR, BASE_COLOR } from '../../styles'
import { FlatList } from 'react-native-gesture-handler';
import ShopCard from '../../components/Home/ShopCard';
import { OrderNetwork, UserNetwork } from '../../service/api';
import { removeOrderMenuItem, emptyOrder, updateUserProfile } from '../../store/actions'
import Icon from 'react-native-vector-icons/Ionicons';
import { ScreenName, isNumber, keyAdress } from '../../helpers'

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
            wayOfDelivery: props.orderForPlace !== null ? props.orderForPlace.pickup == true ? DELIVERY_BUTTON_KEY.pickup : DELIVERY_BUTTON_KEY.delivery : DELIVERY_BUTTON_KEY.delivery,
            specialInstructions: '',
            userInfo: {
                name: '',
                address: '',
                numberMobile: {
                    value: '',
                    valid: false
                }
            },
            showAddressInfo: false,
            // date: Moment().toDate(),
            scheduledTime: Moment().toDate(),
            scheduledViewOpen: false,
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)

        if (this.props.isLogin == true) {
            const { phoneNumber, username } = this.props.userInfo
            this.setNewStateHandler({
                ...this.state,
                userInfo: {
                    ...this.state.userInfo,
                    name: username,
                    numberMobile: {
                        valid: isNumber(phoneNumber),
                        value: phoneNumber
                    }
                }

            })
        }
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    textInputNoteContent = () => (
        <TextInput
            style={styles.textInputNoteStyle}
            value={this.state.specialInstructions}
            multiline={true}
            placeholder={this.props.strings.note}
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

    showAddresses = (bool) => {
        this.setState({ showAddressInfo: bool })
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }


    renderAllAdresses = () => {
        let filteredArrayUserAdreess = this.props.userInfo.address.filter(
            (data) => {
                if (data.includes(keyAdress(this.props.city._id))) {
                    return data
                }

            }
        );
        let filteredAddresses = filteredArrayUserAdreess.filter(
            (data) => {
                if (this.state.userInfo.address) {
                    return data.toLowerCase().indexOf(this.state.userInfo.address.toLowerCase()) !== -1
                } else {
                    return filteredArrayUserAdreess
                }
            }
        );
        return filteredAddresses.map((text, i) => (
            <TouchableOpacity onPressIn={() => {
                this.setNewStateHandler({
                    ...this.state,
                    userInfo: {
                        ...this.state.userInfo,
                        address: text.replace(keyAdress(this.props.city._id), ''),
                    },
                    showAddressInfo: false
                })
            }} style={{ borderWidth: 0.5, width: '100%', padding: 8, borderColor: BASE_COLOR.blue }} key={i}>
                <Text style={{ fontSize: 14 }}>{text.replace(keyAdress(this.props.city._id), '')}</Text>
            </TouchableOpacity>
        ))
    }

    emptyContent = () => {
        return (
            <View style={styles.mainContainer}>
                <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={200} name="logo-dropbox" color={BASE_COLOR.blue} />
                    <Text
                        style={{ alignItems: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: 24, }}>
                        {this.props.strings.theBasketIsEmpty}
                    </Text>
                </View>
            </View>
        )
    }
    mainContent = () => {
        const { userInfo } = this.state
        const { strings } = this.props
        return (
            <View style={styles.mainContainer}>
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={{ flex: 1 }}
                    scrollEnabled={false}
                    bounces={false}
                    keyboardShouldPersistTaps='handled'
                    enableOnAndroid={true} >
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <Text style={{ alignItems: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: 24, marginTop: 20, marginBottom: 20 }}>{strings.basket}</Text>
                        <FlatList
                            style={{ marginBottom: 30 }}
                            scrollEnabled={false}
                            data={this.props.order}
                            keyExtractor={(item, index) => `${index.toString()}`}
                            renderItem={(info) => (
                                <ShopCard
                                    data={info.item}
                                    onPressRemove={() => this.onPressRemoveHandler(info.item)}
                                />
                            )}
                        />

                        <View style={{ height: 1, backgroundColor: BASE_COLOR.lightGray, margin: 10, marginTop: 0 }}></View>
                        <View style={{ margin: 30 }}>
                            <Text style={{ fontWeight: '400', fontSize: 18 }}>{strings.takeOver}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <TouchableOpacity onPress={() => this.wayOfDeliveryHandler(DELIVERY_BUTTON_KEY.pickup)}>
                                    <View style={this.buttonStyle(DELIVERY_BUTTON_KEY.pickup)}>
                                        <Text style={{ color: this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.pickup ? BASE_COLOR.blue : BASE_COLOR.darkGray, fontWeight: this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.pickup ? 'bold' : '400' }}>{String(strings.pickup).toUpperCase()}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.wayOfDeliveryHandler(DELIVERY_BUTTON_KEY.delivery)}>
                                    <View style={this.buttonStyle(DELIVERY_BUTTON_KEY.delivery)}>
                                        <Text style={{ color: this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.delivery ? BASE_COLOR.blue : BASE_COLOR.darkGray, fontWeight: this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.delivery ? 'bold' : '400' }}>{String(strings.delivery).toUpperCase()}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: BASE_COLOR.lightGray, margin: 10 }}></View>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styles.containerSubAllStyle}>
                                <Text style={styles.textSubAllStyle}>{strings.orderAmount}:</Text>
                                <Text style={styles.textSubAllStyle}>{this.props.order.length > 0 ? `${this.subAllOrder(this.props.order)}.00` : ""}</Text>
                            </View>
                            {
                                this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.delivery ?
                                    <View style={styles.containerSubAllStyle}>
                                        <Text style={styles.textSubAllStyle}>{strings.delivery}:</Text>
                                        <Text style={styles.textSubAllStyle}>+{Number(this.props.orderForPlace.deliveryPrice).toFixed(2)}</Text>
                                    </View>
                                    :
                                    <View />
                            }
                            <View style={{ height: 3, backgroundColor: BASE_COLOR.blue, margin: 10, marginTop: 10 }}></View>
                            <View style={[styles.containerSubAllStyle, { marginTop: 5 }]}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 20, color: BASE_COLOR.blue }}>{strings.totalPrice}</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginRight: 20, color: BASE_COLOR.blue }}>{this.subAllOrder(this.props.order) + (this.state.wayOfDelivery == DELIVERY_BUTTON_KEY.delivery ? this.props.orderForPlace.deliveryPrice : 0)}.00</Text>
                            </View>

                        </View>


                        <View style={{ height: 1, backgroundColor: BASE_COLOR.lightGray, margin: 10 }}></View>
                        <View style={{ margin: 30 }}>
                            <Text style={{ fontWeight: '400', fontSize: 18 }}>{strings.payment}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <TouchableOpacity onPress={() => this.payButttonHandler(PAY_BUTTON_KEY.cacheSelected)}>
                                    <View style={this.buttonStyle(PAY_BUTTON_KEY.cacheSelected)}>
                                        <Text style={{ color: this.state.cacheSelected ? BASE_COLOR.blue : BASE_COLOR.darkGray, fontWeight: this.state.cacheSelected ? 'bold' : '400' }}>{String(strings.cash).toUpperCase()}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.payButttonHandler(PAY_BUTTON_KEY.onlineSelected)}>
                                    <View style={this.buttonStyle(PAY_BUTTON_KEY.onlineSelected)}>
                                        <Text style={{ color: this.state.onlineSelected ? BASE_COLOR.blue : BASE_COLOR.darkGray, fontWeight: this.state.onlineSelected ? 'bold' : '400' }}>{String(strings.onLine).toUpperCase()}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: BASE_COLOR.lightGray, margin: 10 }}></View>
                        {this.props.isLogin ?
                            <>
                                <View style={{ margin: 40 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ alignItems: 'flex-start', flex: 8, fontWeight: '400', fontSize: 18 }}>{strings.personalData}</Text>
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
                                                    placeholder={strings.nameAndSurname}
                                                    returnKeyType='next'
                                                    onSubmitEditing={() => this.address.focus()}
                                                    style={[styles.textStyle,]} />
                                            </View>
                                        </View>
                                        <View style={{ marginTop: 8, marginBottom: 8 }}>
                                            <View style={{ padding: 8, borderRadius: 8, borderWidth: 1, borderColor: BASE_COLOR.blue }}>
                                                <TextInput
                                                    value={userInfo.address}
                                                    onChangeText={(text) => this.setNewStateHandler({
                                                        ...this.state,
                                                        userInfo: {
                                                            ...this.state.userInfo,
                                                            address: text,
                                                        },
                                                        showAddressInfo: true
                                                    })}
                                                    placeholder={strings.address}
                                                    returnKeyType='next'
                                                    onFocus={() => this.showAddresses(true)}
                                                    onBlur={() => this.showAddresses(false)}
                                                    ref={(input) => this.address = input}
                                                    onSubmitEditing={() => this.phone.focus()}
                                                    style={[styles.textStyle]} />
                                            </View>
                                            {this.state.showAddressInfo &&
                                                <View style={{ height: 'auto', width: '100%' }}>
                                                    {this.renderAllAdresses()}
                                                </View>
                                            }
                                        </View>
                                        <View style={{ marginTop: 8, marginBottom: 8 }}>
                                            <View style={{ padding: 8, borderRadius: 8, borderWidth: 1, borderColor: BASE_COLOR.blue }}>
                                                <TextInput
                                                    value={userInfo.numberMobile.value}
                                                    onChangeText={(text) => this.setNewStateHandler({
                                                        ...this.state,
                                                        userInfo: {
                                                            ...this.state.userInfo,
                                                            numberMobile: {
                                                                valid: isNumber(text),
                                                                value: text,
                                                            },
                                                        }
                                                    })}
                                                    placeholder={strings.phonePlaceholder}
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

                                <View style={{ alignSelf: 'center', height: this.state.scheduledViewOpen ? 230 : 20, overflow: 'hidden', marginTop: 10, marginBottom: 10 }}>
                                    <Text style={{ fontWeight: '500', fontSize: 17 }} onPress={() => this.schedulingOnPress()} >{strings.scheduleOrdeForSpecificTime}</Text>
                                    <DatePicker
                                        // mode={'time'}
                                        // locale='sr-Latn'
                                        date={this.state.scheduledTime}
                                        minuteInterval={5}
                                        minimumDate={Moment().add(this.estimateDeliveryTime(this.props.orderForPlace.estimatedDeliveryTime), 'm').toDate()}
                                        maximumDate={Moment().add(15, 'd').toDate()}
                                        onDateChange={scheduledTime => this.setState({ scheduledTime })}
                                    />
                                </View>

                            </>
                            :
                            <View />
                        }
                        {this.props.isLogin ?
                            < View style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                                <TouchableOpacity onPress={() => this.onPressOrderHandler(this.props.order)}>
                                    <View style={{ backgroundColor: BASE_COLOR.blue, width: 280, height: 65, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                        <Text style={{ color: BASE_COLOR.white, fontWeight: 'bold', fontSize: 22 }}>{strings.placeYourOrder}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                                <TouchableOpacity onPress={() => this.onPressLogInHandler()}>
                                    <View style={{ backgroundColor: BASE_COLOR.blue, width: 280, height: 65, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                        <Text style={{ color: BASE_COLOR.white, fontWeight: 'bold', fontSize: 22 }}>{strings.signUp}</Text>
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

    // roundDate = (date, type, offset) => {   
    //     let val = date[type]()  
    //     let roundedVal = Math.ceil((val+1)/offset)*offset  
    //     return date[type](roundedVal)  
    //  }
    estimateDeliveryTime = (estimatedDeliveryTime) => {
        console.log(estimatedDeliveryTime)
        switch (estimatedDeliveryTime) {
            case "any":
                return 60
            case 45:
                return 45
            case 60:
                return 60
            default:
                return 0
                break;
        }
    }
    schedulingOnPress() {
        this.setNewStateHandler({
            scheduledViewOpen: !this.state.scheduledViewOpen
        })
        console.log(this.state.scheduledViewOpen)
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
    showDialogForAddAdress = (address) => {
        const newAddress = `${address}${keyAdress(this.props.city._id)}`
        if (!this.props.userInfo.address.includes(newAddress)) {
            onPressOk = () => {
                UserNetwork.fetchUserPutNewAddress(newAddress)
                let user = this.props.userInfo
                user.address.push(newAddress)
                this.props.updateUserProfileHandler(user)
            }

            this.showDialogMessage(this.props.strings.doYouWantToSaveTheNewAddress, onPressOk)
        }
    }
    onPressOrderHandler(order) {
        const { cacheSelected, wayOfDelivery, specialInstructions, userInfo, scheduledTime, scheduledViewOpen } = this.state
        const { orderForPlace } = this.props
        const placeId = orderForPlace._id
        const orderType = wayOfDelivery
        const scheduledTimeForOrder = scheduledViewOpen ? scheduledTime : null
        const methodOfPayment = cacheSelected ? 'cash' : 'online'
        const { name, address, numberMobile } = userInfo

        if (name.trim() != '' && address.trim() != '' && numberMobile.valid == true) {

            this.setNewStateHandler({
                loading: true
            })
            OrderNetwork.fetchOrder(order, placeId, orderType, methodOfPayment, specialInstructions, address, numberMobile.value, scheduledTimeForOrder)
                .then(
                    res => {
                        this.showAlertMessage(this.props.strings.successfullyOrdered)
                        this.setNewStateHandler({ loading: false })
                        this.closeScreen()
                        this.props.emptyOrderHandler()
                        this.showDialogForAddAdress(address)
                    },
                    err => {
                        this.setNewStateHandler({ loading: false })
                        this.showAlertMessage(String(err))
                    })
        } else if (!numberMobile.valid) {
            this.showAlertMessage(this.props.strings.pleaseFillInTheContactPhoneField)
        } else {
            this.showAlertMessage(this.props.strings.pleaseFillInTheFieldWithYourDetails)
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
        const { orderForPlace, strings } = this.props
        if (type != this.state.wayOfDelivery) {
            if (orderForPlace.delivery == true && orderForPlace.pickup == true) {
                this.setNewStateHandler({
                    wayOfDelivery: type
                })
            } else {
                this.showAlertMessage(strings.serviceIsCurrentlyUnavailable)
            }
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
        city: state.location.city,
        strings: state.location.language.strings,
        order: state.order.order,
        orderForPlace: state.order.orderForPlace,
        userInfo: state.user.userInfo,
        isLogin: state.user.isLogin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeOrderMenuItemHandler: (orderdMenuItem) => dispatch(removeOrderMenuItem(orderdMenuItem)),
        emptyOrderHandler: () => dispatch(emptyOrder()),
        updateUserProfileHandler: (user) => dispatch(updateUserProfile(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoopScreen);