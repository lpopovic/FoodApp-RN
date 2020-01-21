import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { BASE_COLOR } from '../../styles';
import Moment from 'moment'
const widhtBtn = Dimensions.get('screen').width / 3.8
class HistoryOrder extends Component {

    btnContent = (title, onPressHanlder) => (
        <TouchableOpacity onPress={() => onPressHanlder()}>
            <View style={styles.btn}>
                <Text style={styles.baseText}>{title}</Text>
            </View>
        </TouchableOpacity>

    )
    onPressDetailOrder = () => {
        this.props.onPressDetailOrder()
    }
    onPressOrderAgain = () => {
        this.props.onPressOrderAgain()
    }
    onPressReview = () => {
        this.props.onPressReview()
    }
    render() {
        const { item } = this.props
        const { totalAmount, additionalPrice, orderedTime, status, place } = item
        const priceText = Number(totalAmount + additionalPrice).toFixed(2)//'750.00'
        const titleText = item.generateTitleOfOrder()//'Piletina sa povrcem'
        const placeName = place.name
        var date = new Date(orderedTime);

        const dateText = Moment(date).format("DD/MM/YYYY") //orderedTime//'20.12.2019'
        const statusOrder = status//'Delivered'
        return (
            <View style={styles.mainContainer}>
                <View style={{ margin: 8, flex: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={styles.date}>
                            <Text style={[styles.baseText, { color: BASE_COLOR.black, textAlign: 'left', fontWeight: 'normal' }]}>
                                {dateText}
                            </Text>
                        </View>
                        <View style={{width:'50%'}}>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                                style={[styles.baseText, { color: BASE_COLOR.orange, textAlign: 'right', fontSize: 14 }]}>
                                {statusOrder}</Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text
                            numberOfLines={200}
                            ellipsizeMode='tail'
                            style={[styles.baseText, { color: BASE_COLOR.blue, textAlign: 'left', fontSize: 16, marginBottom: 8 }]}>
                            {placeName}
                        </Text>
                        <Text
                            numberOfLines={200}
                            ellipsizeMode='tail'
                            style={[styles.baseText, { color: BASE_COLOR.black, textAlign: 'left', fontSize: 16, marginBottom: 8, fontWeight: '400' }]}>
                            {titleText}
                        </Text>
                        <Text style={[styles.baseText, { color: BASE_COLOR.blue, textAlign: 'left', fontSize: 16 }]}>
                            Iznos: {priceText}
                        </Text>

                    </View>
                    <View style={styles.footerContainer}>
                        {this.btnContent("Detalji", this.onPressDetailOrder)}
                        {this.props.isCatheringOrder == true ? null : this.btnContent("Poruči", this.onPressOrderAgain)}
                        {this.btnContent("Review", this.onPressReview)}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BASE_COLOR.lightGray,
        minHeight: 150

    },
    titleContainer: {
        flex: 7,
        marginLeft: 8,
        marginBottom: 8,
    },
    footerContainer: {
        flex: 3,
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    date: {
        marginLeft: 8,
        height: 18,
        alignContent: 'center',
        alignItems: 'center',
    },
    baseText: {
        width: '100%',
        color: BASE_COLOR.white,
        fontSize: 12,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    btn: {
        height: 30,
        width: widhtBtn,
        backgroundColor: BASE_COLOR.gray,
        justifyContent: 'center',
        borderRadius: 4,
        marginLeft: 4,
        marginRight: 4
    }
});


export { HistoryOrder };