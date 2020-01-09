import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_COLOR } from '../../styles';
import { withNavigation } from 'react-navigation'

class AddDish extends Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity onPress={() => alert("KLIK NA PLUS")}>
                    <View style={styles.cardContainer}>
                        <View style={styles.iconContent}>
                            <Icon name="ios-add" size={90} color={BASE_COLOR.blue} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    cardContainer: {
        width: Dimensions.get('window').width - 40,
        height: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: BASE_COLOR.blue,
        borderWidth: 5,
        borderRadius: 5,
    },
    iconContent: {
        alignSelf: 'center',
    }
});


export default withNavigation(AddDish);