
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 0,
            useNativeDriver: true,
        }
    }
}

import TabNavigatorScreen from './TabNavigator'
import LoginScreen from '../../screen/LogIn/LoginScreen'
import RegisterScreen from '../../screen/LogIn/RegisterScreen'
import MainLocationScreen from '../../screen/IntroLocation/MainLocationScreen'
import OnboardingScreen from '../../screen/Intro/OnboardingScreen'
import SplashScreen from '../../screen/Intro/SplashScreen'
import LanguageScreen from '../../screen/Intro/LanguageScreen'
import { ScreenName } from '../../helpers'


// cateringapp_NAME: NAME_SCREEN
const Navigator = createStackNavigator({

    cateringapp_Splash: {
        screen: SplashScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    cateringapp_Language: {
        screen: LanguageScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    cateringapp_Onboarding: {
        screen: OnboardingScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    cateringapp_MainLocation: {
        screen: MainLocationScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    cateringapp_Login: {
        screen: LoginScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    cateringapp_Register: {
        screen: RegisterScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    cateringapp_TabNavigator: {
        screen: TabNavigatorScreen,
        navigationOptions: () => ({
            header: null
        })
    },
}, {
    initialRouteName: ScreenName.SplashScreen(),
    // headerMode: 'none',
    transitionConfig,
    defaultNavigationOptions: {
        gesturesEnabled: false
    }

})


export default createAppContainer(Navigator);