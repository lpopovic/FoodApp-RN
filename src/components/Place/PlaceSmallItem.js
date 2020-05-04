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
import { IconAssets } from '../../assets'
import Icon from 'react-native-vector-icons/dist/Ionicons';



class PlaceSmallItem extends Component {

    render() {
        const { item } = this.props
        const title = item.name
        const rating = Number(item.avgRating).toFixed(1)
        const delivery = item.delivery
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


export default PlaceSmallItem;