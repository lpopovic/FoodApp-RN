import { Linking } from 'react-native';
import React from 'react'
import { isAndroid, isUndefined } from '../../helpers';
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
                console.log("Don't know how to open URI: " + url);
            }
        })
    }
    static sendEmailViaEmailApp = (toMailId, subject, body) => {
        if (!isUndefined(toMailId)) {
            let link = `mailto:${toMailId}`;
            if (!isUndefined(subject)) {
                link = `${link}?subject=${subject}`;
            }
            if (isUndefined(subject)) {
                link = `${link}?body=${body}`;
            } else {
                link = `${link}&body=${body}`;
            }

            Linking.canOpenURL(link)
                .then(supported => {
                    if (supported) {
                        // 'mailto:support@example.com?subject=Billing Query&body=Description'
                        Linking.openURL(link);
                    }
                })
                .catch(err => console.error('An error occurred', err));
        } else {
            console.log('sendEmailViaEmailApp -----> ', 'mail link is undefined');
        }
    };
}



export default UrlOpen;