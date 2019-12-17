import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '../../components/common/BackHeader'
import StarRating from 'react-native-star-rating';


import {
    BASE_COLOR,
    NAV_COLOR,
    STAR_COLOR
} from '../../styles'


class ReviewScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.bottomBtnTitle = 'POŠALJI'
        this.state = {
            loading: false,
            avgRating: 0,
            textReview: '',
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    validateInputForme = (avgRating, textReview) => {

        if (avgRating > 0 && textReview.trim() != '') {
            return true
        } else {
            return false
        }


    }
    onSaveChangesBtnPress = () => {
        const { avgRating, textReview } = this.state
        if (this.validateInputForme(avgRating, textReview) == true) {
            this.setNewStateHandler({
                loading: true
            })
            setTimeout(() => {
                this.setNewStateHandler({
                    loading: false
                })
            }, 1000);
        }
    }

    onStarRatingPress(rating) {
        this.setNewStateHandler({
            avgRating: rating
        });
    }
    ratingContent = () => {
        const text = 'RATING'
        const { avgRating } = this.state
        return (
            <View style={styles.baseContainer}>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text
                        style={[styles.baseText, { color: BASE_COLOR.black }]}>
                        {text}
                    </Text>
                </View>
                <View style={{ paddingLeft: 16, paddingRight: 16, marginTop: 16, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={avgRating}
                        starSize={50}
                        halfStarEnabled={true}
                        emptyStarColor={BASE_COLOR.lightGray}
                        fullStarColor={STAR_COLOR}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                    <Text
                        style={[styles.baseText, { color: BASE_COLOR.black }]}>
                        {avgRating.toFixed(1)} / 5.0
                        </Text>
                </View>
            </View>
        )
    }
    reviewTextChangeHandler = (text) => {
        this.setNewStateHandler({
            textReview: text
        })
    }
    reviewTextContent = () => {
        const text = 'REVIEW TEXT'
        const { textReview } = this.state
        return (
            <View style={styles.baseContainer}>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{text}</Text>
                </View>
                <View style={{ paddingLeft: 16, paddingRight: 16, marginTop: 16 }}>
                    <TextInput
                        ref={(input) => { this.reviewTextInput = input; }}
                        value={textReview}
                        onChangeText={(text) => this.reviewTextChangeHandler(text)}
                        multiline
                        placeholder={"Unesite vaš tekst."}
                        style={{
                            fontSize: 15,
                            padding: 8,
                            marginLeft: 8,
                            marginRight: 8,
                            minHeight: 150,
                            maxHeight: 200,
                            borderRadius: 1,
                            borderWidth: 2,
                            borderColor: BASE_COLOR.lightGray,
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType={"done"}
                        onSubmitEditing={() => this.reviewTextInput.blur()}
                    />
                </View>


            </View>
        )
    }
    reviewContent = () => {
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
                    {this.ratingContent()}
                </>
                <>
                    {this.reviewTextContent()}
                </>

            </KeyboardAwareScrollView>
        )
    }
    mainContent = () => {
        const { avgRating, textReview } = this.state
        const disabled = !this.validateInputForme(avgRating, textReview)
        return (
            <View style={styles.mainContainer}>
                {this.reviewContent()}
                <View style={styles.bottomMainContainer}>
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={() => this.onSaveChangesBtnPress()}>
                        <View
                            style={[styles.bottomButtonContainer,
                            disabled ? { backgroundColor: BASE_COLOR.lightGray }
                                : { backgroundColor: BASE_COLOR.blue }]}>
                            <Text style={[styles.baseText, styles.btnTitleSave]}>{this.bottomBtnTitle}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
    mainDisplay: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,

    },
    baseContainer: {
        marginTop: 8,
        // justifyContent: 'space-between',
        // flexDirection: 'row',
        // alignItems: 'center',
        borderBottomColor: BASE_COLOR.gray,
        borderBottomWidth: 1,
        paddingBottom: 8,
        minHeight: 50,
    },
    textReviewContainer: {
        marginTop: 8,
        // justifyContent: 'space-between',
        // flexDirection: '',
        // alignItems: 'center',
        borderBottomColor: BASE_COLOR.gray,
        borderBottomWidth: 1,
        paddingBottom: 8,
        minHeight: 50,
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
    reviewContainer: {
        flex: 1,
        marginLeft: 16,
        marginRight: 16,
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

});


export default ReviewScreen;