import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import BaseScreen from '../BaseScreen/BaseScreen';
import {
    BASE_COLOR,
    NAV_COLOR
} from '../../styles'
import {
    LANGUAGE_KEY,
    ScreenName,
    getStorageData,
    saveStorageData,
    STORAGE_KEY
} from '../../helpers'
import { setLanguage, saveLanguageSetup } from '../../store/actions'

class LanguageScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        setTimeout(() => {
            this.onPressLanguage(LANGUAGE_KEY.SRB)
        }, 5000);
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    onPressLanguage = (language) => {
        // func koja samo menja jezik i njegova promena traje dok traje sesija app
        this.props.setLanguageHandler(language)
        // func koja pored promene jezika cuva u async storage setovani jezik
        // this.props.saveLanguageSetupHandler(language)
        
        this.resetNavigationStack(ScreenName.OnboardingScreen())
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>LanguageScreen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        language: state.location.language.name,
        strings: state.location.language.strings,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLanguageHandler: (language) => dispatch(setLanguage(language)),
        saveLanguageSetupHandler: (language) => dispatch(saveLanguageSetup(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageScreen);
