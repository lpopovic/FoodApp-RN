import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Image,
    Text,
    TextInput,
    Button,
    Keyboard,
    StyleSheet,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import BaseScreen from '../BaseScreen/BaseScreen';
import { TestAssets, IconAssets } from '../../assets'
import { SreenName, isAndroid } from '../../helpers'
import { BASE_COLOR } from '../../styles'
import { LocationNetwork } from '../../service/api'
import CountryCityList from '../../components/Location/CountryCityList';

class MainLocationScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.titleText = 'DOBRO DOŠLI'
        this.subTitleText = 'Izaberite grad'
        this.setNewStateHandler({
            searchText: '',
            arrayCities: [],
            displayArrayCities: [],
            currentItem: null,
            loading: true
        })
    }
    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle('blue')
        this.apiCallHandler()
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }

    apiCallHandler = () => {
        this.setNewStateHandler({ loading: true })
        LocationNetwork.getAllCities()
            .then(
                res => {
                    this.setNewStateHandler({
                        arrayCities: res,
                        displayArrayCities: res,
                        loading: false

                    })
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
        // this.resetNavigationStack(SreenName.TabNavigatorScreen())
    }
    mainContent = () => (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.imageLogoStyle}
                        source={IconAssets.appIcon80}
                        resizeMode="contain" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.baseTextStyle, styles.titleTextStyle]}>{this.titleText}</Text>
                    <Text style={[styles.baseTextStyle, styles.subTextStyle]}>{this.subTitleText}</Text>
                </View>
            </View>

            <View style={styles.searchTextContainer}>
                <TextInput
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
    render() {
        const { loading } = this.state
        const mainDisplay = loading ? this.activityIndicatorContent("blue") : this.mainContent()
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
        flex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    imageBackgroundContainer: {
        flex: 10,
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


export default MainLocationScreen;