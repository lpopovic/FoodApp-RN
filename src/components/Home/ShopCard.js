import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_COLOR } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

class ShopCard extends Component {

    renderMenuOptions = (selectedRadioButton, selectedCheckbox) => {
        let menuOptions = ""
        if (selectedRadioButton.text != undefined) {
            menuOptions = selectedRadioButton.text
        }
        selectedCheckbox.map(option => menuOptions += menuOptions == "" ? `${option.text}` : `, ${option.text}`)
        return menuOptions.toLowerCase()
    }

    render() {
        const { menuItem, quantity, selectedRadioButton, selectedCheckbox, menuItemTotalPrice } = this.props.data
        return (
            <View style={styles.mainContainer}>
                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Image
                        style={{ aspectRatio: 1 / 1, height: 86, marginLeft: 12, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
                        source={{ uri: menuItem.image.image169 }}
                    />
                </View>
                <View style={{ flex: 6, marginLeft: 15, justifyContent: 'center' }}>
                    <Text
                        style={{ fontWeight: '600', fontSize: 19, marginBottom: 8 }}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >{menuItem.name}
                    </Text>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                    >{this.renderMenuOptions(selectedRadioButton, selectedCheckbox) == "" ? " - " : this.renderMenuOptions(selectedRadioButton, selectedCheckbox)}</Text>
                    <Text style={{ color: BASE_COLOR.blue, fontWeight: '600', fontSize: 18, marginTop: 8 }}>{menuItemTotalPrice}.00</Text>

                </View>

                <View style={{ flex: 1.8, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ marginTop: 10, marginRight: 10, alignItems: 'flex-end' }} onPress={() => this.props.onPressRemove()}>
                        <View style={{ height: 25, width: 25, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="times" size={24} color={BASE_COLOR.darkGray} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginBottom: 10, alignItems: 'center' }}>
                        <Text style={{ color: BASE_COLOR.darkGray }}>Qty: {quantity}</Text>
                    </View>
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
        height: 110,
        flexDirection: 'row',
        // alignItems: 'center',

    }
});


export default ShopCard;