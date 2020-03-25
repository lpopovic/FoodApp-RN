import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BaseScreen from '../BaseScreen/BaseScreen';
import SafeAreaView from 'react-native-safe-area-view';
import DefaultInput from '../../components/common/DefaultInput'
import Header from '../../components/common/BackHeader'
import { MESSAGE_NO_VALIDE_INPUT_FORM } from '../../helpers'
import { IconAssets } from '../../assets'
import { BASE_COLOR } from '../../styles';
import { validate } from '../../helpers'
import { UserNetwork } from '../../service/api'

class RegisterScreen extends BaseScreen {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            controls: {
                firstName: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true
                    },
                    touched: false
                },
                lastName: {
                    value: "",
                    valid: false,
                    validationRules: {
                        notEmpty: true
                    },
                    touched: false
                },
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
                },
                phoneNumber: {
                    value: "",
                    valid: false,
                    validationRules: {
                        isPhone: true
                    },
                    touched: false
                },
            }
        }
    }


    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(BASE_COLOR.backgroundBlue)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    apiCallSignUpHandler = (email, password, username, phoneNumber, firstName, lastName) => {
        this.setNewStateHandler({ loading: true })
        UserNetwork.fetchUserRegister(username, email, password, phoneNumber, firstName, lastName)
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
        const { strings } = this.props
        const disabled = !this.state.controls.email.valid ||
            !this.state.controls.password.valid ||
            !this.state.controls.confirmPassword.valid ||
            !this.state.controls.username.valid ||
            !this.state.controls.phoneNumber.valid ||
            !this.state.controls.firstName.valid ||
            !this.state.controls.lastName.valid

        const { controls } = this.state
        if (!disabled) {

            this.apiCallSignUpHandler(controls.email.value, controls.password.value, controls.username.value, controls.phoneNumber.value, controls.firstName.value, controls.lastName.value)
        } else {
            if (controls.email.value !== '' &&
                controls.password.value !== '' &&
                controls.confirmPassword.value !== '' &&
                controls.username.value !== '' &&
                controls.phoneNumber.value !== '') {
                if (!this.state.controls.email.valid) {

                    this.showAlertMessage(strings.notValideEmailAddrese)
                } else if (!this.state.controls.password.valid) {

                    this.showAlertMessage(strings.passwordMustBeMinumum)
                } else if (!this.state.controls.confirmPassword.valid) {
                    this.showAlertMessage(strings.rePasswordAreNotTheSame)
                } else if (!this.state.controls.username.valid) {
                    this.showAlertMessage(strings.usernameNotValidateMinumum)
                } else if (!this.state.controls.phoneNumber.valid) {
                    this.showAlertMessage(strings.phoneNumberNotValide)
                } else if (!this.state.controls.firstName.valid) {
                    this.showAlertMessage(strings.firstNameNotValide)
                } else if (!this.state.controls.lastName.valid) {
                    this.showAlertMessage(strings.lastNameNotValide)
                }
            } else {
                alert(strings.allFieldsAreRequired)
            }
        }

    }

    mainContent = () => {
        const { strings } = this.props
        return (
            <KeyboardAwareScrollView
                style={styles.mainDisplay}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                bounces={false}
                keyboardShouldPersistTaps='handled'
                enableOnAndroid={true} >
                <View style={{ flex: 0.8 }}>

                    <View style={styles.headerContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.textHeaderStyle}>{String(strings.createAnAccount).toUpperCase()}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center' }}>

                        <DefaultInput
                            placeholder={strings.username}
                            value={this.state.controls.username.value}
                            onChangeText={(val) => this.updateInputState('username', val)}
                            valid={this.state.controls.username.valid}
                            touched={this.state.controls.username.touched}
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType={"next"}
                            // keyboardType="email-address"
                            onSubmitEditing={() => this.firstName.getInnerRef().focus()}
                        />
                        <DefaultInput
                            style={{ marginTop: 16 }}
                            placeholder={strings.firstName}
                            value={this.state.controls.firstName.value}
                            onChangeText={(val) => this.updateInputState('firstName', val)}
                            valid={this.state.controls.firstName.valid}
                            touched={this.state.controls.firstName.touched}
                            autoCapitalize="none"
                            autoCorrect={false}
                            // keyboardType="email-address"
                            returnKeyType={"next"}
                            textContentType='none'
                            ref={(input) => this.firstName = input}
                            onSubmitEditing={() => this.lastName.getInnerRef().focus()}
                        />
                        <DefaultInput
                            style={{ marginTop: 16 }}
                            placeholder={strings.lastName}
                            value={this.state.controls.lastName.value}
                            onChangeText={(val) => this.updateInputState('lastName', val)}
                            valid={this.state.controls.lastName.valid}
                            touched={this.state.controls.lastName.touched}
                            autoCapitalize="none"
                            autoCorrect={false}
                            // keyboardType="email-address"
                            returnKeyType={"next"}
                            textContentType='none'
                            ref={(input) => this.lastName = input}
                            onSubmitEditing={() => this.email.getInnerRef().focus()}
                        />
                        <DefaultInput
                            style={{ marginTop: 16 }}
                            placeholder={strings.email}
                            value={this.state.controls.email.value}
                            onChangeText={(val) => this.updateInputState('email', val)}
                            valid={this.state.controls.email.valid}
                            touched={this.state.controls.email.touched}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            returnKeyType={"next"}
                            textContentType='none'
                            ref={(input) => this.email = input}
                            onSubmitEditing={() => this.pass.getInnerRef().focus()}
                        />
                        <DefaultInput
                            placeholder={strings.choosePassword}
                            style={{ marginTop: 16 }}
                            value={this.state.controls.password.value}
                            onChangeText={val => this.updateInputState('password', val)}
                            valid={this.state.controls.password.valid}
                            touched={this.state.controls.password.touched}
                            returnKeyType={"next"}
                            secureTextEntry={true}
                            textContentType='none'
                            ref={(input) => this.pass = input}
                            onSubmitEditing={() => this.confirmPass.getInnerRef().focus()}
                        />
                        <DefaultInput
                            placeholder={strings.confirmPassword}
                            style={{ marginTop: 16 }}
                            value={this.state.controls.confirmPassword.value}
                            onChangeText={val => this.updateInputState('confirmPassword', val)}
                            valid={this.state.controls.confirmPassword.valid}
                            touched={this.state.controls.confirmPassword.touched}
                            returnKeyType={"next"}
                            secureTextEntry={true}
                            textContentType='none'
                            ref={(input) => this.confirmPass = input}
                            onSubmitEditing={() => this.phoneNumber.getInnerRef().focus()}
                        />
                        <DefaultInput
                            style={{ marginTop: 16 }}
                            placeholder={strings.phonePlaceholder}
                            value={this.state.controls.phoneNumber.value}
                            onChangeText={(val) => this.updateInputState('phoneNumber', val)}
                            valid={this.state.controls.phoneNumber.valid}
                            touched={this.state.controls.phoneNumber.touched}
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType={"done"}
                            keyboardType='number-pad'
                            ref={(input) => this.phoneNumber = input}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />

                    </View>
                    <View style={styles.buttonsContainer}>
                        <View style={{ width: 130, margin: 8, alignSelf: 'center', }}>
                            <TouchableOpacity
                                onPress={() => this.onPressRegisterHandler()}>
                                <View style={styles.buttonSignIn}>
                                    <Text style={styles.textButtonStyle}>{String(strings.ok).toUpperCase()}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </KeyboardAwareScrollView>

        )
    }

    render() {
        const { loading } = this.state
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.white) : this.mainContent();

        return (
            <SafeAreaView style={styles.mainContainer}>
                <Header
                    backgroundColor={BASE_COLOR.backgroundBlue} />
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
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
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
const mapStateToProps = state => {
    return {
        strings: state.location.language.strings,
    };
};

export default connect(mapStateToProps, null)(RegisterScreen);
