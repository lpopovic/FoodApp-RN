import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import DishCard from '../Catering/DishCard';
import CatheringDishCard from '../Catering/CatheringDishCard';
import AddDish from '../Catering/AddDish';
import Moment from 'moment';
import { BASE_COLOR } from '../../styles';

class DishList extends Component {


    renderSeparator = () => {
        if (!this.props.isCathering) {
            return (
                <View style={{ height: 1, backgroundColor: 'lightgray', marginHorizontal: 15 }}/>
            )
        } else {
            return null
        }
    }


    render() {

        return (
            <View style={[styles.mainContainer, this.props.isCathering ? null : { marginHorizontal: 8, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 1, borderTopWidth: 0, borderColor: 'lightgray' }]}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={(item, index) => `${index.toString()}`}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({ item }) => {
                        if (!item.addDish) {
                            return (
                                this.props.isCathering ?
                                    <CatheringDishCard dish={item} onClick={() => this.props.clickOnDish != undefined ? this.props.clickOnDish(item._id) : null} />
                                    :
                                    <DishCard dish={item} onClick={() => this.props.clickOnDish != undefined ? this.props.clickOnDish(item._id) : null} />
                            )
                        } else {
                            return (
                                Moment(this.props.selectedDate).isAfter(Moment().subtract(1, 'day')) ? <AddDish placeSelect={this.props.selectPlace} /> : null
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
        flex: 1,
        backgroundColor: 'white'
    }
});


export default DishList;