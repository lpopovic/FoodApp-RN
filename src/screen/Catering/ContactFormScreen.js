import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BackHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { } from '../../helpers'
import { NAV_COLOR, BASE_COLOR } from '../../styles'
import { UserNetwork } from '../../service/api/user';


class ContactFormScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            titleText: '',
            bodyText: '',
        }
    }

    componentDidMount() {
        super.componentDidMount()
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    onPressSendRequest = () => {
        const { titleText, bodyText } = this.state
        this.setNewStateHandler({
            loading: true
        })

        UserNetwork.fetchPostUserCompanyBindings(titleText, bodyText)
            .then(
                res => {
                    this.showAlertMessage(this.props.strings.successfullySentRequest)
                    this.closeScreen()
                },
                err => {
                    this.showAlertMessage(JSON.stringify(err))
                    this.setNewStateHandler({
                        loading: false
                    })
                }
            )
    }
    validateInputForme = (title, body) => {

        if (title.trim() != '' && body.trim() != '') {
            return true
        } else {
            return false
        }


    }
    titleTextChangeHandler = (titleText) => {
        this.setNewStateHandler({
            titleText
        })
    }
    bodyTextChangeHandler = (bodyText) => {
        this.setNewStateHandler({
            bodyText
        })
    }
    titleTextContent = () => {
        const { strings } = this.props
        const text = String(strings.subject).toUpperCase()
        const { titleText } = this.state
        return (
            <View style={styles.baseContainer}>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{text}</Text>
                </View>
                <View style={{ paddingLeft: 16, paddingRight: 16, marginTop: 16 }}>
                    <TextInput
                        ref={(input) => { this.titleTextInput = input; }}
                        value={titleText}
                        onChangeText={(text) => this.titleTextChangeHandler(text)}
                        placeholder={strings.enterYourText}
                        style={{
                            fontSize: 15,
                            padding: 8,
                            marginLeft: 8,
                            marginRight: 8,
                            borderRadius: 1,
                            borderWidth: 2,
                            borderColor: BASE_COLOR.lightGray,
                            textAlignVertical: 'center'
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType={"done"}
                        onSubmitEditing={() => this.titleTextInput.blur()}
                    />
                </View>


            </View>
        )
    }
    bodyTextContent = () => {
        const { strings } = this.props
        const text = String(strings.text).toUpperCase()
        const { bodyText } = this.state
        return (
            <View style={styles.baseContainer}>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{text}</Text>
                </View>
                <View style={{ paddingLeft: 16, paddingRight: 16, marginTop: 16 }}>
                    <TextInput
                        ref={(input) => { this.bodyTextInput = input; }}
                        value={bodyText}
                        onChangeText={(text) => this.bodyTextChangeHandler(text)}
                        multiline
                        placeholder={strings.enterYourText}
                        style={{
                            fontSize: 15,
                            padding: 8,
                            marginLeft: 8,
                            marginRight: 8,
                            minHeight: 200,
                            maxHeight: 300,
                            borderRadius: 1,
                            borderWidth: 2,
                            borderColor: BASE_COLOR.lightGray,
                            textAlignVertical: "top"
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType={"done"}
                        onSubmitEditing={() => this.bodyTextInput.blur()}
                    />
                </View>


            </View>
        )
    }
    textInputContent = () => {
        return (
            <KeyboardAwareScrollView
                innerRef={ref => {
                    this.scroll = ref;
                }}
                style={styles.reviewContainer}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
                bounces={false}
                contentContainerStyle={{ flex: 1 }}
                keyboardShouldPersistTaps='handled'
                enableOnAndroid={true} >
                <>
                    {this.titleTextContent()}
                </>
                <>
                    {this.bodyTextContent()}
                </>

            </KeyboardAwareScrollView>
        )
    }
    btnSendContent = () => {
        const { titleText, bodyText } = this.state
        const { strings } = this.props
        const disabled = !this.validateInputForme(titleText, bodyText)
        return (
            <View style={styles.bottomMainContainer}>
                <TouchableOpacity
                    disabled={disabled}
                    onPress={() => this.onPressSendRequest()}>
                    <View
                        style={[styles.bottomButtonContainer,
                        disabled ? { backgroundColor: BASE_COLOR.lightGray }
                            : { backgroundColor: BASE_COLOR.blue }]}>
                        <Text style={[styles.baseText, styles.btnTitleSave]}>{String(strings.send).toUpperCase()}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    mainContent = () => {
        return (
            <View style={styles.mainContent}>
                {this.textInputContent()}
                {this.btnSendContent()}
            </View>
        )
    }
    render() {
        const { loading } = this.state
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.mainContent()
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    <Header
                        backgroundColor={NAV_COLOR.headerBackground}
                        tintColor={BASE_COLOR.darkGray}
                    />
                    {mainDisplay}
                </View>
            </SafeAreaView>
        )
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
    mainContent: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },
    bottomMainContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20
    },
    bottomButtonContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 40,
        width: 200,
        borderRadius: 8,
        backgroundColor: BASE_COLOR.blue
    },
    baseText: {
        width: '100%',
        color: BASE_COLOR.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    btnTitleSave: {
        fontSize: 17,
    },
    baseContainer: {
        marginTop: 8,
        borderBottomColor: BASE_COLOR.gray,
        borderBottomWidth: 1,
        paddingBottom: 8,
        minHeight: 50,
    },
});
const mapStateToProps = state => {
    return {
        strings: state.location.language.strings,
    };
};

export default connect(mapStateToProps, null)(ContactFormScreen);
