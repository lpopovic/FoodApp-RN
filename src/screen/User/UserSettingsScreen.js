import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
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
import { validate, ScreenName } from '../../helpers'
import { connect } from 'react-redux';
import { saveLanguageSetup } from '../../store/actions'
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
            languages: [{ text: 'Srpski', name: 'srb' }, { text: 'English', name: 'en' }],
            currentLanguage: props.language,
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
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        setTimeout(() => {
            this.setNewStateHandler({
                loading: false
            })
        }, 500);

        const { username, email, phoneNumber, image, name, lastName } = this.props.userInfo
        this.setNewStateHandler({
            editImage: image
        })
        this.updateInputState('username', username)
        this.updateInputState('phoneNumber', phoneNumber)
        this.updateInputState('email', email)
        this.updateInputState('firstName', name)
        this.updateInputState('lastName', lastName)

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
        if (this.props.language === this.state.currentLanguage) {

            setTimeout(() => {
                this.showAlertMessage("BTN SAVE PRESS COMPLETE")
                this.closeScreen()
            }, 500);
        } else {
            this.props.saveLanguageSetupHandler(this.state.currentLanguage)
            setTimeout(() => {
                this.resetNavigationStack(ScreenName.TabNavigatorScreen())
            }, 500);
        }
    }
    editContent = () => {
        const { strings } = this.props
        return (
            <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', }}>

                <DefaultInput
                    style={{ backgroundColor: BASE_COLOR.blue }}
                    placeholder={strings.username}
                    value={this.state.controls.username.value}
                    onChangeText={(val) => this.updateInputState('username', val)}
                    valid={this.state.controls.username.valid}
                    touched={this.state.controls.username.touched}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType={"next"}
                    keyboardType="email-address"
                    onSubmitEditing={() => this.firstName.getInnerRef().focus()}
                />
                <DefaultInput
                    style={{ marginTop: 16, backgroundColor: BASE_COLOR.blue }}
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
                    style={{ marginTop: 16, backgroundColor: BASE_COLOR.blue }}
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
                    style={{ marginTop: 16, backgroundColor: BASE_COLOR.blue }}
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
                    onSubmitEditing={() => this.mob.getInnerRef().focus()}
                />

                <DefaultInput
                    style={{ marginTop: 16, backgroundColor: BASE_COLOR.blue }}
                    placeholder={strings.phonePlaceholder}
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
    }
    languageContent = () => {
        const text = `${String(this.props.strings.chooseLanguage)}:`
        const { languages, currentLanguage } = this.state
        return (
            <View style={{
                marginTop: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: BASE_COLOR.gray,
                borderBottomWidth: 1,
                paddingBottom: 8,
                minHeight: 50,
            }}>
                <View>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{text}</Text>
                </View>
                <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.setNewStateHandler({ currentLanguage: languages[0].name })}>
                        <View style={[styles.priceTagContainer, { backgroundColor: currentLanguage == languages[0].name ? BASE_COLOR.blue : BASE_COLOR.gray }]}>
                            <Text style={styles.priceTagText}>{languages[0].text}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setNewStateHandler({ currentLanguage: languages[1].name })}>
                        <View style={[styles.priceTagContainer, { backgroundColor: currentLanguage == languages[1].name ? BASE_COLOR.blue : BASE_COLOR.gray }]}>
                            <Text style={styles.priceTagText}>{languages[1].text}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    mainContent = () => {
        const { strings } = this.props
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
                    padding: 8,
                    paddingTop: 8,
                }}>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View
                            style={styles.userImage}>
                            {this.imageEditor(this.state.editImage)}
                        </View>

                    </View>
                    {this.editContent()}
                    {this.infoContent(strings.company, company ? company.name : strings.unavailable)}
                    {this.infoContent(strings.catering, catheringIsAvailable != true ? strings.unavailable : strings.available)}
                    {catheringIsAvailable != true ? null : this.infoContent(strings.cateringOptions,
                        `${strings.package}: ${catheringOptions.package}${`\n`}${strings.balance}: ${catheringOptions.balance != null ? Number(catheringOptions.balance).toFixed(2)
                            : catheringOptions.balance}${`\n`}${strings.reserved}: ${Number(catheringOptions.reserved).toFixed(2)}`)}
                    {this.languageContent()}
                </View>
            </KeyboardAwareScrollView>
        )
    }
    render() {
        const { loading } = this.state
        const { strings } = this.props
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.mainContent()
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    <Header
                        tintColor={BASE_COLOR.darkGray}
                        title={strings.back}
                        btnTitle={strings.save}
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
    priceTagContainer: {
        backgroundColor: BASE_COLOR.gray,
        width: 60,
        height: 25,
        margin: 4,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceTagText: {
        color: BASE_COLOR.white,
        fontSize: 11
    },
});
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        strings: state.location.language.strings,
        language: state.location.language.name,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveLanguageSetupHandler: (language) => dispatch(saveLanguageSetup(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsScreen);