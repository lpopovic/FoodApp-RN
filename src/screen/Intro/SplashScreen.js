import React, { Component } from 'react';
import { View, Image, Text, Animated, StyleSheet, } from 'react-native';

import { IconAssets } from '../../assets'
import { connect } from 'react-redux';
import BaseScreen from '../BaseScreen/BaseScreen';
import { BASE_COLOR } from '../../styles';
import {
    ScreenName,
    FIRST_TIME_START_APP,
    getStorageData,
    saveStorageData
} from '../../helpers';


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

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }


    nextPageHandler = async () => {
        const firstLaunch = await getStorageData(FIRST_TIME_START_APP)
        if (firstLaunch === null) {
            saveStorageData(true,FIRST_TIME_START_APP)
            this.resetNavigationStack(ScreenName.OnboardingScreen())
        }else {
            this.resetNavigationStack(ScreenName.MainLocationScreen())
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

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};


export default connect(null, null)(SplashScreen);
