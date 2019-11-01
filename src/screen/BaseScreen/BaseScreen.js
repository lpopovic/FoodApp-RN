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
    setStatusBarStyle = (color) => {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            if (isAndroid) {
                StatusBar.setBackgroundColor(color);
            }
        });
    }
    removeNavListener = () => {
        if(this._navListener !== null){
            this._navListener.remove();
        }
        
    }
    pushNewScreen = (newScreenAtributeValue) => {
        this.props.navigation.navigate(newScreenAtributeValue)
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

    showAlertMessage = (message) => {
        CustomAlert.showAlert(String(message))
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