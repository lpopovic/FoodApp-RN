import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import { BASE_COLOR } from '../../styles';
const cardSmallWidth = 110
const cardBigWidth = Dimensions.get('screen').width / 2 - 8
class CategoryItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { setSmall, item } = this.props
        const { image, name, } = item
        return (
            <View style={[styles.mainContainer, { width: setSmall ? cardSmallWidth : cardBigWidth }]}>
                <TouchableOpacity onPress={() => this.props.onPress()}>
                    <View style={styles.listItem}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: image ? image.image11t : "https://api.ketering.rtech.rs/uploads/c54153e5-b287-7307-aa52-b0c49f205a4a-11.png?caption=Kod%20Dzamboa" }}
                                style={styles.image}
                                resizeMode="contain" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={styles.text}>
                                {name ? name : "Ketering test naziv"}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 4,
        width: 80,
    },
    listItem: {
        width: '100%',
        padding: 4,
        flexDirection: 'column',
        alignItems: 'center'
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: BASE_COLOR.blue
    },
    textContainer: {
        marginTop: 4,
        maxWidth: '90%',
    },
    text: {
        textAlign: 'center',
        color: BASE_COLOR.darkGray,
        fontSize: 12,
        fontWeight: 'bold'
    }
});


export default CategoryItem;