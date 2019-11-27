import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import BaseScreen from '../BaseScreen/BaseScreen';
import { IconAssets, TestAssets } from '../../assets';
import { PlaceNetwork } from '../../service/api'
import { MenuItem } from '../../model';
import { connect } from 'react-redux';
import { ScreenName } from '../../helpers'
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_COLOR } from '../../styles';
import { addOrderMenuItem } from '../../store/actions'
import UrlOpen from '../../components/common/UrlOpen'
var noneRadioOption = {
    "amount": 0,
    "_id": "Bez osnovnih dodataka",
    "text": "Bez osnovnih dodataka",
}

class MenuItemDetailsScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            quantity: 1,
            menuItem: new MenuItem({}),
            selectedRadioButton: noneRadioOption,
            selectedCheckbox: [],
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.apiCallHandler(this.props.navigation.state.params._id)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    apiCallHandler = (menuItemId) => {
        PlaceNetwork.fetchMenuItemById(menuItemId).then(
            res => {

                this.setNewStateHandler({
                    loading: false,
                    menuItem: res
                })
                // console.log(res)
            },
            err => {
                this.showAlertMessage(err)
                this.setNewStateHandler({
                    loading: false,
                })
            }
        )
    }

    _renderTitle = (index, title) => {
        if (index === 0) {
            return (
                <View>
                    <Text style={{ fontWeight: '500', fontSize: 20, color: BASE_COLOR.darkGray, marginLeft: 20, marginBottom: 10, marginTop: 40 }}>{title}</Text>
                    <View style={{ backgroundColor: BASE_COLOR.gray, height: 1 }}></View>
                </View>
            )
        } else {
            return null
        }
    }

    _renderMenuItemOptions = (menuItemOptions) => {
        var allOptions = [];
        if (menuItemOptions.length == 0 || menuItemOptions === undefined) {
            return <Text style={{ marginTop: 40, marginLeft: 20 }}>Nema dodataka!</Text>
        } else {
            // const checkMenuItems = menuItemOptions.filter(option => { return option.buttonOptionsType === "check" })
            // const radioMenuItems = menuItemOptions.filter(option => { return option.buttonOptionsType === "radio" })
          
            menuItemOptions.map((item) => {
                if (item.buttonOptionsType === "check"){
                    {

                        item.options.map((option, indexInArray) => {

                            allOptions.push(
                                <View key={`${Math.random() * 10000} ${option._id}`} >
                                    {this._renderTitle(indexInArray, item.text)}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 25 }}>
                                        <CheckBox
                                            key={`${Math.random() * 10000} ${option._id}`}
                                            textStyle={{ fontWeight: '400', fontSize: 18, color: BASE_COLOR.darkGray, backgroundColor: 'transparent' }}
                                            containerStyle={{ flex: 7, backgroundColor: 'transparent', borderColor: 'transparent' }}
                                            title={option.text}
                                            checkedColor={BASE_COLOR.blue}
                                            checked={this.state.selectedCheckbox.some((selected) => option._id === selected._id)}
                                            onPress={(_id, index) => this.selectCheckboxHandler(option, item.maximumSelection)}
                                        />
                                        <View style={{ alignItems: 'flex-end', flex: 3 }}>
                                            <Text style={{ fontWeight: '400', fontSize: 16, color: BASE_COLOR.darkGray, }}>+{option.amount}.00</Text>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: BASE_COLOR.gray, height: 1 }}></View>
                                </View>
                            )
                        })
                    }
                } else if (item.buttonOptionsType === "radio"){
                    {
                        item.options.map((option, indexInArray) => {
        
                            // if (indexInArray == 0) {
                            //     allOptions.push(
                            //         <View key={`${Math.random() * 10000} ${noneRadioOption._id}`} >
                            //             {this._renderTitle(indexInArray, item.text)}
                            //             <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 25 }}>
                            //                 <CheckBox
                            //                     key={`${Math.random() * 10000} ${noneRadioOption._id}`}
                            //                     checked={noneRadioOption._id === this.state.selectedRadioButton._id}
                            //                     onPress={(_id, index) => this.selectedRadioButtonHandler(noneRadioOption)}
                            //                     checkedIcon='dot-circle-o'
                            //                     uncheckedIcon='circle-o'
                            //                     title={noneRadioOption.text}
                            //                     textStyle={{ fontWeight: '400', fontSize: 18, color: BASE_COLOR.darkGray, backgroundColor: 'transparent' }}
                            //                     containerStyle={{ flex: 7, backgroundColor: 'transparent', borderColor: 'transparent' }}
                            //                 />
                            //                 <View style={{ alignItems: 'flex-end', flex: 3 }}>
                            //                     <Text style={{ fontWeight: '400', fontSize: 16, color: BASE_COLOR.darkGray, }}>{noneRadioOption.amount != 0 ? `+${noneRadioOption.amount}.00` : null}</Text>
                            //                 </View>
                            //             </View>
                            //             <View style={{ backgroundColor: BASE_COLOR.gray, height: 1 }}></View>
                            //         </View>
                            //     )
                            // }
        
                            allOptions.push(
                                <View key={`${Math.random() * 10000} ${option._id}`} >
                                    {this._renderTitle(indexInArray, item.text)}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 25 }}>
                                        <CheckBox
                                            key={`${Math.random() * 10000} ${option._id}`}
                                            checked={option._id === this.state.selectedRadioButton._id}
                                            onPress={(_id, index) => this.selectedRadioButtonHandler(option)}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            title={option.text}
                                            textStyle={{ fontWeight: '400', fontSize: 18, color: BASE_COLOR.darkGray, backgroundColor: 'transparent' }}
                                            containerStyle={{ flex: 7, backgroundColor: 'transparent', borderColor: 'transparent' }}
                                        />
                                        <View style={{ alignItems: 'flex-end', flex: 3 }}>
                                            <Text style={{ fontWeight: '400', fontSize: 16, color: BASE_COLOR.darkGray, }}>{option.amount != 0 ? `+${option.amount}.00` : null}</Text>
                                        </View>
                                    </View>
                                    <View style={{ backgroundColor: BASE_COLOR.gray, height: 1 }}></View>
                                </View>
                            )
                        })
                    }
                }
            })

            return allOptions
        }
    }
    selectCheckboxHandler = (selectedCheckbox, maximumSelection) => {
        var selected = this.state.selectedCheckbox.concat(selectedCheckbox)
        if (this.state.selectedCheckbox.some((selected) => selectedCheckbox._id === selected._id)) {
            this.setState({
                selectedCheckbox: this.state.selectedCheckbox.filter(item => item._id != selectedCheckbox._id)
            })
        } else {
            if (selected.length <= maximumSelection) {
                this.setState({ selectedCheckbox: selected })
            } else {
                alert(`Ne mozete uzeti više od ${maximumSelection} dodatka`)
            }
        }
        // alert(selectedCheckbox._id)
    }

    selectedRadioButtonHandler = selectedRadioButton => {
        // var menuItem = { ...this.state.menuItem }
        // menuItem.nominalPrice = this.state.menuItem.nominalPrice + selectedRadioButton.amount
        // this.setState({ menuItem })

        this.setState({ selectedRadioButton })
        // alert(selectedRadioButton._id)
    }
    onPressShowPlaceOnMap = (place) => {
        UrlOpen.openUrlInBrowser(UrlOpen.generateUrlForGoogleMap(place.coordinate.latitude, place.coordinate.longitude))
    }
    render() {
        const { name, description, image, nominalPrice, menuItemOptions, place } = this.state.menuItem
        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    <TouchableOpacity onPress={() => this.onPressShowPlaceOnMap(place)}>
                        <View style={{ flexDirection: 'row', margin: 20, marginBottom: 0, alignItems: 'center' }}>
                            <Icon name="map-marker" size={26} color={BASE_COLOR.gray} />
                            <Text style={{ fontSize: 15, fontWeight: '400', color: BASE_COLOR.gray, marginLeft: 8 }}>{place.name}</Text>
                        </View>
                    </TouchableOpacity>
                    <Image style={styles.imageStyle} source={{ uri: image.image169 }} resizeMode='cover' />
                    <View style={{ flexDirection: 'row', margin: 20 }}>
                        <View style={{ flex: 7 }}>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontWeight: '500', fontSize: 20 }}>{name}</Text>
                        </View>
                        <View style={{ flex: 3, alignItems: 'flex-end' }}>
                            <Text style={{ color: BASE_COLOR.blue, fontWeight: 'bold', fontSize: 19 }}>{nominalPrice}.00</Text>
                        </View>
                    </View>
                    <View style={{ margin: 20, marginTop: -10 }}>
                        <Text>500 g</Text>
                        <Text>{description}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 20, marginBottom: 0 }}>
                        <TouchableOpacity onPress={() => this.onMinusClickedHandler()}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: BASE_COLOR.lightGray, width: 46, height: 46, borderRadius: 30 }}>
                                <View
                                    style={{
                                        backgroundColor: BASE_COLOR.gray,
                                        height: 4,
                                        width: 30,
                                        borderBottomLeftRadius: 5,
                                        borderTopLeftRadius: 5,
                                        borderBottomRightRadius: 5,
                                        borderTopRightRadius: 5
                                    }}>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            <Text style={{ fontWeight: '600', fontSize: 24, color: BASE_COLOR.darkGray, width: 40, textAlign: 'center' }}>{this.state.quantity}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.onPlusClickedHandler()}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: BASE_COLOR.lightGray, width: 46, height: 46, borderRadius: 30 }}>
                                <View
                                    style={{
                                        backgroundColor: BASE_COLOR.gray,
                                        height: 4,
                                        width: 30,
                                        borderBottomLeftRadius: 5,
                                        borderTopLeftRadius: 5,
                                        borderBottomRightRadius: 5,
                                        borderTopRightRadius: 5
                                    }}>
                                </View>
                                <View
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: BASE_COLOR.gray,
                                        height: 30,
                                        width: 4,
                                        borderBottomLeftRadius: 5,
                                        borderTopLeftRadius: 5,
                                        borderBottomRightRadius: 5,
                                        borderTopRightRadius: 5
                                    }}>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this._renderMenuItemOptions(menuItemOptions)}

                    <View style={{ alignItems: 'center', justifyContent: 'center', margin: 20, marginBottom: 30 }}>
                        <TouchableOpacity onPress={() => this.putInBagHandler()}>
                            <View style={{ backgroundColor: BASE_COLOR.blue, width: 280, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                <Text style={{ color: BASE_COLOR.white, fontWeight: '600', fontSize: 16 }}>Dodaj u korpu</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
        )
    }

    subTotalPrice = (menuItem, selectedRadioButton, selectedCheckbox, quantity) => {
        var totalPrice = 0
        totalPrice += menuItem.nominalPrice * quantity
        selectedRadioButton.amount != undefined ? totalPrice += selectedRadioButton.amount : totalPrice
        selectedCheckbox.map(
            option => {
                totalPrice += option.amount
                return totalPrice
            }
        )
        return totalPrice
    }

    putInBagHandler() {
        const { menuItem, selectedRadioButton, selectedCheckbox, quantity } = this.state
        console.log(selectedRadioButton)
        let tempSelectedRadio = selectedRadioButton
        if (selectedRadioButton._id === noneRadioOption._id) {
            tempSelectedRadio = {}
        }

        const orderdMenuItem = {
            _id: `${this.props.order.length}${Math.random()}${menuItem._id}`,
            quantity: quantity,
            menuItem: menuItem,
            menuItemTotalPrice: this.subTotalPrice(menuItem, selectedRadioButton, selectedCheckbox, quantity),
            selectedRadioButton: tempSelectedRadio,
            selectedCheckbox: selectedCheckbox,
        }
        this.props.addOrderMenuItemHandler(orderdMenuItem)

        // setTimeout(() => {
        //     alert(this.props.order.length)
        // },2000);
        this.pushNewScreen({ routeName: ScreenName.ShopScreen(), key: `${Math.random() * 10000}`, params: { order: orderdMenuItem } })

    }

    onMinusClickedHandler() {
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity -= 1 })
        }
    }
    onPlusClickedHandler() {
        if (this.state.quantity < 50) {
            this.setState({ quantity: this.state.quantity += 1 })
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    imageStyle: {
        aspectRatio: 16 / 9,
        width: Dimensions.get('screen').width - 40,
        height: (Dimensions.get('screen').width - 40) * 9 / 16,
        alignSelf: 'center',
        marginTop: 10
    }
});

const mapStateToProps = state => {
    return {
        order: state.order.order
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addOrderMenuItemHandler: (orderdMenuItem) => dispatch(addOrderMenuItem(orderdMenuItem)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemDetailsScreen);
