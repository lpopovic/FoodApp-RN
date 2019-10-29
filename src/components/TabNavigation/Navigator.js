
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

import { SreenName } from '../../helpers'


// cateringapp_NAME: NAME_SCREEN
const Navigator = createStackNavigator({

    cateringapp_MainLocation :{
        screen: MainLocationScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    cateringapp_Login :{
        screen: LoginScreen,
        navigationOptions: () => ({
            header: null
        })
    },
    cateringapp_Register :{
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
    initialRouteName: SreenName.MainLocationScreen(),
    // headerMode: 'none',
    transitionConfig,
    defaultNavigationOptions: {
        gesturesEnabled: false
    }

})


export default createAppContainer(Navigator);