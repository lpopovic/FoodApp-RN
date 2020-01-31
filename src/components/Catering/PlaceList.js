import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PlaceCard from '../../components/Catering/PlaceCard';

class PlaceList extends Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={(item, index) => `${index.toString()}`}
                    renderItem={({ item }) => <PlaceCard data={item} onClick={() => this.props.clickOnPlace(item._id)} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
     
    }
});


export default PlaceList;