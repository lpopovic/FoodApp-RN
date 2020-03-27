import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import BaseScreen from '../BaseScreen/BaseScreen';
import {
    BASE_COLOR,
    NAV_COLOR
} from '../../styles'
import {
    ScreenName, saveStorageData, STORAGE_KEY,
} from '../../helpers'
import { setLanguage, saveLanguageSetup } from '../../store/actions'
import { IconAssets } from '../../assets';

class LanguageScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {
            langClicked: false,
            languages: [{ text: 'Srpski', name: 'srb' }, { text: 'English', name: 'en' }],
            chosenLanguage: this.props.strings.chooseLanguage
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true);
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    onPressLanguage = (obj) => {
        this.setNewStateHandler({ chosenLanguage: obj.text, langClicked: false })
        // func koja samo menja jezik i njegova promena traje dok traje sesija app
        // this.props.setLanguageHandler(obj.name)
        // func koja pored promene jezika cuva u async storage setovani jezik
        this.props.saveLanguageSetupHandler(obj.name)
    }
    onPressNext = () => {
        this.resetNavigationStack(ScreenName.OnboardingScreen())
    }
    render() {
        const { langClicked, languages, chosenLanguage } = this.state;
        const { strings } = this.props;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.setNewStateHandler({ langClicked: false })} activeOpacity={1} style={{ flex: 1, backgroundColor: BASE_COLOR.backgroundBlue }}>
                    <View style={styles.headerContainer}>
                        <View style={styles.logoContainer} >
                            <Image source={IconAssets.appIcon256} style={styles.logoImage} resizeMode='contain' />
                        </View>
                    </View>
                    <View style={styles.dropDownsMainCont}>
                        <TouchableOpacity onPress={() => this.setNewStateHandler({ langClicked: !langClicked })} style={[styles.dropDownTitleCont]}>
                            <Text style={{ color: 'white' }}>{chosenLanguage}</Text>
                            <FontAwesome name='caret-down' size={20} color='white' />
                        </TouchableOpacity>
                        {langClicked &&
                            <View style={[styles.dropDownStyle, styles.shadowStyle, { top: '27%' }]}>
                                {languages.map((l, i) => (
                                    <Text
                                        onPress={() => this.onPressLanguage(l)}
                                        style={{ marginBottom: i == languages.length - 1 ? 0 : 20, fontSize: 16 }}
                                        key={i}>{l.text}</Text>
                                ))}
                            </View>
                        }
                    </View>
                    {chosenLanguage !== this.props.strings.chooseLanguage ?
                        <TouchableOpacity onPress={() => this.onPressNext()}
                            style={styles.nextBtn}>
                            <Text style={styles.textButtonStyle}>{strings.next.toUpperCase()}</Text>
                        </TouchableOpacity>
                        :
                        <View/>
                    }
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    dropDownsMainCont: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    dropDownTitleCont: {
        borderBottomWidth: 1,
        borderColor: BASE_COLOR.white,
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: '20%'
    },
    dropDownStyle: {
        width: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 3,
        padding: 10
    },
    shadowStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    nextBtn: {
        width: '50%',
        height: 50,
        borderWidth: 1,
        backgroundColor: BASE_COLOR.green,
        alignSelf: 'center',
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    textButtonStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: BASE_COLOR.white,
        fontWeight: 'bold',
        fontSize: 20,
    },
    headerContainer: {
        flex: 1,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        height: 120,
        width: 120,
    },
    titleContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    textHeaderStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: BASE_COLOR.white
    },
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
