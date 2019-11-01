import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BASE_COLOR } from '../../styles'
class CountryCity extends Component {
    onPressHandler = () => {
        this.props.onPress()
    }

    textContent = (name, color) => (
        <View style={[styles.textContainer, { backgroundColor: color }]}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.textStyle}>{name}</Text>
        </View>
    )

    render() {
        const { item, isSelected } = this.props

        let textDisplay = null
        if (isSelected) {
            textDisplay = this.textContent(item.name, 'rgba(255, 255, 255, 0.1)')
        } else {
            textDisplay = this.textContent(item.name, 'rgba(0, 0, 0, 0.0)')
        }


        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity onPress={() => this.onPressHandler()}>
                    <View style={{ flexDirection: 'row', minHeight: 35, }}>
                        {textDisplay}
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        marginTop: 8,
    },
    textContainer: {
        marginLeft: 16,
        marginRight: 16,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'blue',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 8,
        
    },
    textStyle: {
        fontSize: 16,
        fontWeight: "300",
        color: BASE_COLOR.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        minWidth: 180

    }
});


export default CountryCity;