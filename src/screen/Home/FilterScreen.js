import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BtnHeader'
import StarRating from 'react-native-star-rating';
import { NAV_COLOR, BASE_COLOR, STAR_COLOR } from '../../styles'
import { IconAssets } from '../../assets';
import { ScrollView } from 'react-native-gesture-handler';

class FilterScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.bottomBtnTitle = "Sačuvaj izmene"
        this.state = {
            loading: false,
            ratingCount: 0.5,
            priceTag: 0,
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        this.setNewStateHandler({ loading: true })

        setTimeout(() => {
            this.setNewStateHandler({ loading: false })
        }, 1000);

        // const filterData = this.props.navigation.getParam('filter', null)
        // setTimeout(() => {
        //     if (filterData) {
        //         this.closeScreen()
        //         filterData()
        //     }

        // }, 15000);

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    onStarRatingPress(rating) {
        this.setNewStateHandler({
            ratingCount: rating
        });
    }
    onPriceTagPress(tag) {
        this.setNewStateHandler({
            priceTag: tag
        });
    }
    onResetBtnPress = () => {
        this.setNewStateHandler({
            priceTag: 0,
            ratingCount:0,
        });
    }
    ratingContent = () => {
        const text = 'RATING'
        return (
            <View style={styles.baseContainer}>
                <View>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{text}</Text>
                </View>
                <View style={{ width: 210, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.ratingCount ? this.state.ratingCount : 0}
                        starSize={40}
                        halfStarEnabled={true}
                        emptyStarColor={BASE_COLOR.lightGray}
                        fullStarColor={STAR_COLOR}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                </View>
            </View>
        )
    }
    openNowContent = () => {
        const text = 'OPEN NOW'
        return (
            <View style={styles.baseContainer}>
                <View>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{text}</Text>
                </View>
                <View style={{ width: 32, aspectRatio: 1, borderRadius: 16, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: BASE_COLOR.white, borderColor: BASE_COLOR.gray, borderWidth: 2 }}>

                    <View style={{ width: 20, aspectRatio: 1, borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: BASE_COLOR.blue, borderColor: BASE_COLOR.gray, borderWidth: 2 }}>
                    </View>

                </View>
            </View>
        )
    }
    priceContent = () => {
        const text = 'PRICE'
        const { priceTag } = this.state
        return (
            <View style={styles.baseContainer}>
                <View>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{text}</Text>
                </View>
                <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <TouchableOpacity onPress={() => this.onPriceTagPress(0)}>
                        <View style={[styles.priceTagContainer, { backgroundColor: priceTag >= 0 ? BASE_COLOR.blue : BASE_COLOR.gray }]}>
                            <Text style={styles.priceTagText}>$$</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPriceTagPress(1)}>
                        <View style={[styles.priceTagContainer, { backgroundColor: priceTag >= 1 ? BASE_COLOR.blue : BASE_COLOR.gray }]}>
                            <Text style={styles.priceTagText}>$$$</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPriceTagPress(2)}>
                        <View style={[styles.priceTagContainer, { backgroundColor: priceTag >= 2 ? BASE_COLOR.blue : BASE_COLOR.gray }]}>
                            <Text style={styles.priceTagText}>$$$$</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPriceTagPress(3)}>
                        <View style={[styles.priceTagContainer, { backgroundColor: priceTag >= 3 ? BASE_COLOR.blue : BASE_COLOR.gray }]}>
                            <Text style={styles.priceTagText}>$$$$$</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    mainContent = () => {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.filterContainer}>
                    <ScrollView bounces={false}>
                        <View style={styles.scrollViewContainer}>
                            <>
                                {this.ratingContent()}
                            </>
                            <>
                                {this.openNowContent()}
                            </>
                            <>
                                {this.priceContent()}
                            </>
                        </View>
                    </ScrollView>

                </View>
                <View style={styles.bottomMainContainer}>
                    <TouchableOpacity onPress={() => alert("Press save")}>
                        <View style={styles.bottomButtonContainer}>
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
                        tintColor={BASE_COLOR.darkGray}
                        title={'Filter'}
                        btnTitle={'Reset'}
                        btnPress={() => this.onResetBtnPress()}
                        backgroundColor={NAV_COLOR.headerBackground} />
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
    filterContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    scrollViewContainer: {
        flex: 1,
        padding: 16,
        paddingTop: 8,
    },
    bottomMainContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: BASE_COLOR.gray,
        borderBottomWidth: 1,
        paddingBottom: 8,
        minHeight: 50,
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


export default FilterScreen;