import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { TestAssets, IconAssets } from '../../assets'
import { NAV_COLOR, headerStyles, BASE_COLOR } from '../../styles'
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation'
import { ScreenName } from '../../helpers'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Badge } from 'react-native-elements'
class BaseHeader extends Component {

    constructor(props) {
        super(props)
    }
    onPressChangeLocation = () => {
        this.props.navigation.navigate(ScreenName.MainLocationScreen(), { backToMainScreen: true })
    }
    onPressFilterHandler = () => {
        this.props.navigation.navigate(ScreenName.FilterScreen(), { filter: this.props.showFilter })
    }
    badgeContent = () => {
        const { order } = this.props
         if (order.length > 0) {
            return <Badge
                // status="primary"
                value={order.length}
                textStyle={{ color: BASE_COLOR.white, fontSize: 12 }}
                badgeStyle={{ backgroundColor: BASE_COLOR.red, }}
                containerStyle={{ position: 'absolute', bottom: 0, right: 0 }}
            />
        } else {
            return <View/>
        }
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(ScreenName.SearchTab())}>
                            <View style={[styles.imageOtherContainer, styles.imageContainer]}>
                                <Image
                                    source={TestAssets.searchIcon}
                                    style={[styles.baseImage, { tintColor: tintColor }]}
                                    resizeMode='contain' />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressFilterHandler()}>
                            <View style={[styles.imageOtherContainer, styles.imageContainer]}>

                                <Icon name="sliders" size={25} color={tintColor} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(ScreenName.ShopScreen())}>
                            <View style={[styles.imageOtherContainer]}>
                                <Image
                                    source={TestAssets.shopBagIcon}
                                    style={[styles.baseImage, { tintColor: tintColor }]}
                                    resizeMode='contain' />
                                {this.badgeContent()}
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
        order: state.order.order
    };
};

export default connect(mapStateToProps, null)(withNavigation(BaseHeader));
