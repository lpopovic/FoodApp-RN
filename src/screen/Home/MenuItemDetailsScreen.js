import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BackHeader'
import { IconAssets, TestAssets } from '../../assets';
import { PlaceNetwork } from '../../service/api'
import { MenuItem } from '../../model';
import { connect } from 'react-redux';
import { ScreenName } from '../../helpers'
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_COLOR, NAV_COLOR } from '../../styles';
import { addOrderMenuItem, emptyOrder } from '../../store/actions'
import UrlOpen from '../../components/common/UrlOpen'

var noneRadioOption = {
    amount: 0,
    _id: "Bez osnovnih dodataka",
    text: "Bez osnovnih dodataka",
}

class MenuItemDetailsScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            order: props.order,
            loading: true,
            quantity: 1,
            menuItem: new MenuItem({}),
            menuItemType: new MenuItem({}),
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

            },
            err => {
                this.showAlertMessage(err)
                this.closeScreen()
                this.setNewStateHandler({
                    loading: false,
                })
            }
        )
    }

    menuItemOptions(menuItem) {
        let selectedOption = []
        let menuItemType = menuItem.subtypes[0]
        let Item = menuItem.hasSubtypes ? menuItem.subtypes[0] : menuItem
        Item.image = menuItem.image
        Item.place = menuItem.place

        Item.menuItemOptions.map(item => {
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
            // quantity: 1,
            selectedOptions: selectedOption,
            menuItemType: menuItemType
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
                                            onPress={(_id, index) => this.selectCheckboxHandler(item._id, option, item.maximumSelection === null ? item.options.length : item.maximumSelection)}
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

    _renderMenuItemTypeWithOptions = (subtypes) => {
        var allTypes = []
        subtypes.map((item, index) => {
            allTypes.push(
                <View key={`${Math.random() * 10000} ${item._id}`} >
                    {index === 0 ? <View style={{ backgroundColor: BASE_COLOR.gray, height: 1, marginTop: 40 }}></View> : null}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 25 }}>
                        <CheckBox
                            key={`${Math.random() * 10000} ${item._id}`}
                            checked={this.selectedType(item._id)}
                            onPress={(_id, index) => this.selectTypeHandler(item)}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            title={item.sizeName}
                            textStyle={{ fontWeight: '400', fontSize: 18, color: BASE_COLOR.darkGray, backgroundColor: 'transparent' }}
                            containerStyle={{ flex: 7, backgroundColor: 'transparent', borderColor: 'transparent' }}
                        />
                        <View style={{ alignItems: 'flex-end', flex: 3 }}>
                            <Text style={{ fontWeight: '400', fontSize: 16, color: BASE_COLOR.darkGray, }}>{item.nominalPrice - this.state.menuItem.nominalPrice != 0 ? `+${item.nominalPrice - this.state.menuItem.nominalPrice}.00` : null}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: BASE_COLOR.gray, height: 1 }}></View>
                </View>
            )
        })

        return allTypes
    }

    selectedType(menuItemId) {
        const selectedType = this.state.menuItemType
        if (selectedType._id === menuItemId) {
            return true
        } else {
            return false
        }
    }
    selectTypeHandler(menuItemType) {
        menuItemType.image = this.state.menuItem.image
        menuItemType.place = this.state.menuItem.place
        this.menuItemOptions(menuItemType)
        this.setState({ menuItemType: menuItemType })
    }


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
    }



    onPressShowPlaceOnMap = (place) => {
        UrlOpen.openUrlInBrowser(UrlOpen.generateUrlForGoogleMap(place.coordinate.latitude, place.coordinate.longitude))
    }
    mainContent = () => {
        const { name, description, image, nominalPrice, menuItemOptions, place, hasSubtypes, subtypes } = this.state.menuItem
        return (
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
                        <Text style={{ color: BASE_COLOR.blue, fontWeight: 'bold', fontSize: 19 }}>{hasSubtypes ? nominalPrice + '.00 +' : nominalPrice + '.00'}</Text>
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
                {this._renderMenuItemTypeWithOptions(subtypes)}
                {/* {hasSubtypes === true && subtypes != [] ? this._renderMenuItemOptions(subtypes.menuItemOptions) : null} */}
                {this._renderMenuItemOptions(hasSubtypes ? this.state.menuItemType.menuItemOptions : menuItemOptions)}

                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 20, marginBottom: 30 }}>
                    <TouchableOpacity onPress={() => this.onPressAddToBag()}>
                        <View style={{ backgroundColor: BASE_COLOR.blue, width: 280, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                            <Text style={{ color: BASE_COLOR.white, fontWeight: '600', fontSize: 16 }}>Dodaj u korpu</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
                </View >
            </SafeAreaView>
        )
    }

    subTotalPrice = (menuItem, selectedOptions, quantity, menuItemType) => {
        var totalPrice = 0
        if (menuItem.hasSubtypes) {
            totalPrice += menuItemType.nominalPrice
        } else {
            totalPrice += menuItem.nominalPrice //* quantity
        }

        selectedOptions.map(item => {
            item.options.map(option => {
                totalPrice += option.amount
                return totalPrice
            })
        })
        return totalPrice * quantity
    }

    onPressAddToBag = () => {
        const { orderForPlace } = this.props
        const { menuItem, menuItemType } = this.state
        let item = menuItem.hasSubtypes ? menuItemType : menuItem

        if (orderForPlace == null) {
            this.putInBagHandler()
        } else if (orderForPlace._id === item.place._id) {
            this.putInBagHandler()
        } else if (orderForPlace._id !== item.place._id) {
            this.showDialogMessage("U korpi trenutno imate jela iz drugog restorana. Ako nastavite sa kupovinom, korpa sa vec unetim jelima ce se isprazniti.", this.putInBagHandler)
        }

    }

    putInBagHandler() {
        const { menuItem, selectedOptions, quantity, order, menuItemType } = this.state
        let item = menuItem.hasSubtypes ? menuItemType : menuItem

        const orderdMenuItem = {

            _id: `${Math.random()}${Math.random()}${Math.random()}`,
            quantity: quantity,
            menuItem: item,
            menuItemTotalPrice: this.subTotalPrice(item, selectedOptions, quantity),
            selectedOptions: selectedOptions,
        }

        this.props.addOrderMenuItemHandler([orderdMenuItem, ...this.props.order])
        this.closeScreen()
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
    safeAreaHeader: {
        backgroundColor: NAV_COLOR.headerBackground,
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: BASE_COLOR.white
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
        order: state.order.order,
        orderForPlace: state.order.orderForPlace
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addOrderMenuItemHandler: (orderdMenuItem) => dispatch(addOrderMenuItem(orderdMenuItem)),
        emptyCurentOrderHandler: () => dispatch(emptyOrder()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemDetailsScreen);
