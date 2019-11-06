import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Carousel , { Pagination } from 'react-native-snap-carousel';
import { BASE_COLOR } from '../../styles';
const SLIDER_FIRST_ITEM = 1;

class HomeCaroselComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            sliderActiveSlide: SLIDER_FIRST_ITEM
        }
    }

    _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center', borderRadius: 5 }}>
                <TouchableOpacity activeOpacity={1} onPress={() => alert("Click carosel index:"+(index-this.props.data.length))}>
                    <Image style={{ height: Dimensions.get('window').width * 9/16 , width: Dimensions.get('window').width, resizeMode: 'cover' }} source={{ uri: item.image }} />
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.data}
                    renderrItem={this._renderItem}
                    onSnapToItem={(index) => this.setState({ sliderActiveSlide: index }) }
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    firstItem={SLIDER_FIRST_ITEM}
                    autoplay={true}
                    loop={true}
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
    }
});


export default HomeCaroselComponent;