import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import BaseScreen from '../BaseScreen/BaseScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '../../components/common/BackHeader'
import StarRating from 'react-native-star-rating';

import {
    BASE_COLOR,
    NAV_COLOR,
    STAR_COLOR
} from '../../styles'
import { Order } from '../../model';
import { ReviewNetwork } from '../../service/api';


class ReviewScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            avgRating: 0,
            textReview: '',
            avgPriceTag: 0,
            order: new Order({})
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)

        const order = this.props.navigation.getParam('order', null)
        if (order !== null) {
            this.setNewStateHandler({
                order
            })
        }


    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    validateInputForme = (avgRating, textReview, avgPriceTag) => {

        if (avgRating > 0 && textReview.trim() != '' && avgPriceTag > 0) {
            return true
        } else {
            return false
        }


    }
    onSaveChangesBtnPress = () => {
        const { avgRating, textReview, avgPriceTag, order } = this.state
        if (this.validateInputForme(avgRating, textReview, avgPriceTag) == true) {
            this.setNewStateHandler({
                loading: true
            })

            ReviewNetwork.fetchPostCreateReview(textReview, avgRating, avgPriceTag, order._id, order.place._id)
                .then(
                    result => {
                        this.showAlertMessage(result)
                        this.closeScreen()
                    },
                    error => {
                        this.showAlertMessage(error)
                        this.setNewStateHandler({
                            loading: false
                        })
                    }
                )
        }
    }

    onStarRatingPress(rating) {
        this.setNewStateHandler({
            avgRating: rating
        });
    }
    ratingContent = () => {
        const text = String(this.props.strings.rating).toUpperCase()
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
    onPriceTagPress(tag) {
        this.setNewStateHandler({
            avgPriceTag: tag
        });
    }
    priceContent = () => {
        const text = String(this.props.strings.priceTag).toUpperCase()
        const { avgPriceTag } = this.state
        return (
            <View style={styles.baseContainer}>
                <View style={{ alignSelf: 'flex-start', marginBottom: 16 }}>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{text}</Text>
                </View>
                <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => this.onPriceTagPress(1)}>
                        <View style={[styles.priceTagContainer, { backgroundColor: avgPriceTag >= 1 ? BASE_COLOR.blue : BASE_COLOR.gray }]}>
                            <Text style={styles.priceTagText}>$$</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPriceTagPress(2)}>
                        <View style={[styles.priceTagContainer, { backgroundColor: avgPriceTag >= 2 ? BASE_COLOR.blue : BASE_COLOR.gray }]}>
                            <Text style={styles.priceTagText}>$$$</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPriceTagPress(3)}>
                        <View style={[styles.priceTagContainer, { backgroundColor: avgPriceTag >= 3 ? BASE_COLOR.blue : BASE_COLOR.gray }]}>
                            <Text style={styles.priceTagText}>$$$$</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPriceTagPress(4)}>
                        <View style={[styles.priceTagContainer, { backgroundColor: avgPriceTag >= 4 ? BASE_COLOR.blue : BASE_COLOR.gray }]}>
                            <Text style={styles.priceTagText}>$$$$$</Text>
                        </View>
                    </TouchableOpacity>
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
        const { strings } = this.props
        const text = String(strings.reviewText).toUpperCase()
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
                        placeholder={strings.enterYourText}
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
                            textAlignVertical: "top"
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
                    {this.priceContent()}
                </>
                <>
                    {this.reviewTextContent()}
                </>

            </KeyboardAwareScrollView>
        )
    }
    mainContent = () => {
        const { strings } = this.props
        const { avgRating, textReview, avgPriceTag } = this.state
        const disabled = !this.validateInputForme(avgRating, textReview, avgPriceTag)
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
                            <Text style={[styles.baseText, styles.btnTitleSave]}>{String(strings.send).toUpperCase()}</Text>
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
        strings: state.location.language.strings,
    };
};

export default connect(mapStateToProps, null)(ReviewScreen);
