import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Keyboard } from 'react-native';
import CountryCity from './CountryCity'

class CountryCityList extends Component {

    onItemSelectedHandler = (item) => {
        this.props.onItemSelected(item)

    }
    isSelectedHandler = (item) => {

        return this.props.currentItemSelected === item._id
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    bounces={false}
                    onScroll={Keyboard.dismiss}
                    keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
                    extraData={this.props.extraData}
                    data={this.props.arrayObject}
                    scrollEnabled={true}
                    renderItem={({ item }) =>
                        <CountryCity
                            item={item}
                            isSelected={this.isSelectedHandler(item)}
                            onPress={() => this.onItemSelectedHandler(item)}
                        />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});


export default CountryCityList;