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
    onPressPlace = (place) => {
        this.props.onPressPlace(place)
    }
    onPressMenuItem = (menuItem) => {
        this.props.onPressMenuItem(menuItem)
    }
    onPressCustom = (url) => {
        this.props.onPressCustom(url)
    }
    onPressItem = (item) => {
        item.onPressHeroTypeBanner(this.onPressPlace, this.onPressMenuItem, this.onPressCustom)
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
                    onPress={() => this.onPressItem(item)}>
                    <ImageBackground style={{
                        aspectRatio: 16 / 9,
                        width: ITEM_WIDTH,
                        resizeMode: 'cover',
                        borderRadius: 5,
                        overflow: 'hidden'
                    }}
                        source={{ uri: item.getImage() }} >
                        <View style={styles.imageContainer}>
                            <View />
                            <View style={styles.titleContainer}>
                                <Text
                                    numberOfLines={3}
                                    ellipsizeMode="tail"
                                    style={[styles.baseText, styles.title]}>
                                    {item.getTitle()}
                                </Text>
                                <Text
                                    numberOfLines={3}
                                    ellipsizeMode="tail"
                                    style={[styles.baseText, styles.description]}>
                                    {item.getDescription()}
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
                    sliderWidth={SCREEN_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    firstItem={SLIDER_FIRST_ITEM}
                    autoplay={true}
                    loop={true}
                    lockScrollWhileSnapping={true}
                    enableMomentum={false}
                    loopClonesPerSide={10}
                    enableSnap={true}
                    inactiveSlideOpacity={1}
                    layout={"default"} />
                <Pagination
                    dotsLength={this.props.data.length}
                    activeDotIndex={this.state.sliderActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={BASE_COLOR.blue}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={BASE_COLOR.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={1}
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
        backgroundColor: 'rgba(0, 0, 0,0.4)',
        justifyContent: 'space-between',

    },
    titleContainer: {
        margin: 18,
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
    description: {
        fontWeight: 'normal',
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
        width: 9,
        height: 9,
        borderRadius: 10,
    }
});


export default HomeCaroselComponent;