import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
    IconAssets
} from '../../assets';
import { BASE_COLOR } from '../../styles';

class DishCard extends Component {

    render() {
        const { image, description, name } = this.props.dish
        return (
            <View style={styles.mainContainer}>
                <Image
                    style={{
                        height: 80,
                        width: 107,
                        aspectRatio: 4 / 3,
                        // backgroundColor: 'red',
                        margin: 10,
                        borderRadius: 5
                    }}
                    source={{ url: image.image169t }}
                />
                <View style={{ flex: 10, flexDirection: 'column', height: '100%', paddingRight: 10 }}>
                    <View style={{ height: 50, flexDirection: 'row', paddingTop: 16 }}>
                        <View style={{ flex: 7.5 }}>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 14, fontWeight: '400' }}>{name}</Text>
                        </View>
                        <View style={{ flex: 2.5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                            <View style={{ flex: 2.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 17,
                                        height: 16,
                                    }}
                                    source={IconAssets.starIcon}
                                />
                                <Text style={{ color: '#646464', fontWeight: '400', fontSize: 11, marginLeft: 2 }}>8.9</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 50, flexDirection: 'row', paddingTop: 5 }}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 12, fontWeight: '300' }}>{description}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        margin: 10,
        overflow: 'hidden',
        borderRadius: 5,
        height: 100,
        // borderWidth: 2,
        // borderColor: BASE_COLOR.blue
    }
});


export default DishCard;