import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { IconAssets } from '../../assets';
import { userFavoriteMenuItems } from '../../store/actions'
import { BASE_COLOR } from '../../styles';

class SpecialOfferMenuItem extends Component {

    render() {
        const { dish, userFavoriteMenuItemsIDs } = this.props
        const { image, description, name, _id, nominalPrice } = this.props.dish
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} activeOpacity={1} onPress={() => this.props.onPress()}>
                    <Image
                        style={{
                            height: 90,
                            aspectRatio: 1,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            marginRight: 10,
                        }}
                        source={{ uri: image.image169t }}
                    />
                    <View style={{ flex: 10, flexDirection: 'column', height: '100%', paddingRight: 6, }}>
                        <View style={{ height: 45, flexDirection: 'row', paddingTop: 5, alignItems: 'center' }}>
                            <View style={{ flex: 7.5 }}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 19, fontWeight: '400' }}>{name}</Text>
                            </View>
                            <View style={{ width: 58, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 17, fontWeight: '400', }}>{nominalPrice}.00</Text>
                            </View>
                        </View>
                        <View style={{ height: 45, flexDirection: 'row', paddingTop: 0 }}>
                            <View style={{ flex: 8.5 }}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 14, fontWeight: '400', color: BASE_COLOR.black }}>{description}</Text>
                            </View>
                            <View style={{ width: 32, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.onPressFavoriteMenuItemHandler(dish)}>
                                    <View style={{ height: 32, width: 32, justifyContent: "flex-start", alignItems: "flex-end" }}>
                                        <Image
                                            style={{
                                                width: 23,
                                                height: 23,
                                                tintColor: userFavoriteMenuItemsIDs.includes(_id) ? '#FF4233' : '#646464'
                                            }}
                                            source={userFavoriteMenuItemsIDs.includes(_id) ? IconAssets.heartFillIcon : IconAssets.heartIcon}
                                        />
                                    </View>
                                </TouchableOpacity>
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
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: 300,
        height: 95,
        marginLeft: 8,
        borderWidth: 2.5,
        borderRadius: 8,
        borderColor: BASE_COLOR.blue
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialOfferMenuItem);