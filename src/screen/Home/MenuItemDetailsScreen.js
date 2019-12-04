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
    amount: 0,
    _id: "Bez osnovnih dodataka",
    text: "Bez osnovnih dodataka",
}

class MenuItemDetailsScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            quantity: 1,
            menuItem: new MenuItem({}),
            selectedOptions: [{ groupId: "", text: "", type: "", options: [] }]
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
                this.menuItemOptions(res)
                this.setNewStateHandler({
                    loading: false,
                    menuItem: res
                })
                // console.log(res)
                //     console.log(this.state.selectedOptions)

            },
            err => {
                this.showAlertMessage(err)
                this.setNewStateHandler({
                    loading: false,
                })
            }
        )
    }

    menuItemOptions(menuItem) {
        let selectedOption = []
        menuItem.menuItemOptions.map(item => {
            if (item.buttonOptionsType === "radio") {
                var optionItem = {
                    groupId: item._id,
                    type: item.buttonOptionsType,
                    text: item.text,
                    // options: [noneRadioOption._id]
                    options: [noneRadioOption]
                }
                selectedOption.push(optionItem)
            } else if (item.buttonOptionsType === "check") {
                var optionItem = {
                    groupId: item._id,
                    type: item.buttonOptionsType,
                    text: item.text,
                    options: []
                }
                selectedOption.push(optionItem)
            }
        })
        this.setState({
            selectedOptions: selectedOption
        })
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
                if (item.buttonOptionsType === "check") {
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
                                            checked={this.selectedOptionsFromGroup(item._id, option._id)}
                                            onPress={(_id, index) => this.selectCheckboxHandler(item._id, option, item.maximumSelection)}
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
                } else if (item.buttonOptionsType === "radio") {
                    {
                        item.options.map((option, indexInArray) => {

                            if (indexInArray == 0) {
                                allOptions.push(
                                    <View key={`${Math.random() * 10000} ${noneRadioOption._id}`} >
                                        {this._renderTitle(indexInArray, item.text)}
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 25 }}>
                                            <CheckBox
                                                key={`${Math.random() * 10000} ${noneRadioOption._id}`}
                                                checked={this.selectedOptionsFromGroup(item._id, noneRadioOption._id)}
                                                onPress={(_id, index) => this.selectedRadioButtonHandler(item._id, noneRadioOption)}
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon='circle-o'
                                                title={noneRadioOption.text}
                                                textStyle={{ fontWeight: '400', fontSize: 18, color: BASE_COLOR.darkGray, backgroundColor: 'transparent' }}
                                                containerStyle={{ flex: 7, backgroundColor: 'transparent', borderColor: 'transparent' }}
                                            />
                                            <View style={{ alignItems: 'flex-end', flex: 3 }}>
                                                <Text style={{ fontWeight: '400', fontSize: 16, color: BASE_COLOR.darkGray, }}>{noneRadioOption.amount != 0 ? `+${noneRadioOption.amount}.00` : null}</Text>
                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: BASE_COLOR.gray, height: 1 }}></View>
                                    </View>
                                )
                            }

                            allOptions.push(
                                <View key={`${Math.random() * 10000} ${option._id}`} >
                                    {/* {this._renderTitle(indexInArray, item.text)} */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 25 }}>
                                        <CheckBox
                                            key={`${Math.random() * 10000} ${option._id}`}
                                            checked={this.selectedOptionsFromGroup(item._id, option._id)}
                                            onPress={(_id, index) => this.selectedRadioButtonHandler(item._id, option)}
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

    // selectedOptionsFromGroup(groupId, optioId) {
    //     const selectedOptions = this.state.selectedOptions
    //     for (let index = 0; index < selectedOptions.length; index++) {
    //         if (groupId === selectedOptions[index].groupId) {
    //             for (let j = 0; j < selectedOptions[index].options.length; j++) {
    //                 if (optioId === selectedOptions[index].options[j]) {
    //                     return true
    //                 }
    //             }
    //         }
    //     }
    //     return false
    // }
    selectedOptionsFromGroup(groupId, optionId) {
        const selectedOptions = this.state.selectedOptions
        let value = false
        selectedOptions.map(item => {
            if (groupId === item.groupId) {
                item.options.map(option => {
                    if (optionId === option._id) {
                        value = true
                    }
                })
            }
        })
        return value
    }

    // selectCheckboxHandler = (groupId, selectedCheckbox, maximumSelection) => {
    //     let selectedOptions = this.state.selectedOptions

    //     let selectedGroupOption
    //     let position
    //     for (let index = 0; index < selectedOptions.length; index++) {
    //         if (groupId === selectedOptions[index].groupId) {
    //             position = index
    //             selectedGroupOption = selectedOptions[index]
    //         }
    //     }
    //     var selected = selectedGroupOption.options.concat(selectedCheckbox._id)
    //     if (selectedGroupOption.options.some((selected) => selectedCheckbox._id === selected)) {

    //         selectedGroupOption.options = selectedGroupOption.options.filter(item => item != selectedCheckbox._id)

    //     } else {
    //         if (selected.length <= maximumSelection) {
    //             selectedGroupOption.options.push(selectedCheckbox._id)
    //         } else {
    //             alert(`Ne mozete uzeti više od ${maximumSelection} dodatka`)
    //         }
    //     }
    //     selectedOptions[position] = selectedGroupOption
    //     this.setState({ selectedOptions: selectedOptions })
    //     // alert(selectedCheckbox._id)
    // }
    selectCheckboxHandler = (groupId, selectedCheckbox, maximumSelection) => {
        let selectedOptions = [...this.state.selectedOptions]
        let options
        let position

        selectedOptions.map((item, index) => {
            if (groupId === item.groupId) {
                options = item.options
                position = index
                if (options.some(selected => selectedCheckbox._id === selected._id)) {
                    options = options.filter(option => option._id != selectedCheckbox._id)
                } else {
                    if (options.length < maximumSelection) {
                        options.push(selectedCheckbox)
                    } else {
                        alert(`Ne mozete uzeti više od ${maximumSelection} dodatka`)
                    }
                }
            }
        })
        selectedOptions[position].options = options
        this.setState({ selectedOptions: selectedOptions })
        // alert(selectedCheckbox._id)
    }

    // selectedRadioButtonHandler = (groupId, selectedCheckbox) => {
    //     let selectedOptions = this.state.selectedOptions

    //     let selectedGroupOption
    //     let position
    //     for (let index = 0; index < selectedOptions.length; index++) {
    //         if (groupId === selectedOptions[index].groupId) {
    //             position = index
    //             selectedGroupOption = selectedOptions[index]
    //         }

    //     }
    //     if (selectedGroupOption.options.some((selected) => selectedCheckbox._id === selected)) {

    //     } else {
    //         selectedGroupOption.options = [selectedCheckbox._id]
    //     }
    //     selectedOptions[position] = selectedGroupOption
    //     this.setState({ selectedOptions: selectedOptions })
    //     // alert(selectedRadioButton._id)
    // }


    selectedRadioButtonHandler = (groupId, selectedRadioButton) => {
        let selectedOptions = [...this.state.selectedOptions]
        let options
        let position


        selectedOptions.map((item, index) => {
            if (groupId === item.groupId) {
                options = item.options
                position = index
                if (!options.some((selected) => selectedRadioButton._id === selected)) {
                    options = [selectedRadioButton]
                }
            }
        })
        selectedOptions[position].options = options
        this.setState({ selectedOptions: selectedOptions })

        // for (let index = 0; index < selectedOptions.length; index++) {
        //     if (groupId === selectedOptions[index].groupId) {
        //         position = index
        //         selectedGroupOption = selectedOptions[index]
        //     }

        // }
        // if (!selectedGroupOption.options.some((selected) => selectedRadioButton._id === selected)) {
        //     selectedGroupOption.options = [selectedRadioButton._id]
        // }
        // selectedOptions[position] = selectedGroupOption
        // this.setState({ selectedOptions: selectedOptions })
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

    subTotalPrice = (menuItem, selectedOptions, quantity) => {
        var totalPrice = 0
        totalPrice += menuItem.nominalPrice //* quantity

        selectedOptions.map(item => {
            item.options.map(option => {
                totalPrice += option.amount
                return totalPrice
            })
        })
        // selectedRadioButton.amount != undefined ? totalPrice += selectedRadioButton.amount : totalPrice
        return totalPrice * quantity
    }

    putInBagHandler() {
        const { menuItem, selectedOptions, quantity } = this.state
        // setTimeout(() => {
        //     console.log(this.state.selectedOptions)
        // }, 1000);

        const orderdMenuItem = {
            // _id: `${this.props.order.length}${Math.random()}${menuItem._id}`,
            _id: this.props.order.length,
            quantity: quantity,
            menuItem: menuItem,
            menuItemTotalPrice: this.subTotalPrice(menuItem, selectedOptions, quantity),
            selectedOptions: selectedOptions,
        }
        this.props.addOrderMenuItemHandler(orderdMenuItem)

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
