import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DishCard from '../Catering/DishCard';

class DishList extends Component {

    render() {

        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <DishCard name={item.name} description={item.description} image={item.link}/>}
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


export default DishList;