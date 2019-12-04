import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, TextInput } from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import SafeAreaView from 'react-native-safe-area-view';
import Header from '../../components/common/BackHeader'
import { connect } from 'react-redux';
import { NAV_COLOR, BASE_COLOR } from '../../styles'
import { FlatList } from 'react-native-gesture-handler';
import ShopCard from '../../components/Home/ShopCard';
import { OrderNetwork } from '../../service/api';
import { removeOrderMenuItem } from '../../store/actions'
const PAY_BUTTON_KEY = {
    cacheSelected: "cache",
    onlineSelected: "on-line",
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
            textReview: null,
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
            value={this.state.textReview}
            multiline={true}
            placeholder={'Napomena'}
            onChangeText={(text) => this.updateTextReview(text)}
            returnKeyType='done'
            // onSubmitEditing={(event) => [this._setStateForBottomBtnContent(true), Keyboard.dismiss(), this.setNewStateHandler({ enabledKeyboradAvoiding: false })]}
            scrollEnabled={true}
        // onFocus={() => { this._setStateForBottomBtnContent(false), this.setNewStateHandler({ enabledKeyboradAvoiding: true }) }}
        // onBlur={() => { this._setStateForBottomBtnContent(true), Keyboard.dismiss(), this.setNewStateHandler({ enabledKeyboradAvoiding: false }) }}
        />
    )
    updateTextReview(text) {
        this.setNewStateHandler({
            textReview: text
        });
    }

    subAllOrder = (order) => {
        // var totalPrice = 0

        // const selectedCheckbox = order.map(
        //     orderItem => {
        //         totalPrice += orderItem.menuItem.nominalPrice * orderItem.quantity
        //         totalPrice += orderItem.selectedRadioButton.amount
        //         return orderItem.selectedCheckbox
        //     }
        // )
        // selectedCheckbox[0].map(
        //     option => totalPrice += option.amount
        // )

        // return totalPrice

        var orderTotalPrice = 0

        order.map(
            orderItem => {
                orderTotalPrice += orderItem.menuItemTotalPrice
            }
        )
        return orderTotalPrice

    }

    mainContent = () => {
        
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <Text style={{ alignItems: 'center', textAlign: 'center', fontWeight: 'bold', fontSize: 24, marginTop: 20, marginBottom: 20 }}>Korpa</Text>
                    <FlatList
                        style={{ marginBottom: 30 }}
                        scrollEnabled={false}
                        data={this.props.order}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => <ShopCard data={item} onPressRemove={()=> this.onPressRemoveHandler(item)}/>}
                    />
                    <View style={{ height: 1, backgroundColor: BASE_COLOR.lightGray, margin: 10, marginTop: 0 }}></View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.containerSubAllStyle}>
                            <Text style={styles.textSubAllStyle}>Ukupno</Text>
                            <Text style={styles.textSubAllStyle}>{this.props.order.length > 0 ? `${this.subAllOrder(this.props.order)}.00` : ""}</Text>
                        </View>
                        <View style={styles.containerSubAllStyle}>
                            <Text style={styles.textSubAllStyle}>Dostava</Text>
                            <Text style={styles.textSubAllStyle}>+80.00</Text>
                        </View>
                        <View style={{ height: 3, backgroundColor: BASE_COLOR.blue, margin: 10, marginTop: 10 }}></View>
                        <View style={[styles.containerSubAllStyle, { marginTop: 5 }]}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 20, color: BASE_COLOR.blue }}>Sve ukupno</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginRight: 20, color: BASE_COLOR.blue }}>{this.subAllOrder(this.props.order) + 80}.00</Text>
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
                    <View style={{ margin: 40 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ alignItems: 'flex-start', flex: 8, fontWeight: '400', fontSize: 18 }}>Lični podaci</Text>
                            <TouchableOpacity style={{ flex: 2, alignItems: 'flex-end' }}>
                                <View style={{ borderBottomWidth: 0.9, borderBottomColor: BASE_COLOR.blue, marginBottom: 3, alignSelf: 'center' }}>
                                    <Text style={{ textAlign: 'center', color: BASE_COLOR.blue, fontSize: 14 }}>Izmeni</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.textStyle}>Ime Prezime</Text>
                            <Text style={styles.textStyle}>Adresa br.</Text>
                            <Text style={styles.textStyle}>telefon 123456789</Text>
                        </View>
                    </View>

                    <View style={styles.textInputNoteContainer}>
                        {this.textInputNoteContent()}
                    </View>


                    <View style={{ alignItems: 'center', justifyContent: 'center', margin: 20 }}>
                        <TouchableOpacity onPress={() => this.onPressOrderHandler(this.props.order)}>
                            <View style={{ backgroundColor: BASE_COLOR.blue, width: 280, height: 65, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                <Text style={{ color: BASE_COLOR.white, fontWeight: 'bold', fontSize: 22 }}>Naruči</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }

    onPressRemoveHandler(orderdMenuItem) {
        this.props.removeOrderMenuItemHandler(orderdMenuItem)
    }

    onPressOrderHandler(order) {
        
        OrderNetwork.fetchOrder(order)
        .then(
            res => {
                alert("uspeo")
                this.showAlertMessage(String(res))
                this.setNewStateHandler({ loading: false })
                this.closeScreen()
            },
            err => {
                // alert("error")
                this.setNewStateHandler({ loading: false })
                this.showAlertMessage(String(err))
            })
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
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.mainContent()
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
        paddingTop: 5
    },
    buttonTextStyle: {
        color: BASE_COLOR.gray,
    },
    textInputNoteStyle: {
        fontSize: 15,
        padding: 4,
        margin: 16,
        marginTop: 8
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
        order: state.order.order
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeOrderMenuItemHandler: (orderdMenuItem) => dispatch(removeOrderMenuItem(orderdMenuItem)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoopScreen);