import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BASE_COLOR } from '../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
class RecentOrders extends Component {

    sectionListContent = (sectionItems) => {

        let returnSectionView = []
        sectionItems.map((section, indexInArray) => {
            if (section.menuItemArray.length > 0) {
                const tintColor = section.hide ? BASE_COLOR.black : BASE_COLOR.blue
                returnSectionView.push(
                    <View key={indexInArray}>
                        <TouchableOpacity onPress={() => this.props.onPressSection(indexInArray)}>
                            <View

                                style={{ borderRadius: 8, borderColor: tintColor, borderWidth: 0.7, marginTop: 4, marginBottom: 4, marginLeft: 8, marginRight: 8, padding: 8, backgroundColor: BASE_COLOR.white, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                    style={{ fontWeight: 'bold', fontSize: 16, color: tintColor }}>
                                    {section.place.name}</Text>

                                <Icon
                                    name={!section.hide ? "md-arrow-dropdown-circle" : "md-arrow-dropright-circle"}
                                    size={25}
                                    color={tintColor} />
                            </View>
                        </TouchableOpacity>
                        {this.ordersContent(section.menuItemArray, section.hide)}
                    </View>
                )
            }
        })

        return returnSectionView
    }

    ordersContent = (menuItems, hide) => {
        if (hide == false) {
            return (
                <FlatList
                    data={menuItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <>
                                <TouchableOpacity onPress={() => this.props.onPressItem(item)}
                                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 10 }}>
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ justifyContent: 'flex-start' }}>{item.menuItem.name}</Text>
                                    <Text style={{ justifyContent: 'flex-end', fontWeight: 'bold' }}>  x{item.quantityNumber}</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }}
                />
            )
        } else {
            return (
                null
            )
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 16 }}>{this.props.strings.currentOrders}:</Text>
                {this.sectionListContent(this.props.recentOrders)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        // flex: 1,
        backgroundColor: BASE_COLOR.lightGray,
        height: 'auto'

    }
});

const mapStateToProps = state => {
    return {
        strings: state.location.language.strings,
    };
};

export default connect(mapStateToProps, null)(RecentOrders);
