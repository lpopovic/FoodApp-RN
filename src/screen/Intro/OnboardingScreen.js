/*This is an example of React Native App Intro Slider */
import React from 'react';
//import react in project 
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
//import all the required component
import AppIntroSlider from 'react-native-app-intro-slider';
//import AppIntroSlider to use it
import { BASE_COLOR } from '../../styles'
import { ScreenName } from '../../helpers'
import BaseScreen from '../BaseScreen/BaseScreen';
import { OnboardingAssets } from '../../assets';
import { connect } from 'react-redux';
class OnboardingScreen extends BaseScreen {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(BASE_COLOR.red)
    }

    componentWillUnmount() {
        super.componentWillUnmount()
    }
    _onDone = () => {

        this.showNextScreenHandler();
    };
    _onSkip = () => {

        this.showNextScreenHandler();
    };
    showNextScreenHandler = () => {
        // uslov dal da se loguje ili ulazi direktno u aplikaciju
        this.resetNavigationStack(ScreenName.LoginScreen());

    }
    getStartedHandler() {
        this._onDone()
    }
    btnStartContent = (index) => {
        const { strings } = this.props
        if (index === 2) {
            return (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.getStartedHandler()}>
                        <View style={styles.searchButton}>
                            <Text style={styles.searchButtontext}>{strings.getStarted}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            )
        }
    }

    _renderItem = props => {

        return (

            <View style={[styles.mainContent, {

                paddingTop: props.topSpacer,
                paddingBottom: props.bottomSpacer,
            }]}>
                <Image
                    style={styles.image}
                    source={this.slides[props.index].image}
                />
                <View style={styles.textContent}>
                    <Text style={styles.title}>{this.slides[props.index].title}</Text>
                    <Text style={styles.text}>{this.slides[props.index].text}</Text>

                </View>
                {this.btnStartContent(props.index)}
            </View>
        )
    }

    render() {
        const { strings } = this.props
        //Intro slides
        return (

            <AppIntroSlider
                style={{ backgroundColor: BASE_COLOR.white }}
                slides={this.slides}
                //comming from the JsonArray below
                onDone={this._onDone}
                nextLabel={strings.next}
                //Handler for the done On last slide
                showDoneButton={false}
                showSkipButton={false}
                onSkip={this._onSkip}
                renderItem={this._renderItem}
                buttonTextStyle={{
                    color: BASE_COLOR.red,
                    fontWeight: 'bold'
                }}
                dotStyle={{
                    backgroundColor: BASE_COLOR.gray,
                    borderRadius: 4,
                    width: 30
                }}
                activeDotStyle={{
                    backgroundColor: BASE_COLOR.red,
                    borderRadius: 4,
                    width: 30
                }}

            />

        );

    }
    slides = [

        {
            index: 0,
            key: 's4',
            title: this.props.strings.onboardingTitle0,
            text: this.props.strings.onboardingText0,
            image: OnboardingAssets.onboarding1,
            backgroundColor: BASE_COLOR.white,
        },
        {
            index: 1,
            key: 's5',
            title: this.props.strings.onboardingTitle1,
            text: this.props.strings.onboardingText1,
            image: OnboardingAssets.onboarding2,
            backgroundColor: BASE_COLOR.white,
        },
        {
            index: 2,
            key: 's6',
            title: this.props.strings.onboardingTitle2,
            text: this.props.strings.onboardingText2,
            image: OnboardingAssets.onboarding3,
            backgroundColor: BASE_COLOR.white
        },
    ];
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 250,
        height: 250
    },
    text: {
        fontSize: 16,
        color: BASE_COLOR.black,
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingTop: 16

    },
    title: {
        fontSize: 24,
        color: BASE_COLOR.black,
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: '800',

    },
    textContent: {
        margin: 16
    },
    searchButton: {
        backgroundColor: BASE_COLOR.red,
        borderRadius: 8,
        padding: 10,
        width: 180
    },
    searchButtontext: {
        color: BASE_COLOR.white,
        fontWeight: "bold",
        fontSize: 18,
        textAlign: 'center'
    },
    paginationStyle: {

        width: 20,
        borderRadius: 0

    }
});





const mapStateToProps = state => {
    return {
        city: state.location.city,
        strings: state.location.language.strings,
    };
};

export default connect(mapStateToProps, null)(OnboardingScreen);