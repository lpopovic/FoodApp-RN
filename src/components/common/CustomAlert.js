import React, { Component } from 'react';
import { Alert } from 'react-native';

class CustomAlert extends Component {

    static messageFallow = 'Are you sure to unfollow?'

    static showAlert = (message) => {
        // Works on both iOS and Android

        Alert.alert(
            'KLOPAJ',
            message,
            [
                { text: 'OK' },
            ],
            { cancelable: true },
        );
    }

    static showDialogAlert = (message, onPressOkFunc, onPressCancelFunc) => {
        // Works on both iOS and Android

        Alert.alert(
            'KLOPAJ',
            message,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => onPressCancelFunc ? onPressCancelFunc() : null
                },
                { text: 'OK', onPress: () => onPressOkFunc() },
            ],
            { cancelable: true },
        );
    }
}

export default CustomAlert;