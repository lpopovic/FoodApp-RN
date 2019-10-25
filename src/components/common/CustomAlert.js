import React, { Component } from 'react';
import { Alert } from 'react-native';

class CustomAlert extends Component {

    static messageFallow = 'Are you sure to unfollow?'

    static showAlert = (message, onPressOkFunc) => {
        // Works on both iOS and Android

        Alert.alert(
            'TITLE',
            message,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => onPressOkFunc() },
            ],
            { cancelable: true },
        );
    }
}

export default CustomAlert;