import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BaseScreen from '../BaseScreen/BaseScreen';
import SafeAreaView from 'react-native-safe-area-view';
import DefaultInput from '../../components/common/DefaultInput'
import Header from '../../components/common/BackHeader'
import { ScreenName, MESSAGE_NO_VALIDE_INPUT_FORM } from '../../helpers'
import { IconAssets } from '../../assets'
import { BASE_COLOR } from '../../styles';
import { validate } from '../../helpers'
import { UserNetwork } from '../../service/api'

class RegisterScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.title = "PRIJAVI SE"
        this.state = {
            loading: false,
            controls: {
                username: {
                    value: "",
                    valid: false,
                    validationRules: {
                        isUsername: 6
                    },
                    touched: false
                },
                email: {
                    value: "",
                    valid: false,
                    validationRules: {
                        isEmail: true
                    },
                    touched: false
                },
                password: {
                    value: "",
                    valid: false,
                    validationRules: {
                        minLenght: 6
                    },
                    touched: false
                },
                confirmPassword: {
                    value: "",
                    valid: false,
                    validationRules: {
                        equalTo: 'password'
                    },
                    touched: false
                }
            }
        }
    }


    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(BASE_COLOR.blue)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    apiCallSignUpHandler = (email, password, username) => {
        this.setNewStateHandler({ loading: true })
        UserNetwork.fetchUserRegister(username, email, password)
            .then(
                res => {
                    this.showAlertMessage(String(res))
                    this.setNewStateHandler({ loading: false })
                    this.closeScreen()
                },
                err => {
                    this.setNewStateHandler({ loading: false })
                    this.showAlertMessage(String(err))
                })
    }

    onPressRegisterHandler = () => {
        disabled = !this.state.controls.email.valid || !this.state.controls.password.valid || !this.state.controls.confirmPassword.valid || !this.state.controls.username.valid
        const { controls } = this.state
        if (!disabled) {

            this.apiCallSignUpHandler(controls.email.value, controls.password.value, controls.username.value)
        } else {
            if (controls.email.value !== '' && controls.password.value !== '' && controls.confirmPassword.value !== '' && controls.username.value !== '') {
                if (!this.state.controls.email.valid) {

                    this.showAlertMessage("Not valide email addrese.")
                } else if (!this.state.controls.password.valid) {

                    this.showAlertMessage("Password must be minumum 6 characters and include both numbers and letters.")
                } else if (!this.state.controls.confirmPassword.valid) {
                    this.showAlertMessage('Re-Password are not the same.')
                } else if (!this.state.controls.username.valid) {
                    this.showAlertMessage('Username not valide, minumum 6 characters.')
                }
            } else {
                alert(MESSAGE_NO_VALIDE_INPUT_FORM)
            }
        }

    }

    mainContent = () => (
        <KeyboardAwareScrollView
            style={styles.mainDisplay}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flexGrow: 10 }}
            scrollEnabled={false}
            keyboardShouldPersistTaps='handled'
            enableOnAndroid={true} >
            <View style={{ flex: 0.8 }}>

                <View style={styles.headerContainer}>
                    <View style={styles.logoContainer} >
                        <Image source={IconAssets.appIcon256} style={styles.logoImage} resizeMode='contain' />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.textHeaderStyle}>{this.title}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center' }}>

                    <DefaultInput
                        placeholder='Username'
                        value={this.state.controls.username.value}
                        onChangeText={(val) => this.updateInputState('username', val)}
                        valid={this.state.controls.username.valid}
                        touched={this.state.controls.username.touched}
                        autoCapitalize="none"
                        returnKeyType={"next"}
                        autoCorrect={true}
                        textContentType='none'
                    />
                    <DefaultInput
                        style={{ marginTop: 16 }}
                        placeholder='Email'
                        value={this.state.controls.email.value}
                        onChangeText={(val) => this.updateInputState('email', val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        rreturnKeyType={"next"}
                        textContentType='none'
                    />
                    <DefaultInput
                        placeholder='Choose Password'
                        style={{ marginTop: 16 }}
                        value={this.state.controls.password.value}
                        onChangeText={val => this.updateInputState('password', val)}
                        valid={this.state.controls.password.valid}
                        touched={this.state.controls.password.touched}
                        returnKeyType={"next"}
                        secureTextEntry={true}
                        textContentType='none'
                    />
                    <DefaultInput
                        placeholder="Confirm Password"
                        style={{ marginTop: 16 }}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={val => this.updateInputState('confirmPassword', val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        returnKeyType={"done"}
                        secureTextEntry={true}
                        textContentType='none'
                    />

                </View>
                <View style={styles.buttonsContainer}>
                    <View style={{ width: 130, margin: 8, alignSelf: 'center', }}>
                        <TouchableOpacity
                            onPress={() => this.onPressRegisterHandler()}>
                            <View style={styles.buttonSignIn}>
                                <Text style={styles.textButtonStyle}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </KeyboardAwareScrollView>

    )

    render() {
        const { loading } = this.state
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.white) : this.mainContent();

        return (
            <SafeAreaView style={styles.mainContainer}>
                <Header
                    backgroundColor={BASE_COLOR.blue}
                    backPressHandler={() => this.closeScreen()} />
                {mainDisplay}
            </SafeAreaView>
        )
    }
    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {

            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === 'password') {

            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }

                }
            };
        });
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: BASE_COLOR.blue,

    },
    mainDisplay: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,

    },
    headerContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }, logoImage: {
        height: 120,
        width: 120,
    },
    titleContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    textHeaderStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: BASE_COLOR.white
    },
    buttonsContainer: {
        marginTop: 16,
        justifyContent: 'center',
    },
    buttonSignIn: {
        height: 40,
        backgroundColor: BASE_COLOR.green,
        borderWidth: 0.5,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonRegister: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    titleBtnRegister: {
        color: BASE_COLOR.white,
        fontSize: 15,
    },
    imageStyle: {
        height: 20,
        width: 20,
        tintColor: '#FFF',
        marginRight: 20

    },
    textButtonStyle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: BASE_COLOR.white,
        fontWeight: 'bold',
        fontSize: 20,

    }

});

export default RegisterScreen;