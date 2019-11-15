import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { BASE_COLOR } from '../../styles';
import { IconAssets, } from '../../assets'
const SLIDER_FIRST_ITEM = 1;

class HomeCaroselComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sliderActiveSlide: SLIDER_FIRST_ITEM
        }
    }

    deliveryIcon = (delivery) => {


        if (delivery == true) {
            return (
                <View style={{ position: 'absolute', right: 8, top: 8, padding: 4, position: 'absolute', flexDirection: 'row', alignItems: 'center' }}>

                    <Image
                        style={[[styles.heartImage]]}
                        source={IconAssets.deliveryIcon}
                        resizeMode='contain' />
                    <Text style={[styles.baseText, { marginLeft: 4 }]}>45 min.</Text>

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
            <View key={index} style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.props.onPressItem(this.props.data.length >= 3 ? index - 3 : index)}>
                    <ImageBackground style={{ height: Dimensions.get('window').width * 9 / 16, width: Dimensions.get('window').width, resizeMode: 'cover', backgroundColor: BASE_COLOR.blue }} source={{ uri: item.image.image169t }} >
                        <View style={styles.imageContainer}>
                            {this.deliveryIcon(item.delivery)}

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
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    firstItem={SLIDER_FIRST_ITEM}
                    autoplay={true}
                    loop={true}
                    // enableMomentum={true}
                    // loopClonesPerSide = {this.props.data.length}
                    // enableSnap={true}
                    // activeSlideAlignment="start"
                    animationOptions={{
                        friction: 0,
                        tension: 0,
                        isInteraction: false,
                        useNativeDriver: true,

                    }}
                    animationFunc={'none'}
                />
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
                    tappableDots={!!this._carousel}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0,0.5)',
        justifyContent: 'flex-end'
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
});


export default HomeCaroselComponent;