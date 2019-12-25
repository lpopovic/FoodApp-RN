import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
} from 'react-native';
import {
    isAndroid
} from '../../helpers'
import {
    StackActions,
    NavigationActions
} from 'react-navigation';
import CustomAlert from '../../components/common/CustomAlert'
import CustomActivityIndicator from '../../components/common/CustomActivityIndicator'

class BaseScreen extends Component {

    constructor(props) {
        super(props)
        this._isMounted = false
        this._navListener = null
        this.state = {
            color: 'green'
        }
    }

    componentDidMount() {
        this._isMounted = true

    }

    componentWillUnmount() {
        this._isMounted = false
        this.removeNavListener()
    }

    setNewStateHandler = (newStateAtributeValue) => {
        if (this._isMounted) {
            this.setState(newStateAtributeValue)
        }
    }
    setStatusBarStyle = (color, darkContent) => {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle(darkContent ? 'dark-content' : 'light-content');
            if (isAndroid) {
                StatusBar.setBackgroundColor(color);
            }
        });
    }
    removeNavListener = () => {
        if (this._navListener !== null) {
            this._navListener.remove();
        }

    }
    pushNewScreen = (newScreenAtributeValue) => {

        clearTimeout(this.timeoutNavigationPushScreen)
        this.timeoutNavigationPushScreen = setTimeout(() => {
            this.props.navigation.navigate(newScreenAtributeValue)
        }, 300);

    }
    closeScreen = () => {
        this.props.navigation.goBack()
    }

    resetNavigationStack = (routeName) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName })],
        })
        this.props.navigation.dispatch(resetAction)
    }

    replaceScreenNavigationStack = (routeName) => {
        const pushAction = StackActions.replace({
            routeName
        });

        this.props.navigation.dispatch(pushAction);
    }

    showAlertMessage = (message) => {
        CustomAlert.showAlert(String(message))
    }
    showDialogMessage = (message, onPressOk, onPressCancel) => {
        CustomAlert.showDialogAlert(String(message), onPressOk, onPressCancel)
    }
    activityIndicatorContent = (color) => (

        <CustomActivityIndicator size="large" color={color} />

    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});


export default BaseScreen;