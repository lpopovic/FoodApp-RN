import { Linking } from 'react-native';
import React from 'react'
import { isAndroid } from '../../helpers';
class UrlOpen {

    static generateUrlForGoogleMap = (latitude, longitude) => {
        return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    }
    static generateUrlForCall = (phoneNumber) => {
        if (isAndroid) {
            return `tel:${phoneNumber}`
        } else {
            return `telprompt:${phoneNumber}`
        }


    }
    static telephoneCall = (url) => {
        Linking.openURL(url)
    }
    static openUrlInBrowser = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + this.props.url);
            }
        })
    }
}



export default UrlOpen;