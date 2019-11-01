import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Moment from 'moment';
import { BASE_COLOR } from '../../styles';

class CateringCalendarStrip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: Moment(),
        }
    }

    onDateSelected(value) {
        // this.setState({ selectedDate: value })
        
        alert(Moment(value).format("DD MMM YYYY"))
    };

    render() {

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
        let datesWhitelist = [{
            start: Moment(),
            end: Moment().add(3, 'days')  // total 4 days enabled
        //  start: Moment("2019-10-17"),
        //  end: Moment("2019-10-19")
          }];
        let datesBlacklist = [ Moment().add(1, 'days') ]; // 1 day disabled
      

        let markedDates = [
            {
                date: '2019-10-26',
                dots: [
                    // { key: 1, color: this.state.selectedDate == Moment('2019-10-26').format("YYYY-MM-DD") ? 'white' : 'red', selectedDotColor: 'white' },
                    { key: 22, color: BASE_COLOR.blue, selectedDotColor: 'white' },
                ],
            },
            {
                date: '2019-10-26',
                dots: [
                    { key: 2, color: 'red', selectedDotColor: 'red' },
                    // { key: 2, color: 'blue', selectedDotColor: 'red' },
                ],
            },
            {
                date: Moment(),
                dots: [
                    { key: 3, color: 'red', selectedDotColor: 'red' },
                    // { key: 2, color: 'blue', selectedDotColor: 'red' },
                ],
            },
        ]
        let customDatesStyles = [];
        customDatesStyles = [{
            startDate: this.state.selectedDate,
            dateNameStyle: styles.dateNameStyle,
            dateNumberStyle: styles.dateNumberStyle,
            dateContainerStyle: { backgroundColor: BASE_COLOR.blue, },
        }];

        return (
            <View style={styles.mainContainer}>
                <CalendarStrip
                    ref={component => this._calendar = component}
                    onDateSelected={(value) => this.onDateSelected(value)}
                    responsiveSizingOffset={-6}
                    markedDates={markedDates}
                    // markedDatesStyle={{backgroundColor: 'red', color: 'red'}}
                    onWeekChanged={(date) => {
                        const { _calendar } = this
                        const currentDate = _calendar.getSelectedDate().format("DD MMM YYYY hh:mm a")
                        alert(Moment(date).format("DD MMM YYYY"))
                        // alert(Moment(date).week())
                        
                    }}
                    style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
                    locale={locale}
                    daySelectionAnimation={{ type: 'background', duration: 200, highlightColor: BASE_COLOR.blue }}
                    minDate={Moment().subtract(21, 'd')}
                    maxDate={Moment().add(7, 'd')}
                    updateWeek={true}
                    // datesWhitelist={datesWhitelist}
                    // datesBlacklist={datesBlacklist}
                    // styleWeekend={false}
                    // iconContainer={{flex: 0.1}}
                    
                    // customDatesStyles={customDatesStyles}
                    // calendarHeaderStyle={{
                    //     // color: '#646464', 
                    //     width: 'auto', 
                    //     backgroundColor: '#F1F1F1', 
                    //     textAlign: 'center' , 
                    //     // alignItems: 'flex-start', 
                    //     // left: 0, 
                    //     height: 30, 
                    //     borderRadius: 5
                    //     // textAlignVertical: 'center',
                    //     // justifyContent: 'center'
                    // }}
                    // dateNumberStyle={{color: 'red'}}
                    // dateNameStyle={{color: 'white'}}
                    highlightDateNumberStyle={{ color: 'white' }}
                    highlightDateNameStyle={{ color: 'white' }}
                    disabledDateNameStyle={{ color: 'grey' }}
                    disabledDateNumberStyle={{ color: 'grey' }}

                />
                {/* <TouchableOpacity onPress={() => alert(Moment(this. _calendar.getSelectedDate()).format("DD MMM YYYY hh:mm a"))}> */}
                {/* <TouchableOpacity onPress={() => this._calendar.getNextWeek()}>
                    <View style={{ backgroundColor: 'red', height: 50, width: 100, alignItems: 'center' }}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._calendar.getPreviousWeek()}>
                    <View style={{ backgroundColor: 'blue', height: 50, width: 100, alignItems: 'center' }}></View>
                </TouchableOpacity> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,

    }
});


export default CateringCalendarStrip;