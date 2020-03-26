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
import { connect } from 'react-redux';
import { userFavoritePlaces } from '../../store/actions'
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
        const rating = Number(item.avgRating).toFixed(1)
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
                                        onPress={() => this.onPressFavoritePlaceHandler(item)}
                                        style={{ position: 'absolute', right: 8, top: 8, padding: 4 }}>
                                        <Image
                                            style={{
                                                width: 25,
                                                height: 25,
                                                tintColor: this.props.userFavoritePlacesIDs.includes(item._id) ? '#FF4233' : BASE_COLOR.white
                                            }}
                                            source={this.props.userFavoritePlacesIDs.includes(item._id) ? IconAssets.heartFillIcon : IconAssets.heartIcon}
                                        />
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
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    style={[styles.otherImage]}
                                                    source={IconAssets.starIcon}
                                                    resizeMode='contain' />
                                                <Text style={[styles.baseText,]}>{rating}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.baseText]}>{priceTag}</Text>
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                                <Image
                                                    style={[styles.otherImage, { tintColor: BASE_COLOR.blue, }]}
                                                    source={TestAssets.locationMarkerIcon}
                                                    resizeMode='contain' />
                                                <Text style={[styles.baseText]}>{distance}</Text>
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

    onPressFavoritePlaceHandler = (place) => {
        this.props.userFavoritePlacesHandler(place)
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



const mapStateToProps = state => {
    return {
        userFavoritePlacesIDs: state.user.userFavoritePlacesIDs
    };
};
const mapDispatchToProps = dispatch => {
    return {
        userFavoritePlacesHandler: (place) => dispatch(userFavoritePlaces(place)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceItem);