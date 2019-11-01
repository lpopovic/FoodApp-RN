import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation'
import { IconAssets } from '../../assets'
import { BASE_COLOR } from '../../styles'
class BackHeader extends Component {

    constructor(props) {
        super(props)
        this.leftBtnTitle = 'Back'
    }
    render() {
        const tintColor = this.props.tintColor ? this.props.tintColor : BASE_COLOR.white

        return (
            <View style={[styles.mainContainer, { backgroundColor: this.props.backgroundColor }]}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.backPressHandler()}>
                        <View style={styles.leftBtn}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={IconAssets.leftArrow}
                                    style={[styles.backImage, { tintColor }]}
                                    resizeMode='cover' />
                            </View>
                            <Text style={[styles.text, { color: tintColor }]}>{this.leftBtnTitle}</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <View style={styles.rightBtn}>
                        <Text style={styles.text}>Right BTN</Text>
                    </View> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        height: 40,
        paddingLeft: 16,
        paddingRight: 16,
    },
    leftBtn: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    rightBtn: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    imageContainer: {
        marginRight: 4
    },
    backImage: {
        height: 20,
        width: 20,
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
    }
});


export default BackHeader;