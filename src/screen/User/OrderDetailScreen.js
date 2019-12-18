import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BackHeader'
import ShopCard from '../../components/Home/ShopCard';
import Moment from 'moment'
import {
    BASE_COLOR,
    NAV_COLOR,
} from '../../styles'
import {  Order } from '../../model';

class OrderDetailScreen extends BaseScreen {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            order: null,
            menuItems: [],
            quantityItems: []

        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        setTimeout(() => {
            this.setNewStateHandler({ loading: false })
        }, 1000);
        const order = this.props.navigation.getParam('order', null)
        if (order !== null) {
            let menuItems = Order.createArrayOrderFoodMenuItems(order.orderedMenuItems)
            let quantityItems = []
            for (let i = 0; i < menuItems.length; i++) {

                let quantity = 1
                const element = menuItems[i]
                for (let j = i + 1; j < menuItems.length; j++) {
                    if (element._id === menuItems[j]._id) {
                        quantity = quantity + 1
                        delete menuItems[j]

                    }

                }

                menuItems = menuItems.filter(function (el) {
                    return el != null;
                });
                quantityItems.push(quantity)


            }

            this.setNewStateHandler({
                order,
                menuItems,
                quantityItems
            })
        }

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    infoOrderContent = (order) => {
        const { totalAmount, additionalPrice, orderedTime, status, place, orderType } = order

        var date = new Date(orderedTime);
        const dateText = Moment(date).format("DD/MM/YYYY")
        const orderTypeText = orderType == 'delivery' ? 'Dostava' : 'Preuzeti'
        const priceText = Number(totalAmount + additionalPrice).toFixed(2)//'750.00'

        return (
            <View style={{ borderColor: BASE_COLOR.blue, borderWidth: 1, padding: 8 }}>

                <View style={{ marginBottom: 8, }}>
                    <Text style={[styles.baseText, { fontSize: 20, fontWeight: 'bold', color: BASE_COLOR.black }]}>Porudžbina iz restorana:</Text>
                    <Text style={[styles.baseText, { fontSize: 20, color: BASE_COLOR.black }]}>{place.name}</Text>
                </View>

                <View style={{ marginBottom: 8, flexDirection: 'row' }}>
                    <Text style={[styles.baseText, styles.podSectionText]}>Datum porudzbine:</Text>
                    <Text style={[styles.baseText]}>{dateText}</Text>
                </View>

                <View style={{ marginBottom: 8, flexDirection: 'row' }}>
                    <Text style={[styles.baseText, styles.podSectionText]}>Tip porudžbine:</Text>
                    <Text style={[styles.baseText]}>{orderTypeText}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.baseText, styles.podSectionText]}>Ukupna cena:</Text>
                    <Text style={[styles.baseText]}>{priceText}</Text>
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
                    keyExtractor={(index) => `${index.toString()}`}
                    renderItem={(info) => (
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
                                        source={{ uri: info.item.image.image169 }} />
                                </View>
                                <View style={{ flex: 7.8, flexDirection: 'column' }}>
                                    <View style={{ flex: 7.8, flexDirection: 'row' }}>
                                        <View style={{ flex: 6, marginLeft: 15, justifyContent: 'center' }}>
                                            <Text
                                                style={{ fontWeight: '600', fontSize: 19, marginBottom: 8 }}
                                                numberOfLines={2}
                                                ellipsizeMode={'tail'}>
                                                {info.item.name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                            <Text style={{ color: BASE_COLOR.darkGray }}>Qty: {this.state.quantityItems[info.index]}</Text>
                                        </View>
                                        <View style={{ marginRight: 15 }}>
                                            <Text style={{ color: BASE_COLOR.blue, fontWeight: '600', fontSize: 18, textAlignVertical: 'center' }}>{Number(info.item.nominalPrice).toFixed(2)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-start', margin: 12, marginBottom: 0, }}>
                                <Text
                                    numberOfLines={6}
                                    ellipsizeMode={'tail'}>
                                    menu options prikazati niz stringova
                                    </Text>

                            </View>
                        </View>

                    )}
                />
                {this.infoOrderContent(order)}
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


export default OrderDetailScreen;