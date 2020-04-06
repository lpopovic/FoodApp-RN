import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { ScreenName, LANGUAGE_KEY } from '../../helpers'
import BaseScreen from "../BaseScreen/BaseScreen"
import PlaceCard from '../../components/Catering/PlaceCard';
import PlaceList from '../../components/Catering/PlaceList';
import DishList from '../../components/Catering/DishList';
import DishCard from '../../components/Catering/DishCard';
import CalendarStrip from 'react-native-calendar-strip';
import { CatheringNetwork, UserNetwork } from '../../service/api'
import Moment from 'moment';
import { connect } from 'react-redux';
import { updateUserProfile, userLogOut } from '../../store/actions';
import { BASE_COLOR, NAV_COLOR } from '../../styles';
import { ImageAssets } from '../../model/image';
import { MenuItem, Place } from '../../model';
import RecentOrders from '../../components/Catering//RecentOrders'
import UrlOpen from '../../components/common/UrlOpen';

class CateringScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            loading: true,
            isCatheringAvailable: null,
            selectedDate: Moment().format('YYYY-MM-DD'),
            markedDates: [],
            placesCathering: [],
            ordersForWeek: [],
            ordersForDay: [],
            places: [],
            balance: null,
            recentMenuItemsOrder: []
        }
        if (props.language == LANGUAGE_KEY.EN) {
            Moment.locale('en')
        } else if (props.language == LANGUAGE_KEY.SRB) {
            Moment.locale('Latinica', {
                months: 'Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar'.split('_'),
                monthsShort: 'Jan_Feb_Mar_Apr_Maj_Jun_Jul_Avg_Sep_Okt_Nov_Dec'.split('_'),
                weekdays: 'Ponedeljak_Utorak_Sreda_Četvrtak_Petak_Subota_Nedelja'.split('_'),
                weekdaysShort: 'NED_PON_UTO_SRE_ČET_PET_SUB'.split('_'),
                weekdaysMin: 'PO_UT_SR_ČE_PE_SU_NE'.split('_'),
                weekdaysParseExact: true,
            });
        }



    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)

        // this.apiDidMountFunction()
        // if (this.props.isLogin) {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            // alert(this.props.isLogin)
            const { isLogin } = this.props
            if (isLogin == true) {
                this.apiDidMountFunction()
            }
        })
        // }
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        this.focusListener.remove();
    }

    apiCallGetOrdersBetweenDates = async (isDay, fromDate, toDate) => {
        this.setNewStateHandler({
            loading: true,
        })
        CatheringNetwork.fetchCatheringOrderFromDateToDate(fromDate, toDate).then(
            res => {

                isDay ?
                    (
                        res.push({ addDish: true }),
                        this.setNewStateHandler({
                            loading: false,
                            ordersForDay: res
                        })
                    )
                    :
                    (
                        this.markDatesHandler(res),
                        this.setNewStateHandler({
                            loading: false,
                            ordersForWeek: res
                        })
                    )
                console.log(res)
            },
            err => {
                this.showAlertMessage(err)
                this.setNewStateHandler({
                    loading: false,
                })
            }
        )

        if (isDay) {
            if (Moment(fromDate).isAfter(Moment().subtract(1, 'day')) &&
                Moment(toDate).isAfter(Moment().subtract(1, 'day'))) {

                CatheringNetwork.fetchCatheringOrderFromDateToDateByCompany(fromDate, toDate, this.props.userInfo.company._id)
                    .then(
                        res => {
                            this.sortRecentMenuItemsOrders(res)

                        },
                        err => {
                            alert(err)
                        }
                    )
            } else {
                this.sortRecentMenuItemsOrders([])
            }
        }
    }

    apiDidMountFunction = async () => {
        this.apiCallGetPlacesCathering()
        this.apiCallGetUserInfo()
        let dayStartTime = Moment(this.state.selectedDate).startOf('day')._d
        let dayEndTime = Moment(this.state.selectedDate).endOf('day')._d
        // console.log(fromDate)
        // console.log(toDate)
        let weekStartDay = Moment(this.state.selectedDate).startOf('isoWeek')._d
        let weekEndDay = Moment(this.state.selectedDate).endOf('isoWeek')._d
        // console.log(weekStartDay)
        // console.log(weekEndDay)
        await this.apiCallGetOrdersBetweenDates(false, weekStartDay, weekEndDay)
        await this.apiCallGetOrdersBetweenDates(true, dayStartTime, dayEndTime)



    }

    apiCallGetPlacesCathering() {
        CatheringNetwork.fetchPlacesCathering().then(
            res => {
                this.setNewStateHandler({
                    isCatheringAvailable: true,
                    placesCathering: res
                })
                // console.log(res)
            },
            err => {
                // this.showAlertMessage(err)
                this.setNewStateHandler({
                    isCatheringAvailable: false,
                })
            }
        )
    }

    apiCallGetUserInfo() {
        UserNetwork.fetchUserInfo()
            .then(
                res => {
                    this.props.updateUserProfileHandler(res)
                    this.balanceHandler()
                },
                err => {
                    if (err.logOut) {
                        this.props.userLogOutHandler()
                    }
                }
            )
    }

    balanceHandler = async () => {
        const user = this.props.userInfo
        if (this.props.isLogin === true) {
            let catheringOptions = user.catheringOptions
            if (catheringOptions !== null) {
                if (catheringOptions.package === "unlimited") {
                    this.setNewStateHandler({
                        balance: this.props.strings.unlimited
                    })
                } else {
                    this.setNewStateHandler({
                        balance: catheringOptions.balance + catheringOptions.reserved
                    })
                }
            }
        }
    }


    markDatesHandler(allOrdersForWeek) {
        allOrdersForWeek.map((order) => {
            //console.log(Moment(order.scheduledTime).utc().format('YYYY-M-DD'))
            let markedDate = {
                name: order._id,
                date: Moment(order.scheduledTime).utc().format('YYYY-MM-DD'),
                dots: [
                    { key: order._id, color: Moment(order.scheduledTime).isBefore(Moment()) ? 'red' : 'limegreen', selectedDotColor: 'yellow' },
                ],
            }
            var allMarkedDates = this.state.markedDates.concat(markedDate)
            this.setState({ markedDates: allMarkedDates })
        })
    }
    onDateSelected(value) {

        this.setState({ selectedDate: Moment(value).format('YYYY-MM-DD') })
        let fromDate = Moment(value).startOf('day')._d
        let toDate = Moment(value).endOf('day')._d

        // let ordersForWeek = this.state.ordersForWeek
        // ordersForDay = ordersForWeek.filter(orders =>  Moment(orders.scheduledTime).isBetween(Moment()))
        // this.setState({ ordersForDay: ordersForDay })

        // console.log(this.state.ordersForDay)
        // alert(Moment(value).format("DD MMM YYYY"))
        this.apiCallGetOrdersBetweenDates(true, fromDate, toDate)
    };

    onWeekChanged(date) {
        let weekStartDay = Moment(date).startOf('isoWeek')._d
        let weekEndDay = Moment(date).endOf('isoWeek')._d
        this.apiCallGetOrdersBetweenDates(false, weekStartDay, weekEndDay)
    }


    cateringCalendarStrip = () => {
        const { strings } = this.props

        return (
            <View>
                <View style={{ height: 30, backgroundColor: NAV_COLOR.headerBackground, marginLeft: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, flex: 5, alignItems: 'flex-start', textAlignVertical: 'center', fontWeight: '500' }}>{strings.balance}: {this.state.balance}</Text>
                    <View style={{ flex: 5, alignItems: 'flex-end' }}>
                        <View style={{ flex: 5, alignItems: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'limegreen', borderRadius: 10, width: 8, height: 8 }}></View>
                                <Text style={{ marginLeft: 10, fontSize: 11 }}>{strings.nextMeals}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'red', borderRadius: 10, width: 8, height: 8 }}></View>
                                <Text style={{ marginLeft: 10, fontSize: 11 }}>{strings.lastMeals}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: BASE_COLOR.gray, height: 0.5 }}></View>
                <CalendarStrip
                    ref={component => this._calendar = component}
                    onDateSelected={(value) => this.onDateSelected(value)}
                    responsiveSizingOffset={-6}
                    markedDates={this.state.markedDates}
                    // markedDatesStyle={{backgroundColor: 'red', color: 'red'}}
                    onWeekChanged={(date) => {
                        const { _calendar } = this
                        const currentDate = _calendar.getSelectedDate().format("DD MMM YYYY hh:mm a")
                        this.onWeekChanged(date)
                        // alert(Moment(date).format("DD MMM YYYY"))
                        // alert(Moment(date).week())
                        // alert(Moment(date).startOf('isoWeek').format("DD MMM YYYY hh:mm a"))
                        // alert(Moment(date).endOf('isoWeek').format("DD MMM YYYY hh:mm a"))
                    }}
                    style={{ height: 120, paddingTop: 10, paddingBottom: 10, backgroundColor: NAV_COLOR.headerBackground }}
                    // locale={locale}
                    daySelectionAnimation={{ type: 'background', duration: 200, highlightColor: BASE_COLOR.blue }}
                    minDate={Moment().subtract(21, 'd')}
                    maxDate={Moment().add(7, 'd')}
                    updateWeek={true}
                    highlightDateNumberStyle={{ color: 'white' }}
                    highlightDateNameStyle={{ color: 'white' }}
                    disabledDateNameStyle={{ color: 'grey' }}
                    disabledDateNumberStyle={{ color: 'grey' }}
                    calendarHeaderStyle={{ fontWeight: 'bold', fontSize: 20 }}
                />
            </View>
        )
    }

    renderList = () => {
        const { ordersForDay, placesCathering } = this.state
        var DishData = []

        ordersForDay.map((order, index) => {
            if (ordersForDay.length - 1 === index) {
                // last one
                DishData[index] = { addDish: true }
            } else {
                order.orderedMenuItems.map((item) => {
                    let image = new ImageAssets(item.food.image || {});
                    let dish = {
                        _id: item._id,
                        description: item.food.description,
                        name: item.food.name,
                        image: image,
                        status: order.status,
                        selectedOptions: order.orderedMenuItems
                    }
                    DishData.push(dish)
                })
            }

        })

        var PlaceData = []
        placesCathering.map(place => {
            PlaceData.push(place.place)
        })

        const { markedDates, recentMenuItemsOrder } = this.state
        if (markedDates.some(item => item.date === this.state.selectedDate)) {

            return (
                <>
                    {recentMenuItemsOrder.length > 0 ? <RecentOrders recentOrders={recentMenuItemsOrder} onPressSection={(sectionIndex) => this.onPressSectionListHeader(sectionIndex)} onPressItem={(item) => this.onPressSectionListItem(item)} /> : null}
                    <DishList data={DishData} isCathering={true} recentOrders={recentMenuItemsOrder} selectedDate={this.state.selectedDate} selectPlace={(placeId) => this.placeSelectHandler(placeId)} />
                </>
            )
        } else if (Moment(this.state.selectedDate).isAfter(Moment().subtract(1, 'day'))) {

            return (
                <>
                    {recentMenuItemsOrder.length > 0 ? <RecentOrders recentOrders={recentMenuItemsOrder} onPressSection={(sectionIndex) => this.onPressSectionListHeader(sectionIndex)} onPressItem={(item) => this.onPressSectionListItem(item)} /> : null}
                    <PlaceList data={PlaceData} clickOnPlace={(placeId) => this.placeSelectHandler(placeId)} />
                </>

            )
        } else if (Moment(this.state.selectedDate).isBefore(Moment().subtract(1, 'day'))) {
            return (
                <Text style={{ marginTop: 100, alignSelf: 'center', fontWeight: 'bold', fontSize: 22 }}>{this.props.strings.youDidntChooseMealForThisDay}</Text>
            )
        }
    }

    placeSelectHandler(placeId) {
        let cathering = {
            isFromCathering: true,
            selectedDate: this.state.selectedDate,
        }
        this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}`, params: { _id: placeId, cathering: cathering } })
    }
    onPressContactUs = () => {
        // UrlOpen.sendEmailViaEmailApp("test@test.com", "KETERING APP", "SPORTSKI POZDRAV.")
        this.pushNewScreen(ScreenName.ContactFormScreen())
    }
    signUpToCatheringMesage() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        width: '80%',
                        color: BASE_COLOR.black,
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        margin: 0,
                    }}>KLOPAJ</Text>
                    <Text style={{
                        width: 300,
                        color: BASE_COLOR.black,
                        fontSize: 14,
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        margin: 16,
                    }}>{this.props.strings.youAreNotSignedUpForCatering}</Text>
                </View>
                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.onPressContactUs()}>
                        <View style={{
                            alignContent: 'center',
                            justifyContent: 'center',
                            height: 40,
                            width: 200,
                            borderRadius: 8,
                            backgroundColor: BASE_COLOR.blue,
                        }}>
                            <Text style={{
                                width: '100%',
                                color: BASE_COLOR.white,
                                fontSize: 17,
                                fontWeight: 'bold',
                                textAlignVertical: 'center',
                                textAlign: 'center',
                            }}>{String(this.props.strings.contactUs).toUpperCase()}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View >

        )
    }

    onPressLogInHandler = () => {
        this.pushNewScreen({
            routeName: ScreenName.LoginScreen(),
            key: `${Math.random() * 10000}`,
            params: { showBackButton: true }
        })
    }
    loginToCatheringMesage() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{
                        width: '80%',
                        color: BASE_COLOR.black,
                        fontSize: 30,
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        margin: 0,
                    }}>KLOPAJ</Text>
                    <Text style={{
                        width: 300,
                        color: BASE_COLOR.black,
                        fontSize: 14,
                        fontWeight: 'bold',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                        margin: 16,
                    }}>{this.props.strings.toUseTheCateringTabPleaseLogIn}</Text>
                </View>
                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.onPressLogInHandler()}>
                        <View style={{
                            alignContent: 'center',
                            justifyContent: 'center',
                            height: 40,
                            width: 200,
                            borderRadius: 8,
                            backgroundColor: BASE_COLOR.blue,
                        }}>
                            <Text style={{
                                width: '100%',
                                color: BASE_COLOR.white,
                                fontSize: 17,
                                fontWeight: 'bold',
                                textAlignVertical: 'center',
                                textAlign: 'center',
                            }}>{String(this.props.strings.signUp).toUpperCase()}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    sortRecentMenuItemsOrders = (userCatherings) => {

        // recentMenuItemsOrder.push({
        //     menuItemArray: [{
        //             menuItem: currentMenuItem,
        //             quantityNumber: 1
        //         }],
        //     place: currentMenuItem.place,

        // })

        let { recentMenuItemsOrder } = this.state

        recentMenuItemsOrder = []

        userCatherings.map(item => {

            if (item.orderedMenuItems.length > 0) {

                let currentMenuItem = new MenuItem(item.orderedMenuItems[0].food)
                let existMenuItem = false
                let existPlace = null

                recentMenuItemsOrder.map((item, position) => {
                    if (currentMenuItem.place._id === recentMenuItemsOrder[position].place._id) {
                        existPlace = position

                        recentMenuItemsOrder[position].menuItemArray.map((i, index) => {
                            if (currentMenuItem._id === recentMenuItemsOrder[position].menuItemArray[index].menuItem._id) {

                                recentMenuItemsOrder[position].menuItemArray[index].quantityNumber = recentMenuItemsOrder[position].menuItemArray[index].quantityNumber + 1
                                existMenuItem = true
                                index = recentMenuItemsOrder.length
                            }
                        })
                        position = recentMenuItemsOrder.length
                    }
                })


                if (existPlace !== null) {
                    if (existMenuItem == false) {
                        recentMenuItemsOrder[existPlace].menuItemArray.push({
                            quantityNumber: 1,
                            menuItem: currentMenuItem
                        })
                    }
                } else {
                    recentMenuItemsOrder.push({
                        menuItemArray: [{
                            quantityNumber: 1,
                            menuItem: currentMenuItem
                        }],
                        place: currentMenuItem.place,
                        hide: true
                    })
                }

            }

        })
        this.setNewStateHandler({
            recentMenuItemsOrder
        })
    }

    onPressSectionListHeader = (sectionIndex) => {

        let { recentMenuItemsOrder } = this.state

        for (let index = 0; index < recentMenuItemsOrder.length; index++) {

            if (sectionIndex == index) {
                recentMenuItemsOrder[index].hide = !recentMenuItemsOrder[index].hide
            } else {
                recentMenuItemsOrder[index].hide = true
            }

        }

        // this.setState({ sectionItems })
        this.setNewStateHandler({ recentMenuItemsOrder })
    }
    onPressSectionListItem = (item) => {
        let cathering = {
            isFromCathering: true,
            selectedDate: this.state.selectedDate,
        }
        this.pushNewScreen({
            routeName: ScreenName.MenuItemDetailsScreen(),
            key: `${Math.random() * 10000}`,
            params: {
                _id: item.menuItem._id, cathering: cathering
            }
        })
    }
    mainContent = () => {
        const { refreshing } = this.state
        return (
            <ScrollView style={{ flexGrow: 1 }}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={this._onRefresh}
                    tintColor={BASE_COLOR.blue}
                    colors={[BASE_COLOR.blue]}
                />}
            >
                {this.renderList()}
            </ScrollView>
        )
    }

    render() {
        const { loading, isCatheringAvailable, } = this.state
        const { isLogin } = this.props
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.mainContent()
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    {isLogin ? isCatheringAvailable != false ?
                        <>
                            {this.cateringCalendarStrip()}
                            {mainDisplay}
                        </>
                        : this.signUpToCatheringMesage()
                        : this.loginToCatheringMesage()
                    }
                </View>
            </SafeAreaView>


        )
    }
    _onRefresh = () => {
        this.apiDidMountFunction()
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
    }
});
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        isLogin: state.user.isLogin,
        userCatherings: state.user.userCatherings,
        strings: state.location.language.strings,
        language: state.location.language.name,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateUserProfileHandler: (user) => dispatch(updateUserProfile(user)),
        userLogOutHandler: () => dispatch(userLogOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CateringScreen);
