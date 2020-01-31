import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { ScreenName, STORAGE_KEY, getStorageData } from '../../helpers'
import BaseScreen from "../BaseScreen/BaseScreen"
import PlaceCard from '../../components/Catering/PlaceCard';
import PlaceList from '../../components/Catering/PlaceList';
import DishList from '../../components/Catering/DishList';
import DishCard from '../../components/Catering/DishCard';
import CalendarStrip from 'react-native-calendar-strip';
import { CatheringNetwork, UserNetwork } from '../../service/api'
import Moment from 'moment';
import { connect } from 'react-redux';
import { updateUserProfile } from '../../store/actions';
import { BASE_COLOR, NAV_COLOR } from '../../styles';
import { ImageAssets } from '../../model/image';
import { User } from '../../model';
const locale = {
    name: 'sr',
    config: {
        months: 'Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar'.split('_'),
        monthsShort: 'Jan_Feb_Mar_Apr_Maj_Jun_Jul_Avg_Sep_Okt_Nov_Dec'.split('_'),
        weekdays: 'Ponedeljak_Utorak_Sreda_Četvrtak_Petak_Subota_Nedelja'.split('_'),
        weekdaysShort: 'NED_PON_UTO_SRE_ČET_PET_SUB'.split('_'),
        weekdaysMin: 'PO_UT_SR_ČE_PE_SU_NE'.split('_'),
    },
    week: {
        dow: 1,
        doy: 4
    }
};
class CateringScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            isCatheringAvailable: false,
            selectedDate: Moment().format('YYYY-MM-DD'),
            markedDates: [],
            placesCathering: [],
            ordersForWeek: [],
            ordersForDay: [],
            places: [],
            balance: null
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
                    // this.showAlertMessage(err)
                }
            )
    }

    balanceHandler = async () => {
        // const user = await getStorageData(STORAGE_KEY.USER_APP_DATA)
        // if (user !== null) {
        //     let me = new User(user)
        //     let catheringOptions = me.catheringOptions
        //     if (catheringOptions !== null) {
        //         if (catheringOptions.package === "unlimited") {
        //             this.setNewStateHandler({
        //                 // balance: "neograničeno"
        //                 balance: catheringOptions.reserved
        //             })
        //         } else {
        //             this.setNewStateHandler({
        //                 // balance: catheringOptions.balance
        //                 balance: catheringOptions.reserved
        //             })
        //         }
        //     }
        // }
        const user = this.props.userInfo
        if (this.props.isLogin === true) {
            let catheringOptions = user.catheringOptions
            if (catheringOptions !== null) {
                if (catheringOptions.package === "unlimited") {
                    this.setNewStateHandler({
                        balance: "neograničeno"
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
    showContactFormHandler = () => {
        const { isLogin, userInfo } = this.props
        if (!isLogin) {
            this.replaceScreenNavigationStack(ScreenName.ContactFormScreen())
        }

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


        return (
            <View>
                <View style={{ height: 30, backgroundColor: NAV_COLOR.headerBackground, marginLeft: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, flex: 5, alignItems: 'flex-start', textAlignVertical: 'center', fontWeight: '500' }}>Balans: {this.state.balance}</Text>
                    <View style={{ flex: 5, alignItems: 'flex-end' }}>
                        <View style={{ flex: 5, alignItems: 'flex-start' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'limegreen', borderRadius: 10, width: 8, height: 8 }}></View>
                                <Text style={{ marginLeft: 10, fontSize: 11 }}>Sledeći obroci</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'red', borderRadius: 10, width: 8, height: 8 }}></View>
                                <Text style={{ marginLeft: 10, fontSize: 11 }}>Prošli obroci</Text>
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
                        image: image
                    }
                    DishData.push(dish)
                })
            }

        })

        var PlaceData = []
        placesCathering.map(place => {
            PlaceData.push(place.place)
        })

        const { markedDates } = this.state
        if (markedDates.some(item => item.date === this.state.selectedDate)) {
            console.log("DISH DATA")
            console.log(DishData)
            return (
                <DishList data={DishData} selectedDate={this.state.selectedDate} selectPlace={(placeId) => this.placeSelectHandler(placeId)} />
            )
        } else if (Moment(this.state.selectedDate).isAfter(Moment().subtract(1, 'day'))) {
            console.log(placesCathering)
            return (
                <PlaceList data={PlaceData} clickOnPlace={(placeId) => this.placeSelectHandler(placeId)} />
            )
        } else if (Moment(this.state.selectedDate).isBefore(Moment().subtract(1, 'day'))) {
            return (
                <Text style={{ marginTop: 100, alignSelf: 'center', fontWeight: 'bold', fontSize: 22 }}>Niste izabrali obrok za ovaj dan!</Text>
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

    signUpToCatheringMesage() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', fontSize: 24, fontWeight: 'bold' }}>NISTE PRIJAVLJENI NA KETERING!!!</Text>
            </View>

        )
    }


    render() {
        const { loading, isCatheringAvailable } = this.state
        const { isLogin } = this.props
        const mainDisplay = loading ? this.activityIndicatorContent(BASE_COLOR.blue) : this.renderList()
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    {isCatheringAvailable && isLogin ?
                        <>
                            {this.cateringCalendarStrip()}
                            {mainDisplay}
                        </>
                        : this.signUpToCatheringMesage()}
                    {/* {this.cateringCalendarStrip()}
                 {mainDisplay} */}
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
    }
});
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        isLogin: state.user.isLogin,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateUserProfileHandler: (user) => dispatch(updateUserProfile(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CateringScreen);
