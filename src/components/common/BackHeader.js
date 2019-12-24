import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { IconAssets, TestAssets } from '../../assets'
import { BASE_COLOR, headerStyles, NAV_COLOR } from '../../styles'
import { ScreenName } from '../../helpers'
class BackHeader extends Component {

    constructor(props) {
        super(props)
        this.leftBtnTitle = 'Back'
    }
    backPressHandler = () => {
        this.props.navigation.goBack()
    }
    filterPressHandler = () => {
        this.props.navigation.navigate(ScreenName.FilterScreen(), { filter: this.props.showFilter })
    }
    filterContent = (tintColor) => (
        <TouchableOpacity onPress={() => this.filterPressHandler()}>
            <View style={[styles.rightBtn, { flex: 1 }]}>
                <View style={[styles.imageOtherContainer, styles.imageContainer]}>
                    <Icon name="sliders" size={25} color={tintColor} />
                </View>
            </View>
        </TouchableOpacity>
    )
    titleDisplay = (tintColor) => {
        const title = this.props.navigation.getParam('title', null)
        if (title) {
            return (
                <View style={[styles.titleContainer, { flex: 1, alignContent: 'center', alignItems: 'center' }]}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={[headerStyles.btnText, { color: tintColor }]}>
                        {title}</Text>
                </View>
            )
        }

    }
    render() {
        const tintColor = this.props.tintColor ? this.props.tintColor : BASE_COLOR.white
        const backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : BASE_COLOR.backgroundBlue
        const filterDisplay = this.props.showFilter ? this.filterContent() : null
        const borderBottomColor = this.props.borderBottomColor ? this.props.borderBottomColor : NAV_COLOR.borderBottomColor
        return (
            <View style={[headerStyles.mainContainer, { backgroundColor, borderBottomColor, borderBottomWidth: tintColor == BASE_COLOR.white ? 0 : 0.7 }]}>
                <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.backPressHandler()}>
                        <View style={[styles.leftBtn, { flex: 1 }]}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={IconAssets.leftArrow}
                                    style={[headerStyles.btnImage, { tintColor }]}
                                    resizeMode='contain' />
                            </View>
                            <Text style={[headerStyles.btnText, { color: tintColor }]}>{this.leftBtnTitle}</Text>
                        </View>
                    </TouchableOpacity>
                    {this.titleDisplay(tintColor)}
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