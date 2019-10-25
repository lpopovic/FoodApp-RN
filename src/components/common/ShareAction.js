import React, {Component} from 'react';
import {Share,} from 'react-native';

class ShareAction {
   static onShare = async (message) => {
        try {
            const result = await Share.share({
                message: message
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
}



export default ShareAction;