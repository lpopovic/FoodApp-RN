import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
    IconAssets
} from '../../assets';
import { connect } from 'react-redux';
import { userFavoriteMenuItems } from '../../store/actions'
import { BASE_COLOR } from '../../styles';

class DishCard extends Component {

    render() {
        const { dish, userFavoriteMenuItemsIDs } = this.props
        const { image, description, name, _id } = this.props.dish
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => this.props.onClick()}>
                    <Image
                        style={{
                            height: 90,
                            aspectRatio: 1,
                            marginVertical: 5,
                            marginLeft: 6,
                            marginRight: 10,
                            borderRadius: 5
                        }}
                        source={{ uri: image.image169t }}
                    />
                    <View style={{ flex: 10, flexDirection: 'column', height: '100%', paddingRight: 6 }}>
                        <View style={{ height: 50, flexDirection: 'row', paddingTop: 10, }}>
                            <View style={{ flex: 7.5 }}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 14, fontWeight: '600' }}>{name}</Text>
                            </View>
                            <View style={{ width: 58, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 14, fontWeight: '400', }}>250.00</Text>
                                {/* <TouchableOpacity onPress={() => this.onPressFavoriteMenuItemHandler(dish)}>
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
                                </TouchableOpacity> */}
                            </View>
                        </View>
                        <View style={{ height: 50, flexDirection: 'row', paddingTop: 5 }}>
                            <View style={{ flex: 8.5 }}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 13, fontWeight: '300', color: BASE_COLOR.darkGray }}>{description}Pizza i Pelat, kačkavalj, šampinjoni, suvi vrat, zelena salata</Text>
                            </View>
                            <View style={{ width: 32, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
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
        flexDirection: 'row',
        margin: 10,
        // overflow: 'hidden',
        // borderRadius: 5,
        height: 100,
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

export default connect(mapStateToProps, mapDispatchToProps)(DishCard);