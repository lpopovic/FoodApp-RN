import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BackHeader'
import { IconAssets, TestAssets } from '../../assets';
import { PlaceNetwork, OrderNetwork } from '../../service/api'
import { MenuItem } from '../../model';
import { connect } from 'react-redux';
import { ScreenName, subTotalPrice } from '../../helpers'
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_COLOR, NAV_COLOR } from '../../styles';
import { addOrderMenuItem, emptyOrder, userFavoriteMenuItems } from '../../store/actions'
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
        noneRadioOption = {
            amount: 0,
            _id: props.strings.noBasicExtras,
            text: props.strings.noBasicExtras,
        }

        this.state = {
            order: props.order,
            loading: true,
            quantity: 1,
            menuItem: new MenuItem({}),
            menuItemType: new MenuItem({}),
            selectedOptions: [{ groupId: "", text: "", type: "", options: [] }],
            selectedTime: null,
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
                    options: item.required ? [item.options[0]] : [noneRadioOption]
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

    _renderMenuItemOptions = (menuItemOptions, cathering) => {
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
                                            checkedColor={cathering ? BASE_COLOR.orange : BASE_COLOR.blue}
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

                            if (indexInArray == 0 && item.required == false) {
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
                                                checkedColor={cathering ? BASE_COLOR.orange : BASE_COLOR.blue}
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
                            } else if (indexInArray == 0 && item.required == true) {
                                allOptions.push(
                                    <View>
                                        {this._renderTitle(indexInArray, item.text)}
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
                                            checkedColor={cathering ? BASE_COLOR.orange : BASE_COLOR.blue}
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

    _renderMenuItemTypeWithOptions = (subtypes, cathering) => {
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
                            checkedColor={cathering ? BASE_COLOR.orange : BASE_COLOR.blue}
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

                        alert(String(this.props.strings.youCannotTakeMoreThanSupplements).replace("%d", `${maximumSelection}`))
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

    onPressFavoriteMenuItemHandler = (menuItem) => {
        // console.log(this.props.userFavoriteMenuItems)
        console.log(this.props.userFavoriteMenuItemsIDs)
        this.props.userFavoriteMenuItemsHandler(menuItem)
    }

    onPressShowPlaceOnMap = (place) => {
        UrlOpen.openUrlInBrowser(UrlOpen.generateUrlForGoogleMap(place.coordinate.latitude, place.coordinate.longitude))
    }
    setTimeForDeliveryCatheringContent = () => {
        const title = this.props.strings.delivery
        let time = ['10:00h', '16:00h', '22:00h']
        const { selectedTime } = this.state
        return (
            <View>
                <View>
                    <Text style={{
                        fontWeight: '500',
                        fontSize: 20,
                        color: BASE_COLOR.darkGray,
                        marginLeft: 20,
                        marginBottom: 10,
                        marginTop: 40
                    }}>{title}</Text>
                </View>
                <View style={{ backgroundColor: BASE_COLOR.gray, height: 1 }} />
                {
                    time.map((item, index) => {
                        return (
                            <View
                                key={`${index}`}>
                                <View
                                    style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginRight: 25 }}>
                                    <CheckBox
                                        key={`item:${index}`}
                                        checked={selectedTime == item}
                                        onPress={(_id, index) => this.setNewStateHandler({ selectedTime: item })}
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checkedColor={BASE_COLOR.orange}
                                        title={item}
                                        textStyle={{ fontWeight: '400', fontSize: 18, color: BASE_COLOR.darkGray, backgroundColor: 'transparent' }}
                                        containerStyle={{ flex: 7, backgroundColor: 'transparent', borderColor: 'transparent' }}
                                    />
                                </View>
                                <View style={{ backgroundColor: BASE_COLOR.gray, height: 1 }}></View>
                            </View>
                        )

                    })
                }

            </View>
        )
    }
    mainContent = () => {
        const { name, description, image, nominalPrice, menuItemOptions, place, hasSubtypes, subtypes } = this.state.menuItem
        const cathering = this.props.navigation.getParam('cathering', null)
        return (
            <ScrollView>
                <View style={{
                    flexDirection: 'row',
                    margin: 8,
                    marginLeft: 20,
                    marginRight: 20,
                    flex: 10,
                    alignItems: 'center'
                }}>
                    <View style={{ flex: 7 }}>
                        <TouchableOpacity
                            onPress={() => this.onPressShowPlaceOnMap(place)} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
                                <Icon name="map-marker" size={26} color={BASE_COLOR.gray} />
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode={'tail'}
                                    style={{ fontSize: 15, fontWeight: '400', color: BASE_COLOR.gray, marginLeft: 8 }}>
                                    {place.name}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                    {this.props.isLogin == true ?
                        <View style={{ flex: 3, alignItems: 'flex-end', }}>
                            <TouchableOpacity
                                onPress={() => this.onPressFavoriteMenuItemHandler(this.state.menuItem)}>
                                <View style={{ padding: 8 }}>
                                    <Image
                                        style={[styles.heartImage, { tintColor: this.props.userFavoriteMenuItemsIDs.includes(this.state.menuItem._id) ? '#FF4233' : BASE_COLOR.gray }]}
                                        source={this.props.userFavoriteMenuItemsIDs.includes(this.state.menuItem._id) ? IconAssets.heartFillIcon : IconAssets.heartIcon}
                                        resizeMode='contain' />
                                </View >
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }

                </View>
                <Image style={styles.imageStyle} source={{ uri: image.image169 }} resizeMode='cover' />
                <View style={{ flexDirection: 'row', margin: 20 }}>
                    <View style={{ flex: 7 }}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontWeight: '500', fontSize: 20 }}>{name}</Text>
                    </View>
                    <View style={{ flex: 3, alignItems: 'flex-end' }}>
                        <Text style={{ color: cathering ? BASE_COLOR.orange : BASE_COLOR.blue, fontWeight: 'bold', fontSize: 19 }}>{hasSubtypes ? nominalPrice + '.00 +' : nominalPrice + '.00'}</Text>
                    </View>
                </View>
                <View style={{ margin: 20, marginTop: -10 }}>
                    <Text>500 g</Text>
                    <Text>{description}</Text>
                </View>
                {cathering != null && cathering.isFromCathering ? null :
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
                }
                {this._renderMenuItemTypeWithOptions(subtypes, cathering)}
                {/* {hasSubtypes === true && subtypes != [] ? this._renderMenuItemOptions(subtypes.menuItemOptions) : null} */}
                {this._renderMenuItemOptions(hasSubtypes ? this.state.menuItemType.menuItemOptions : menuItemOptions, cathering)}
                {
                    cathering != null && cathering.isFromCathering ?
                        // null
                        this.setTimeForDeliveryCatheringContent()
                        : null
                }
                <View style={{ alignItems: 'center', justifyContent: 'center', margin: 20, marginBottom: 30 }}>
                    <TouchableOpacity onPress={() => this.onPressAddToBag()}>
                        <View style={{ backgroundColor: cathering ? BASE_COLOR.orange : BASE_COLOR.blue, width: 280, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                            <Text style={{ color: BASE_COLOR.white, fontWeight: '600', fontSize: 16 }}>{cathering != null && cathering.isFromCathering ? this.props.strings.orderFood : this.props.strings.addToCart}</Text>
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



    onPressAddToBag = () => {
        const { orderForPlace } = this.props
        const { menuItem, menuItemType, selectedOptions } = this.state
        let item = menuItem.hasSubtypes ? menuItemType : menuItem

        const cathering = this.props.navigation.getParam('cathering', null)
        const catheringOptions = this.props.userInfo.catheringOptions

        if (cathering != null && cathering.isFromCathering) {
            if (catheringOptions.package == 'unlimited' || catheringOptions.balance - Math.abs(catheringOptions.reserved) >= subTotalPrice(item, selectedOptions, 1)) {
                OrderNetwork.fetchCatheringOrder(menuItem, selectedOptions, "delivery", "cash", '', cathering.selectedDate)
                    .then(
                        res => {
                            console.log(res)
                            // this.showAlertMessage("USPESNO NARUCENO")
                            // this.setNewStateHandler({ loading: false })
                            this.pushNewScreen(ScreenName.CateringScreen())
                        },
                        err => {
                            // this.setNewStateHandler({ loading: false })
                            this.showAlertMessage(String(err))
                        })
            } else {
                alert(this.props.strings.youDoNotHaveEnoughFundsInYourAccount)
            }


        } else {
            if (orderForPlace == null) {
                this.putInBagHandler()
            } else if (orderForPlace._id === item.place._id) {
                this.putInBagHandler()
            } else if (orderForPlace._id !== item.place._id) {
                this.showDialogMessage(this.props.strings.youCurrentlyHaveDishesInYourCartFromAnotherRestaurant, this.onPressOkPutInBagNHandler)
            }
        }

    }

    onPressOkPutInBagNHandler = () => {
        const { menuItem, selectedOptions, quantity, menuItemType } = this.state
        let item = menuItem.hasSubtypes ? menuItemType : menuItem

        const orderdMenuItem = {

            _id: `${Math.random()}${Math.random()}${Math.random()}`,
            quantity: quantity,
            menuItem: item,
            menuItemTotalPrice: subTotalPrice(item, selectedOptions, quantity),
            selectedOptions: selectedOptions,
        }
        this.props.addOrderMenuItemHandler([orderdMenuItem])
        this.closeScreen()
    }
    putInBagHandler() {
        const { menuItem, selectedOptions, quantity, menuItemType } = this.state
        let item = menuItem.hasSubtypes ? menuItemType : menuItem

        const orderdMenuItem = {
            _id: `${Math.random()}${Math.random()}${Math.random()}`,
            quantity: quantity,
            menuItem: item,
            menuItemTotalPrice: subTotalPrice(item, selectedOptions, quantity),
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
    },
    heartImage: {
        height: 26,
        width: 26,
        // tintColor: BASE_COLOR.gray,
    },
});

const mapStateToProps = state => {
    return {
        strings: state.location.language.strings,
        order: state.order.order,
        orderForPlace: state.order.orderForPlace,
        isLogin: state.user.isLogin,
        userInfo: state.user.userInfo,
        userFavoriteMenuItems: state.user.userFavoriteMenuItems,
        userFavoriteMenuItemsIDs: state.user.userFavoriteMenuItemsIDs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addOrderMenuItemHandler: (orderdMenuItem) => dispatch(addOrderMenuItem(orderdMenuItem)),
        emptyCurentOrderHandler: () => dispatch(emptyOrder()),
        userFavoriteMenuItemsHandler: (menuItem) => dispatch(userFavoriteMenuItems(menuItem)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItemDetailsScreen);
