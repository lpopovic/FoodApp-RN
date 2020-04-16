import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { isAndroid, } from '../../helpers'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { BASE_COLOR } from '../../styles';
import { IconAssets, } from '../../assets'
import Icon from 'react-native-vector-icons/dist/Ionicons';
const SLIDER_FIRST_ITEM = 1;
const SCREEN_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = SCREEN_WIDTH - 60
class HomeCaroselComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sliderActiveSlide: SLIDER_FIRST_ITEM
        }
    }

    deliveryIcon = (delivery, deliveryTime) => {


        if (delivery == true) {
            return (
                <View style={{
                    padding: 4,
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'flex-end',
                }}>
                    <Icon
                        name="ios-bicycle"
                        size={25} color={BASE_COLOR.white} />
                    <Text style={[styles.baseText, { marginLeft: 4 }]}>{deliveryTime} min.</Text>

                </View>

            )
        } else {
            return (
                <View />
            )
        }

    }
    _renderItem = ({ item, index }) => {

        return (
            <View
                key={index}
                style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.props.onPressItem(item)}>
                    <ImageBackground style={{
                        aspectRatio: 16 / 9,
                        width: ITEM_WIDTH,
                        resizeMode: 'cover',
                        backgroundColor: BASE_COLOR.blue
                    }}
                        source={{ uri: item.image.image169t }} >
                        <View style={styles.imageContainer}>
                            {this.deliveryIcon(item.delivery, item.estimatedDeliveryTime)}
                            <View>
                                <View style={{ marginLeft: 8, alignContent: 'center', alignItems: 'flex-start' }}>
                                    <TouchableOpacity
                                        onPress={() => alert("press heart image")}>
                                        <View style={{ padding: 4, flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                style={[styles.heartImage]}
                                                source={IconAssets.heartIcon}
                                                resizeMode='contain' />
                                            <Text style={[styles.baseText, { marginLeft: 4 }]}>31{index}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text
                                        numberOfLines={3}
                                        ellipsizeMode="tail"
                                        style={[styles.baseText, styles.title]}>
                                        {item.name}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity >
            </View >
        );
    }
    snapIndexCarosel = (index) => {
        this.setState({ sliderActiveSlide: index })
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.data}
                    renderItem={this._renderItem}
                    onSnapToItem={(index) => this.snapIndexCarosel(index)}
                    sliderWidth={SCREEN_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    firstItem={SLIDER_FIRST_ITEM}
                    autoplay={true}
                    loop={true}
                    lockScrollWhileSnapping={true}
                    enableMomentum={false}
                    loopClonesPerSide={10}
                    enableSnap={true}
                    layout={"default"} />
                <Pagination
                    dotsLength={this.props.data.length}
                    activeDotIndex={this.state.sliderActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={BASE_COLOR.blue}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={BASE_COLOR.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._carousel}
                    tappableDots={!!this._carousel} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0,0.5)',
        justifyContent: 'space-between'
    },
    titleContainer: {
        margin: 8,
    },
    baseText: {
        color: BASE_COLOR.white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    heartImage: {
        height: 25,
        width: 25,
        tintColor: BASE_COLOR.white,
    },
    paginationContainer: {
        // backgroundColor: 'red',
        paddingVertical: 12,
    },
    paginationDot: {

    }
});


export default HomeCaroselComponent;