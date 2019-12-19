import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_COLOR } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

class ShopCard extends Component {

    renderMenuOptions = (selectedOptions) => {

        let menuOptions = ""
        let menuOptionsTemp = ""
        let optionsTemp = ""
        let itemTemp = ""

        selectedOptions.map(item => {
            itemTemp = ""
            optionsTemp = ""
            itemTemp = `${item.text}:`

            if (item.options.length != 0) {
                item.options.map(option => {
                    if (option.text != undefined) {
                        let amount = option.amount == 0 ? "" : ` (+${option.amount}.00)`
                        optionsTemp += optionsTemp == "" ? ` ${option.text}${amount}` : `, ${option.text} ${amount}`
                    }
                    menuOptionsTemp = itemTemp + optionsTemp
                })
            } else {
                optionsTemp = " - "
                menuOptionsTemp = itemTemp + optionsTemp
            }
            menuOptions += menuOptionsTemp + "\n"
        })


        return menuOptions

    }

    render() {
        const { menuItem, quantity, selectedOptions, menuItemTotalPrice } = this.props.data
        return (
            <View style={styles.mainContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 3, justifyContent: 'center', marginTop: 12 }}>
                        <Image
                            style={{ aspectRatio: 1 / 1, height: 86, marginLeft: 12, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
                            source={{ uri: menuItem.image.image11t }}
                        />
                    </View>
                    <View style={{ flex: 7.8, flexDirection: 'column' }}>
                        <View style={{ flex: 7.8, flexDirection: 'row' }}>
                            <View style={{ flex: 6, marginLeft: 15, justifyContent: 'center' }}>
                                <Text
                                    style={{ fontWeight: '600', fontSize: 19, marginBottom: 8 }}
                                    numberOfLines={2}
                                    ellipsizeMode={'tail'}
                                >{menuItem.sizeName != null ? menuItem.name + ' - ' + menuItem.sizeName : menuItem.name}
                                </Text>
                            </View>
                            <View style={{ margin: 10 }}>
                                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.props.onPressRemove()}>
                                    <View style={{ height: 25, width: 25, alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name="times" size={24} color={BASE_COLOR.darkGray} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={{ color: BASE_COLOR.darkGray }}>Qty: {quantity}</Text>
                            </View>
                            <View style={{ marginRight: 15 }}>
                                <Text style={{ color: BASE_COLOR.blue, fontWeight: '600', fontSize: 18, textAlignVertical: 'center' }}>{menuItemTotalPrice}.00</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-start', margin: 12, marginBottom: 0, height: this.renderMenuOptions(selectedOptions) == "" ? 0 : 'auto' }}>
                    <Text
                        numberOfLines={6}
                        ellipsizeMode={'tail'}
                    >{this.renderMenuOptions(selectedOptions) == "" ? "" : this.renderMenuOptions(selectedOptions)}</Text>
                    {/* {this.renderMenuOptions(selectedOptions)} */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: BASE_COLOR.lightGray,
        margin: 10,
        minHeight: 110,
        flexDirection: 'column',
    }
});


export default ShopCard;