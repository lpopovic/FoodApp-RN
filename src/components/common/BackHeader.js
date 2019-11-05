import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation'
import { IconAssets, TestAssets } from '../../assets'
import { BASE_COLOR, headerStyles, NAV_COLOR } from '../../styles'
class BackHeader extends Component {

    constructor(props) {
        super(props)
        this.leftBtnTitle = 'Back'
    }
    backPressHandler = () => {
        this.props.navigation.goBack()
    }
    filterPressHandler = () => {
        alert("Press Filter")
    }
    filterContent = (tintColor) => (
        <TouchableOpacity onPress={() => this.filterPressHandler()}>
            <View style={styles.rightBtn}>
                <View style={[styles.imageOtherContainer, styles.imageContainer]}>
                    <Image
                        source={TestAssets.filterIcon}
                        style={[styles.baseImage, { tintColor: tintColor }]}
                        resizeMode='contain' />
                </View>
            </View>
        </TouchableOpacity>
    )
    render() {
        const tintColor = this.props.tintColor ? this.props.tintColor : BASE_COLOR.white
        const backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : BASE_COLOR.backgroundBlue
        const filterDisplay = this.props.showFilter ? this.filterContent() : null
        return (
            <View style={[headerStyles.mainContainer, { backgroundColor, borderBottomColor: NAV_COLOR.borderBottomColor, borderBottomWidth: tintColor == BASE_COLOR ? 0 : 0.7 }]}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.backPressHandler()}>
                        <View style={styles.leftBtn}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={IconAssets.leftArrow}
                                    style={[headerStyles.btnImage, { tintColor }]}
                                    resizeMode='contain' />
                            </View>
                            <Text style={[headerStyles.btnText, { color: tintColor }]}>{this.leftBtnTitle}</Text>
                        </View>
                    </TouchableOpacity>
                    {filterDisplay}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    leftBtn: {
        ...headerStyles.alignCentarBetweenRow,
    },
    rightBtn: {
        ...headerStyles.alignCentarBetweenRow,
    },
    imageContainer: {
        marginRight: 4
    },
    backImage: {
        height: 20,
        width: 20,
    },
    text: {
        fontSize: 17,
        fontWeight: '500',
    },
    imageContainer: {
        marginRight: 4
    },
    imageOtherContainer: {
        padding: 4,
    },
    baseImage: {
        height: 25,
        aspectRatio: 1
    },
});


export default withNavigation(BackHeader);