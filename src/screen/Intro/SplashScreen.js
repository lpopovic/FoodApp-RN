import React from 'react';
import {
    View,
    Image,
    Animated,
    StyleSheet,
} from 'react-native';

import { IconAssets } from '../../assets'
import {
    updateUserJWT,
    updateUserProfile,
    fetchUserProfile,
    setLocationCity,
    updateSearchFilter,
    setLanguage,
} from '../../store/actions'
import { connect } from 'react-redux';
import BaseScreen from '../BaseScreen/BaseScreen';
import WelcomeScreen from 'react-native-splash-screen'
import { BASE_COLOR } from '../../styles';
import {
    ScreenName,
    STORAGE_KEY,
    getStorageData,
    saveStorageData,
} from '../../helpers';
import { User } from '../../model';


class SplashScreen extends BaseScreen {
    constructor(props) {
        super(props)
        this.state = {
            fadeAnime: new Animated.Value(1),
        }
    }
    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(BASE_COLOR.black)
        this.animatedViewHandler()
        WelcomeScreen.hide();

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }


    nextPageHandler = async () => {
        const firstLaunch = await getStorageData(STORAGE_KEY.FIRST_TIME_START_APP)
        if (firstLaunch === null) {
            saveStorageData(true, STORAGE_KEY.FIRST_TIME_START_APP)
            this.resetNavigationStack(ScreenName.LanguageScreen())
        } else {
            const token = await getStorageData(STORAGE_KEY.JWT_APP_USER)
            const languageApp = await getStorageData(STORAGE_KEY.LANGUAGE_APP)
            if (languageApp !== null) {
                this.props.setLanguageHandler(languageApp)
            }
            if (token !== null) {

                const user = await getStorageData(STORAGE_KEY.USER_APP_DATA)
                if (user !== null) {
                    this.props.updateUserProfileHandler(new User(user))
                }
                this.props.updateUserJWTHandler(token)
                this.props.fetchUserProfileHandler()

                const city = await getStorageData(STORAGE_KEY.USER_LAST_LOCATION)
                const filter = await getStorageData(STORAGE_KEY.SEARCH_FILTER)
                if (filter !== null) {
                    this.props.updateSearchFilterHandler(filter)
                }
                if (city !== null) {
                    this.props.locationUpdateCityHandler(city)
                    this.resetNavigationStack(ScreenName.TabNavigatorScreen())
                } else {
                    this.resetNavigationStack(ScreenName.MainLocationScreen())
                }

            } else {
                this.resetNavigationStack(ScreenName.LoginScreen())
            }
        }

    }
    animatedViewHandler = () => {
        setTimeout(
            () => {
                this.nextPageHandler()
            },
            300
        )
        Animated.timing(this.state.fadeAnime, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true
        }).start();
    }

    animatedViewContent = () => (
        <Animated.View
            style={{

                opacity: this.state.fadeAnime,
                transform: [
                    {
                        scale: this.state.fadeAnime.interpolate({
                            inputRange: [0, 1],
                            outputRange: [10, 1]
                        })
                    }
                ]
            }}
        >
            <View style={styles.image}>
                <Image
                    source={IconAssets.appIcon256}
                    style={{ width: 200, height: 200 }}
                    resizeMode='cover'
                />
            </View>
        </Animated.View>
    )
    render() {

        return (
            <View style={styles.mainContainer}>
                {this.animatedViewContent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',

    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',

    }
});

const mapDispatchToProps = dispatch => {
    return {
        updateUserJWTHandler: (token) => dispatch(updateUserJWT(token)),
        updateUserProfileHandler: (user) => dispatch(updateUserProfile(user)),
        fetchUserProfileHandler: () => dispatch(fetchUserProfile()),
        locationUpdateCityHandler: (city) => dispatch(setLocationCity(city)),
        updateSearchFilterHandler: (filter) => dispatch(updateSearchFilter(filter)),
        setLanguageHandler: (language) => dispatch(setLanguage(language)),
    };
};


export default connect(null, mapDispatchToProps)(SplashScreen);
