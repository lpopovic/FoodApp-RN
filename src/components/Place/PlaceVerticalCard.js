import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { IconAssets } from '../../assets';
import { BASE_COLOR } from '../../styles';

class PlaceVerticalCard extends Component {

    render() {
        const { item } = this.props
        const title = item.name
        const image = item.image
        const categories = item.categories
        const delivery = item.delivery
        const rating = Number(item.avgRating).toFixed(1)
        const timeDelivery = item.estimatedDeliveryTime
        const priceTag = item.returnAvgPriceTag()
        // const { dish, userFavoriteMenuItemsIDs } = this.props
        // const { description, name, _id, nominalPrice } = this.props.dish

        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} activeOpacity={1} onPress={() => this.props.onPress()}>
                    <Image
                        style={{
                            height: 100,
                            aspectRatio: 1,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            marginRight: 6,
                        }}
                        source={{ uri: image.image169t }}
                    />
                    <View style={{ flex: 10, flexDirection: 'column', height: '100%', paddingRight: 6, }}>
                        <View style={{ height: 45, flexDirection: 'row', paddingTop: 0, alignItems: 'center' }}>
                            <View style={{ flex: 7.5 }}>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 18, fontWeight: '600' }}>{title}</Text>
                            </View>
                        </View>
                        <View style={{ height: 55, flexDirection: 'column', paddingTop: 0 }}>

                            <View style={{ height: 22, backgroundColor: BASE_COLOR.lightGray, borderRadius: 5, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                                {this.categories(categories)}
                            </View>
                            <View style={styles.otherContainer}>
                                <View style={styles.itemOtherContainerSmall}>
                                    <Text style={[styles.baseText]}>{priceTag}</Text>
                                </View>
                                <View style={styles.spaceView} />
                                <View style={styles.itemOtherContainerBig}>
                                    {this.deliveryIcon(delivery, timeDelivery)}
                                </View>
                                {Dimensions.get('screen').width >= 375 ?
                                    <>
                                        <View style={[styles.spaceView, { marginRight: 0 }]} />
                                        <View style={[styles.itemOtherContainerBig, { flexDirection: 'row', height: '100%' }]}>
                                            <Image style={{ width: 23 }} resizeMode='contain' source={IconAssets.cashIcon}></Image>
                                            {item.onlinePayment == true ? <Image style={{ width: 21, marginLeft: 7 }} resizeMode='contain' source={IconAssets.cardIcon}></Image> : null}
                                        </View>

                                    </>
                                    :
                                    null
                                }
                                <View style={[styles.spaceView, { marginLeft: 0 }]} />
                                <View style={[styles.itemOtherContainerSmall, { flex: 1.2, flexDirection: 'row' }]}>
                                    <Image
                                        style={[styles.starImage]}
                                        source={IconAssets.starIcon}
                                        resizeMode='contain' />
                                    <Text style={[styles.baseText, { marginLeft: 4 }]}>{rating}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    deliveryIcon = (delivery, timeDelivery) => {
        const time = timeDelivery
        if (delivery == true) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        style={{ width: 17, height: 17 }}
                        resizeMode='contain'
                        source={IconAssets.deliveryTimeIcon}
                    />
                    <Text style={[styles.baseText, { marginLeft: 3 }]}>{time != 'any' ? `${time} min` : time}</Text>
                </View>
            )
        } else {
            return (
                <View />
            )
        }
    }

    categories = (categories) => {
        var threeCategories = []
        categories.map((category, index) => {
            if (index <= 1) {
                threeCategories.push(
                    <Text key={index} style={{ marginLeft: index == 0 ? 6 : 14, color: BASE_COLOR.darkGray }}>{category.name}</Text>
                )
            } else if (index === 2) {
                threeCategories.push(
                    <Text key={index} numberOfLines={1} ellipsizeMode={'tail'} style={{ flex: 1, marginLeft: 14, color: BASE_COLOR.darkGray }}>{category.name}</Text>
                )
            }
        })
        return threeCategories
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: 100,
        // backgroundColor: 'red',
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 5,
        borderColor: BASE_COLOR.gray,
        borderWidth: 1
    },
    otherContainer: {
        // flex: 6,
        height: 32,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow'
    },
    spaceView: {
        marginLeft: 4,
        marginRight: 4,
        width: 2.5,
        aspectRatio: 1,
        backgroundColor: BASE_COLOR.gray,
        borderRadius: 2,
        // backgroundColor: 'red'
    },
    itemOtherContainerSmall: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'green'
    },
    itemOtherContainerBig: {
        flex: 1.8,
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    starImage: {
        height: 15,
        width: 15,
        paddingRight: 4
    },
    baseText: {
        color: BASE_COLOR.darkGray,
        textAlign: 'center',
        fontSize: 12,
    },
});


export default PlaceVerticalCard;