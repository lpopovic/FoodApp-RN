import React, { Component } from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import BaseScreen from '../BaseScreen/BaseScreen';
import Header from '../../components/common/BtnHeader'
import StarRating from 'react-native-star-rating';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { NAV_COLOR, BASE_COLOR, STAR_COLOR } from '../../styles'
import { IconAssets } from '../../assets';

import { connect } from 'react-redux';
import { updateSearchFilter } from '../../store/actions'
class FilterScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
    };

    constructor(props) {
        super(props)
        this.bottomBtnTitle = "Sačuvaj izmene"
        this.state = {
            avgRating: 0.5,
            avgPriceTag: 0,
            rangeValue: 10,
            delivery: true,
            pickup: true,
            deliveryTime: 2,
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
        this.getFilterValueFromReducer()

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }

    getFilterValueFromReducer = () => {
        const { filter } = this.props
        this.setNewStateHandler({
            avgRating: filter.avgRating,
            avgPriceTag: filter.avgPriceTag,
            rangeValue: filter.rangeValue,
            delivery: filter.delivery,
            pickup: filter.pickup,
        })
    }
    resetFilterValue = () => {
        this.setNewStateHandler({
            pickup: false,
            delivery: false,
            avgRating: 1,
            avgPriceTag: 4,
            rangeValue: 10,
        })
    }
    onStarRatingPress(rating) {
        this.setNewStateHandler({
            avgRating: rating
        });
    }
    onPriceTagPress(tag) {
        this.setNewStateHandler({
            avgPriceTag: tag
        });
    }
    onResetBtnPress = () => {
        this.resetFilterValue()
    }

    onSaveChangesBtnPress = () => {
        const filterData = this.props.navigation.getParam('filter', null)

        if (filterData != null) {
            this.closeScreen()
            filterData()
            this.props.updateSearchFilterHandler(this.state)
        }


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
                        rating={this.state.avgRating ? this.state.avgRating : 0}
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
    pickupContent = () => {
        const text = 'PICKUP'
        const { pickup } = this.state
        return (
            <View style={styles.baseContainer}>
                <View>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{text}</Text>
                </View>
                <TouchableOpacity onPress={() => this.setNewStateHandler({ pickup: !pickup })}>
                    <View style={{ width: 32, aspectRatio: 1, borderRadius: 16, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: BASE_COLOR.white, borderColor: BASE_COLOR.gray, borderWidth: 2 }}>

                        <View style={{ width: 20, aspectRatio: 1, borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: pickup == true ? BASE_COLOR.blue : BASE_COLOR.gray, borderColor: BASE_COLOR.gray, borderWidth: 2 }}>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    deliveryContent = () => {
        const text = 'DELIVERY'
        const { delivery } = this.state
        return (
            <View style={styles.baseContainer}>
                <View>
                    <Text style={[styles.baseText, { color: BASE_COLOR.black }]}>{text}</Text>
                </View>
                <TouchableOpacity onPress={() => this.setNewStateHandler({ delivery: !delivery })}>
                    <View style={{ width: 32, aspectRatio: 1, borderRadius: 16, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: BASE_COLOR.white, borderColor: BASE_COLOR.gray, borderWidth: 2 }}>

                        <View style={{ width: 20, aspectRatio: 1, borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: delivery == true ? BASE_COLOR.blue : BASE_COLOR.gray, borderColor: BASE_COLOR.gray, borderWidth: 2 }}>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    priceContent = () => {
        const text = 'PRICE'
        const { avgPriceTag } = this.state
        return (
            <View style={styles.baseContainer}>
                <View>
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
    rangeContent = () => {
        const text = 'RANGE'
        const { rangeValue } = this.state
        return (
            <View style={[styles.baseContainer, { flexDirection: 'column' }]}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{ width: '50%', }}>
                        <Text style={[styles.baseText, { color: BASE_COLOR.black, textAlign: 'left' }]}>{text}</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={[styles.baseText, { color: BASE_COLOR.black, textAlign: 'right' }]}>{rangeValue} km</Text>
                    </View>
                </View>
                <MultiSlider
                    marker={{ backgroundColor: BASE_COLOR.red }}
                    selectedStyle={{
                        backgroundColor: BASE_COLOR.blue
                    }}
                    unselectedStyle={{
                        backgroundColor: BASE_COLOR.gray,
                    }}
                    values={[rangeValue]}
                    onValuesChangeFinish={(values) => this.setNewStateHandler({ rangeValue: values[0] })}
                    min={0}
                    max={31}
                    step={1}
                    sliderLength={Dimensions.get('screen').width - 50}
                    trackStyle={{
                        height: 4,
                    }}
                    customMarker={CustomMarker}

                />
            </View>
        )
    }
    deliveryTimeContent = () => {
        const text = 'DELIVERY TIME'
        const { deliveryTime } = this.state
        let deliveryTimeText = ''
        switch (deliveryTime) {
            case 0:
                deliveryTimeText = '45'
                break
            case 1:
                deliveryTimeText = '60'
                break
            case 2:
                deliveryTimeText = 'any'
                break
            default:

                break
        }
        return (
            <View style={[styles.baseContainer, { flexDirection: 'column' }]}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{ width: '50%', }}>
                        <Text style={[styles.baseText, { color: BASE_COLOR.black, textAlign: 'left' }]}>{text}</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={[styles.baseText, { color: BASE_COLOR.black, textAlign: 'right' }]}>{deliveryTimeText} min</Text>
                    </View>
                </View>
                <MultiSlider
                    marker={{ backgroundColor: BASE_COLOR.red }}
                    selectedStyle={{
                        backgroundColor: BASE_COLOR.blue
                    }}
                    unselectedStyle={{
                        backgroundColor: BASE_COLOR.gray,
                    }}
                    values={[deliveryTime]}
                    onValuesChangeFinish={(values) => this.setNewStateHandler({ deliveryTime: values[0] })}
                    snapped={true}
                    optionsArray={[0, 1, 2]}
                    sliderLength={Dimensions.get('screen').width - 50}
                    trackStyle={{
                        height: 4,
                    }}
                    customMarker={CustomMarker}

                />
            </View>
        )
    }
    scrollViewContent = () => {
        return (
            <View style={styles.scrollViewContainer}>

                <>
                    {this.ratingContent()}
                </>
                {/* <>
                    {this.pickupContent()}
                </>
                <>
                    {this.deliveryContent()}
                </> */}
                <>
                    {this.priceContent()}
                </>
                <>
                    {this.rangeContent()}
                </>
                <>
                    {this.deliveryTimeContent()}
                </>

            </View>
        )
    }
    mainContent = () => {

        return (
            <View style={styles.mainContainer}>
                <View style={styles.filterContainer}>
                    <ScrollView bounces={false}>
                        {this.scrollViewContent()}
                    </ScrollView>

                </View>
                <View style={styles.bottomMainContainer}>
                    <TouchableOpacity onPress={() => this.onSaveChangesBtnPress()}>
                        <View style={styles.bottomButtonContainer}>
                            <Text style={[styles.baseText, styles.btnTitleSave]}>{this.bottomBtnTitle}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render() {
        const mainDisplay = this.mainContent()
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    <Header
                        tintColor={BASE_COLOR.darkGray}
                        // title={'Filter'}
                        title={'Back'}
                        btnTitle={'Reset'}
                        btnPress={() => this.onResetBtnPress()}
                        backgroundColor={NAV_COLOR.headerBackground} />
                    {mainDisplay}
                </View>
            </SafeAreaView>
        )
    }
}

class CustomMarker extends Component {
    render() {
        const { markerImage } = styles
        return (
            <Image
                style={markerImage}
                source={IconAssets.sliderMarkerIcon}
                resizeMode="contain"
            />
        );
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
    markerImage: {
        width: 30,
        height: 30,
        tintColor: BASE_COLOR.blue,
        backgroundColor: BASE_COLOR.white,
        borderRadius: 15
    }
});


const mapStateToProps = state => {
    return {
        filter: state.filter.filter,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSearchFilterHandler: (filter) => dispatch(updateSearchFilter(filter)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen);