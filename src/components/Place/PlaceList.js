import React, { Component } from 'react';
import { 
    View, 
    FlatList,
    Text, 
    StyleSheet
 } from 'react-native';
import PlaceItem from './PlaceItem'
class PlaceList extends Component {

    render() {
        return (
            <FlatList
                refreshControl={this.props.refreshControl}
                style={styles.listContainer}
                data={this.props.arrayObject}
                keyExtractor={(index) => `${Math.random() * Math.random()}${index.toString()}`}
                renderItem={(info) => (
                    <PlaceItem
                        item={info.index}
                        onPress={() => this.props.onPressItem(info.item)}
                    />
                )}

            />
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    listContainer: {
        width: "100%",
    },
});


export default PlaceList;