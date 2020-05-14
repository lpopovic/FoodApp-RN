import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import DishCard from '../Catering/DishCard';
import CatheringDishCard from '../Catering/CatheringDishCard';
import { IconAssets } from '../../assets';
import AddDish from '../Catering/AddDish';
import SpecialOfferMenuItem from '../MenuItem/SpecialOfferMenuItem';
import Moment from 'moment';
import { BASE_COLOR } from '../../styles';

class DishList extends Component {


    renderSeparator = () => {
        if (!this.props.isCathering) {
            return (
                <View style={{ height: 1, backgroundColor: 'lightgray', marginHorizontal: 15 }} />
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

class DishSectionList extends Component {
    constructor(props) {
        super(props)
    }
    render_FlatList_footer = () => {

        var footer_View = (

            <View style={{ width: 8 }}>
            </View>

        );

        return footer_View;

    };
    seeMoreContent = (titleSeeMore) => {
        const { hideSeeMore } = this.props
        if (hideSeeMore == null) {
            return (
                <TouchableOpacity onPress={() => this.props.onPressSeeMore()}>
                    <View style={styles.seeMoreContainer}>
                        <Text style={[styles.text, { color: BASE_COLOR.gray }]}>{titleSeeMore}</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={styles.seeMoreContainer}>
                    <Text style={[styles.text, { color: BASE_COLOR.gray }]}></Text>
                </View>
            )
        }
    }
    render() {
        const titleSection = this.props.titleSection ? this.props.titleSection : "NEPOZNATO"
        const titleSeeMore = this.props.titleSeeMore ? this.props.titleSeeMore : "NEPOZNATO"
        return (
            <View style={[styles.mainContainerSection, this.props.style]}>
                <View style={styles.sectionContainer}>
                    <View style={{ flexDirection: 'row', flex: 7, marginRight: 30}}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.text}>{titleSection}</Text>
                        <Image
                            style={{
                                width: 18,
                                height: 18,
                                aspectRatio: 1,
                                marginLeft: 7,
                            }}
                            resizeMode='contain'
                            source={IconAssets.specialImportantMark}
                        />
                    </View>
                    {this.seeMoreContent(titleSeeMore)}
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={styles.listContainer}
                    data={this.props.arrayObject}
                    horizontal
                    keyExtractor={(item, index) => `${index.toString()}`}
                    renderItem={(info) => (
                        <SpecialOfferMenuItem
                            dish={info.item}
                            onPress={() => this.props.onPressItem(info.item)}
                        />
                        //     <PlaceSmallItem
                        //         item={info.item}
                        //         setSmall
                        //         onPress={() => this.props.onPressItem(info.item)}
                        //     />
                    )}
                    ListFooterComponent={this.render_FlatList_footer}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    mainContainerSection: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    sectionContainer: {
        paddingLeft: 8,
        paddingRight: 16,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: BASE_COLOR.black,
        textAlign: 'center',
    },
    seeMoreContainer: {
        flex: 3,
        padding: 4,
    }
});


export { DishSectionList, DishList };