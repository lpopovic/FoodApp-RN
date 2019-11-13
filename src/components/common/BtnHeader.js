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

class BtnHeader extends Component {

    constructor(props) {
        super(props)
        this.leftBtnTitle = this.props.title
    }
    backPressHandler = () => {
        this.props.navigation.goBack()
    }
    btnPressHandler = () => {
        this.props.btnPress()
    }
    btnContent = (title) => (
        <TouchableOpacity onPress={() => this.btnPressHandler()}>
            <View style={styles.rightBtn}>
                <Text style={[headerStyles.btnText, { color: BASE_COLOR.blue,}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
    titleDisplay = (tintColor) => {
        const title = this.props.navigation.getParam('title', null)
        if (title) {
            return (
                <View style={styles.titleContainer}>
                    <Text style={[headerStyles.btnText, { color: tintColor }]}>{title}</Text>
                </View>
            )
        }

    }
    render() {
        const tintColor = this.props.tintColor ? this.props.tintColor : BASE_COLOR.white
        const backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : BASE_COLOR.backgroundBlue
        const btnDisplay = this.props.btnTitle ? this.btnContent(this.props.btnTitle) : null
        return (
            <View style={[headerStyles.mainContainer, { backgroundColor, borderBottomColor: NAV_COLOR.borderBottomColor, borderBottomWidth: tintColor == BASE_COLOR.white ? 0 : 0.7 }]}>
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
                    {btnDisplay}
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
    imageOtherContainer: {
        padding: 4,
    },
    baseImage: {
        height: 25,
        aspectRatio: 1
    },
});


export default withNavigation(BtnHeader);