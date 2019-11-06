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

class PlaceItem extends Component {

    deliveryIcon = () => {


        if (this.props.item % 2 == 0) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

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
    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} onPress={() => alert("Press Place Item")}>
                    <>
                        <View style={styles.imageBackgroundContainer}>
                            <ImageBackground
                                style={styles.imageBackground}
                                source={{ uri: "https://api.ketering.rtech.rs/uploads/c54153e5-b287-7307-aa52-b0c49f205a4a-11.png?caption=Kod%20Dzamboa" }}
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
                                            Mali Leskovac
                                        </Text>
                                    </View>
                                    <View style={{ marginLeft: 16, marginBottom: 8, marginRight: 16, marginTop: 0, }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                style={[styles.otherImage]}
                                                source={IconAssets.starIcon}
                                                resizeMode='contain' />
                                            <Text style={[styles.baseText]}>4.6</Text>

                                        </View>
                                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                                <Image
                                                    style={[styles.otherImage, { tintColor: BASE_COLOR.blue, }]}
                                                    source={TestAssets.locationMarkerIcon}
                                                    resizeMode='contain' />
                                                <Text style={[styles.baseText]}>4.5km od tebe</Text>
                                            </View>
                                            {this.deliveryIcon()}
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


export default PlaceItem;