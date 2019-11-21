import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { BASE_COLOR } from '../../styles';

const widhtBtn = Dimensions.get('screen').width / 3.8
class HistoryOrder extends Component {

    btnContent = (title, onPressHanlder) => (
        <TouchableOpacity onPress={() => onPressHanlder()}>
            <View style={styles.btn}>
                <Text style={styles.baseText}>{title}</Text>
            </View>
        </TouchableOpacity>

    )
    onPressDetaljnije = () => {
        alert("onPressDetaljnije")
    }
    onPressPoruci = () => {
        alert("onPressPoruci")
    }
    onPressReview = () => {
        alert("onPressReview")
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{ margin: 8, flex: 10 }}>
                    <View style={styles.date}>
                        <Text style={[styles.baseText, { color: BASE_COLOR.black, textAlign: 'left', fontWeight: 'normal' }]}>20.12.2019</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode='tail'
                            style={[styles.baseText, { color: BASE_COLOR.black, textAlign: 'left', fontSize: 16 }]}>
                            Piletina sa povrcem
                            </Text>
                        <Text style={[styles.baseText, { color: BASE_COLOR.blue, textAlign: 'left', fontSize: 16 }]}>
                            750.00
                            </Text>
                    </View>
                    <View style={styles.footerContainer}>
                        {this.btnContent("Detalji", this.onPressDetaljnije)}
                        {this.btnContent("Poruči", this.onPressPoruci)}
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
        height: 150

    },
    titleContainer: {
        flex: 7,
        marginLeft:8,
    },
    footerContainer: {
        flex: 3,
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent:'center',
        alignItems:'center',
    },
    date: {
        marginLeft:8,
        height:18,
        alignContent:'center',
        alignItems:'center',
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