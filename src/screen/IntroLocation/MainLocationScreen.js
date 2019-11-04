import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Image,
    Text,
    TextInput,
    Keyboard,
    StyleSheet,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import BaseScreen from '../BaseScreen/BaseScreen';
import { TestAssets, IconAssets } from '../../assets'
import { ScreenName } from '../../helpers'
import { BASE_COLOR } from '../../styles'
import { LocationNetwork } from '../../service/api'
import CountryCityList from '../../components/Location/CountryCityList';
import { connect } from 'react-redux';
import { setLocationCity } from '../../store/actions'
import Header from '../../components/common/BackHeader'
class MainLocationScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.titleText = 'DOBRO DOŠLI'
        this.subTitleText = 'Izaberite grad'
        this.state = {
            searchText: '',
            arrayCities: [],
            displayArrayCities: [],
            currentItem: null,
            loading: true
        }
    }
    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(BASE_COLOR.black)
        this.setNewStateHandler({ currentItem: this.props.city })
        this.apiCallHandler()

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }

    apiCallHandler = () => {
        this.setNewStateHandler({ loading: true })
        LocationNetwork.fetchGetAllCities()
            .then(
                res => {
                    this.setNewStateHandler({
                        arrayCities: res,
                        displayArrayCities: res,
                        loading: false

                    })
                    this.searchInput.focus()
                },
                error => {
                    this.showAlertMessage(error)
                    this.setNewStateHandler({
                        arrayCities: [],
                        displayArrayCities: [],
                        loading: false

                    })
                }
            )
    }
    onChangeTextInput = (searchText) => {

        const { arrayCities } = this.state
        if (arrayCities.length > 0) {

            this.setNewStateHandler({ searchText, displayArrayCities: this.filterArrayObjectByStringValue(searchText) })
        } else {
            this.apiCallHandler()
        }

    }
    filterArrayObjectByStringValue = (value) => {

        const { arrayCities } = this.state

        return arrayCities.filter(function (item) {
            return ((item.name.toUpperCase()).includes(value.toUpperCase()));
        });

    }
    countryCityListContent = () => (

        <CountryCityList
            extraData={this.state}
            arrayObject={this.state.displayArrayCities}
            currentItemSelected={this.state.currentItem ? this.state.currentItem._id : ''}
            onItemSelected={(item) => this.onItemSelectedHandler(item)}
            keyboardShouldPersistTaps={'handled'}
        />
    )
    onItemSelectedHandler = (item) => {
        Keyboard.dismiss()
        this.setNewStateHandler({ currentItem: item })
        this.props.locationUpdateCityHandler(item)

        clearTimeout(this.pressItem)
        this.pressItem = setTimeout(() => {
            this.resetNavigationStack(ScreenName.TabNavigatorScreen())
        }, 200);

    }
    mainContent = () => (
        <SafeAreaView style={styles.mainContainer}>
            {this.topContent()}
            <View style={styles.searchTextContainer}>
                <TextInput
                    ref={ref => this.searchInput = ref}
                    style={[styles.baseTextStyle, styles.searchTextStyle]}
                    value={this.state.searchText}
                    onChangeText={(searchText) => this.onChangeTextInput(searchText)}
                    keyboardType={'default'}
                    returnKeyType='done'
                    autoCorrect={false}
                />
            </View>
            {this.countryCityListContent()}

        </SafeAreaView>
    )
    topContent = () => {
        const backToMainScreen = this.props.navigation.getParam('backToMainScreen', null)
        if (backToMainScreen) {
            return (
                <>
                    <Header
                        backgroundColor={'transparent'} />
                    <View style={styles.topContainer}>
                        <View style={styles.textContainer}>
                            <Text
                                style={[styles.baseTextStyle, styles.subTextStyle]}>
                                {this.subTitleText}
                            </Text>
                        </View>
                    </View>
                </>
            )
        } else {
            return (
                <View style={styles.topContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.imageLogoStyle}
                            source={IconAssets.appIcon256}
                            resizeMode="contain" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text
                            style={[styles.baseTextStyle, styles.titleTextStyle]}>
                            {this.titleText}
                        </Text>
                        <Text
                            style={[styles.baseTextStyle, styles.subTextStyle]}>
                            {this.subTitleText}
                        </Text>
                    </View>
                </View>
            )
        }

    }
    render() {
        const { loading } = this.state
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.backgroundBlue) : this.mainContent()
        return (
            < ImageBackground
                style={styles.imageBackgroundContainer}
                resizeMode='cover'
                source={TestAssets.backgroudImage} >
                {mainDisplay}
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    imageBackgroundContainer: {
        flex: 1,
        backgroundColor: BASE_COLOR.backgroundBlue
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginTop: 20
    },
    textContainer: {
        marginTop: 16
    },
    imageLogoStyle: {
        height: 100,
        width: 100,
    },
    baseTextStyle: {
        color: BASE_COLOR.white,
        fontSize: 28,
        textAlign: 'center'
    },
    titleTextStyle: {
        fontWeight: 'bold'
    },
    subTextStyle: {
        fontWeight: '300'
    },
    searchTextContainer: {
        margin: 16,
    },
    searchTextStyle: {
        borderBottomColor: BASE_COLOR.white,
        borderBottomWidth: 1,
        fontWeight: '300'

    }
});
const mapStateToProps = state => {
    return {
        city: state.location.city,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        locationUpdateCityHandler: (city) => dispatch(setLocationCity(city)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLocationScreen);