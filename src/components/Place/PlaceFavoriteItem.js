import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { BASE_COLOR } from '../../styles';
import { IconAssets } from '../../assets'

class PlaceFavoriteItem extends Component {

    render() {
        const { item } = this.props
        const title = item.name
        const rating = Number(item.avgRating).toFixed(1)
        const timeDelivery = item.estimatedDeliveryTime
        const priceTag = item.returnAvgPriceTag()

        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.props.onPress()}>
                    <>
                        <View>
                            <ImageBackground
                                style={[styles.imageBackground]}
                                source={{ uri: item.image.image169t }}
                                resizeMode='cover'>
                                <View style={styles.imageContainer}>
                                    <View style={[styles.actionContainer, { opacity: rating > 3 ? 1 : 0 }]}>
                                        <Text style={styles.actionTextStyle}>akcija</Text>
                                    </View>
                                    <View style={styles.titleContainer}>
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                            style={styles.title}>
                                            {title}
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.otherContainer}>
                            <View style={styles.itemOtherContainer}>
                                <Text style={[styles.baseText]}>{priceTag}</Text>
                            </View>
                            <View style={styles.spaceView} />
                            <View style={styles.itemOtherContainer}>
                                <Text style={[styles.baseText]}>{timeDelivery}</Text>
                            </View>
                            <View style={styles.spaceView} />
                            <View style={[styles.itemOtherContainer, { flexDirection: 'row' }]}>
                                <Image
                                    style={[styles.starImage]}
                                    source={IconAssets.starIcon}
                                    resizeMode='contain' />
                                <Text style={[styles.baseText]}>{rating}</Text>
                            </View>
                        </View>
                    </>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 4,
        marginLeft: 8,
        borderRadius: 5,
        overflow: 'hidden',
        width: 220,
    },
    imageBackground: {
        width: "100%",
        aspectRatio: 16 / 9,
        backgroundColor: BASE_COLOR.blue,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0,0.4)',
        justifyContent: 'space-between'
    },
    starImage: {
        height: 14,
        width: 14,
        marginRight: 4
    },
    titleContainer: {
        marginHorizontal: 15,
        height: 50,
    },
    baseText: {
        color: BASE_COLOR.darkGray,
        textAlign: 'center',
        fontSize: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: BASE_COLOR.white
    },
    otherContainer: {
        flex: 3,
        height: 32,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: BASE_COLOR.gray,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
    },
    spaceView: {
        marginLeft: 4,
        marginRight: 4,
        width: 2.5,
        aspectRatio: 1,
        backgroundColor: BASE_COLOR.gray,
        borderRadius: 2
    },
    itemOtherContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionContainer: {
        backgroundColor: '#E10001',
        width: 78,
        height: 48,
        marginLeft: 15,
        paddingBottom: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'flex-end'
    },
    actionTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: BASE_COLOR.white,
        textAlign: 'center',
    }
});


export default PlaceFavoriteItem;