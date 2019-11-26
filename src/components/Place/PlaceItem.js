import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    StyleSheet
} from 'react-native';
import { BASE_COLOR } from '../../styles';
import { TestAssets, IconAssets } from '../../assets'
import Icon from 'react-native-vector-icons/dist/Ionicons';

class PlaceItem extends Component {

    deliveryIcon = (delivery, timeDelivery) => {
        const time = timeDelivery

        if (delivery == true) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon
                        name="ios-bicycle"
                        size={20} color={BASE_COLOR.white} />
                    <Text
                        style={[styles.baseText, { marginLeft: 4 }]}>
                        {time} min.
                    </Text>

                </View>

            )
        } else {
            return (
                <View />
            )
        }

    }
    render() {
        const { item } = this.props
        const title = item.name
        const rating = item.avgRating
        const delivery = item.delivery
        const timeDelivery = item.estimatedDeliveryTime
        const priceTag = item.returnAvgPriceTag()
        const distance = '4.5 km'
        // const timeDelivery = '45 min.'
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.props.onPress()}>
                    <>
                        <View style={styles.imageBackgroundContainer}>
                            <ImageBackground
                                style={styles.imageBackground}
                                source={{ uri: item.image.image169t }}
                                resizeMode='cover'>
                                <View style={styles.imageContainer}>
                                    <TouchableOpacity
                                        onPress={() => alert("press heart image")}
                                        style={{ position: 'absolute', right: 8, top: 8, padding: 4 }}>
                                        <Image
                                            style={[styles.heartImage]}
                                            source={IconAssets.heartIcon}
                                            resizeMode='contain' />
                                    </TouchableOpacity>

                                    <View style={styles.titleContainer}>
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                            style={[styles.baseText, styles.title]}>
                                            {title}
                                        </Text>
                                    </View>
                                    <View style={{ marginLeft: 16, marginBottom: 8, marginRight: 16, marginTop: 0, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Image
                                                    style={[styles.otherImage]}
                                                    source={IconAssets.starIcon}
                                                    resizeMode='contain' />
                                                <Text style={[styles.baseText,]}>{rating}</Text>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                            <Text style={[styles.baseText]}>{priceTag}</Text>
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                                <Image
                                                    style={[styles.otherImage, { tintColor: BASE_COLOR.blue, }]}
                                                    source={TestAssets.locationMarkerIcon}
                                                    resizeMode='contain' />
                                                <Text style={[styles.baseText]}>{distance} od tebe</Text>
                                            </View>
                                            {this.deliveryIcon(delivery, timeDelivery)}
                                        </View>

                                    </View>
                                </View>
                            </ImageBackground>

                        </View>
                    </>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 8,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: BASE_COLOR.blue
    },
    imageBackgroundContainer: {

    },
    imageBackground: {
        width: "100%",
        aspectRatio: 16 / 9,
        backgroundColor: BASE_COLOR.blue,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0,0.5)',
        justifyContent: 'flex-end'
    },
    otherImage: {
        height: 15,
        width: 15,
        marginRight: 4
    },
    heartImage: {
        height: 25,
        width: 25,
        tintColor: BASE_COLOR.white,
    },
    titleContainer: {
        marginLeft: 8,
        marginRight: 8,
    },
    baseText: {
        color: BASE_COLOR.white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'left',
    }
});
class PlaceSmallItem extends Component {

    render() {
        const { item } = this.props
        const title = item.name
        const rating = item.avgRating
        const delivery = item.delivery // == true ? '45 min.' : 'No delivery'
        const timeDelivery = item.estimatedDeliveryTime
        const priceTag = item.returnAvgPriceTag()


        return (
            <View style={stylesSmall.mainContainer}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.props.onPress()}>
                    <>
                        <View style={stylesSmall.imageBackgroundContainer}>
                            <ImageBackground
                                style={[stylesSmall.imageBackground]}
                                source={{ uri: item.image.image169t }}
                                resizeMode='cover'>
                                <View style={stylesSmall.imageContainer}>

                                    <View style={stylesSmall.titleContainer}>
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                            style={[stylesSmall.baseText, stylesSmall.title]}>
                                            {title}
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>

                        </View>
                        <View style={stylesSmall.otherContainer}>
                            <View style={stylesSmall.itemOtherContainer}>
                                <Text style={[stylesSmall.baseText]}>{priceTag}</Text>
                            </View>
                            {this.deliveryContent(delivery, timeDelivery)}
                            <View style={stylesSmall.spaceView} />
                            <View style={stylesSmall.itemOtherContainer}>
                                <Image
                                    style={[stylesSmall.otherImage]}
                                    source={IconAssets.starIcon}
                                    resizeMode='contain' />
                                <Text style={[stylesSmall.baseText]}>{rating}</Text>
                            </View>

                        </View>
                    </>
                </TouchableOpacity>
            </View>
        )
    }

    deliveryContent = (delivery, timeDelivery) => {
        if (delivery) {
            return (
                <>
                    <View style={stylesSmall.spaceView} />
                    <View style={stylesSmall.itemOtherContainer}>
                        <Icon name="ios-bicycle" size={16} color={BASE_COLOR.black} />
                        {/* <Text style={[stylesSmall.baseText, { marginLeft: 4 }]}>{timeDelivery}</Text> */}

                    </View>
                </>
            )
        }
    }
}
const stylesSmall = StyleSheet.create({
    mainContainer: {
        marginTop: 4,
        marginLeft: 8,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: BASE_COLOR.blue,
        width: 150,
    },
    imageBackgroundContainer: {
    },
    imageBackground: {
        width: "100%",
        aspectRatio: 16 / 9,
        backgroundColor: BASE_COLOR.blue,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0,0.5)',
        justifyContent: 'flex-end'
    },
    otherImage: {
        height: 12,
        width: 12,
        marginRight: 4
    },
    heartImage: {
        height: 25,
        width: 25,
        tintColor: BASE_COLOR.white,
    },
    titleContainer: {
        marginLeft: 8,
        marginRight: 8,
    },
    baseText: {
        color: BASE_COLOR.darkGray,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 10,
    },
    title: {
        fontSize: 14,
        textAlign: 'left',
        color: BASE_COLOR.white
    },
    otherContainer: {
        height: 30,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    spaceView: {
        marginLeft: 4,
        marginRight: 4,
        width: 4,
        aspectRatio: 1,
        backgroundColor: BASE_COLOR.darkGray,
        borderRadius: 2
    },
    itemOtherContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
});






export { PlaceItem, PlaceSmallItem };