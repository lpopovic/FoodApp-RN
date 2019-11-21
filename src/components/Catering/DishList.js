import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import DishCard from '../Catering/DishCard';

class DishList extends Component {

    render() {

        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => <DishCard dish={item} onClick={()=> this.props.clickOnDish(item._id)}/>}
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