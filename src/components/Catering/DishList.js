import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import DishCard from '../Catering/DishCard';
import AddDish from '../Catering/AddDish';
import Moment from 'moment';

class DishList extends Component {

    render() {

        return (
            <View style={styles.mainContainer}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        if (!item.addDish) {
                            return (
                                <DishCard dish={item} onClick={() => this.props.clickOnDish != undefined ? this.props.clickOnDish(item._id) : null} />
                            )
                        } else {
                            return (
                                Moment(this.props.selectedDate).isAfter(Moment().subtract(1, 'day')) ? <AddDish placeSelect={this.props.selectPlace}/> : null
                            )
                        }
                    }}
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