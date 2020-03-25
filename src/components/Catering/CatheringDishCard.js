import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
    IconAssets
} from '../../assets';
import { connect } from 'react-redux';
import { userFavoriteMenuItems } from '../../store/actions'
import { BASE_COLOR } from '../../styles';

class CatheringDishCard extends Component {

    render() {
        const { dish, userFavoriteMenuItemsIDs } = this.props
        const { image, description, name, _id, status, selectedOptions } = this.props.dish
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'column' }} onPress={() => this.props.onClick()}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Image
                            style={{
                                height: 80,
                                aspectRatio: 4 / 3,
                                margin: 10,
                                borderRadius: 5
                            }}
                            source={{ uri: image.image169t }}
                        />
                        <View style={{ flex: 10, flexDirection: 'column', height: '100%', paddingRight: 10 }}>
                            <View style={{ height: 50, flexDirection: 'row', paddingTop: 16 }}>
                                <View style={{ flex: 7.5 }}>
                                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 14, fontWeight: '400' }}>{name}</Text>
                                </View>
                                <View style={{ flex: 2.5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                    <TouchableOpacity onPress={() => this.onPressFavoriteMenuItemHandler(dish)}>
                                        <View style={{ borderRadius: 20, height: 35, width: 35, backgroundColor: '#F1F1F1', justifyContent: "center", alignItems: "center", }}>
                                            <Image
                                                style={{
                                                    width: 21,
                                                    height: 21,
                                                    tintColor: userFavoriteMenuItemsIDs.includes(_id) ? '#FF4233' : '#646464'
                                                }}
                                                source={userFavoriteMenuItemsIDs.includes(_id) ? IconAssets.heartFillIcon : IconAssets.heartIcon}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: 50, flexDirection: 'row', paddingTop: 5 }}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 12, fontWeight: '300' }}>{description}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40 }}>
                        <View style={{ flex: 0.6, marginHorizontal: 10, justifyContent: 'center' }}>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode={'tail'}
                                style={{ fontSize: 12, fontWeight: '300' }}
                            >{this.renderMenuOptions(selectedOptions) == "" ? "" : this.renderMenuOptions(selectedOptions)}</Text>
                        </View>
                        <View style={{ flex: 0.4, justifyContent: 'center' }}>
                            <View style={{ backgroundColor: BASE_COLOR.orange, borderRadius: 5, height: 25, justifyContent: 'center', alignItems: 'center', width: 'auto', marginHorizontal: 10 }}>
                                <Text style={{ fontWeight: '800', color: BASE_COLOR.white, fontSize: 15 }}>{status}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    onPressFavoriteMenuItemHandler = (menuItem) => {
        this.props.userFavoriteMenuItemsHandler(menuItem)
    }

    renderMenuOptions = (selectedOptions) => {

        let menuOptions = ""
        let menuOptionsTemp = ""
        let optionsTemp = ""
        let itemTemp = ""

        selectedOptions.map(item => {
            itemTemp = ""
            optionsTemp = ""
            itemTemp = item.text != undefined ? `${item.text}:` : "Dodaci: "

            if (item.options.length != 0) {
                item.options.map(option => {
                    if (option.text != undefined) {
                        let amount = option.amount == 0 ? "" : ` (+${option.amount}.00)`
                        optionsTemp += optionsTemp == "" ? ` ${option.text}${amount}` : `, ${option.text} ${amount}`
                    }
                    menuOptionsTemp = itemTemp + optionsTemp
                })
            } else {
                menuOptionsTemp = ""
            }
            menuOptions += menuOptionsTemp + "\n"
        })

        return menuOptions
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 10,
        overflow: 'hidden',
        borderRadius: 5,
        height: 140,
        borderWidth: 1.5,
        borderColor: BASE_COLOR.gray
    }
});

const mapStateToProps = state => {
    return {
        userFavoriteMenuItemsIDs: state.user.userFavoriteMenuItemsIDs
    };
};
const mapDispatchToProps = dispatch => {
    return {
        userFavoriteMenuItemsHandler: (menuItem) => dispatch(userFavoriteMenuItems(menuItem))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatheringDishCard);