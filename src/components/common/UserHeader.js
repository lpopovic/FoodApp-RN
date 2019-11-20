import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { TestAssets, IconAssets } from '../../assets'
import { NAV_COLOR, headerStyles } from '../../styles'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
import { ScreenName } from '../../helpers'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class UserHeader extends Component {

    constructor(props) {
        super(props)
    }
    onPressChangeLocation = () => {
        this.props.navigation.navigate(ScreenName.MainLocationScreen(), { backToMainScreen: true })
    }
    onPressUserSettings = () => {
        alert("onPressUserSettings")
    }
    onPressShop = () => {
        this.props.navigation.navigate(ScreenName.ShopScreen())

    }
    onPressUserHistory = () => {
        alert("onPressUserHistory")
    }
    render() {
        const tintColor = NAV_COLOR.darkGray
        const backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : NAV_COLOR.headerBackground

        return (
            <View style={[styles.mainContainer, { backgroundColor }]}>
                <View style={styles.contentBtns}>

                    <View style={styles.leftBtn}>
                        <TouchableOpacity onPress={() => alert("PRESS LOGO")}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={IconAssets.appIcon256}
                                    style={[styles.logoImage,]}
                                    resizeMode='contain' />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressChangeLocation()}>
                            <View style={styles.btnLocationContainer}>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={TestAssets.locationMarkerIcon}
                                        style={[styles.markerImage, { tintColor: tintColor }]}
                                        resizeMode='cover' />
                                </View>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={[styles.text, { color: tintColor }]}>
                                    {this.props.city.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rightBtn}>
                        <TouchableOpacity onPress={() => this.onPressUserHistory()}>
                            <View style={[styles.imageOtherContainer, styles.imageContainer]}>
                                <Icon name="history" size={25} color={tintColor} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressUserSettings()}>
                            <View style={[styles.imageOtherContainer, styles.imageContainer]}>
                                <Icon name="cog" size={25} color={tintColor} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressShop()}>
                            <View style={[styles.imageOtherContainer]}>
                                <Image
                                    source={TestAssets.shopBagIcon}
                                    style={[styles.baseImage, { tintColor: tintColor }]}
                                    resizeMode='contain' />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        ...headerStyles.mainContainer,
        borderBottomColor: NAV_COLOR.borderBottomColor,
        borderBottomWidth: 0.7,

    },
    contentBtns: {
        flex: 1,
        width: '100%',
        ...headerStyles.alignCentarBetweenRow,
    },
    leftBtn: {
        ...headerStyles.alignCentarBetweenRow,
        justifyContent: 'flex-start',
    },
    rightBtn: {
        ...headerStyles.alignCentarBetweenRow,
        justifyContent: 'flex-end',
    },
    btnLocationContainer: {
        backgroundColor: NAV_COLOR.locationContent,
        padding: 5,
        borderRadius: 5,
        ...headerStyles.alignCentarBetweenRow,
    },
    imageContainer: {
        marginRight: 4
    },
    imageOtherContainer: {
        padding: 4,
    },
    logoImage: {
        height: 35,
        aspectRatio: 1
    },
    markerImage: {
        height: 20,
        aspectRatio: 1
    },
    baseImage: {
        height: 25,
        aspectRatio: 1
    },
    text: {
        fontSize: 12,
        fontWeight: '500',
        maxWidth: 130,
    }
});
const mapStateToProps = state => {
    return {
        city: state.location.city,
    };
};

export default connect(mapStateToProps, null)(withNavigation(UserHeader));
