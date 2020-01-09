import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BtnHeader'
import PickImage from '../../components/PickImage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DefaultInput from '../../components/common/DefaultInput'
import {
    NAV_COLOR,
    BASE_COLOR,
} from '../../styles'
import { validate } from '../../helpers'
import { connect } from 'react-redux';
class UserSettingsScreen extends BaseScreen {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            image: null,
            editImage: null,
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
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        setTimeout(() => {
            this.setNewStateHandler({
                loading: false
            })
        }, 500);

        const { username, email, phoneNumber, image } = this.props.userInfo
        this.setNewStateHandler({
            editImage: image
        })
        this.updateInputState('username', username)
        this.updateInputState('phoneNumber', phoneNumber)
        this.updateInputState('email', email)

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }

    imagePickedHandler(image) {
        this.setNewStateHandler({
            image
        });
    }
    imageEditor = (image) => {

        if (image) {

            return (
                <PickImage
                    isProfile={true}
                    currentImage={image}
                    borderRadius={styles.userImage.height}
                    onImagePicked={(image) => this.imagePickedHandler(image)} />
            )
        } else {
            return (
                <PickImage
                    isProfile={true}
                    borderRadius={styles.userImage.height}
                    onImagePicked={(image) => this.imagePickedHandler(image)} />
            )
        }
    }
    infoContent = (type, text) => {
        return (
            <View style={styles.baseContainer}>
                <View style={{ flex: 4 }}>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{type}:</Text>
                </View>
                <View style={{ flex: 6 }}>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={6}
                        style={[styles.baseText, { color: BASE_COLOR.black, fontWeight: 'normal' }]}>{text}</Text>
                </View>
            </View>
        )
    }

    onSaveBtnPress = () => {
        this.setNewStateHandler({
            loading: true
        })
        setTimeout(() => {
            this.showAlertMessage("BTN SAVE PRESS COMPLETE")
            this.closeScreen()
        }, 500);
     
    }
    editContent = () => (
        <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', }}>

            <DefaultInput
                style={{ backgroundColor: BASE_COLOR.blue }}
                placeholder='Username'
                value={this.state.controls.username.value}
                onChangeText={(val) => this.updateInputState('username', val)}
                valid={this.state.controls.username.valid}
                touched={this.state.controls.username.touched}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType={"next"}
                keyboardType="email-address"
                onSubmitEditing={() => this.email.getInnerRef().focus()}
            />
            <DefaultInput
                style={{ marginTop: 16, backgroundColor: BASE_COLOR.blue }}
                placeholder='Email'
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
                onSubmitEditing={() => this.mob.getInnerRef().focus()}
            />

            <DefaultInput
                style={{ marginTop: 16, backgroundColor: BASE_COLOR.blue }}
                placeholder='Phone: 06X-XXX-XXX'
                value={this.state.controls.phoneNumber.value}
                onChangeText={(val) => this.updateInputState('phoneNumber', val)}
                valid={this.state.controls.phoneNumber.valid}
                touched={this.state.controls.phoneNumber.touched}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType={'done'}
                keyboardType='number-pad'
                ref={(input) => this.mob = input}
            />
        </View>
    )
    mainContent = () => {

        const { company, catheringIsAvailable, catheringOptions } = this.props.userInfo

        return (
            <KeyboardAwareScrollView
                style={styles.mainDisplay}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                keyboardShouldPersistTaps='handled'
                enableOnAndroid={true} >
                <View style={{
                    flex: 1,
                    padding: 16,
                    paddingTop: 8,
                }}>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View
                            style={styles.userImage}>
                            {this.imageEditor(this.state.editImage)}
                        </View>

                    </View>
                    {this.editContent()}
                    {this.infoContent("Company", company ? company.name : 'Unavailable')}
                    {this.infoContent("Cathering", catheringIsAvailable != true ? 'Unavailable' : 'Available')}
                    {this.infoContent("Cathering Options", `Balance: 3000.00${`\n`}Reserve: 500.00`)}

                </View>
            </KeyboardAwareScrollView>
        )
    }
    render() {
        const { loading } = this.state
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.mainContent()
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    <Header
                        tintColor={BASE_COLOR.darkGray}
                        title={'Back'}
                        btnTitle={'Save'}
                        btnPress={() => this.onSaveBtnPress()}
                        backgroundColor={NAV_COLOR.headerBackground} />
                    {mainDisplay}
                </View>
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
    safeAreaHeader: {
        backgroundColor: NAV_COLOR.headerBackground,
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: BASE_COLOR.white
    },
    userImage: {
        height: 150,
        aspectRatio: 1,
        borderColor: BASE_COLOR.blue,
        borderRadius: 75,
        backgroundColor: BASE_COLOR.blue,
        overflow: 'hidden'
    },
    baseContainer: {
        flex: 10,
        marginTop: 8,
        flexDirection: 'row',
        // alignItems: 'center',
        borderBottomColor: BASE_COLOR.gray,
        borderBottomWidth: 1,
        paddingBottom: 8,
        minHeight: 35,
    },
    baseText: {
        width: '100%',
        color: BASE_COLOR.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
});
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, null)(UserSettingsScreen);