import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BackHeader'
import ShopCard from '../../components/Home/ShopCard';
import Moment from 'moment'
import {
    BASE_COLOR,
    NAV_COLOR,
} from '../../styles'
import { subTotalPrice } from '../../helpers'
import { Order, MenuItem } from '../../model';

class OrderDetailScreen extends BaseScreen {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            order: null,
            menuItems: [],
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)

        const order = this.props.navigation.getParam('order', null)
        if (order !== null) {
            const { orderedMenuItems } = order
            let orderAgainMenuItems = []

            orderedMenuItems.map(item => {
                let menuItem = new MenuItem(item.food)

                var found = -1;
                for (var i = 0; i < orderAgainMenuItems.length; i++) {
                    if (orderAgainMenuItems[i]._id == menuItem._id) {
                        found = i;
                        break;
                    }
                }
                if (found > -1) {
                    orderAgainMenuItems[found].quantity += 1
                    orderAgainMenuItems[found].menuItemTotalPrice = subTotalPrice(menuItem, orderAgainMenuItems[found].selectedOptions, orderAgainMenuItems[found].quantity)
                } else {
                    const selectedOptions = [{
                        groupId: "undefined",
                        text: this.props.strings.supplements,
                        type: "undefined",
                        options: item.options
                    }]
                    const quantity = 1
                    const orderdMenuItem = {
                        _id: menuItem._id,
                        quantity,
                        menuItem,
                        menuItemTotalPrice: subTotalPrice(menuItem, selectedOptions, quantity),
                        selectedOptions: selectedOptions,
                    }
                    orderAgainMenuItems.push(orderdMenuItem)
                }

            })

            this.setNewStateHandler({
                order,
                menuItems: orderAgainMenuItems,
            })
        }

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    infoOrderContent = (order) => {
        const { strings } = this.props
        const { totalAmount, additionalPrice, orderedTime, status, place, orderType } = order

        var date = new Date(orderedTime);
        const dateText = Moment(date).format("DD/MM/YYYY")
        const orderTypeText = orderType == 'delivery' ? strings.delivery : strings.pickup
        const priceText = Number(totalAmount + additionalPrice).toFixed(2)//'750.00'

        return (
            <View style={{ borderColor: BASE_COLOR.blue, borderWidth: 1, padding: 8 }}>

                <View style={{ marginBottom: 8, }}>
                    <Text style={[styles.baseText, { fontSize: 20, fontWeight: 'bold', color: BASE_COLOR.black }]}>{strings.restaurantOrders}</Text>
                    <Text style={[styles.baseText, { fontSize: 20, color: BASE_COLOR.black }]}>{place.name}</Text>
                </View>

                <View style={{ marginBottom: 8, flexDirection: 'row' }}>
                    <Text style={[styles.baseText, styles.podSectionText]}>{strings.orderDate}</Text>
                    <Text style={[styles.baseText]}>{dateText}</Text>
                </View>

                <View style={{ marginBottom: 8, flexDirection: 'row' }}>
                    <Text style={[styles.baseText, styles.podSectionText]}>{strings.orderType}</Text>
                    <Text style={[styles.baseText]}>{orderTypeText}</Text>
                </View>

                <View style={{ marginBottom: 8, flexDirection: 'row' }}>
                    <Text style={[styles.baseText, styles.podSectionText]}>{strings.totalPrice}</Text>
                    <Text style={[styles.baseText]}>{priceText}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.baseText, styles.podSectionText]}>{strings.status}:</Text>
                    <Text style={[styles.baseText,]}>{status}</Text>
                </View>
            </View>
        )
    }
    renderMenuItemsOptions = (selectedOptions) => {

        let text = ''
        selectedOptions[0].options.map(item => {
            text = text + item.text + ', '
        })
        if (text.length > 0) {
            text = text.substring(0, text.length - 2);
        } else {
            text = '-'
        }
        return String(`${this.props.strings.supplements}: ${text}`)
    }
    orderedItem = (item) => {
        const {
            _id,
            quantity,
            menuItem,
            menuItemTotalPrice,
            selectedOptions,
        } = item
        return (
            <View style={{
                flex: 1,
                backgroundColor: BASE_COLOR.lightGray,
                margin: 10,
                minHeight: 110,
                flexDirection: 'column',
            }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 3, justifyContent: 'center', marginTop: 12 }}>
                        <Image
                            style={{ aspectRatio: 1 / 1, height: 86, marginLeft: 12, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
                            source={{ uri: menuItem.image.image169 }} />
                    </View>
                    <View style={{ flex: 7.8, flexDirection: 'column' }}>
                        <View style={{ flex: 7.8, flexDirection: 'row' }}>
                            <View style={{ flex: 6, marginLeft: 15, justifyContent: 'center' }}>
                                <Text
                                    style={{ fontWeight: '600', fontSize: 19, marginBottom: 8 }}
                                    numberOfLines={2}
                                    ellipsizeMode={'tail'}>
                                    {menuItem.name}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={{ color: BASE_COLOR.darkGray }}>Qty: {quantity}</Text>
                            </View>
                            <View style={{ marginRight: 15 }}>
                                <Text style={{ color: BASE_COLOR.blue, fontWeight: '600', fontSize: 18, textAlignVertical: 'center' }}>{Number(menuItemTotalPrice).toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={{ flex: 1, justifyContent: 'flex-start', margin: 12, marginBottom: 0, }}>
                    <Text
                        numberOfLines={6}
                        ellipsizeMode={'tail'}>
                        {this.renderMenuItemsOptions(selectedOptions)}
                    </Text>

                </View> 
            </View>

        )
    }
    mainContent = () => {
        const { order, menuItems } = this.state
        return (
            <View style={[styles.mainContainer, { margin: 16 }]}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(item, index) => `${index.toString()}`}
                    renderItem={(info) => (
                        <>
                            {this.orderedItem(info.item)}
                        </>
                    )}
                />
                {order !== null ? this.infoOrderContent(order) : <View />}
            </View>
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
                    />
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
    baseText: {
        color: BASE_COLOR.darkGray,
        fontSize: 14,
        fontWeight: 'normal',
    },
    podSectionText: {
        color: BASE_COLOR.darkGray,
        minWidth: 120,
        marginRight: 8
    }

});

const mapStateToProps = state => {
    return {
        strings: state.location.language.strings,
    };
};

export default connect(mapStateToProps, null)(OrderDetailScreen);
