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
import {
    ScreenName,
    MESSAGE_NO_VALIDE_INPUT_FORM
} from '../../helpers'
import { IconAssets } from '../../assets'
import { BASE_COLOR } from '../../styles';
import { validate } from '../../helpers'
import { UserNetwork } from '../../service/api'
import {
    updateUserJWT,
    fetchUserProfile,
} from '../../store/actions'
import { connect } from 'react-redux';
import Header from '../../components/common/BackHeader'
class LoginScreen extends BaseScreen {
    constructor(props) {
        super(props)
        this.title = "PRIJAVI SE";
        this.state = {
            showBackButton: false,
            loading: false,
            controls: {
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
                        minLenght: 3
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
        this.setStatusBarStyle(BASE_COLOR.backgroundBlue)

        const showBackButton = this.props.navigation.getParam('showBackButton', false)
        this.setNewStateHandler({ showBackButton })
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    apiCallSignUpHandler = (email, password) => {
        this.setNewStateHandler({ loading: true })
        UserNetwork.fetchUserLogin(email, password).then(
            res => {
                this.setNewStateHandler({ loading: false })
                this.props.updateUserJWTHandler(res)
                this.props.fetchUserProfileHandler()

                if (this.state.showBackButton == true) {
                    this.closeScreen()
                } else {
                    this.resetNavigationStack(ScreenName.MainLocationScreen())
                }
            },
            err => {
                this.setNewStateHandler({ loading: false })
                this.showAlertMessage(err)
            }
        )
    }

    onPressSignInHandler = () => {
        disabled = !this.state.controls.email.valid || !this.state.controls.password.valid
        const { controls } = this.state
        if (!disabled) {
            this.apiCallSignUpHandler(controls.email.value, controls.password.value)
        } else {
            if (controls.email.value !== '' && controls.password.value !== '') {
                if (!this.state.controls.email.valid) {

                    this.showAlertMessage("Must be email addrese.")
                } else if (!this.state.controls.password.valid) {

                    this.showAlertMessage("Password must be minumum 6 characters and include both numbers and letters.")
                }
            } else {
                this.showAlertMessage(MESSAGE_NO_VALIDE_INPUT_FORM)
            }
        }
    }
    onPressRegisterHandler = () => {
        this.pushNewScreen({ routeName: ScreenName.RegisterScreen(), key: `${Math.random() * 10000}` })
    }
    onPressSkipHandler = () => {
        this.resetNavigationStack(ScreenName.MainLocationScreen())
    }
    mainContent = () => (
        <KeyboardAwareScrollView
            style={styles.mainDisplay}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ flex: 1 }}
            scrollEnabled={false}
            bounces={false}
            keyboardShouldPersistTaps='handled'
            enableOnAndroid={false} >
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
                        placeholder='Email'
                        value={this.state.controls.email.value}
                        onChangeText={(val) => this.updateInputState('email', val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType='next'
                        onSubmitEditing={() => this.pass.getInnerRef().focus()}
                    />

                    <DefaultInput
                        placeholder='Password'
                        style={{ marginTop: 16 }}
                        value={this.state.controls.password.value}
                        onChangeText={val => this.updateInputState('password', val)}
                        valid={this.state.controls.password.valid}
                        touched={this.state.controls.password.touched}
                        secureTextEntry={true}
                        returnKeyType='done'
                        ref={(input) => this.pass = input}
                    />

                </View>
                <View style={styles.buttonsContainer}>
                    <View style={{ width: 130, margin: 8, alignSelf: 'center', }}>
                        <TouchableOpacity
                            onPress={() => this.onPressSignInHandler()}>
                            <View style={styles.buttonSignIn}>
                                <Text style={styles.textButtonStyle}>OK</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <View style={{ flex: 0.2, alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => this.onPressRegisterHandler()}>
                    <View style={styles.buttonRegister}>
                        <Text style={styles.titleBtnRegister}>Nemaš nalog?</Text>
                        <Text style={[styles.titleBtnRegister, { fontWeight: 'bold' }]}>REGISTRUJ SE</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </KeyboardAwareScrollView>

    )
    showHeaderContent = (showBackButton) => {
        if (showBackButton) {
            return (
                <Header
                    backgroundColor={BASE_COLOR.backgroundBlue} />
            )
        } else {
            return (
                <View style={styles.buttonsContainer}>
                    <View style={{ width: 130, margin: 8, alignSelf: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => this.onPressSkipHandler()}>
                            <View style={[styles.buttonSignIn, { backgroundColor: BASE_COLOR.red }]}>
                                <Text style={styles.textButtonStyle}>Preskoči</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
    render() {
        const { loading, showBackButton } = this.state
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.white) : this.mainContent();

        return (
            <SafeAreaView style={styles.mainContainer}>
                {this.showHeaderContent(showBackButton)}
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
        backgroundColor: BASE_COLOR.backgroundBlue,

    },
    mainDisplay: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,

    },
    headerContainer: {
        marginTop: 60,
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

const mapDispatchToProps = dispatch => {
    return {
        updateUserJWTHandler: (token) => dispatch(updateUserJWT(token)),
        fetchUserProfileHandler: () => dispatch(fetchUserProfile()),

    };
};


export default connect(null, mapDispatchToProps)(LoginScreen);
