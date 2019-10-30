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
        return (
            <View style={[styles.mainContainer, { backgroundColor: this.props.backgroundColor }]}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.backPressHandler()}>
                        <View style={styles.leftBtn}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={IconAssets.leftArrow}
                                    style={styles.backImage}
                                    resizeMode='cover' />
                            </View>
                            <Text style={styles.text}>{this.leftBtnTitle}</Text>
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
        tintColor:BASE_COLOR.white
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
        color: BASE_COLOR.white,
    }
});


export default BackHeader;