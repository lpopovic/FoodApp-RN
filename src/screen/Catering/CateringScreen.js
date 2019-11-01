import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList
} from 'react-native';
import { ScreenName } from '../../helpers'
import BaseScreen from "../BaseScreen/BaseScreen"
// import CateringCalendarStrip from '../../components/Catering/CateringCalendarStrip';
import PlaceCard from '../../components/Catering/PlaceCard';
import PlaceList from '../../components/Catering/PlaceList';
import DishCard from '../../components/Catering/DishCard';
import CalendarStrip from 'react-native-calendar-strip';
import Moment from 'moment';
import { BASE_COLOR, NAV_COLOR } from '../../styles';

class CateringScreen extends BaseScreen {

    static navigationOptions = {
        header: null,
        // headerVisible: false,
        // headerBackTitle: "Photo",
    };

    constructor(props) {
        super(props)
        this.state = {
            selectedDate: Moment().format('YYYY-M-DD'),
            srx: false,
            markedDates: [
                {
                    name: 'SRX',
                    date: '2019-10-26',
                    dots: [
                        { key: 22, color: 'red', selectedDotColor: 'yellow' },
                    ],
                },
                {
                    name: 'kia',
                    date: '2019-10-23',
                    dots: [
                        { key: 2, color: 'red', selectedDotColor: 'yellow' },
                    ],
                },
                {
                    name: 'audi',
                    date: Moment().format('YYYY-M-DD'),
                    dots: [
                        { key: 3, color: 'red', selectedDotColor: 'yellow' },
                    ],
                },
            ]
        }
    }

    componentDidMount() {
        super.componentDidMount()
        this.setStatusBarStyle(NAV_COLOR.headerBackground, true)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }

    onDateSelected(value) {

        this.setState({ selectedDate: Moment(value).format('YYYY-M-DD') })
        alert(Moment(value).format("DD MMM YYYY"))
    };

    cateringCalendarStrip = () => {
        // let markedDates = [
        //     {
        //         date: '2019-10-26',
        //         dots: [
        //             { key: 22, color: 'red', selectedDotColor: 'yellow' },
        //         ],
        //     },
        //     {
        //         date: '2019-10-23',
        //         dots: [
        //             { key: 2, color: 'red', selectedDotColor: 'yellow' },
        //         ],
        //     },
        //     {
        //         date: Moment().format('YYYY-M-DD'),
        //         dots: [
        //             { key: 3, color: 'red', selectedDotColor: 'yellow' },
        //         ],
        //     },
        // ]

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
        return (
            <CalendarStrip
                ref={component => this._calendar = component}
                onDateSelected={(value) => this.onDateSelected(value)}
                responsiveSizingOffset={-6}
                markedDates={this.state.markedDates}
                // markedDatesStyle={{backgroundColor: 'red', color: 'red'}}
                onWeekChanged={(date) => {
                    const { _calendar } = this
                    const currentDate = _calendar.getSelectedDate().format("DD MMM YYYY hh:mm a")
                    alert(Moment(date).format("DD MMM YYYY"))
                    // alert(Moment(date).week())
                }}
                style={{ height: 120, paddingTop: 20, paddingBottom: 10, backgroundColor: NAV_COLOR.headerBackground }}
                locale={locale}
                daySelectionAnimation={{ type: 'background', duration: 200, highlightColor: BASE_COLOR.blue }}
                minDate={Moment().subtract(21, 'd')}
                maxDate={Moment().add(7, 'd')}
                updateWeek={true}
                highlightDateNumberStyle={{ color: 'white' }}
                highlightDateNameStyle={{ color: 'white' }}
                disabledDateNameStyle={{ color: 'grey' }}
                disabledDateNumberStyle={{ color: 'grey' }}
            />
        )
    }

    renderList = () => {
        const DishData = [
            {
                _id: "5da869da91408d5e6002577f",
                description: "Bruskete (bruschette) su italijansko predjelo, idealni za lagani obrok ili užinu, a na žurkama će biti omiljeni sendiviči. Ovi ukusni zalogajčići su hranjivi i ne previše kalorični, a nekoliko brusketa će zasititi u potpunosti i okorele gurmane i „mesojede“.",
                name: "Brusketi",
                link: "https://api.ketering.rtech.rs/uploads/bf7966d5-c162-e61b-d79c-3d35ac11339c-169.png?caption=Brusketi",
            },
            {
                _id: "5da9a5d74157831bf8c616ef",
                description: "Salata, pomfrit, hleb, juneće meso",
                name: "Ćevapi",
                link: "https://api.ketering.rtech.rs/uploads/6bfe163b-8e8f-ed77-bcdf-f8a5106e9d20-169.png?caption=Cevapi",
            },
            {
                _id: "5da9a6024157831bf8c616f0",
                description: "Juneće meso, salata, hleb, pomfrit",
                name: "Pljeskavica",
                link: "https://api.ketering.rtech.rs/uploads/b462bad1-d85d-e381-c624-811a833bd12c-169.png?caption=Pljeskavica",
            },
        ];

        const PlaceData = [
            {
                _id: "5da591366862d77054712886",
                description: "Ovde treba da bude opis. Ovde treba da bude opis. Ovde treba da bude opis. Ovde treba da bude opis. Ovde treba da bude opis. Ovde treba da bude opis. Ovde treba da bude opis.",
                name: "Kod Saloa",
                link: "https://api.ketering.rtech.rs/uploads/9ff15098-0366-0617-0540-b77c4fa3aa0e-11.png?caption=Kod%20Saloa"
            },
            {
                _id: "5da5c6b36862d77054712889",
                description: "Ovde treba da bude opis. Ovde treba da bude opis. Ovde treba da bude opis. Ovde treba da bude opis. Ovde treba da bude opis. Ovde treba da bude opis. Ovde treba da bude opis.",
                name: "Kod Dzamboa",
                link: "https://api.ketering.rtech.rs/uploads/c54153e5-b287-7307-aa52-b0c49f205a4a-11.png?caption=Kod%20Dzamboa"
            },
        ]

        const { markedDates } = this.state
        if (markedDates.some(item => item.date === this.state.selectedDate)) {
            return (
                <DishCard name={DishData[0].name} image={DishData[0].link} description={DishData[0].description} />
            )
        } else {
            return (
                <PlaceList data={PlaceData} clickOnPlace={() => this.placeSelectHandler()} />
                //    <PlaceCard />
            )
        }
    }

    placeSelectHandler() {
        this.pushNewScreen({ routeName: ScreenName.PlaceDetailScreen(), key: `${Math.random() * 10000}` })
    }


    render() {
        return (
            <SafeAreaView style={styles.safeAreaHeader}>
                <View style={styles.mainContainer}>
                    {/* <CateringCalendarStrip /> */}
                    {this.cateringCalendarStrip()}
                    {this.renderList()}
                    {/* <PlaceCard
                        onClick={() => this.placeSelectHandler()}
                    /> */}
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


export default CateringScreen;